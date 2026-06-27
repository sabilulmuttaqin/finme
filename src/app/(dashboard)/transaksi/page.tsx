"use client";

import { useState } from "react";

export default function Transaksi() {
  const [activeTab, setActiveTab] = useState("Semua");

  return (
    <main className="main" id="main-content">
      <header className="header">
        <div className="header-left">
          <h1>Transaksi</h1>
          <p>Riwayat semua transaksi keuangan</p>
        </div>
        <div className="header-right">
          <button className={`btn btn-ghost ${activeTab === 'Semua' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('Semua')}>Semua</button>
          <button className={`btn btn-ghost ${activeTab === 'Pemasukan' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('Pemasukan')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Pemasukan
          </button>
          <button className={`btn btn-ghost ${activeTab === 'Pengeluaran' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('Pengeluaran')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
            Pengeluaran
          </button>
          <div className="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" className="search-input" placeholder="Cari transaksi..." aria-label="Cari transaksi" />
          </div>
        </div>
      </header>

      <div className="filter-bar">
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <span className="filter-label">Bulan</span>
          <select className="filter-select" aria-label="Filter bulan">
            <option>Juni 2026</option>
            <option>Mei 2026</option>
            <option>April 2026</option>
            <option>Maret 2026</option>
            <option>Februari 2026</option>
            <option>Januari 2026</option>
          </select>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <span className="filter-label">Kategori</span>
          <select className="filter-select" aria-label="Filter kategori">
            <option>Semua Kategori</option>
            <option>Makanan</option>
            <option>Transportasi</option>
            <option>Langganan</option>
            <option>Belanja</option>
            <option>Pemasukan</option>
            <option>Lainnya</option>
          </select>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <span className="filter-label">Urutkan</span>
          <select className="filter-select" aria-label="Urutkan berdasarkan">
            <option>Terbaru</option>
            <option>Terlama</option>
            <option>Terbesar</option>
            <option>Terkecil</option>
          </select>
        </div>
      </div>

      <section className="card" style={{padding: 0, overflow: 'hidden'}} aria-label="Daftar transaksi">
        <div style={{padding: '20px 24px 0'}}>
          <div className="tx-summary">
            <span>Menampilkan <span className="tx-count">10</span> dari <span className="tx-count">117</span> transaksi</span>
            <span className="tx-count">Juni 2026</span>
          </div>
        </div>

        <div className="tx-table">
          <div className="tx-table-header">
            <span className="tx-col-date">Tanggal</span>
            <span>Deskripsi</span>
            <span className="tx-col-category">Kategori</span>
            <span className="tx-col-source">Sumber</span>
            <span style={{textAlign: 'right'}}>Jumlah</span>
          </div>
          <div className="transaction-list">

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">27 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Kopi Starbucks</div>
                  <div className="tx-meta tx-meta-mobile">Makanan &middot; 27 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Makanan</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Telegram</span>
              <div className="tx-amount expense">-Rp58.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">27 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon income" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Gajian Bulanan</div>
                  <div className="tx-meta tx-meta-mobile">Pemasukan &middot; 27 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Pemasukan</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Telegram</span>
              <div className="tx-amount income">+Rp5.000.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">26 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Bensin Pertamax</div>
                  <div className="tx-meta tx-meta-mobile">Transportasi &middot; 26 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Transportasi</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Telegram</span>
              <div className="tx-amount expense">-Rp80.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">26 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Makan Siang McD</div>
                  <div className="tx-meta tx-meta-mobile">Makanan &middot; 26 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Makanan</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Manual</span>
              <div className="tx-amount expense">-Rp54.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">25 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Netflix Premium</div>
                  <div className="tx-meta tx-meta-mobile">Langganan &middot; 25 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Langganan</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Telegram</span>
              <div className="tx-amount expense">-Rp186.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">24 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Tokopedia - Kabel USB-C</div>
                  <div className="tx-meta tx-meta-mobile">Belanja &middot; 24 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Belanja</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Manual</span>
              <div className="tx-amount expense">-Rp45.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">23 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon income" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Transfer dari Klien</div>
                  <div className="tx-meta tx-meta-mobile">Pemasukan &middot; 23 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Pemasukan</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Telegram</span>
              <div className="tx-amount income">+Rp3.500.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">22 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Warteg Makan Malam</div>
                  <div className="tx-meta tx-meta-mobile">Makanan &middot; 22 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Makanan</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Telegram</span>
              <div className="tx-amount expense">-Rp25.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">21 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Grab Car ke Kantor</div>
                  <div className="tx-meta tx-meta-mobile">Transportasi &middot; 21 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Transportasi</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Telegram</span>
              <div className="tx-amount expense">-Rp32.000</div>
            </div>

            <div className="tx-page-item">
              <span className="tx-date tx-col-date">20 Jun 2026</span>
              <div className="tx-desc-wrap">
                <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
                <div className="tx-details">
                  <div className="tx-desc">Spotify Family</div>
                  <div className="tx-meta tx-meta-mobile">Langganan &middot; 20 Jun</div>
                </div>
              </div>
              <span className="tx-category tx-col-category">Langganan</span>
              <span className="tx-source tx-col-source"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>Manual</span>
              <div className="tx-amount expense">-Rp59.000</div>
            </div>

          </div>
        </div>
      </section>

      <nav className="pagination" aria-label="Navigasi halaman">
        <button className="page-btn disabled" aria-label="Halaman sebelumnya" disabled>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="page-btn active" aria-label="Halaman 1" aria-current="page">1</button>
        <button className="page-btn" aria-label="Halaman 2">2</button>
        <button className="page-btn" aria-label="Halaman 3">3</button>
        <span className="page-ellipsis" aria-hidden="true">...</span>
        <button className="page-btn" aria-label="Halaman 12">12</button>
        <button className="page-btn" aria-label="Halaman selanjutnya">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </nav>
    </main>
  );
}
