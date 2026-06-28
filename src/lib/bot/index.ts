import { Bot, webhookCallback } from "grammy";
import { extractTransaction } from "../ai/extractor";
import { createServerClient } from "../supabase/server";

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.command("link", async (ctx) => {
  const chatId = ctx.chat.id.toString();
  const otp = ctx.match?.trim();
  
  if (!otp) {
    await ctx.reply("Silakan berikan kode OTP. Contoh: /link 123456");
    return;
  }

  const supabase = createServerClient();
  
  const { data: webUser, error: findError } = await supabase
    .from("users")
    .select("id, telegram_sync_token_expires")
    .eq("telegram_sync_token", otp)
    .single();

  if (findError || !webUser) {
    await ctx.reply("Kode OTP tidak valid atau salah.");
    return;
  }

  if (new Date(webUser.telegram_sync_token_expires) < new Date()) {
    await ctx.reply("Kode OTP sudah kedaluwarsa. Silakan generate ulang di web.");
    return;
  }

  await supabase
    .from("users")
    .update({ telegram_chat_id: null })
    .eq("telegram_chat_id", chatId);

  const fullName = `${ctx.from?.first_name || ""} ${ctx.from?.last_name || ""}`.trim() || null;

  const { error: updateError } = await supabase
    .from("users")
    .update({ 
      telegram_chat_id: chatId,
      telegram_sync_token: null,
      telegram_sync_token_expires: null,
      full_name: fullName
    })
    .eq("id", webUser.id);

  if (updateError) {
    await ctx.reply("Terjadi kesalahan sistem saat menghubungkan akun. Coba lagi nanti.");
    return;
  }

  await ctx.reply("Berhasil! Akun Telegram Anda sekarang sudah terhubung dengan akun Web FinMe.");
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  const chatId = ctx.chat.id.toString();
  const supabase = createServerClient();

  // 1. Get or create user
  let { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (userError || !user) {
    const fullName = `${ctx.from?.first_name || ""} ${ctx.from?.last_name || ""}`.trim() || null;
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({ email: `user_${chatId}@telegram.local`, telegram_chat_id: chatId, full_name: fullName })
      .select("id")
      .single();
    
    if (createError) {
      await ctx.reply("Gagal membuat akun otomatis. Pastikan tabel di database sudah siap.");
      return;
    }
    user = newUser;
    await ctx.reply("Selamat datang di FinMe! Akun Telegram Anda telah terhubung. Coba ketik pengeluaran pertama Anda (misal: 'beli kopi 25rb').");
    return;
  }

  // 2. Fetch session history
  let { data: session } = await supabase
    .from("ai_chat_sessions")
    .select("id, history, daily_message_count, last_message_date")
    .eq("user_id", user.id)
    .single();

  const todayDate = new Date().toISOString().split('T')[0];

  if (!session) {
    const { data: newSession } = await supabase
      .from("ai_chat_sessions")
      .insert({ 
        user_id: user.id, 
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        history: [],
        daily_message_count: 0,
        last_message_date: todayDate
      })
      .select()
      .single();
    session = newSession;
  }

  // 2.5 Check Rate Limit
  let currentCount = session?.daily_message_count || 0;
  let lastDate = session?.last_message_date || todayDate;

  if (lastDate !== todayDate) {
    currentCount = 0;
    lastDate = todayDate;
  }

  if (currentCount >= 10) {
    await ctx.reply("Maaf, kamu sudah mencapai batas limit 10 pesan AI hari ini. Silakan coba lagi besok ya! 🙏");
    return;
  }

  const history = Array.isArray(session?.history) ? session.history : [];

  // 3. AI Extraction
  const extracted = await extractTransaction(text, history);
  if (!extracted) {
    await ctx.reply("Maaf, saya tidak mengerti. Bisa diperjelas?");
    return;
  }

  let botReply = "";

  // 4. Handle Intents
  try {
    if (extracted.intent === "chat" || extracted.intent === "ask_more_info") {
      botReply = extracted.reply_text || "Maaf, aku kurang paham maksudmu.";
      await ctx.reply(botReply);
    } 
    else if (extracted.intent === "insert" && extracted.transaction) {
      const { amount, category, type, description } = extracted.transaction;
      const { data: inserted, error: insertError } = await supabase.from("transactions").insert({
        user_id: user.id,
        amount: amount || 0,
        category: category || "Lainnya",
        type: type || "expense",
        description: description || "",
        is_manual_web: false,
      }).select("id").single();

      if (insertError) throw insertError;

      const typeText = type === "income" ? "Pemasukan" : "Pengeluaran";
      const rp = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount || 0);
      const shortId = inserted.id.substring(0, 6);
      botReply = `ID: ${shortId}\nTercatat: ${rp} untuk ${category} (${typeText}).\nKeterangan: ${description}`;
      await ctx.reply(botReply);
    } 
    else if (extracted.intent === "query") {
      // Basic query, just fetch last 5 for now to show context awareness
      const { data: items } = await supabase
        .from("transactions")
        .select("id, amount, description, type")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);
        
      if (!items || items.length === 0) {
        botReply = "Belum ada data transaksi.";
      } else {
        botReply = "Berikut beberapa transaksi terakhirmu:\n" + items.map(t => {
          const rp = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(t.amount);
          return `- [${t.id.substring(0,6)}] ${t.description} (${rp})`;
        }).join("\n");
      }
      await ctx.reply(botReply);
    } 
    else if (extracted.intent === "delete" && extracted.transaction?.id) {
      const shortId = extracted.transaction.id;
      const { data: recentTxs } = await supabase
        .from("transactions")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);
      
      const targetId = recentTxs?.find(t => t.id.startsWith(shortId))?.id;

      if (!targetId) {
        botReply = `Gagal menghapus, ID ${shortId} tidak ditemukan.`;
      } else {
        const { error: delError, count } = await supabase
          .from("transactions")
          .delete({ count: 'exact' })
          .eq("id", targetId);
        
        if (delError || count === 0) {
          botReply = `Gagal menghapus, ID ${shortId} tidak ditemukan.`;
        } else {
          botReply = `Sip, transaksi dengan ID ${shortId} berhasil dihapus!`;
        }
      }
      await ctx.reply(botReply);
    } 
    else if (extracted.intent === "edit" && extracted.transaction?.id) {
      const shortId = extracted.transaction.id;
      const updates: any = {};
      if (extracted.transaction.amount) updates.amount = extracted.transaction.amount;
      if (extracted.transaction.category) updates.category = extracted.transaction.category;
      if (extracted.transaction.description) updates.description = extracted.transaction.description;
      
      const { data: recentTxs } = await supabase
        .from("transactions")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);
      
      const targetId = recentTxs?.find(t => t.id.startsWith(shortId))?.id;

      if (!targetId) {
        botReply = `Gagal mengedit, ID ${shortId} tidak ditemukan.`;
      } else {
        const { error: editError } = await supabase
          .from("transactions")
          .update(updates)
          .eq("id", targetId);

        if (editError) {
          botReply = `Gagal mengedit, ID ${shortId} tidak ditemukan.`;
        } else {
          botReply = `Transaksi dengan ID ${shortId} berhasil diupdate!`;
        }
      }
      await ctx.reply(botReply);
    } else {
      botReply = "Maaf, perintah tidak dikenali.";
      await ctx.reply(botReply);
    }
  } catch (err: any) {
    console.error("Bot Handle Error:", err);
    botReply = "Waduh, ada kesalahan sistem saat memproses permintaanmu.";
    await ctx.reply(botReply);
  }

  // 5. Update session history
  if (session && botReply) {
    const newHistory = [
      ...history,
      { role: "user", content: text },
      { role: "assistant", content: botReply }
    ].slice(-10); // Keep last 10 messages

    await supabase
      .from("ai_chat_sessions")
      .update({ 
        history: newHistory,
        daily_message_count: currentCount + 1,
        last_message_date: todayDate
      })
      .eq("id", session.id);
  }
});

bot.on("message:photo", async (ctx) => {
  await ctx.reply("Maaf, saat ini saya baru bisa membaca teks. Yuk, ketik langsung pengeluaranmu!");
});

bot.on("message", async (ctx) => {
  if (!ctx.message.text) {
    await ctx.reply("Maaf, saat ini saya baru bisa membaca teks. Yuk, ketik langsung pengeluaranmu!");
  }
});
