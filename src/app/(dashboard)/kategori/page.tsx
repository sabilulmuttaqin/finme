"use client";

import { useState } from "react";
import AddCategoryModal from "@/components/AddCategoryModal";

export default function Kategori() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<{ name: string } | null>(null);

  const openAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEdit = (name: string) => {
    setEditData({ name });
    setIsModalOpen(true);
  };

  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[14px] transition-all duration-200 cursor-pointer bg-primary text-white border border-primary shadow-[0_1px_2px_rgba(255,107,0,0.1)] hover:bg-primary-hover hover:border-primary-hover hover:shadow-[0_4px_12px_rgba(255,107,0,0.2)] hover:-translate-y-[1px] [&>svg]:w-4 [&>svg]:h-4";

  const categoryCardClass = "bg-surface border border-border rounded-xl p-5 hover:border-primary/30 transition-colors duration-200";
  const catIconClass = "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 [&>svg]:w-6 [&>svg]:h-6";
  const catTypeClass = "inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-medium max-w-max";
  const catTypeExpenseClass = `${catTypeClass} bg-danger-surface text-danger`;
  const catTypeIncomeClass = `${catTypeClass} bg-success-surface text-success`;
  const catTypeAllClass = `${catTypeClass} bg-surface-secondary text-text-secondary`;

  const catActionBtnClass = "w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-surface-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer [&>svg]:w-4 [&>svg]:h-4 bg-transparent border-none";
  const catActionBtnDangerClass = "w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:bg-danger-surface hover:text-danger transition-colors duration-200 cursor-pointer [&>svg]:w-4 [&>svg]:h-4 bg-transparent border-none";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Kelola Kategori</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Tambah, edit, dan atur kategori transaksi</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className={btnPrimaryClass} type="button" onClick={openAdd}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Kategori
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Daftar kategori">

        <article className={categoryCardClass} data-id="1">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(255,107,0,0.08)', color: '#FF6B00'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-text-primary flex items-center gap-2 mb-1 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background: '#FF6B00'}} aria-hidden="true"></span>
                Makanan
              </div>
              <span className={catTypeExpenseClass}>Pengeluaran</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className={catActionBtnClass} type="button" aria-label="Edit kategori Makanan" onClick={() => openEdit("Makanan")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Makanan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Transaksi</span>
              <span className="font-semibold text-text-primary">28 transaksi</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Total bulan ini</span>
              <span className="font-semibold text-text-primary font-mono tabular-nums">Rp1.148.000</span>
            </div>
          </div>
        </article>

        <article className={categoryCardClass} data-id="2">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(255,138,51,0.08)', color: '#FF8A33'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-text-primary flex items-center gap-2 mb-1 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background: '#FF8A33'}} aria-hidden="true"></span>
                Transportasi
              </div>
              <span className={catTypeExpenseClass}>Pengeluaran</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className={catActionBtnClass} type="button" aria-label="Edit kategori Transportasi" onClick={() => openEdit("Transportasi")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Transportasi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Transaksi</span>
              <span className="font-semibold text-text-primary">15 transaksi</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Total bulan ini</span>
              <span className="font-semibold text-text-primary font-mono tabular-nums">Rp721.600</span>
            </div>
          </div>
        </article>

        <article className={categoryCardClass} data-id="3">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(255,179,102,0.08)', color: '#FFB366'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-text-primary flex items-center gap-2 mb-1 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background: '#FFB366'}} aria-hidden="true"></span>
                Langganan
              </div>
              <span className={catTypeExpenseClass}>Pengeluaran</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className={catActionBtnClass} type="button" aria-label="Edit kategori Langganan" onClick={() => openEdit("Langganan")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Langganan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Transaksi</span>
              <span className="font-semibold text-text-primary">4 transaksi</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Total bulan ini</span>
              <span className="font-semibold text-text-primary font-mono tabular-nums">Rp590.400</span>
            </div>
          </div>
        </article>

        <article className={categoryCardClass} data-id="4">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(28,25,23,0.08)', color: '#1C1917'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-text-primary flex items-center gap-2 mb-1 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background: '#1C1917'}} aria-hidden="true"></span>
                Belanja
              </div>
              <span className={catTypeExpenseClass}>Pengeluaran</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className={catActionBtnClass} type="button" aria-label="Edit kategori Belanja" onClick={() => openEdit("Belanja")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Belanja">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Transaksi</span>
              <span className="font-semibold text-text-primary">8 transaksi</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Total bulan ini</span>
              <span className="font-semibold text-text-primary font-mono tabular-nums">Rp492.000</span>
            </div>
          </div>
        </article>

        <article className={categoryCardClass} data-id="5">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(168,162,158,0.08)', color: '#A8A29E'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-text-primary flex items-center gap-2 mb-1 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background: '#A8A29E'}} aria-hidden="true"></span>
                Lainnya
              </div>
              <span className={catTypeAllClass}>Semua</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className={catActionBtnClass} type="button" aria-label="Edit kategori Lainnya" onClick={() => openEdit("Lainnya")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Lainnya">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Transaksi</span>
              <span className="font-semibold text-text-primary">3 transaksi</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Total bulan ini</span>
              <span className="font-semibold text-text-primary font-mono tabular-nums">Rp328.000</span>
            </div>
          </div>
        </article>

        <article className={categoryCardClass} data-id="6">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(22,163,74,0.08)', color: '#16A34A'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-text-primary flex items-center gap-2 mb-1 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background: '#16A34A'}} aria-hidden="true"></span>
                Gaji
              </div>
              <span className={catTypeIncomeClass}>Pemasukan</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className={catActionBtnClass} type="button" aria-label="Edit kategori Gaji" onClick={() => openEdit("Gaji")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Gaji">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Transaksi</span>
              <span className="font-semibold text-text-primary">1 transaksi</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Total bulan ini</span>
              <span className="font-semibold text-text-primary font-mono tabular-nums">Rp5.000.000</span>
            </div>
          </div>
        </article>

        <article className={categoryCardClass} data-id="7">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(22,163,74,0.08)', color: '#16A34A'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[16px] font-semibold text-text-primary flex items-center gap-2 mb-1 truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{background: '#16A34A'}} aria-hidden="true"></span>
                Freelance
              </div>
              <span className={catTypeIncomeClass}>Pemasukan</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className={catActionBtnClass} type="button" aria-label="Edit kategori Freelance" onClick={() => openEdit("Freelance")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Freelance">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Transaksi</span>
              <span className="font-semibold text-text-primary">2 transaksi</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-text-secondary">Total bulan ini</span>
              <span className="font-semibold text-text-primary font-mono tabular-nums">Rp3.500.000</span>
            </div>
          </div>
        </article>

      </section>

      <AddCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialData={editData} />
    </main>
  );
}
