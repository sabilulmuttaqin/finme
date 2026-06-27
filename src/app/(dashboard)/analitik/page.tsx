"use client";

import { useState } from "react";

export default function Analitik() {
  const [timeRange, setTimeRange] = useState("Bulan Ini");

  return (
    <main className="main" id="main-content">
      <header className="header">
        <div className="header-left">
          <h1>Analitik</h1>
          <p>Analisis mendalam keuangan Anda</p>
        </div>
        <div className="header-right">
          <div className="btn-group">
            <button type="button" className={timeRange === "Minggu Ini" ? "active" : ""} onClick={() => setTimeRange("Minggu Ini")}>Minggu Ini</button>
            <button type="button" className={timeRange === "Bulan Ini" ? "active" : ""} onClick={() => setTimeRange("Bulan Ini")}>Bulan Ini</button>
            <button type="button" className={timeRange === "3 Bulan" ? "active" : ""} onClick={() => setTimeRange("3 Bulan")}>3 Bulan</button>
            <button type="button" className={timeRange === "6 Bulan" ? "active" : ""} onClick={() => setTimeRange("6 Bulan")}>6 Bulan</button>
            <button type="button" className={timeRange === "1 Tahun" ? "active" : ""} onClick={() => setTimeRange("1 Tahun")}>1 Tahun</button>
          </div>
        </div>
      </header>

      <section className="metrics" aria-label="Metrik analitik">
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle orange" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></span>
            Rata-rata / Hari
          </div>
          <div className="metric-value">Rp109.333</div>
          <div className="metric-sub">Pengeluaran harian rata-rata</div>
        </article>
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle red" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg></span>
            Hari Tertinggi
          </div>
          <div className="metric-value">Rp320.000</div>
          <div className="metric-sub">14 Juni 2026</div>
        </article>
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle warning" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
            Kategori Terboros
          </div>
          <div className="metric-value" style={{fontSize: '20px'}}>Makanan</div>
          <div className="metric-sub">Rp1.148.000 bulan ini</div>
        </article>
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle green" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></span>
            Penghematan
          </div>
          <div className="metric-value" style={{color: 'var(--success)'}}>Rp142.000</div>
          <div className="metric-sub">vs bulan lalu</div>
        </article>
      </section>

      <section className="grid-2" aria-label="Grafik perbandingan">
        <article className="card">
          <div className="card-header">
            <div><div className="card-title">Pemasukan vs Pengeluaran</div><div className="card-subtitle">6 bulan terakhir</div></div>
            <span className="badge">Bar Chart</span>
          </div>
          <div className="chart-container" role="img" aria-label="Grafik batang perbandingan pemasukan dan pengeluaran 6 bulan terakhir">
            <svg viewBox="0 0 500 240" fill="none" preserveAspectRatio="xMidYMid meet">
              <line x1="50" y1="20" x2="50" y2="200" stroke="var(--border)" strokeWidth="1"/>
              <line x1="50" y1="200" x2="480" y2="200" stroke="var(--border)" strokeWidth="1"/>
              <line x1="50" y1="56" x2="480" y2="56" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="50" y1="92" x2="480" y2="92" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="50" y1="128" x2="480" y2="128" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="50" y1="164" x2="480" y2="164" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <text x="6" y="60" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">10jt</text>
              <text x="10" y="96" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">7.5jt</text>
              <text x="14" y="132" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">5jt</text>
              <text x="10" y="168" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">2.5jt</text>
              <text x="28" y="204" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">0</text>

              <rect x="68" y="74" width="24" height="126" rx="3" fill="var(--success)" opacity="0.8"/>
              <rect x="96" y="110" width="24" height="90" rx="3" fill="var(--primary)" opacity="0.8"/>
              <text x="94" y="220" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Jan</text>

              <rect x="140" y="82" width="24" height="118" rx="3" fill="var(--success)" opacity="0.8"/>
              <rect x="168" y="122" width="24" height="78" rx="3" fill="var(--primary)" opacity="0.8"/>
              <text x="166" y="220" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Feb</text>

              <rect x="212" y="60" width="24" height="140" rx="3" fill="var(--success)" opacity="0.8"/>
              <rect x="240" y="104" width="24" height="96" rx="3" fill="var(--primary)" opacity="0.8"/>
              <text x="238" y="220" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Mar</text>

              <rect x="284" y="70" width="24" height="130" rx="3" fill="var(--success)" opacity="0.8"/>
              <rect x="312" y="92" width="24" height="108" rx="3" fill="var(--primary)" opacity="0.8"/>
              <text x="310" y="220" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Apr</text>

              <rect x="356" y="56" width="24" height="144" rx="3" fill="var(--success)" opacity="0.8"/>
              <rect x="384" y="98" width="24" height="102" rx="3" fill="var(--primary)" opacity="0.8"/>
              <text x="382" y="220" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Mei</text>

              <rect x="428" y="62" width="24" height="138" rx="3" fill="var(--success)" opacity="0.8"/>
              <rect x="456" y="106" width="24" height="94" rx="3" fill="var(--primary)" opacity="0.8"/>
              <text x="454" y="220" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Jun</text>
            </svg>
          </div>
          <div className="legend-row">
            <div className="legend-item"><span className="legend-dot" style={{background: 'var(--success)'}}></span>Pemasukan</div>
            <div className="legend-item"><span className="legend-dot" style={{background: 'var(--primary)'}}></span>Pengeluaran</div>
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div><div className="card-title">Tren Mingguan</div><div className="card-subtitle">4 minggu terakhir</div></div>
            <span className="badge">Line Chart</span>
          </div>
          <div className="chart-container" role="img" aria-label="Grafik garis tren pengeluaran mingguan 4 minggu terakhir">
            <svg viewBox="0 0 500 240" fill="none" preserveAspectRatio="xMidYMid meet">
              <line x1="60" y1="20" x2="60" y2="200" stroke="var(--border)" strokeWidth="1"/>
              <line x1="60" y1="200" x2="470" y2="200" stroke="var(--border)" strokeWidth="1"/>
              <line x1="60" y1="50" x2="470" y2="50" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="60" y1="100" x2="470" y2="100" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="60" y1="150" x2="470" y2="150" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4"/>
              <text x="6" y="54" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">1.2jt</text>
              <text x="10" y="104" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">800rb</text>
              <text x="10" y="154" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">400rb</text>
              <text x="32" y="204" fontSize="9" fill="var(--text-tertiary)" fontFamily="var(--font-mono)">0</text>

              <text x="120" y="220" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 1</text>
              <text x="230" y="220" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 2</text>
              <text x="340" y="220" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 3</text>
              <text x="450" y="220" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 4</text>

              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15"/><stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/></linearGradient>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16A34A" stopOpacity="0.1"/><stop offset="100%" stopColor="#16A34A" stopOpacity="0"/></linearGradient>
              </defs>

              <path d="M120 110 L230 80 L340 130 L450 95 L450 200 L120 200 Z" fill="url(#trendGrad)"/>
              <polyline points="120,110 230,80 340,130 450,95" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="120" cy="110" r="4" fill="var(--primary)" stroke="var(--surface)" strokeWidth="2"/>
              <circle cx="230" cy="80" r="4" fill="var(--primary)" stroke="var(--surface)" strokeWidth="2"/>
              <circle cx="340" cy="130" r="4" fill="var(--primary)" stroke="var(--surface)" strokeWidth="2"/>
              <circle cx="450" cy="95" r="4" fill="var(--primary)" stroke="var(--surface)" strokeWidth="2"/>

              <text x="120" y="102" fontSize="9" fill="var(--primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">750rb</text>
              <text x="230" y="72" fontSize="9" fill="var(--primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">900rb</text>
              <text x="340" y="145" fontSize="9" fill="var(--primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">580rb</text>
              <text x="450" y="87" fontSize="9" fill="var(--primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">850rb</text>

              <path d="M120 140 L230 120 L340 155 L450 130 L450 200 L120 200 Z" fill="url(#incomeGrad)"/>
              <polyline points="120,140 230,120 340,155 450,130" stroke="var(--success)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3"/>
              <circle cx="120" cy="140" r="3" fill="var(--success)" stroke="var(--surface)" strokeWidth="2"/>
              <circle cx="230" cy="120" r="3" fill="var(--success)" stroke="var(--surface)" strokeWidth="2"/>
              <circle cx="340" cy="155" r="3" fill="var(--success)" stroke="var(--surface)" strokeWidth="2"/>
              <circle cx="450" cy="130" r="3" fill="var(--success)" stroke="var(--surface)" strokeWidth="2"/>
            </svg>
          </div>
          <div className="legend-row">
            <div className="legend-item"><span className="legend-dot" style={{background: 'var(--primary)'}}></span>Pengeluaran</div>
            <div className="legend-item"><span className="legend-dot" style={{background: 'var(--success)'}}></span>Pemasukan</div>
          </div>
        </article>
      </section>

      <section className="card" style={{marginBottom: '24px'}} aria-label="Breakdown kategori">
        <div className="card-header">
          <div><div className="card-title">Breakdown per Kategori</div><div className="card-subtitle">Distribusi pengeluaran bulan ini</div></div>
          <span className="badge">Rp3.280.000 total</span>
        </div>
        <div className="category-bar-list">
          <div className="category-bar-item">
            <div className="category-bar-label">Makanan</div>
            <div className="category-bar-track"><div className="category-bar-fill" style={{width: '35%', background: 'var(--primary)'}}></div></div>
            <div className="category-bar-pct" style={{color: 'var(--primary)'}}>35.0%</div>
            <div className="category-bar-amount">Rp1.148.000</div>
          </div>
          <div className="category-bar-item">
            <div className="category-bar-label">Transportasi</div>
            <div className="category-bar-track"><div className="category-bar-fill" style={{width: '22%', background: 'var(--primary-light)'}}></div></div>
            <div className="category-bar-pct" style={{color: 'var(--primary-light)'}}>22.0%</div>
            <div className="category-bar-amount">Rp721.600</div>
          </div>
          <div className="category-bar-item">
            <div className="category-bar-label">Langganan</div>
            <div className="category-bar-track"><div className="category-bar-fill" style={{width: '18%', background: '#FFB366'}}></div></div>
            <div className="category-bar-pct" style={{color: '#CC8833'}}>18.0%</div>
            <div className="category-bar-amount">Rp590.400</div>
          </div>
          <div className="category-bar-item">
            <div className="category-bar-label">Belanja</div>
            <div className="category-bar-track"><div className="category-bar-fill" style={{width: '15%', background: 'var(--text-primary)'}}></div></div>
            <div className="category-bar-pct">15.0%</div>
            <div className="category-bar-amount">Rp492.000</div>
          </div>
          <div className="category-bar-item">
            <div className="category-bar-label">Lainnya</div>
            <div className="category-bar-track"><div className="category-bar-fill" style={{width: '10%', background: 'var(--text-tertiary)'}}></div></div>
            <div className="category-bar-pct" style={{color: 'var(--text-tertiary)'}}>10.0%</div>
            <div className="category-bar-amount">Rp328.000</div>
          </div>
        </div>
      </section>

      <section className="card" aria-label="Top 5 pengeluaran terbesar">
        <div className="card-header">
          <div><div className="card-title">Top 5 Pengeluaran Terbesar</div><div className="card-subtitle">Bulan ini</div></div>
        </div>
        <table className="top-table">
          <thead>
            <tr>
              <th style={{width: '50px'}}>#</th>
              <th>Deskripsi</th>
              <th>Kategori</th>
              <th>Tanggal</th>
              <th style={{textAlign: 'right'}}>Nominal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div className="rank rank-1">1</div></td>
              <td style={{fontWeight: 500}}>Servis Motor Besar</td>
              <td><span className="cat-badge">Transportasi</span></td>
              <td className="date-cell">14 Jun 2026</td>
              <td className="amount-cell">-Rp320.000</td>
            </tr>
            <tr>
              <td><div className="rank rank-2">2</div></td>
              <td style={{fontWeight: 500}}>Belanja Bulanan Superindo</td>
              <td><span className="cat-badge">Belanja</span></td>
              <td className="date-cell">8 Jun 2026</td>
              <td className="amount-cell">-Rp275.000</td>
            </tr>
            <tr>
              <td><div className="rank rank-3">3</div></td>
              <td style={{fontWeight: 500}}>Netflix Premium</td>
              <td><span className="cat-badge">Langganan</span></td>
              <td className="date-cell">25 Jun 2026</td>
              <td className="amount-cell">-Rp186.000</td>
            </tr>
            <tr>
              <td><div className="rank rank-other">4</div></td>
              <td style={{fontWeight: 500}}>Makan Sushi Tei (4 orang)</td>
              <td><span className="cat-badge">Makanan</span></td>
              <td className="date-cell">20 Jun 2026</td>
              <td className="amount-cell">-Rp164.000</td>
            </tr>
            <tr>
              <td><div className="rank rank-other">5</div></td>
              <td style={{fontWeight: 500}}>Spotify Family + YouTube</td>
              <td><span className="cat-badge">Langganan</span></td>
              <td className="date-cell">1 Jun 2026</td>
              <td className="amount-cell">-Rp149.000</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
