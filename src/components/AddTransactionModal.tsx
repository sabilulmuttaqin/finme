"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import { CustomSelect, type DropdownOption } from "@/components/CustomSelect";

// Helper: format tanggal lokal ke YYYY-MM-DD untuk input[type=date]
const toLocalDateValue = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

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

export default function AddTransactionModal({ isOpen, onClose, initialData }: { isOpen: boolean, onClose: (msg?: string) => void, initialData?: any }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [wallet, setWallet] = useState("Cash");
  const [txDate, setTxDate] = useState(toLocalDateValue(new Date()));
  const [categories, setCategories] = useState<{name: string, type: string}[]>([]);
  const [wallets, setWallets] = useState<{name: string}[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  // Shared classes
  const formGroupClass = "flex flex-col gap-1";
  const formLabelClass = "text-[12px] font-medium text-text-secondary";
  const formInputClass = "px-3 py-2.5 border border-border rounded-sm text-[13px] bg-surface text-text-primary transition-colors duration-150 min-h-[44px] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-surface placeholder:text-text-tertiary";
  const btnClass = "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-medium transition-colors duration-150 min-h-[44px] cursor-pointer";
  const selectClass = `${formInputClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2216%22_height=%2216%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2357534E%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3E%3Cpolyline_points=%226_9_12_15_18_9%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_10px_center] pr-8`;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setDesc(initialData.description || "");
        setAmount(initialData.amount ? initialData.amount.toString() : "");
        setCategory(initialData.category || "");
        setWallet(initialData.wallet || "Cash");
        // Jika ada kolom date di data, gunakan itu; fallback ke created_at
        const rawDate = initialData.date || initialData.created_at;
        setTxDate(rawDate ? rawDate.slice(0, 10) : toLocalDateValue(new Date()));
      } else {
        setDesc("");
        setAmount("");
        setCategory("");
        setWallet("Cash");
        setTxDate(toLocalDateValue(new Date()));
      }
      
      const fetchCategoriesAndWallets = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) return;

        const [catRes, walRes] = await Promise.all([
          supabase.from('categories').select('name, type').eq('user_id', authUser.id),
          supabase.from('wallets').select('name').eq('user_id', authUser.id)
        ]);
        
        let data = catRes.data;

        if (data && data.length > 0) {
          setCategories(data);
          if (!initialData || !initialData.category) {
            setCategory(data[0].name);
          }
        }
        
        if (walRes.data && walRes.data.length > 0) {
          setWallets(walRes.data);
          if (!initialData || !initialData.wallet) {
            setWallet(walRes.data[0].name);
          }
        } else {
          setWallets([{name: "Cash"}]);
        }
      };
      
      fetchCategoriesAndWallets();
      if (inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 200);
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      if (initialData) {
        const { error } = await supabase.from('transactions').update({
          description: desc,
          amount: Number(amount),
          type: categories.find(c => c.name === category)?.type || "expense",
          category: category || "Lainnya",
          wallet: wallet || "Cash",
          date: txDate,
        }).eq('id', initialData.id);
        if (error) throw error;
        onClose("Transaksi berhasil diperbarui!");
      } else {
        const { error } = await supabase.from('transactions').insert([{
          user_id: user.id,
          description: desc,
          amount: Number(amount),
          type: categories.find(c => c.name === category)?.type || "expense",
          category: category || "Lainnya",
          wallet: wallet || "Cash",
          date: txDate,
          is_manual_web: true
        }]);
        if (error) throw error;
        onClose("Transaksi manual berhasil ditambahkan!");
      }
    } catch (err: any) {
      alert("Gagal menambah transaksi: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 opacity-100" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-surface rounded-2xl w-full max-w-[480px] shadow-lg transform transition-transform duration-200 translate-y-0 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pt-5 px-6 pb-0">
          <h2 id="modalTitle" className="text-[17px] font-semibold">{initialData ? "Edit Transaksi" : "Tambah Transaksi Manual"}</h2>
          <button className="w-9 h-9 rounded-sm flex items-center justify-center text-text-tertiary transition-colors duration-150 hover:bg-surface-secondary hover:text-text-primary border-none bg-transparent cursor-pointer" onClick={() => onClose()} aria-label="Tutup modal">
            <CloseIcon className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="pt-5 px-6 pb-6">
          
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Form input transaksi manual" onSubmit={handleSubmit}>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="modal-desc">Deskripsi <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input ref={inputRef} className={formInputClass} type="text" id="modal-desc" placeholder="Contoh: Makan siang" value={desc} onChange={(e) => setDesc(e.target.value)} required />
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="modal-amount">Nominal <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input className={formInputClass} type="number" id="modal-amount" placeholder="50000" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className={`${formGroupClass} col-span-full`}>
              <label className={formLabelClass} htmlFor="modal-date">Tanggal Transaksi <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input
                className={formInputClass}
                type="date"
                id="modal-date"
                value={txDate}
                max={toLocalDateValue(new Date())}
                onChange={(e) => setTxDate(e.target.value)}
                required
              />
            </div>
            <div className={`${formGroupClass} col-span-1`}>
              <label className={formLabelClass} htmlFor="modal-category">Kategori</label>
              <CustomSelect
                id="modal-category"
                value={category}
                onChange={setCategory}
                disabled={categories.length === 0}
                placeholder="Pilih kategori"
                options={categories.map(c => ({
                  value: c.name,
                  label: c.name,
                  sublabel: c.type === 'income' ? 'Pemasukan' : 'Pengeluaran'
                } as DropdownOption))}
              />
            </div>
            <div className={`${formGroupClass} col-span-1`}>
              <label className={formLabelClass} htmlFor="modal-wallet">Dompet</label>
              <CustomSelect
                id="modal-wallet"
                value={wallet}
                onChange={setWallet}
                placeholder="Pilih dompet"
                options={wallets.map(w => ({ value: w.name, label: w.name } as DropdownOption))}
              />
            </div>
            <div className="col-span-full flex flex-col gap-2 mt-1">
              {categories.length === 0 && (
                <div className="text-[12px] text-danger bg-danger-surface px-3 py-2 rounded-sm border border-danger/20">
                  Anda belum memiliki kategori. Silakan buat kategori di halaman Anggaran terlebih dahulu.
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button className={`${btnClass} bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary`} type="button" onClick={() => onClose()} disabled={isSaving}>Batal</button>
                <button className={`${btnClass} bg-primary text-white border-none hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed`} type="submit" disabled={isSaving || categories.length === 0}>
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
