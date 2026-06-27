"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon, TrendingUpIcon, LaptopIcon, HomeIcon, HeartIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

const COLORS = [
  "#FF6B00", "#FF8A33", "#FFB366", "#DC2626", "#16A34A",
  "#2563EB", "#9333EA", "#1C1917", "#D97706", "#A8A29E"
];

const ICONS = [
  { id: "coffee", svg: <CoffeeIcon /> },
  { id: "truck", svg: <TruckIcon /> },
  { id: "book", svg: <BookIcon /> },
  { id: "cart", svg: <CartIcon /> },
  { id: "trending", svg: <TrendingUpIcon /> },
  { id: "laptop", svg: <LaptopIcon /> },
  { id: "home", svg: <HomeIcon /> },
  { id: "heart", svg: <HeartIcon /> },
];

export default function AddCategoryModal({ isOpen, onClose, initialData }: { isOpen: boolean, onClose: (successMsg?: string) => void, initialData?: { name: string } | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0].id);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  // Shared classes
  const formGroupClass = "flex flex-col gap-1.5 mb-4";
  const formLabelClass = "text-[12px] font-medium text-text-secondary";
  const formInputClass = "px-3 py-2.5 border border-border rounded-sm text-[13px] bg-surface text-text-primary transition-colors duration-150 min-h-[44px] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-surface placeholder:text-text-tertiary";
  const btnClass = "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-medium transition-colors duration-150 min-h-[44px] cursor-pointer";

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
      } else {
        setName("");
      }
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 opacity-100" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-surface rounded-2xl w-full max-w-[520px] shadow-lg transform transition-transform duration-200 translate-y-0 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pt-5 px-6 pb-0">
          <h2 id="modalTitle" className="text-[17px] font-semibold">{initialData ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
          <button className="w-9 h-9 rounded-sm flex items-center justify-center text-text-tertiary transition-colors duration-150 hover:bg-surface-secondary hover:text-text-primary border-none bg-transparent cursor-pointer" onClick={() => onClose()} aria-label="Tutup modal">
            <CloseIcon className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="pt-5 px-6 pb-6">
          <form aria-label="Form kategori" onSubmit={async (e) => {
            e.preventDefault();
            setIsSaving(true);
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) throw new Error("User not found");

              if (initialData) {
                const { error } = await supabase.from('categories').update({
                  name: name.toLowerCase(),
                  type,
                  color: selectedColor,
                  icon: selectedIcon
                }).eq('user_id', user.id).eq('name', initialData.name.toLowerCase());
                if (error) throw error;
                onClose("Kategori berhasil diperbarui!");
              } else {
                const { error } = await supabase.from('categories').insert([{
                  user_id: user.id,
                  name: name.toLowerCase(),
                  type,
                  color: selectedColor,
                  icon: selectedIcon
                }]);
                if (error) throw error;
                onClose("Kategori berhasil ditambahkan!");
              }
            } catch (err: any) {
              alert("Gagal menyimpan kategori: " + err.message);
            } finally {
              setIsSaving(false);
            }
          }}>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="cat-name">Nama Kategori <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input ref={inputRef} className={formInputClass} type="text" id="cat-name" placeholder="Contoh: Hiburan" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="cat-type">Tipe</label>
              <select 
                className={`${formInputClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2216%22_height=%2216%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2357534E%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3E%3Cpolyline_points=%226_9_12_15_18_9%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_10px_center] pr-8`} 
                id="cat-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="expense">Pengeluaran</option>
                <option value="income">Pemasukan</option>
                <option value="all">Semua</option>
              </select>
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass}>Warna</label>
              <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Pilih warna kategori">
                {COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform duration-150 relative hover:scale-110 ${selectedColor === color ? 'border-text-primary shadow-[0_0_0_2px_var(--color-surface),0_0_0_4px_var(--color-text-primary)] after:content-[\'\'] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2.5 after:h-2.5 after:rounded-full after:bg-surface' : 'border-transparent'}`}
                    style={{background: color}}
                    role="radio"
                    aria-checked={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass}>Ikon</label>
              <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Pilih ikon kategori">
                {ICONS.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    className={`w-full aspect-square rounded-sm border-2 flex items-center justify-center cursor-pointer transition-colors duration-150 [&>svg]:w-5 [&>svg]:h-5 ${selectedIcon === icon.id ? 'border-primary text-primary bg-primary-surface' : 'border-border text-text-secondary hover:border-primary-light hover:text-primary hover:bg-primary-surface'}`}
                    role="radio"
                    aria-checked={selectedIcon === icon.id}
                    onClick={() => setSelectedIcon(icon.id)}
                  >
                    {icon.svg}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button className={`${btnClass} bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary`} type="button" onClick={() => onClose()} disabled={isSaving}>Batal</button>
              <button className={`${btnClass} bg-primary text-white border-none hover:bg-primary-dark`} type="submit" disabled={isSaving}>
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
