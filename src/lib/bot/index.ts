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
  
  // Find web user with this OTP
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

  // Clear chatId from any temporary users to avoid UNIQUE constraint violation
  await supabase
    .from("users")
    .update({ telegram_chat_id: null })
    .eq("telegram_chat_id", chatId);

  // Link to the web user
  const { error: updateError } = await supabase
    .from("users")
    .update({ 
      telegram_chat_id: chatId,
      telegram_sync_token: null,
      telegram_sync_token_expires: null
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

  // TODO: Implement OTP Link to sync Telegram and Web accounts.
  // Bypass category check temporarily until OTP feature is done.

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
