-- Tambah kolom date pada transactions
-- Kolom ini menyimpan tanggal transaksi yang bisa diset custom (berbeda dari created_at)
ALTER TABLE public.transactions
  ADD COLUMN IF NOT EXISTS date DATE NOT NULL DEFAULT CURRENT_DATE;

-- Isi date dari created_at untuk data lama
UPDATE public.transactions
  SET date = created_at::DATE
  WHERE date = CURRENT_DATE AND created_at::DATE <> CURRENT_DATE;
