-- Menambahkan kolom untuk sinkronisasi Telegram via OTP
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS telegram_sync_token TEXT,
ADD COLUMN IF NOT EXISTS telegram_sync_token_expires TIMESTAMPTZ;
