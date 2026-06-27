import { Bot, webhookCallback } from "grammy";
import { extractTransaction } from "../ai/extractor";
import { createServerClient } from "../supabase/server";

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  const chatId = ctx.chat.id.toString();

  // 1. Dapatkan user dari database berdasarkan chat_id
  const supabase = createServerClient();
  let { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (userError || !user) {
    // Auto-register first user
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({ email: `user_${chatId}@telegram.local`, telegram_chat_id: chatId })
      .select("id")
      .single();
    
    if (createError) {
      await ctx.reply("Gagal membuat akun otomatis. Pastikan tabel di database sudah siap.");
      return;
    }
    user = newUser;
    await ctx.reply("Selamat datang di FinMe! Akun Telegram Anda telah terhubung. Coba ketik pengeluaran pertama Anda (misal: 'beli kopi 25rb').");
    return; // Don't process the first message as a transaction to give them a welcome greeting
  }

  // 2. Ekstrak transaksi menggunakan Groq AI
  const extracted = await extractTransaction(text);
  if (!extracted) {
    await ctx.reply("Maaf, saya tidak mengerti format transaksinya. Coba ketik seperti: 'makan siang 50rb'");
    return;
  }

  // 3. Simpan transaksi ke Supabase
  const { error: insertError } = await supabase.from("transactions").insert({
    user_id: user.id,
    amount: extracted.amount,
    category: extracted.category,
    type: extracted.type,
    description: extracted.description,
    is_manual_web: false,
  });

  if (insertError) {
    console.error("Gagal simpan:", insertError);
    await ctx.reply("Waduh, gagal menyimpan transaksi ke database. Coba lagi nanti ya.");
    return;
  }

  // 4. Beri feedback sukses ke Telegram
  const typeText = extracted.type === "income" ? "Pemasukan" : "Pengeluaran";
  const rp = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(extracted.amount);
  
  await ctx.reply(`Tercatat: ${rp} untuk ${extracted.category} (${typeText}).\nKeterangan: ${extracted.description}`);
});

// Fallback untuk media non-teks
bot.on("message:photo", async (ctx) => {
  await ctx.reply("Maaf, saat ini saya baru bisa membaca teks. Yuk, ketik langsung pengeluaranmu!");
});

bot.on("message", async (ctx) => {
  if (!ctx.message.text) {
    await ctx.reply("Maaf, saat ini saya baru bisa membaca teks. Yuk, ketik langsung pengeluaranmu!");
  }
});
