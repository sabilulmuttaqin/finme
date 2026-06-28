-- Menambahkan kolom full_name ke tabel users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS full_name TEXT;
