export default function UmumPengaturan() {
  return (
    <main className="main" id="main-content">
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <header className="header">
        <div className="header-left">
          <h1>Pengaturan Umum</h1>
          <p>Konfigurasi aplikasi dan notifikasi</p>
        </div>
      </header>

      <div className="settings-wrap">
        <section className="card" aria-label="Telegram Bot">
          <div className="card-header">
            <div className="card-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px', color: 'var(--text-tertiary)'}} aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Telegram Bot
            </div>
          </div>
          <div className="setting-fields">
            <div className="form-group">
              <label className="form-label" htmlFor="chat-id">Telegram Chat ID</label>
              <input type="text" id="chat-id" className="form-input" defaultValue="123456789" readOnly style={{fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums'}} />
            </div>
            <div className="status-inline">
              <span className="status-dot green" aria-hidden="true"></span>
              <span>Status:</span>
              <span className="status-text green">Terhubung</span>
            </div>
            <div className="btn-row">
              <button className="btn btn-ghost" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Test Koneksi
              </button>
              <button className="btn btn-danger-ghost" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                Putuskan
              </button>
            </div>
          </div>
        </section>

        <section className="card" aria-label="Notifikasi">
          <div className="card-header">
            <div className="card-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px', color: 'var(--text-tertiary)'}} aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notifikasi
            </div>
          </div>
          <div className="setting-fields">
            <div className="toggle-row">
              <span className="toggle-label">Alert Budget 80%</span>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-track"></span>
              </label>
            </div>
            <div className="toggle-row">
              <span className="toggle-label">Alert Budget 100%</span>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-track"></span>
              </label>
            </div>
            <div className="toggle-row">
              <span className="toggle-label">Daily Reminder</span>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-track"></span>
              </label>
            </div>
            <div className="time-row">
              <span className="toggle-label">Waktu Reminder</span>
              <input type="time" className="time-input" defaultValue="21:00" />
            </div>
          </div>
        </section>

        <section className="card" aria-label="Ekspor Data">
          <div className="card-header">
            <div className="card-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px', color: 'var(--text-tertiary)'}} aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Ekspor Data
            </div>
          </div>
          <div className="setting-fields">
            <div className="btn-row">
              <button className="btn btn-ghost" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Ekspor PDF Bulan Ini
              </button>
              <button className="btn btn-ghost" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Ekspor CSV Semua Data
              </button>
            </div>
            <div className="export-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Data diekspor dari server, tidak membebani browser
            </div>
          </div>
        </section>

        <section className="card card-danger" aria-label="Zona Bahaya">
          <div className="card-header">
            <div className="danger-section-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px'}} aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Zona Bahaya
            </div>
          </div>
          <div className="setting-fields">
            <div className="danger-item">
              <button className="btn btn-danger" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                Hapus Semua Transaksi
              </button>
              <p className="danger-item-desc">Semua data transaksi akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="danger-item">
              <button className="btn btn-danger-ghost" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                Reset Anggaran
              </button>
              <p className="danger-item-desc">Semua anggaran akan direset ke nilai default. Riwayat transaksi tidak terpengaruh.</p>
            </div>
          </div>
        </section>
        </div>
      </div>
    </main>
  );
}
