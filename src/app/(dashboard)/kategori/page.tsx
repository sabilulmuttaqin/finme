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

  return (
    <main className="main" id="main-content">
      <header className="header">
        <div className="header-left">
          <h1>Kelola Kategori</h1>
          <p>Tambah, edit, dan atur kategori transaksi</p>
        </div>
        <div className="header-right">
          <button className="btn btn-primary" type="button" onClick={openAdd}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Kategori
          </button>
        </div>
      </header>

      <section className="category-grid" aria-label="Daftar kategori">

        <article className="category-card" data-id="1">
          <div className="cat-header">
            <div className="cat-icon" style={{background: 'rgba(255,107,0,0.08)', color: '#FF6B00'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            </div>
            <div className="cat-info">
              <div className="cat-name">
                <span className="cat-color-dot" style={{background: '#FF6B00'}} aria-hidden="true"></span>
                Makanan
              </div>
              <span className="cat-type expense">Pengeluaran</span>
            </div>
            <div className="cat-actions">
              <button className="cat-action-btn" type="button" aria-label="Edit kategori Makanan" onClick={() => openEdit("Makanan")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="cat-action-btn danger" type="button" aria-label="Hapus kategori Makanan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="cat-stats">
            <div className="cat-stat">
              <span className="cat-stat-label">Transaksi</span>
              <span className="cat-stat-value">28 transaksi</span>
            </div>
            <div className="cat-stat">
              <span className="cat-stat-label">Total bulan ini</span>
              <span className="cat-stat-value mono">Rp1.148.000</span>
            </div>
          </div>
        </article>

        <article className="category-card" data-id="2">
          <div className="cat-header">
            <div className="cat-icon" style={{background: 'rgba(255,138,51,0.08)', color: '#FF8A33'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div className="cat-info">
              <div className="cat-name">
                <span className="cat-color-dot" style={{background: '#FF8A33'}} aria-hidden="true"></span>
                Transportasi
              </div>
              <span className="cat-type expense">Pengeluaran</span>
            </div>
            <div className="cat-actions">
              <button className="cat-action-btn" type="button" aria-label="Edit kategori Transportasi" onClick={() => openEdit("Transportasi")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="cat-action-btn danger" type="button" aria-label="Hapus kategori Transportasi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="cat-stats">
            <div className="cat-stat">
              <span className="cat-stat-label">Transaksi</span>
              <span className="cat-stat-value">15 transaksi</span>
            </div>
            <div className="cat-stat">
              <span className="cat-stat-label">Total bulan ini</span>
              <span className="cat-stat-value mono">Rp721.600</span>
            </div>
          </div>
        </article>

        <article className="category-card" data-id="3">
          <div className="cat-header">
            <div className="cat-icon" style={{background: 'rgba(255,179,102,0.08)', color: '#FFB366'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div className="cat-info">
              <div className="cat-name">
                <span className="cat-color-dot" style={{background: '#FFB366'}} aria-hidden="true"></span>
                Langganan
              </div>
              <span className="cat-type expense">Pengeluaran</span>
            </div>
            <div className="cat-actions">
              <button className="cat-action-btn" type="button" aria-label="Edit kategori Langganan" onClick={() => openEdit("Langganan")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="cat-action-btn danger" type="button" aria-label="Hapus kategori Langganan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="cat-stats">
            <div className="cat-stat">
              <span className="cat-stat-label">Transaksi</span>
              <span className="cat-stat-value">4 transaksi</span>
            </div>
            <div className="cat-stat">
              <span className="cat-stat-label">Total bulan ini</span>
              <span className="cat-stat-value mono">Rp590.400</span>
            </div>
          </div>
        </article>

        <article className="category-card" data-id="4">
          <div className="cat-header">
            <div className="cat-icon" style={{background: 'rgba(28,25,23,0.08)', color: '#1C1917'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <div className="cat-info">
              <div className="cat-name">
                <span className="cat-color-dot" style={{background: '#1C1917'}} aria-hidden="true"></span>
                Belanja
              </div>
              <span className="cat-type expense">Pengeluaran</span>
            </div>
            <div className="cat-actions">
              <button className="cat-action-btn" type="button" aria-label="Edit kategori Belanja" onClick={() => openEdit("Belanja")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="cat-action-btn danger" type="button" aria-label="Hapus kategori Belanja">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="cat-stats">
            <div className="cat-stat">
              <span className="cat-stat-label">Transaksi</span>
              <span className="cat-stat-value">8 transaksi</span>
            </div>
            <div className="cat-stat">
              <span className="cat-stat-label">Total bulan ini</span>
              <span className="cat-stat-value mono">Rp492.000</span>
            </div>
          </div>
        </article>

        <article className="category-card" data-id="5">
          <div className="cat-header">
            <div className="cat-icon" style={{background: 'rgba(168,162,158,0.08)', color: '#A8A29E'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <div className="cat-info">
              <div className="cat-name">
                <span className="cat-color-dot" style={{background: '#A8A29E'}} aria-hidden="true"></span>
                Lainnya
              </div>
              <span className="cat-type all">Semua</span>
            </div>
            <div className="cat-actions">
              <button className="cat-action-btn" type="button" aria-label="Edit kategori Lainnya" onClick={() => openEdit("Lainnya")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="cat-action-btn danger" type="button" aria-label="Hapus kategori Lainnya">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="cat-stats">
            <div className="cat-stat">
              <span className="cat-stat-label">Transaksi</span>
              <span className="cat-stat-value">3 transaksi</span>
            </div>
            <div className="cat-stat">
              <span className="cat-stat-label">Total bulan ini</span>
              <span className="cat-stat-value mono">Rp328.000</span>
            </div>
          </div>
        </article>

        <article className="category-card" data-id="6">
          <div className="cat-header">
            <div className="cat-icon" style={{background: 'rgba(22,163,74,0.08)', color: '#16A34A'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div className="cat-info">
              <div className="cat-name">
                <span className="cat-color-dot" style={{background: '#16A34A'}} aria-hidden="true"></span>
                Gaji
              </div>
              <span className="cat-type income">Pemasukan</span>
            </div>
            <div className="cat-actions">
              <button className="cat-action-btn" type="button" aria-label="Edit kategori Gaji" onClick={() => openEdit("Gaji")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="cat-action-btn danger" type="button" aria-label="Hapus kategori Gaji">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="cat-stats">
            <div className="cat-stat">
              <span className="cat-stat-label">Transaksi</span>
              <span className="cat-stat-value">1 transaksi</span>
            </div>
            <div className="cat-stat">
              <span className="cat-stat-label">Total bulan ini</span>
              <span className="cat-stat-value mono">Rp5.000.000</span>
            </div>
          </div>
        </article>

        <article className="category-card" data-id="7">
          <div className="cat-header">
            <div className="cat-icon" style={{background: 'rgba(22,163,74,0.08)', color: '#16A34A'}} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
            </div>
            <div className="cat-info">
              <div className="cat-name">
                <span className="cat-color-dot" style={{background: '#16A34A'}} aria-hidden="true"></span>
                Freelance
              </div>
              <span className="cat-type income">Pemasukan</span>
            </div>
            <div className="cat-actions">
              <button className="cat-action-btn" type="button" aria-label="Edit kategori Freelance" onClick={() => openEdit("Freelance")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="cat-action-btn danger" type="button" aria-label="Hapus kategori Freelance">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
          <div className="cat-stats">
            <div className="cat-stat">
              <span className="cat-stat-label">Transaksi</span>
              <span className="cat-stat-value">2 transaksi</span>
            </div>
            <div className="cat-stat">
              <span className="cat-stat-label">Total bulan ini</span>
              <span className="cat-stat-value mono">Rp3.500.000</span>
            </div>
          </div>
        </article>

      </section>

      <AddCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialData={editData} />
    </main>
  );
}
