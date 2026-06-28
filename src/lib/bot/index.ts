import { Bot, webhookCallback } from "grammy";
import { extractTransaction } from "../ai/extractor";
import { createServerClient } from "../supabase/server";

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

// Kategori default (fallback jika user belum buat kategori)
const DEFAULT_CATEGORIES = [
  { name: "Makanan", type: "expense" },
  { name: "Transportasi", type: "expense" },
  { name: "Hiburan", type: "expense" },
  { name: "Langganan", type: "expense" },
  { name: "Belanja", type: "expense" },
  { name: "Kesehatan", type: "expense" },
  { name: "Pendidikan", type: "expense" },
  { name: "Pemasukan", type: "income" },
  { name: "Lainnya", type: "expense" },
];

/** Pastikan user punya kategori default, seed jika kosong */
async function ensureDefaultCategories(supabase: any, userId: string) {
  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("user_id", userId)
    .limit(1);

  if (!existing || existing.length === 0) {
    await supabase.from("categories").insert(
      DEFAULT_CATEGORIES.map((c) => ({ ...c, user_id: userId }))
    );
  }
}

/** Hitung rentang tanggal dari string seperti "today", "yesterday", "this_week" */
function getDateRange(dateStr?: string): { from?: string; to?: string } {
  // Gunakan waktu lokal WIB (UTC+7)
  const nowUtc = new Date();
  const wibOffset = 7 * 60 * 60 * 1000;
  const now = new Date(nowUtc.getTime() + wibOffset);

  const toISO = (d: Date) => d.toISOString().replace('Z', '+07:00');

  const startOfDay = (d: Date) => {
    const s = new Date(d);
    s.setUTCHours(0, 0, 0, 0);
    return s;
  };
  const endOfDay = (d: Date) => {
    const s = new Date(d);
    s.setUTCHours(23, 59, 59, 999);
    return s;
  };

  if (!dateStr || dateStr === "today" || dateStr === "hari_ini") {
    return { from: toISO(startOfDay(now)), to: toISO(endOfDay(now)) };
  }
  if (dateStr === "yesterday" || dateStr === "kemarin") {
    const yest = new Date(now.getTime() - 86400000);
    return { from: toISO(startOfDay(yest)), to: toISO(endOfDay(yest)) };
  }
  if (dateStr === "this_week" || dateStr === "minggu_ini") {
    // Ambil 7 hari terakhir (sampai hari ini)
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    return { from: toISO(startOfDay(weekAgo)), to: toISO(endOfDay(now)) };
  }
  if (dateStr === "last_week" || dateStr === "minggu_lalu") {
    // Ambil hari ke 8 sampai ke 14 yang lalu
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 86400000);
    return { from: toISO(startOfDay(twoWeeksAgo)), to: toISO(endOfDay(weekAgo)) };
  }
  if (dateStr === "this_month" || dateStr === "bulan_ini") {
    const startMonth = new Date(now);
    startMonth.setUTCDate(1);
    startMonth.setUTCHours(0, 0, 0, 0);
    return { from: toISO(startMonth), to: toISO(endOfDay(now)) };
  }
  // Coba parse tanggal spesifik (format YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const d = new Date(dateStr + 'T00:00:00+07:00');
    return { from: toISO(startOfDay(d)), to: toISO(endOfDay(d)) };
  }
  // Tidak dikenal → kembalikan kosong (tampil semua)
  return {};
}

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

bot.command("start", async (ctx) => {
  const firstName = ctx.from?.first_name || "";
  await ctx.reply(
`Halo${firstName ? " " + firstName : ""}! Selamat datang di *FinMe Bot*. 👋

Aku siap bantu kamu mencatat keuangan harian dengan mudah.
Ketik /help untuk melihat panduan lengkap pemakaian.`,
    { parse_mode: "Markdown" }
  );
});

