"use client";

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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Simpan
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-label="Ringkasan anggaran">
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-primary-surface text-primary`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg></span>
            Total Budget
          </div>
          <div className={metricValueClass}>Rp4.500.000</div>
          <div className="text-[12px] text-text-tertiary mt-1">Batas pengeluaran bulan ini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-danger-surface text-danger`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg></span>
            Terpakai
          </div>
          <div className={metricValueClass}>Rp2.951.000</div>
          <div className="text-[12px] text-text-tertiary mt-1">65.6% dari total budget</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-success-surface text-success`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
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
