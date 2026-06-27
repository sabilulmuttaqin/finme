-- Jalankan ini di SQL Editor jika ada user yang terlanjur 
-- mendaftar SEBELUM Trigger dibuat, sehingga datanya 
-- belum masuk ke tabel public.users.

INSERT INTO public.users (id, email)
SELECT id, email
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);
