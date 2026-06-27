"use client";

import { useState } from "react";
import Link from "next/link";
import AddTransactionModal from "@/components/AddTransactionModal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="main" id="main-content">
      <div className="status-bar" role="status" aria-live="polite">
        <span className="status-dot" aria-hidden="true"></span>
        Realtime terhubung via Supabase
        <span style={{marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums'}}>Terakhir sinkron: 2 detik lalu</span>
      </div>

      <header className="header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <p>Juni 2026 &middot; Ringkasan keuangan bulan berjalan</p>
        </div>
        <div className="header-right">
          <button className="btn btn-ghost" type="button" aria-label="Ekspor laporan PDF">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Ekspor PDF
          </button>
          <button className="btn btn-primary" type="button" onClick={() => setIsModalOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tambah Manual
          </button>
        </div>
      </header>

      <section className="metrics" aria-label="Ringkasan finansial">
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle orange" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg></span>
            Total Saldo
          </div>
          <div className="metric-value">Rp12.450.000</div>
          <div className="metric-change up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>+8.2% dari bulan lalu</div>
        </article>
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle green" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></span>
            Pemasukan
          </div>
          <div className="metric-value">Rp8.500.000</div>
          <div className="metric-change up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>+12.5% dari bulan lalu</div>
        </article>
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle red" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg></span>
            Pengeluaran
          </div>
          <div className="metric-value">Rp3.280.000</div>
          <div className="metric-change down"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>-4.1% dari bulan lalu</div>
        </article>
      </section>

      <section className="grid-2" aria-label="Grafik analitik">
        <article className="card">
          <div className="card-header">
            <div><div className="card-title">Tren Pengeluaran Harian</div><div className="card-subtitle">30 hari terakhir</div></div>
            <span className="badge">Line Chart</span>
          </div>
          <div className="chart-container" role="img" aria-label="Grafik garis tren pengeluaran harian">
            <svg viewBox="0 0 480 200" fill="none" preserveAspectRatio="xMidYMid meet">
              <line x1="40" y1="20" x2="40" y2="180" stroke="var(--border)" strokeWidth="1"/>
              <line x1="40" y1="180" x2="460" y2="180" stroke="var(--border)" strokeWidth="1"/>
              <line x1="40" y1="60" x2="460" y2="60" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="40" y1="100" x2="460" y2="100" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="40" y1="140" x2="460" y2="140" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <text x="4" y="64" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">300rb</text>
              <text x="4" y="104" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">200rb</text>
              <text x="4" y="144" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">100rb</text>
              <text x="4" y="184" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">0</text>
              <text x="55" y="196" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">1</text>
              <text x="127" y="196" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">7</text>
              <text x="204" y="196" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">14</text>
              <text x="283" y="196" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">21</text>
              <text x="415" y="196" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">30</text>
              <defs><linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15"/><stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/></linearGradient></defs>
              <path d="M55 150 L75 140 L95 130 L115 145 L135 110 L155 90 L175 70 L195 85 L215 65 L235 80 L255 95 L275 75 L295 55 L315 70 L335 100 L355 120 L375 110 L395 125 L415 135 L435 140 L435 180 L55 180 Z" fill="url(#lineGrad)"/>
              <polyline points="55,150 75,140 95,130 115,145 135,110 155,90 175,70 195,85 215,65 235,80 255,95 275,75 295,55 315,70 335,100 355,120 375,110 395,125 415,135 435,140" stroke="#FF6B00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="295" cy="55" r="4" fill="#FF6B00" stroke="var(--surface)" strokeWidth="2"/>
              <circle cx="215" cy="65" r="4" fill="#FF6B00" stroke="var(--surface)" strokeWidth="2"/>
            </svg>
          </div>
        </article>
        <article className="card">
          <div className="card-header">
            <div><div className="card-title">Distribusi Kategori</div><div className="card-subtitle">Pengeluaran bulan ini</div></div>
            <span className="badge">Donut Chart</span>
          </div>
          <div className="donut-container" role="img" aria-label="Diagram donat distribusi">
            <svg className="donut-svg" viewBox="0 0 160 160" aria-hidden="true">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#FF6B00" strokeWidth="20" strokeDasharray="131.95 245.04" strokeDashoffset="-61.26" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#FF8A33" strokeWidth="20" strokeDasharray="82.94 294.05" strokeDashoffset="-193.21" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#FFB366" strokeWidth="20" strokeDasharray="67.86 309.13" strokeDashoffset="-276.15" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#1C1917" strokeWidth="20" strokeDasharray="56.55 320.44" strokeDashoffset="-344.01" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#A8A29E" strokeWidth="20" strokeDasharray="37.70 339.29" strokeDashoffset="-400.56" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="48" fill="var(--surface)"/>
              <text x="80" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)" fontFamily="var(--font-mono)">3.28jt</text>
              <text x="80" y="92" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-ui)">Total</text>
            </svg>
            <div className="donut-legend">
              <div className="legend-item"><span className="legend-dot" style={{background:'#FF6B00'}} aria-hidden="true"></span><span className="legend-label">Makanan</span><span className="legend-value">Rp1.148.000</span></div>
              <div className="legend-item"><span className="legend-dot" style={{background:'#FF8A33'}} aria-hidden="true"></span><span className="legend-label">Transportasi</span><span className="legend-value">Rp721.600</span></div>
              <div className="legend-item"><span className="legend-dot" style={{background:'#FFB366'}} aria-hidden="true"></span><span className="legend-label">Langganan</span><span className="legend-value">Rp590.400</span></div>
              <div className="legend-item"><span className="legend-dot" style={{background:'#1C1917'}} aria-hidden="true"></span><span className="legend-label">Belanja</span><span className="legend-value">Rp492.000</span></div>
              <div className="legend-item"><span className="legend-dot" style={{background:'#A8A29E'}} aria-hidden="true"></span><span className="legend-label">Lainnya</span><span className="legend-value">Rp328.000</span></div>
            </div>
          </div>
        </article>
      </section>

      <section className="insight-card" aria-label="AI Weekly Insight">
        <div className="card-header">
          <div className="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Weekly Financial Insight
          </div>
          <span className="insight-badge">AI Insight</span>
        </div>
        <p className="insight-text">
          Pengeluaran <strong>Makanan</strong> minggu ini naik <strong>23%</strong> dibanding minggu lalu, didorong oleh 4 transaksi makan di luar di atas Rp80.000. Kategori <strong>Transportasi</strong> stabil di Rp25.000/hari. Saran: pertimbangkan meal-prep untuk 2 hari kerja agar bisa hemat hingga <strong>Rp160.000/minggu</strong>.
        </p>
        <div className="insight-actions">
          <button className="btn-insight" type="button">Lihat Detail</button>
          <button className="btn-insight" type="button">Tanya AI</button>
        </div>
      </section>

      <section className="grid-2" aria-label="Budget dan transaksi">
        <article className="card">
          <div className="card-header">
            <div><div className="card-title">Anggaran Bulanan</div><div className="card-subtitle">Progress per kategori</div></div>
            <Link href="/anggaran" className="btn btn-ghost" style={{padding: '6px 12px', minHeight: '36px', fontSize: '12px'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Atur Limit
            </Link>
          </div>
          <div className="budget-list">
            <div className="budget-item">
              <div className="budget-info"><span className="name"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>Makanan</span><span className="amount">Rp1.148.000 / Rp1.200.000</span></div>
              <div className="budget-bar"><div className="budget-bar-fill danger" style={{width: '95.7%'}}></div></div>
              <span className="budget-percent danger">95.7%</span>
            </div>
            <div className="budget-item">
              <div className="budget-info"><span className="name"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Transportasi</span><span className="amount">Rp721.600 / Rp800.000</span></div>
              <div className="budget-bar"><div className="budget-bar-fill warning" style={{width: '90.2%'}}></div></div>
              <span className="budget-percent warning">90.2%</span>
            </div>
            <div className="budget-item">
              <div className="budget-info"><span className="name"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>Langganan</span><span className="amount">Rp590.400 / Rp1.000.000</span></div>
              <div className="budget-bar"><div className="budget-bar-fill safe" style={{width: '59%'}}></div></div>
              <span className="budget-percent safe">59.0%</span>
            </div>
            <div className="budget-item">
              <div className="budget-info"><span className="name"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>Belanja</span><span className="amount">Rp492.000 / Rp1.500.000</span></div>
              <div className="budget-bar"><div className="budget-bar-fill safe" style={{width: '32.8%'}}></div></div>
              <span className="budget-percent safe">32.8%</span>
            </div>
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div><div className="card-title">Transaksi Terakhir</div><div className="card-subtitle">Via Telegram Bot</div></div>
            <Link href="/transaksi" className="badge" style={{textDecoration: 'none'}}>Lihat Semua</Link>
          </div>
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div>
              <div className="tx-details"><div className="tx-desc">Kopi Starbucks</div><div className="tx-meta"><span>Makanan</span><span aria-hidden="true">&middot;</span><span>Hari ini, 14:32</span></div></div>
              <div className="tx-amount expense">-Rp58.000</div>
            </div>
            <div className="transaction-item">
              <div className="tx-icon income" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
              <div className="tx-details"><div className="tx-desc">Gajian Masuk</div><div className="tx-meta"><span>Pemasukan</span><span aria-hidden="true">&middot;</span><span>Hari ini, 09:00</span></div></div>
              <div className="tx-amount income">+Rp5.000.000</div>
            </div>
            <div className="transaction-item">
              <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
              <div className="tx-details"><div className="tx-desc">Bensin Pertamax</div><div className="tx-meta"><span>Transportasi</span><span aria-hidden="true">&middot;</span><span>Kemarin, 17:45</span></div></div>
              <div className="tx-amount expense">-Rp80.000</div>
            </div>
            <div className="transaction-item">
              <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div>
              <div className="tx-details"><div className="tx-desc">Makan Siang McD</div><div className="tx-meta"><span>Makanan</span><span aria-hidden="true">&middot;</span><span>Kemarin, 12:15</span></div></div>
              <div className="tx-amount expense">-Rp54.000</div>
            </div>
            <div className="transaction-item">
              <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
              <div className="tx-details"><div className="tx-desc">Netflix Premium</div><div className="tx-meta"><span>Langganan</span><span aria-hidden="true">&middot;</span><span>25 Jun, 00:01</span></div></div>
              <div className="tx-amount expense">-Rp186.000</div>
            </div>
            <div className="transaction-item">
              <div className="tx-icon expense" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
              <div className="tx-details"><div className="tx-desc">Tokopedia - Kabel USB-C</div><div className="tx-meta"><span>Belanja</span><span aria-hidden="true">&middot;</span><span>24 Jun, 20:30</span></div></div>
              <div className="tx-amount expense">-Rp45.000</div>
            </div>
          </div>
        </article>
      </section>
      
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
