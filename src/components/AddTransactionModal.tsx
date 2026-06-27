"use client";

import { useEffect, useRef } from "react";

export default function AddTransactionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal">
        <div className="modal-header">
          <h2 id="modalTitle">Tambah Transaksi Manual</h2>
          <button className="modal-close" onClick={onClose} aria-label="Tutup modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-subtitle">
            <span className="isolated-badge">Terisolasi</span>
            Data ini tidak memengaruhi saldo utama
          </div>
          <form className="form-grid" aria-label="Form input transaksi manual" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <div className="form-group">
              <label className="form-label" htmlFor="modal-desc">Deskripsi <span style={{color: 'var(--danger)'}} aria-label="wajib diisi">*</span></label>
              <input ref={inputRef} className="form-input" type="text" id="modal-desc" placeholder="Contoh: Makan siang" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="modal-amount">Nominal <span style={{color: 'var(--danger)'}} aria-label="wajib diisi">*</span></label>
              <input className="form-input" type="number" id="modal-amount" placeholder="50000" inputMode="numeric" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="modal-type">Tipe</label>
              <select className="form-input" id="modal-type">
                <option value="expense">Pengeluaran</option>
                <option value="income">Pemasukan</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="modal-category">Kategori</label>
              <select className="form-input" id="modal-category">
                <option value="makanan">Makanan</option>
                <option value="transportasi">Transportasi</option>
                <option value="langganan">Langganan</option>
                <option value="belanja">Belanja</option>
                <option value="lainnya">Lainnya</option>
              </select>
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
