"use client";

import { useEffect, useRef } from "react";

export default function AddTransactionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Shared classes
  const formGroupClass = "flex flex-col gap-1";
  const formLabelClass = "text-[12px] font-medium text-text-secondary";
  const formInputClass = "px-3 py-2.5 border border-border rounded-sm text-[13px] bg-surface text-text-primary transition-colors duration-150 min-h-[44px] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-surface placeholder:text-text-tertiary";
  const btnClass = "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-medium transition-colors duration-150 min-h-[44px] cursor-pointer";
  const selectClass = `${formInputClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2216%22_height=%2216%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2357534E%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3E%3Cpolyline_points=%226_9_12_15_18_9%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_10px_center] pr-8`;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 opacity-100" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-surface rounded-2xl w-full max-w-[480px] shadow-lg transform transition-transform duration-200 translate-y-0 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pt-5 px-6 pb-0">
          <h2 id="modalTitle" className="text-[17px] font-semibold">Tambah Transaksi Manual</h2>
          <button className="w-9 h-9 rounded-sm flex items-center justify-center text-text-tertiary transition-colors duration-150 hover:bg-surface-secondary hover:text-text-primary border-none bg-transparent cursor-pointer" onClick={onClose} aria-label="Tutup modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="pt-5 px-6 pb-6">
          <div className="text-[12px] text-text-tertiary mb-5 flex items-center gap-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-warning-surface text-warning uppercase tracking-[0.04em]">Terisolasi</span>
            Data ini tidak memengaruhi saldo utama
          </div>
          <form className="grid grid-cols-2 gap-3" aria-label="Form input transaksi manual" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="modal-desc">Deskripsi <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input ref={inputRef} className={formInputClass} type="text" id="modal-desc" placeholder="Contoh: Makan siang" required />
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="modal-amount">Nominal <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input className={formInputClass} type="number" id="modal-amount" placeholder="50000" inputMode="numeric" required />
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="modal-type">Tipe</label>
              <select className={selectClass} id="modal-type">
                <option value="expense">Pengeluaran</option>
                <option value="income">Pemasukan</option>
              </select>
            </div>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="modal-category">Kategori</label>
              <select className={selectClass} id="modal-category">
                <option value="makanan">Makanan</option>
                <option value="transportasi">Transportasi</option>
                <option value="langganan">Langganan</option>
                <option value="belanja">Belanja</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div className="col-span-full flex justify-end gap-2 mt-1">
              <button className={`${btnClass} bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary`} type="button" onClick={onClose}>Batal</button>
              <button className={`${btnClass} bg-primary text-white border-none hover:bg-primary-dark`} type="submit">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
