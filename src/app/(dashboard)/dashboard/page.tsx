"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DownloadIcon, PlusIcon, WalletIcon, TrendingUpIcon, ArrowUpIcon, TrendingDownIcon, ArrowDownIcon, StarIcon, SettingsIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon } from "@/components/icons";

const AddTransactionModal = dynamic(() => import("@/components/AddTransactionModal"), { ssr: false });

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Shared classes
  const btnClass = "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-medium transition-colors duration-150 min-h-[44px] cursor-pointer";
  const btnPrimary = `${btnClass} bg-primary text-white hover:bg-primary-dark border-none`;
  const btnGhost = `${btnClass} bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary`;
  const metricCardClass = "bg-surface border border-border rounded-xl px-6 py-5 flex flex-col gap-2 transition-shadow duration-200 hover:shadow-md";
  const metricLabelClass = "flex items-center gap-2 text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]";
  const iconCircleClass = "w-8 h-8 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4";
  const metricValueClass = "font-mono text-[28px] font-bold tabular-nums tracking-[-0.03em] leading-[1.2]";
  const metricChangeClass = "inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full w-fit [&>svg]:w-3 [&>svg]:h-3";
  const cardClass = "bg-surface border border-border rounded-xl p-6 transition-shadow duration-200 hover:shadow-sm";
  const txItemClass = "flex items-center gap-3 py-3 border-b border-border-light last:border-b-0";
  const txIconClass = "w-9 h-9 rounded-sm flex items-center justify-center shrink-0 [&>svg]:w-4 [&>svg]:h-4";
  const txAmountClass = "font-mono text-[14px] font-semibold tabular-nums text-right whitespace-nowrap";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-sm text-[12px] text-text-secondary mb-6" role="status" aria-live="polite">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true"></span>
        Realtime terhubung via Supabase
        <span className="ml-auto font-mono font-variant-numeric:tabular-nums">Terakhir sinkron: 2 detik lalu</span>
      </div>

      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Dashboard</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Juni 2026 &middot; Ringkasan keuangan bulan berjalan</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className={btnGhost} type="button" aria-label="Ekspor laporan PDF">
            <DownloadIcon className="w-4 h-4" aria-hidden="true" />
            Ekspor PDF
          </button>
          <button className={btnPrimary} type="button" onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="w-4 h-4" aria-hidden="true" />
            Tambah Manual
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-label="Ringkasan finansial">
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-primary-surface text-primary`} aria-hidden="true"><WalletIcon /></span>
            Total Saldo
          </div>
          <div className={metricValueClass}>Rp12.450.000</div>
          <div className={`${metricChangeClass} bg-success-surface text-success`}><ArrowUpIcon aria-hidden="true" />+8.2% dari bulan lalu</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-success-surface text-success`} aria-hidden="true"><TrendingUpIcon /></span>
            Pemasukan
          </div>
          <div className={metricValueClass}>Rp8.500.000</div>
          <div className={`${metricChangeClass} bg-success-surface text-success`}><ArrowUpIcon aria-hidden="true" />+12.5% dari bulan lalu</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-danger-surface text-danger`} aria-hidden="true"><TrendingDownIcon /></span>
            Pengeluaran
          </div>
          <div className={metricValueClass}>Rp3.280.000</div>
          <div className={`${metricChangeClass} bg-danger-surface text-danger`}><ArrowDownIcon aria-hidden="true" />-4.1% dari bulan lalu</div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" aria-label="Grafik analitik">
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Tren Pengeluaran Harian</div><div className="text-[12px] text-text-tertiary font-normal">30 hari terakhir</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Line Chart</span>
          </div>
          <div className="relative w-full aspect-2/1 [&>svg]:w-full [&>svg]:h-full" role="img" aria-label="Grafik garis tren pengeluaran harian">
            <svg viewBox="0 0 480 200" fill="none" preserveAspectRatio="xMidYMid meet">
              <line x1="40" y1="20" x2="40" y2="180" stroke="var(--color-border)" strokeWidth="1"/>
              <line x1="40" y1="180" x2="460" y2="180" stroke="var(--color-border)" strokeWidth="1"/>
              <line x1="40" y1="60" x2="460" y2="60" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="40" y1="100" x2="460" y2="100" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <line x1="40" y1="140" x2="460" y2="140" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4"/>
              <text x="4" y="64" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">300rb</text>
              <text x="4" y="104" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">200rb</text>
              <text x="4" y="144" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">100rb</text>
              <text x="4" y="184" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">0</text>
              <text x="55" y="196" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">1</text>
              <text x="127" y="196" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">7</text>
              <text x="204" y="196" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">14</text>
              <text x="283" y="196" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">21</text>
              <text x="415" y="196" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-mono)">30</text>
              <defs><linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF6B00" stopOpacity="0.15"/><stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/></linearGradient></defs>
              <path d="M55 150 L75 140 L95 130 L115 145 L135 110 L155 90 L175 70 L195 85 L215 65 L235 80 L255 95 L275 75 L295 55 L315 70 L335 100 L355 120 L375 110 L395 125 L415 135 L435 140 L435 180 L55 180 Z" fill="url(#lineGrad)"/>
              <polyline points="55,150 75,140 95,130 115,145 135,110 155,90 175,70 195,85 215,65 235,80 255,95 275,75 295,55 315,70 335,100 355,120 375,110 395,125 415,135 435,140" stroke="#FF6B00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="295" cy="55" r="4" fill="#FF6B00" stroke="var(--color-surface)" strokeWidth="2"/>
              <circle cx="215" cy="65" r="4" fill="#FF6B00" stroke="var(--color-surface)" strokeWidth="2"/>
            </svg>
          </div>
        </article>
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Distribusi Kategori</div><div className="text-[12px] text-text-tertiary font-normal">Pengeluaran bulan ini</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Donut Chart</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6" role="img" aria-label="Diagram donat distribusi">
            <svg className="w-[160px] h-[160px] shrink-0" viewBox="0 0 160 160" aria-hidden="true">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#FF6B00" strokeWidth="20" strokeDasharray="131.95 245.04" strokeDashoffset="-61.26" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#FF8A33" strokeWidth="20" strokeDasharray="82.94 294.05" strokeDashoffset="-193.21" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#FFB366" strokeWidth="20" strokeDasharray="67.86 309.13" strokeDashoffset="-276.15" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#1C1917" strokeWidth="20" strokeDasharray="56.55 320.44" strokeDashoffset="-344.01" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="60" fill="none" stroke="#A8A29E" strokeWidth="20" strokeDasharray="37.70 339.29" strokeDashoffset="-400.56" transform="rotate(-90 80 80)"/>
              <circle cx="80" cy="80" r="48" fill="var(--color-surface)"/>
              <text x="80" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--color-text-primary)" fontFamily="var(--font-mono)">3.28jt</text>
              <text x="80" y="92" textAnchor="middle" fontSize="10" fill="var(--color-text-tertiary)" fontFamily="var(--font-ui)">Total</text>
            </svg>
            <div className="flex flex-col gap-2.5 flex-1 w-full">
              <div className="flex items-center gap-2 text-[13px]"><span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{background:'#FF6B00'}} aria-hidden="true"></span><span className="flex-1 text-text-secondary">Makanan</span><span className="font-mono font-semibold tabular-nums text-[13px]">Rp1.148.000</span></div>
              <div className="flex items-center gap-2 text-[13px]"><span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{background:'#FF8A33'}} aria-hidden="true"></span><span className="flex-1 text-text-secondary">Transportasi</span><span className="font-mono font-semibold tabular-nums text-[13px]">Rp721.600</span></div>
              <div className="flex items-center gap-2 text-[13px]"><span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{background:'#FFB366'}} aria-hidden="true"></span><span className="flex-1 text-text-secondary">Langganan</span><span className="font-mono font-semibold tabular-nums text-[13px]">Rp590.400</span></div>
              <div className="flex items-center gap-2 text-[13px]"><span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{background:'#1C1917'}} aria-hidden="true"></span><span className="flex-1 text-text-secondary">Belanja</span><span className="font-mono font-semibold tabular-nums text-[13px]">Rp492.000</span></div>
              <div className="flex items-center gap-2 text-[13px]"><span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{background:'#A8A29E'}} aria-hidden="true"></span><span className="flex-1 text-text-secondary">Lainnya</span><span className="font-mono font-semibold tabular-nums text-[13px]">Rp328.000</span></div>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-linear-to-br from-[#1C1917] to-[#292524] border border-[#3a3633] rounded-xl p-6 text-[#FAFAF9] mb-6" aria-label="AI Weekly Insight">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[16px] font-semibold flex items-center gap-2 text-[#FAFAF9] [&>svg]:text-primary">
            <StarIcon width="18" height="18" aria-hidden="true" />
            Weekly Financial Insight
          </div>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary-surface text-primary">AI Insight</span>
        </div>
        <p className="text-[13px] leading-[1.7] text-[#D6D3D1] [&>strong]:text-[#FAFAF9] [&>strong]:font-semibold">
          Pengeluaran <strong>Makanan</strong> minggu ini naik <strong>23%</strong> dibanding minggu lalu, didorong oleh 4 transaksi makan di luar di atas Rp80.000. Kategori <strong>Transportasi</strong> stabil di Rp25.000/hari. Saran: pertimbangkan meal-prep untuk 2 hari kerja agar bisa hemat hingga <strong>Rp160.000/minggu</strong>.
        </p>
        <div className="flex gap-2 mt-4">
          <button className="text-[12px] px-3.5 py-2 rounded-sm bg-white/10 text-[#FAFAF9] border border-white/10 transition-colors duration-150 min-h-[36px] cursor-pointer hover:bg-white/20" type="button">Lihat Detail</button>
          <button className="text-[12px] px-3.5 py-2 rounded-sm bg-white/10 text-[#FAFAF9] border border-white/10 transition-colors duration-150 min-h-[36px] cursor-pointer hover:bg-white/20" type="button">Tanya AI</button>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" aria-label="Budget dan transaksi">
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Anggaran Bulanan</div><div className="text-[12px] text-text-tertiary font-normal">Progress per kategori</div></div>
            <Link href="/anggaran" className={`${btnGhost} px-3 py-1.5 min-h-[36px] text-[12px]`}>
              <SettingsIcon width="14" height="14" className="w-3.5 h-3.5" aria-hidden="true" />
              Atur Limit
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-1.5 font-medium [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-text-tertiary"><CoffeeIcon aria-hidden="true" />Makanan</span><span className="font-mono tabular-nums text-text-secondary text-[12px]">Rp1.148.000 / Rp1.200.000</span></div>
              <div className="h-2 bg-surface-secondary rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500 ease-out bg-danger" style={{width: '95.7%'}}></div></div>
              <span className="text-[11px] font-medium text-right text-danger">95.7%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-1.5 font-medium [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-text-tertiary"><TruckIcon aria-hidden="true" />Transportasi</span><span className="font-mono tabular-nums text-text-secondary text-[12px]">Rp721.600 / Rp800.000</span></div>
              <div className="h-2 bg-surface-secondary rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500 ease-out bg-warning" style={{width: '90.2%'}}></div></div>
              <span className="text-[11px] font-medium text-right text-warning">90.2%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-1.5 font-medium [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-text-tertiary"><BookIcon aria-hidden="true" />Langganan</span><span className="font-mono tabular-nums text-text-secondary text-[12px]">Rp590.400 / Rp1.000.000</span></div>
              <div className="h-2 bg-surface-secondary rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500 ease-out bg-primary" style={{width: '59%'}}></div></div>
              <span className="text-[11px] font-medium text-right text-primary">59.0%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[13px]"><span className="flex items-center gap-1.5 font-medium [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-text-tertiary"><CartIcon aria-hidden="true" />Belanja</span><span className="font-mono tabular-nums text-text-secondary text-[12px]">Rp492.000 / Rp1.500.000</span></div>
              <div className="h-2 bg-surface-secondary rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500 ease-out bg-primary" style={{width: '32.8%'}}></div></div>
              <span className="text-[11px] font-medium text-right text-primary">32.8%</span>
            </div>
          </div>
        </article>

        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Transaksi Terakhir</div><div className="text-[12px] text-text-tertiary font-normal">Via Telegram Bot</div></div>
            <Link href="/transaksi" className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary hover:bg-border transition-colors">Lihat Semua</Link>
          </div>
          <div className="flex flex-col">
            <div className={txItemClass}>
              <div className={`${txIconClass} bg-danger-surface text-danger`} aria-hidden="true"><CoffeeIcon /></div>
              <div className="flex-1 min-w-0"><div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">Kopi Starbucks</div><div className="text-[11px] text-text-tertiary flex items-center gap-1.5 mt-px"><span>Makanan</span><span aria-hidden="true">&middot;</span><span>Hari ini, 14:32</span></div></div>
              <div className={`${txAmountClass} text-danger`}>-Rp58.000</div>
            </div>
            <div className={txItemClass}>
              <div className={`${txIconClass} bg-success-surface text-success`} aria-hidden="true"><TrendingUpIcon /></div>
              <div className="flex-1 min-w-0"><div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">Gajian Masuk</div><div className="text-[11px] text-text-tertiary flex items-center gap-1.5 mt-px"><span>Pemasukan</span><span aria-hidden="true">&middot;</span><span>Hari ini, 09:00</span></div></div>
              <div className={`${txAmountClass} text-success`}>+Rp5.000.000</div>
            </div>
            <div className={txItemClass}>
              <div className={`${txIconClass} bg-danger-surface text-danger`} aria-hidden="true"><TruckIcon /></div>
              <div className="flex-1 min-w-0"><div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">Bensin Pertamax</div><div className="text-[11px] text-text-tertiary flex items-center gap-1.5 mt-px"><span>Transportasi</span><span aria-hidden="true">&middot;</span><span>Kemarin, 17:45</span></div></div>
              <div className={`${txAmountClass} text-danger`}>-Rp80.000</div>
            </div>
            <div className={txItemClass}>
              <div className={`${txIconClass} bg-danger-surface text-danger`} aria-hidden="true"><CoffeeIcon /></div>
              <div className="flex-1 min-w-0"><div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">Makan Siang McD</div><div className="text-[11px] text-text-tertiary flex items-center gap-1.5 mt-px"><span>Makanan</span><span aria-hidden="true">&middot;</span><span>Kemarin, 12:15</span></div></div>
              <div className={`${txAmountClass} text-danger`}>-Rp54.000</div>
            </div>
            <div className={txItemClass}>
              <div className={`${txIconClass} bg-danger-surface text-danger`} aria-hidden="true"><BookIcon /></div>
              <div className="flex-1 min-w-0"><div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">Netflix Premium</div><div className="text-[11px] text-text-tertiary flex items-center gap-1.5 mt-px"><span>Langganan</span><span aria-hidden="true">&middot;</span><span>25 Jun, 00:01</span></div></div>
              <div className={`${txAmountClass} text-danger`}>-Rp186.000</div>
            </div>
            <div className={txItemClass}>
              <div className={`${txIconClass} bg-danger-surface text-danger`} aria-hidden="true"><CartIcon /></div>
              <div className="flex-1 min-w-0"><div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">Tokopedia - Kabel USB-C</div><div className="text-[11px] text-text-tertiary flex items-center gap-1.5 mt-px"><span>Belanja</span><span aria-hidden="true">&middot;</span><span>24 Jun, 20:30</span></div></div>
              <div className={`${txAmountClass} text-danger`}>-Rp45.000</div>
            </div>
          </div>
        </article>
      </section>
      
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
