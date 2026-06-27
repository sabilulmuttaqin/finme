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
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal">
        <div className="modal-header">
          <h2 id="modalTitle">{initialData ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Tutup modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <form aria-label="Form kategori" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="form-group">
              <label className="form-label" htmlFor="cat-name">Nama Kategori <span style={{color: 'var(--danger)'}} aria-label="wajib diisi">*</span></label>
              <input ref={inputRef} className="form-input" type="text" id="cat-name" placeholder="Contoh: Hiburan" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cat-type">Tipe</label>
              <select className="form-input" id="cat-type">
                <option value="expense">Pengeluaran</option>
                <option value="income">Pemasukan</option>
                <option value="all">Semua</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Warna</label>
              <div className="color-picker" role="radiogroup" aria-label="Pilih warna kategori">
                {COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{background: color}}
                    role="radio"
                    aria-checked={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Ikon</label>
              <div className="icon-grid" role="radiogroup" aria-label="Pilih ikon kategori">
                {ICONS.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    className={`icon-option ${selectedIcon === icon.id ? 'selected' : ''}`}
                    role="radio"
                    aria-checked={selectedIcon === icon.id}
                    onClick={() => setSelectedIcon(icon.id)}
                  >
                    {icon.svg}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-ghost" type="button" onClick={onClose}>Batal</button>
              <button className="btn btn-primary" type="submit">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
