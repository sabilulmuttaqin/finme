"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PlusIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon, TrendingUpIcon, EditIcon, TrashIcon, LaptopIcon } from "@/components/icons";

const AddCategoryModal = dynamic(() => import("@/components/AddCategoryModal"), { ssr: false });

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
            <PlusIcon aria-hidden="true" />
            Tambah Kategori
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Daftar kategori">

        <article className={categoryCardClass} data-id="1">
          <div className="flex items-start gap-4 mb-6">
            <div className={catIconClass} style={{background: 'rgba(255,107,0,0.08)', color: '#FF6B00'}} aria-hidden="true">
              <CoffeeIcon />
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
                <EditIcon />
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Makanan">
                <TrashIcon />
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
              <TruckIcon />
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
                <EditIcon />
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Transportasi">
                <TrashIcon />
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
              <BookIcon />
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
                <EditIcon />
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Langganan">
                <TrashIcon />
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
              <CartIcon />
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
                <EditIcon />
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Belanja">
                <TrashIcon />
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
                <EditIcon />
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Lainnya">
                <TrashIcon />
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
              <TrendingUpIcon />
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
                <EditIcon />
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Gaji">
                <TrashIcon />
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
              <LaptopIcon />
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
                <EditIcon />
              </button>
              <button className={catActionBtnDangerClass} type="button" aria-label="Hapus kategori Freelance">
                <TrashIcon />
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