bot.command("help", async (ctx) => {
  await ctx.reply(
`📖 *Panduan Pemakaian FinMe Bot*

━━━━━━━━━━━━━━━━━━━━━
📝 *MENCATAT TRANSAKSI*
Ketik pengeluaran atau pemasukan secara natural:

- beli kopi 25rb
- makan siang 35.000
- gaji masuk 5jt
- kemarin nonton bioskop 50rb
- bensin 20rb tadi pagi

━━━━━━━━━━━━━━━━━━━━━
🔍 *MELIHAT TRANSAKSI*
- tampilkan transaksi hari ini
- lihat pengeluaran kemarin
- transaksi minggu ini
- transaksi bulan ini

━━━━━━━━━━━━━━━━━━━━━
✏️ *EDIT TRANSAKSI*
Gunakan ID pendek (6 karakter) yang muncul saat mencatat:

1. Ketik: edit a1b2c3
2. Bot tampilkan detail transaksi
3. Balas dengan perubahan:
   - ganti deskripsi jadi makan malam
   - ubah jumlah jadi 50000
   - kategori jadi Transportasi

━━━━━━━━━━━━━━━━━━━━━
🗑️ *HAPUS TRANSAKSI*
- hapus a1b2c3

━━━━━━━━━━━━━━━━━━━━━
🏷️ *KATEGORI TERSEDIA*
Makanan, Transportasi, Hiburan, Langganan, Belanja, Kesehatan, Pendidikan, Pemasukan, Lainnya

━━━━━━━━━━━━━━━━━━━━━
🔗 *HUBUNGKAN KE WEB*
Buka FinMe Web, lalu Pengaturan, salin kode OTP
Ketik: /link KODE-OTP

⚠️ Batas: *20 pesan AI per hari*

💡 *Tips:* Sebut tanggal relatif seperti "kemarin" atau "tadi pagi" dan AI akan otomatis menyesuaikan tanggal transaksi!`,
    { parse_mode: "Markdown" }
  );
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;

  // Skip jika pesan adalah command (mulai dengan /) — sudah ditangani handler khusus
  if (text.startsWith("/")) return;

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
    // Seed kategori default untuk user baru
    await ensureDefaultCategories(supabase, user.id);
    await ctx.reply("Selamat datang di FinMe! Akun Telegram Anda telah terhubung. Coba ketik pengeluaran pertama Anda (misal: 'beli kopi 25rb').");
    return;
  }

  // Pastikan user lama juga punya kategori default
  await ensureDefaultCategories(supabase, user.id);

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

  if (currentCount >= 20) {
    await ctx.reply("Maaf, kamu sudah mencapai batas limit 20 pesan AI hari ini. Silakan coba lagi besok ya! 🙏");
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
      const { amount, category, type, description, date, wallet } = extracted.transaction;

      // Tentukan tanggal: pakai date dari AI jika ada, fallback ke hari ini (WIB)
      const txDate = date || new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);

      const { data: inserted, error: insertError } = await supabase.from("transactions").insert({
        user_id: user.id,
        amount: amount || 0,
        category: category || "Lainnya",
        type: type || "expense",
        description: description || "",
        wallet: wallet || "Cash",
        date: txDate,
        is_manual_web: false,
      }).select("id").single();

      if (insertError) throw insertError;

      const typeText = type === "income" ? "Pemasukan" : "Pengeluaran";
      const rp = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount || 0);
      const shortId = inserted.id.substring(0, 6);
      const dateLabel = new Date(txDate + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });
      botReply = `✅ Tercatat!\nID: ${shortId}\nTanggal: ${dateLabel}\nJumlah: ${rp} (${typeText})\nKategori: ${category}\nDompet: ${wallet || "Cash"}\nDeskripsi: ${description}`;
      await ctx.reply(botReply);
    } 
    else if (extracted.intent === "query") {
      // Filter berdasarkan kolom date
      const dateRange = getDateRange(extracted.query?.date);
      
      let q = supabase
        .from("transactions")
        .select("id, amount, description, type, category, date")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(10);

      // Filter menggunakan kolom date (YYYY-MM-DD)
      if (dateRange.from) q = q.gte("date", dateRange.from.slice(0, 10));
      if (dateRange.to) q = q.lte("date", dateRange.to.slice(0, 10));

      const { data: items } = await q;
        
      if (!items || items.length === 0) {
        const periodeMap: Record<string, string> = {
          today: "hari ini", hari_ini: "hari ini",
          yesterday: "kemarin", kemarin: "kemarin",
          this_week: "minggu ini", minggu_ini: "minggu ini",
          last_week: "minggu lalu", minggu_lalu: "minggu lalu",
          this_month: "bulan ini", bulan_ini: "bulan ini",
        };
        const periodeLabel = periodeMap[extracted.query?.date || ""] || "periode tersebut";
        botReply = `Belum ada transaksi untuk ${periodeLabel}.`;
      } else {
        const rp = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
        botReply = "Berikut transaksimu:\n" + items.map(t =>
          `- [${t.id.substring(0,6)}] ${t.description || t.category} (${rp(t.amount)})`
        ).join("\n");
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
      const hasChanges = extracted.transaction.amount || extracted.transaction.category || extracted.transaction.description || extracted.transaction.wallet;

      const { data: recentTxs } = await supabase
        .from("transactions")
        .select("id, description, amount, category, type, wallet")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);
      
      const targetTx = recentTxs?.find((t: any) => t.id.startsWith(shortId));

      if (!targetTx) {
        botReply = `Transaksi dengan ID ${shortId} tidak ditemukan.`;
        await ctx.reply(botReply);
      } else if (!hasChanges) {
        // Tampilkan detail transaksi dulu, lalu minta instruksi spesifik
        const rp = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(targetTx.amount);
        const typeLabel = targetTx.type === "income" ? "Pemasukan" : "Pengeluaran";
        botReply = `Detail transaksi [${shortId}]:\n📝 ${targetTx.description || "-"}\n🏷️ ${targetTx.category}\n💳 ${targetTx.wallet || "Cash"}\n💰 ${rp} (${typeLabel})\n\nMau diubah apa? Contoh:\n• "ganti deskripsi jadi makan siang"\n• "ubah jumlah jadi 30000"\n• "ubah dompet jadi gopay"`;
        await ctx.reply(botReply);
      } else {
        // Ada perubahan langsung dari AI, eksekusi update
        const updates: any = {};
        if (extracted.transaction.amount) updates.amount = extracted.transaction.amount;
        if (extracted.transaction.category) updates.category = extracted.transaction.category;
        if (extracted.transaction.description) updates.description = extracted.transaction.description;
        if (extracted.transaction.wallet) updates.wallet = extracted.transaction.wallet;

        const { error: editError } = await supabase
          .from("transactions")
          .update(updates)
          .eq("id", targetTx.id);

        if (editError) {
          botReply = `Gagal mengedit transaksi [${shortId}].`;
        } else {
          const changedFields: string[] = [];
          if (updates.description) changedFields.push(`deskripsi → "${updates.description}"`);
          if (updates.category) changedFields.push(`kategori → ${updates.category}`);
          if (updates.amount) changedFields.push(`jumlah → Rp${updates.amount.toLocaleString('id-ID')}`);
          if (updates.wallet) changedFields.push(`dompet → ${updates.wallet}`);
          botReply = `✅ Transaksi [${shortId}] berhasil diupdate!\n${changedFields.join('\n')}`;
        }
        await ctx.reply(botReply);
      }
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
