"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#FF6B00", "#FF8A33", "#FFB366", "#DC2626", "#16A34A",
  "#2563EB", "#9333EA", "#1C1917", "#D97706", "#A8A29E"
];

const ICONS = [
  { id: "coffee", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { id: "truck", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { id: "book", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { id: "cart", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> },
  { id: "trending", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { id: "laptop", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg> },
  { id: "home", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "heart", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
];

export default function AddCategoryModal({ isOpen, onClose, initialData }: { isOpen: boolean, onClose: () => void, initialData?: { name: string } | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0].id);
  const [name, setName] = useState("");

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
          <button className="w-9 h-9 rounded-sm flex items-center justify-center text-text-tertiary transition-colors duration-150 hover:bg-surface-secondary hover:text-text-primary border-none bg-transparent cursor-pointer" onClick={onClose} aria-label="Tutup modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="pt-5 px-6 pb-6">
          <form aria-label="Form kategori" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="cat-name">Nama Kategori <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input ref={inputRef} className={formInputClass} type="text" id="cat-name" placeholder="Contoh: Hiburan" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="cat-type">Tipe</label>
              <select className={`${formInputClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2216%22_height=%2216%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2357534E%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3E%3Cpolyline_points=%226_9_12_15_18_9%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_10px_center] pr-8`} id="cat-type">
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
              <button className={`${btnClass} bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary`} type="button" onClick={onClose}>Batal</button>
              <button className={`${btnClass} bg-primary text-white border-none hover:bg-primary-dark`} type="submit">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
