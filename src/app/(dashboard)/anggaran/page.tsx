"use client";

export default function Anggaran() {
  return (
    <main className="main" id="main-content">
      <header className="header">
        <div className="header-left">
          <h1>Anggaran</h1>
          <p>Kelola batas pengeluaran bulanan per kategori</p>
        </div>
        <div className="header-right">
          <select className="form-select" aria-label="Pilih bulan" defaultValue="2026-06">
            <option value="2026-06">Juni 2026</option>
            <option value="2026-05">Mei 2026</option>
            <option value="2026-04">April 2026</option>
            <option value="2026-03">Maret 2026</option>
          </select>
          <button className="btn btn-primary" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Simpan Perubahan
          </button>
        </div>
      </header>

      <section className="metrics" aria-label="Ringkasan anggaran">
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle orange" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg></span>
            Total Budget
          </div>
          <div className="metric-value">Rp4.500.000</div>
          <div className="metric-sub">Batas pengeluaran bulan ini</div>
        </article>
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle red" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg></span>
            Terpakai
          </div>
          <div className="metric-value">Rp2.951.000</div>
          <div className="metric-sub">65.6% dari total budget</div>
        </article>
        <article className="metric-card">
          <div className="metric-label">
            <span className="icon-circle green" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            Sisa
          </div>
          <div className="metric-value">Rp1.549.000</div>
          <div className="metric-sub">34.4% tersisa</div>
        </article>
      </section>

      <section className="budget-cards" aria-label="Daftar anggaran per kategori">
        <div className="budget-card">
          <div className="budget-card-header">
            <div className="budget-cat">
              <div className="budget-cat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
              </div>
              <div>
                <div className="budget-cat-name">Makanan</div>
                <div className="budget-cat-spent">Terpakai Rp1.148.000</div>
              </div>
            </div>
            <div className="budget-limit-input">
              <label htmlFor="limit-makanan">Limit</label>
              <input type="text" id="limit-makanan" defaultValue="1.200.000" inputMode="numeric" />
            </div>
          </div>
          <div className="budget-progress">
            <div className="budget-bar"><div className="budget-bar-fill danger" style={{width: '95.7%'}}></div></div>
          </div>
          <div className="budget-footer">
            <span className="budget-amounts">Rp1.148.000 / Rp1.200.000</span>
            <span className="budget-pct danger">95.7%</span>
          </div>
        </div>

        <div className="budget-card">
          <div className="budget-card-header">
            <div className="budget-cat">
              <div className="budget-cat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <div>
                <div className="budget-cat-name">Transportasi</div>
                <div className="budget-cat-spent">Terpakai Rp721.600</div>
              </div>
            </div>
            <div className="budget-limit-input">
              <label htmlFor="limit-transportasi">Limit</label>
              <input type="text" id="limit-transportasi" defaultValue="800.000" inputMode="numeric" />
            </div>
          </div>
          <div className="budget-progress">
            <div className="budget-bar"><div className="budget-bar-fill danger" style={{width: '90.2%'}}></div></div>
          </div>
          <div className="budget-footer">
            <span className="budget-amounts">Rp721.600 / Rp800.000</span>
            <span className="budget-pct danger">90.2%</span>
          </div>
        </div>

        <div className="budget-card">
          <div className="budget-card-header">
            <div className="budget-cat">
              <div className="budget-cat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div>
                <div className="budget-cat-name">Langganan</div>
                <div className="budget-cat-spent">Terpakai Rp590.400</div>
              </div>
            </div>
            <div className="budget-limit-input">
              <label htmlFor="limit-langganan">Limit</label>
              <input type="text" id="limit-langganan" defaultValue="1.000.000" inputMode="numeric" />
            </div>
          </div>
          <div className="budget-progress">
            <div className="budget-bar"><div className="budget-bar-fill safe" style={{width: '59%'}}></div></div>
          </div>
          <div className="budget-footer">
            <span className="budget-amounts">Rp590.400 / Rp1.000.000</span>
            <span className="budget-pct safe">59.0%</span>
          </div>
        </div>

        <div className="budget-card">
          <div className="budget-card-header">
            <div className="budget-cat">
              <div className="budget-cat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
              <div>
                <div className="budget-cat-name">Belanja</div>
                <div className="budget-cat-spent">Terpakai Rp492.000</div>
              </div>
            </div>
            <div className="budget-limit-input">
              <label htmlFor="limit-belanja">Limit</label>
              <input type="text" id="limit-belanja" defaultValue="1.500.000" inputMode="numeric" />
            </div>
          </div>
          <div className="budget-progress">
            <div className="budget-bar"><div className="budget-bar-fill safe" style={{width: '32.8%'}}></div></div>
          </div>
          <div className="budget-footer">
            <span className="budget-amounts">Rp492.000 / Rp1.500.000</span>
            <span className="budget-pct safe">32.8%</span>
          </div>
        </div>
      </section>
    </main>
  );
}
