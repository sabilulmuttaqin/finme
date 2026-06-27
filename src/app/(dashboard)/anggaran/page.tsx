"use client";

import { WalletIcon, TrendingDownIcon, CheckIcon, SaveIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon } from "@/components/icons";

export default function Anggaran() {
  // Shared classes
  const metricCardClass = "bg-surface border border-border rounded-xl px-6 py-5 flex flex-col gap-2 transition-shadow duration-200 hover:shadow-md";
  const metricLabelClass = "flex items-center gap-2 text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]";
  const iconCircleClass = "w-8 h-8 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4";
  const metricValueClass = "font-mono text-[28px] font-bold tabular-nums tracking-[-0.03em] leading-[1.2]";
  
  const budgetCardClass = "bg-surface border border-border rounded-xl p-5 hover:border-border-hover transition-colors duration-200";
  const budgetIconClass = "w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center text-text-secondary [&>svg]:w-5 [&>svg]:h-5";
  const budgetInputClass = "w-28 bg-surface border border-border rounded-md px-2 py-1 text-right text-[13px] font-mono font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Anggaran</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Kelola batas pengeluaran bulanan per kategori</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="appearance-none bg-surface border border-border rounded-lg px-4 py-2.5 text-[14px] text-text-primary w-full md:max-w-[200px] cursor-pointer transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(255,107,0,0.1)] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-position[right_12px_center]"
            aria-label="Pilih bulan" 
            defaultValue="2026-06"
          >
            <option value="2026-06">Juni 2026</option>
            <option value="2026-05">Mei 2026</option>
            <option value="2026-04">April 2026</option>
            <option value="2026-03">Maret 2026</option>
          </select>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow active:translate-y-px [&>svg]:w-4 [&>svg]:h-4" type="button">
            <SaveIcon aria-hidden="true" />
            Simpan
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-label="Ringkasan anggaran">
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-primary-surface text-primary`} aria-hidden="true"><WalletIcon /></span>
            Total Budget
          </div>
          <div className={metricValueClass}>Rp4.500.000</div>
          <div className="text-[12px] text-text-tertiary mt-1">Batas pengeluaran bulan ini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-danger-surface text-danger`} aria-hidden="true"><TrendingDownIcon /></span>
            Terpakai
          </div>
          <div className={metricValueClass}>Rp2.951.000</div>
          <div className="text-[12px] text-text-tertiary mt-1">65.6% dari total budget</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-success-surface text-success`} aria-hidden="true"><CheckIcon /></span>
            Sisa
          </div>
          <div className={metricValueClass}>Rp1.549.000</div>
          <div className="text-[12px] text-text-tertiary mt-1">34.4% tersisa</div>
        </article>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Daftar anggaran per kategori">
        <div className={budgetCardClass}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={budgetIconClass} aria-hidden="true">
                <CoffeeIcon />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-text-primary">Makanan</div>
                <div className="text-[12px] text-text-tertiary mt-0.5">Terpakai Rp1.148.000</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <label htmlFor="limit-makanan" className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mb-1">Limit</label>
              <input type="text" id="limit-makanan" defaultValue="1.200.000" inputMode="numeric" className={budgetInputClass} />
            </div>
          </div>
          <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-500 ease-out bg-danger" style={{width: '95.7%'}}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-text-secondary font-mono">Rp1.148.000 / Rp1.200.000</span>
            <span className="text-[12px] font-bold font-mono text-danger">95.7%</span>
          </div>
        </div>

        <div className={budgetCardClass}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={budgetIconClass} aria-hidden="true">
                <TruckIcon />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-text-primary">Transportasi</div>
                <div className="text-[12px] text-text-tertiary mt-0.5">Terpakai Rp721.600</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <label htmlFor="limit-transportasi" className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mb-1">Limit</label>
              <input type="text" id="limit-transportasi" defaultValue="800.000" inputMode="numeric" className={budgetInputClass} />
            </div>
          </div>
          <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-500 ease-out bg-danger" style={{width: '90.2%'}}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-text-secondary font-mono">Rp721.600 / Rp800.000</span>
            <span className="text-[12px] font-bold font-mono text-danger">90.2%</span>
          </div>
        </div>

        <div className={budgetCardClass}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={budgetIconClass} aria-hidden="true">
                <BookIcon />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-text-primary">Langganan</div>
                <div className="text-[12px] text-text-tertiary mt-0.5">Terpakai Rp590.400</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <label htmlFor="limit-langganan" className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mb-1">Limit</label>
              <input type="text" id="limit-langganan" defaultValue="1.000.000" inputMode="numeric" className={budgetInputClass} />
            </div>
          </div>
          <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-500 ease-out bg-success" style={{width: '59%'}}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-text-secondary font-mono">Rp590.400 / Rp1.000.000</span>
            <span className="text-[12px] font-bold font-mono text-success">59.0%</span>
          </div>
        </div>

        <div className={budgetCardClass}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={budgetIconClass} aria-hidden="true">
                <CartIcon />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-text-primary">Belanja</div>
                <div className="text-[12px] text-text-tertiary mt-0.5">Terpakai Rp492.000</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <label htmlFor="limit-belanja" className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mb-1">Limit</label>
              <input type="text" id="limit-belanja" defaultValue="1.500.000" inputMode="numeric" className={budgetInputClass} />
            </div>
          </div>
          <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-500 ease-out bg-success" style={{width: '32.8%'}}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-text-secondary font-mono">Rp492.000 / Rp1.500.000</span>
            <span className="text-[12px] font-bold font-mono text-success">32.8%</span>
          </div>
        </div>
      </section>
    </main>
  );
}
