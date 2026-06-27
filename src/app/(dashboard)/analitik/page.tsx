"use client";

import { useState } from "react";
import { ColumnChartIcon, TrendingDownIcon, WarningIcon, TrendingUpIcon } from "@/components/icons";

export default function Analitik() {
  const [timeRange, setTimeRange] = useState("Bulan Ini");

  // Shared classes
  const metricCardClass = "bg-surface border border-border rounded-xl px-6 py-5 flex flex-col gap-2 transition-shadow duration-200 hover:shadow-md";
  const metricLabelClass = "flex items-center gap-2 text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]";
  const iconCircleClass = "w-8 h-8 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4";
  const metricValueClass = "font-mono text-[28px] font-bold tabular-nums tracking-[-0.03em] leading-[1.2]";
  const cardClass = "bg-surface border border-border rounded-xl p-6 transition-shadow duration-200 hover:shadow-sm";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Analitik</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Analisis mendalam keuangan Anda</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-surface-secondary rounded-sm p-1 gap-1 w-full md:w-auto overflow-x-auto">
            {["Minggu Ini", "Bulan Ini", "3 Bulan", "6 Bulan", "1 Tahun"].map(range => (
              <button 
                key={range}
                type="button" 
                className={`px-4 py-2 text-[13px] font-medium rounded-sm transition-colors duration-150 whitespace-nowrap min-w-max ${timeRange === range ? "bg-surface text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}`} 
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-label="Metrik analitik">
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-primary-surface text-primary`} aria-hidden="true"><ColumnChartIcon /></span>
            Rata-rata / Hari
          </div>
          <div className={metricValueClass}>Rp109.333</div>
          <div className="text-[12px] text-text-tertiary mt-1">Pengeluaran harian rata-rata</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-danger-surface text-danger`} aria-hidden="true"><TrendingDownIcon /></span>
            Hari Tertinggi
          </div>
          <div className={metricValueClass}>Rp320.000</div>
          <div className="text-[12px] text-text-tertiary mt-1">14 Juni 2026</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-warning-surface text-warning`} aria-hidden="true"><WarningIcon /></span>
            Kategori Terboros
          </div>
          <div className={`${metricValueClass} text-[20px]`}>Makanan</div>
          <div className="text-[12px] text-text-tertiary mt-1">Rp1.148.000 bulan ini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-success-surface text-success`} aria-hidden="true"><TrendingUpIcon /></span>
            Penghematan
          </div>
          <div className={`${metricValueClass} text-success`}>Rp142.000</div>
          <div className="text-[12px] text-text-tertiary mt-1">vs bulan lalu</div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" aria-label="Grafik perbandingan">
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Pemasukan vs Pengeluaran</div><div className="text-[12px] text-text-tertiary font-normal">6 bulan terakhir</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Bar Chart</span>
          </div>
          <div className="relative w-full aspect-2/1 [&>svg]:w-full [&>svg]:h-full" role="img" aria-label="Grafik batang perbandingan pemasukan dan pengeluaran 6 bulan terakhir">
            <svg viewBox="0 0 500 240" fill="none" preserveAspectRatio="xMidYMid meet">
              <line x1="50" y1="20" x2="50" y2="200" stroke="var(--color-border)" strokeWidth="1"/>
              <line x1="50" y1="200" x2="480" y2="200" stroke="var(--color-border)" strokeWidth="1"/>
              <line x1="50" y1="56" x2="480" y2="56" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="50" y1="92" x2="480" y2="92" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="50" y1="128" x2="480" y2="128" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="50" y1="164" x2="480" y2="164" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <text x="6" y="60" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">10jt</text>
              <text x="10" y="96" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">7.5jt</text>
              <text x="14" y="132" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">5jt</text>
              <text x="10" y="168" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">2.5jt</text>
              <text x="28" y="204" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">0</text>

              <rect x="68" y="74" width="24" height="126" rx="3" fill="var(--color-success)" opacity="0.8"/>
              <rect x="96" y="110" width="24" height="90" rx="3" fill="var(--color-primary)" opacity="0.8"/>
              <text x="94" y="220" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Jan</text>

              <rect x="140" y="82" width="24" height="118" rx="3" fill="var(--color-success)" opacity="0.8"/>
              <rect x="168" y="122" width="24" height="78" rx="3" fill="var(--color-primary)" opacity="0.8"/>
              <text x="166" y="220" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Feb</text>

              <rect x="212" y="60" width="24" height="140" rx="3" fill="var(--color-success)" opacity="0.8"/>
              <rect x="240" y="104" width="24" height="96" rx="3" fill="var(--color-primary)" opacity="0.8"/>
              <text x="238" y="220" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Mar</text>

              <rect x="284" y="70" width="24" height="130" rx="3" fill="var(--color-success)" opacity="0.8"/>
              <rect x="312" y="92" width="24" height="108" rx="3" fill="var(--color-primary)" opacity="0.8"/>
              <text x="310" y="220" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Apr</text>

              <rect x="356" y="56" width="24" height="144" rx="3" fill="var(--color-success)" opacity="0.8"/>
              <rect x="384" y="98" width="24" height="102" rx="3" fill="var(--color-primary)" opacity="0.8"/>
              <text x="382" y="220" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Mei</text>

              <rect x="428" y="62" width="24" height="138" rx="3" fill="var(--color-success)" opacity="0.8"/>
              <rect x="456" y="106" width="24" height="94" rx="3" fill="var(--color-primary)" opacity="0.8"/>
              <text x="454" y="220" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Jun</text>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: 'var(--color-success)'}}></span>Pemasukan</div>
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: 'var(--color-primary)'}}></span>Pengeluaran</div>
          </div>
        </article>

        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Tren Mingguan</div><div className="text-[12px] text-text-tertiary font-normal">4 minggu terakhir</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Line Chart</span>
          </div>
          <div className="relative w-full aspect-2/1 [&>svg]:w-full [&>svg]:h-full" role="img" aria-label="Grafik garis tren pengeluaran mingguan 4 minggu terakhir">
            <svg viewBox="0 0 500 240" fill="none" preserveAspectRatio="xMidYMid meet">
              <line x1="60" y1="20" x2="60" y2="200" stroke="var(--color-border)" strokeWidth="1"/>
              <line x1="60" y1="200" x2="470" y2="200" stroke="var(--color-border)" strokeWidth="1"/>
              <line x1="60" y1="50" x2="470" y2="50" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="60" y1="100" x2="470" y2="100" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="60" y1="150" x2="470" y2="150" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <text x="6" y="54" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">1.2jt</text>
              <text x="10" y="104" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">800rb</text>
              <text x="10" y="154" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">400rb</text>
              <text x="32" y="204" fontSize="9" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">0</text>

              <text x="120" y="220" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 1</text>
              <text x="230" y="220" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 2</text>
              <text x="340" y="220" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 3</text>
              <text x="450" y="220" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)" textAnchor="middle">Minggu 4</text>

              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15"/><stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/></linearGradient>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#16A34A" stopOpacity="0.1"/><stop offset="100%" stopColor="#16A34A" stopOpacity="0"/></linearGradient>
              </defs>

              <path d="M120 110 L230 80 L340 130 L450 95 L450 200 L120 200 Z" fill="url(#trendGrad)"/>
              <polyline points="120,110 230,80 340,130 450,95" stroke="var(--color-primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="120" cy="110" r="4" fill="var(--color-primary)" stroke="var(--color-surface)" strokeWidth="2"/>
              <circle cx="230" cy="80" r="4" fill="var(--color-primary)" stroke="var(--color-surface)" strokeWidth="2"/>
              <circle cx="340" cy="130" r="4" fill="var(--color-primary)" stroke="var(--color-surface)" strokeWidth="2"/>
              <circle cx="450" cy="95" r="4" fill="var(--color-primary)" stroke="var(--color-surface)" strokeWidth="2"/>

              <text x="120" y="102" fontSize="9" fill="var(--color-primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">750rb</text>
              <text x="230" y="72" fontSize="9" fill="var(--color-primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">900rb</text>
              <text x="340" y="145" fontSize="9" fill="var(--color-primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">580rb</text>
              <text x="450" y="87" fontSize="9" fill="var(--color-primary)" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="600">850rb</text>

              <path d="M120 140 L230 120 L340 155 L450 130 L450 200 L120 200 Z" fill="url(#incomeGrad)"/>
              <polyline points="120,140 230,120 340,155 450,130" stroke="var(--color-success)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3"/>
              <circle cx="120" cy="140" r="3" fill="var(--color-success)" stroke="var(--color-surface)" strokeWidth="2"/>
              <circle cx="230" cy="120" r="3" fill="var(--color-success)" stroke="var(--color-surface)" strokeWidth="2"/>
              <circle cx="340" cy="155" r="3" fill="var(--color-success)" stroke="var(--color-surface)" strokeWidth="2"/>
              <circle cx="450" cy="130" r="3" fill="var(--color-success)" stroke="var(--color-surface)" strokeWidth="2"/>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: 'var(--color-primary)'}}></span>Pengeluaran</div>
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: 'var(--color-success)'}}></span>Pemasukan</div>
          </div>
        </article>
      </section>

      <section className={`${cardClass} mb-6`} aria-label="Breakdown kategori">
        <div className="flex items-center justify-between mb-5">
          <div><div className="text-[15px] font-semibold">Breakdown per Kategori</div><div className="text-[12px] text-text-tertiary font-normal">Distribusi pengeluaran bulan ini</div></div>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Rp3.280.000 total</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[100px_1fr_40px_90px] md:grid-cols-[120px_1fr_50px_110px] items-center gap-2 md:gap-4">
            <div className="text-[13px] font-medium text-text-secondary">Makanan</div>
            <div className="h-2 bg-surface-secondary rounded-full overflow-hidden w-full"><div className="h-full rounded-full transition-all duration-500 ease-out" style={{width: '35%', background: 'var(--color-primary)'}}></div></div>
            <div className="text-[11px] font-medium text-right font-mono" style={{color: 'var(--color-primary)'}}>35.0%</div>
            <div className="font-mono tabular-nums text-text-primary text-[13px] font-semibold text-right">Rp1.148.000</div>
          </div>
          <div className="grid grid-cols-[100px_1fr_40px_90px] md:grid-cols-[120px_1fr_50px_110px] items-center gap-2 md:gap-4">
            <div className="text-[13px] font-medium text-text-secondary">Transportasi</div>
            <div className="h-2 bg-surface-secondary rounded-full overflow-hidden w-full"><div className="h-full rounded-full transition-all duration-500 ease-out" style={{width: '22%', background: 'var(--color-primary-light)'}}></div></div>
            <div className="text-[11px] font-medium text-right font-mono" style={{color: 'var(--color-primary-light)'}}>22.0%</div>
            <div className="font-mono tabular-nums text-text-primary text-[13px] font-semibold text-right">Rp721.600</div>
          </div>
          <div className="grid grid-cols-[100px_1fr_40px_90px] md:grid-cols-[120px_1fr_50px_110px] items-center gap-2 md:gap-4">
            <div className="text-[13px] font-medium text-text-secondary">Langganan</div>
            <div className="h-2 bg-surface-secondary rounded-full overflow-hidden w-full"><div className="h-full rounded-full transition-all duration-500 ease-out" style={{width: '18%', background: '#FFB366'}}></div></div>
            <div className="text-[11px] font-medium text-right font-mono" style={{color: '#CC8833'}}>18.0%</div>
            <div className="font-mono tabular-nums text-text-primary text-[13px] font-semibold text-right">Rp590.400</div>
          </div>
          <div className="grid grid-cols-[100px_1fr_40px_90px] md:grid-cols-[120px_1fr_50px_110px] items-center gap-2 md:gap-4">
            <div className="text-[13px] font-medium text-text-secondary">Belanja</div>
            <div className="h-2 bg-surface-secondary rounded-full overflow-hidden w-full"><div className="h-full rounded-full transition-all duration-500 ease-out" style={{width: '15%', background: 'var(--color-text-primary)'}}></div></div>
            <div className="text-[11px] font-medium text-right font-mono">15.0%</div>
            <div className="font-mono tabular-nums text-text-primary text-[13px] font-semibold text-right">Rp492.000</div>
          </div>
          <div className="grid grid-cols-[100px_1fr_40px_90px] md:grid-cols-[120px_1fr_50px_110px] items-center gap-2 md:gap-4">
            <div className="text-[13px] font-medium text-text-secondary">Lainnya</div>
            <div className="h-2 bg-surface-secondary rounded-full overflow-hidden w-full"><div className="h-full rounded-full transition-all duration-500 ease-out" style={{width: '10%', background: 'var(--color-text-tertiary)'}}></div></div>
            <div className="text-[11px] font-medium text-right font-mono" style={{color: 'var(--color-text-tertiary)'}}>10.0%</div>
            <div className="font-mono tabular-nums text-text-primary text-[13px] font-semibold text-right">Rp328.000</div>
          </div>
        </div>
      </section>

      <section className={cardClass} aria-label="Top 5 pengeluaran terbesar">
        <div className="flex items-center justify-between mb-5">
          <div><div className="text-[15px] font-semibold">Top 5 Pengeluaran Terbesar</div><div className="text-[12px] text-text-tertiary font-normal">Bulan ini</div></div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-left mt-2 min-w-[500px]">
            <thead>
              <tr>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border w-[50px]">#</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border">Deskripsi</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border">Kategori</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border">Tanggal</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border text-right">Nominal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 border-b border-border-light text-[13px]"><div className="w-6 h-6 rounded-sm flex items-center justify-center text-[12px] font-bold font-mono bg-[#FFD700]/10 text-[#CCAA00] border border-[#FFD700]/30">1</div></td>
                <td className="py-4 border-b border-border-light text-[13px] font-medium">Servis Motor Besar</td>
                <td className="py-4 border-b border-border-light text-[13px]"><span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-secondary text-text-secondary">Transportasi</span></td>
                <td className="py-4 border-b border-border-light text-[12px] text-text-tertiary whitespace-nowrap">14 Jun 2026</td>
                <td className="py-4 border-b border-border-light font-mono tabular-nums text-danger font-semibold text-right whitespace-nowrap">-Rp320.000</td>
              </tr>
              <tr>
                <td className="py-4 border-b border-border-light text-[13px]"><div className="w-6 h-6 rounded-sm flex items-center justify-center text-[12px] font-bold font-mono bg-[#C0C0C0]/10 text-[#999999] border border-[#C0C0C0]/30">2</div></td>
                <td className="py-4 border-b border-border-light text-[13px] font-medium">Belanja Bulanan Superindo</td>
                <td className="py-4 border-b border-border-light text-[13px]"><span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-secondary text-text-secondary">Belanja</span></td>
                <td className="py-4 border-b border-border-light text-[12px] text-text-tertiary whitespace-nowrap">8 Jun 2026</td>
                <td className="py-4 border-b border-border-light font-mono tabular-nums text-danger font-semibold text-right whitespace-nowrap">-Rp275.000</td>
              </tr>
              <tr>
                <td className="py-4 border-b border-border-light text-[13px]"><div className="w-6 h-6 rounded-sm flex items-center justify-center text-[12px] font-bold font-mono bg-[#CD7F32]/10 text-[#B87333] border border-[#CD7F32]/30">3</div></td>
                <td className="py-4 border-b border-border-light text-[13px] font-medium">Netflix Premium</td>
                <td className="py-4 border-b border-border-light text-[13px]"><span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-secondary text-text-secondary">Langganan</span></td>
                <td className="py-4 border-b border-border-light text-[12px] text-text-tertiary whitespace-nowrap">25 Jun 2026</td>
                <td className="py-4 border-b border-border-light font-mono tabular-nums text-danger font-semibold text-right whitespace-nowrap">-Rp186.000</td>
              </tr>
              <tr>
                <td className="py-4 border-b border-border-light text-[13px]"><div className="w-6 h-6 rounded-sm flex items-center justify-center text-[12px] font-bold font-mono bg-surface-secondary text-text-tertiary">4</div></td>
                <td className="py-4 border-b border-border-light text-[13px] font-medium">Makan Sushi Tei (4 orang)</td>
                <td className="py-4 border-b border-border-light text-[13px]"><span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-secondary text-text-secondary">Makanan</span></td>
                <td className="py-4 border-b border-border-light text-[12px] text-text-tertiary whitespace-nowrap">20 Jun 2026</td>
                <td className="py-4 border-b border-border-light font-mono tabular-nums text-danger font-semibold text-right whitespace-nowrap">-Rp164.000</td>
              </tr>
              <tr>
                <td className="py-4 text-[13px]"><div className="w-6 h-6 rounded-sm flex items-center justify-center text-[12px] font-bold font-mono bg-surface-secondary text-text-tertiary">5</div></td>
                <td className="py-4 text-[13px] font-medium">Spotify Family + YouTube</td>
                <td className="py-4 text-[13px]"><span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-secondary text-text-secondary">Langganan</span></td>
                <td className="py-4 text-[12px] text-text-tertiary whitespace-nowrap">1 Jun 2026</td>
                <td className="py-4 font-mono tabular-nums text-danger font-semibold text-right whitespace-nowrap">-Rp149.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
