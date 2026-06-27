export default function ProfilPengaturan() {
  return (
    <main className="main" id="main-content">
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <header className="header">
        <div className="header-left">
          <h1>Pengaturan Profil</h1>
          <p>Konfigurasi detail akun pribadi Anda</p>
        </div>
      </header>

      <div className="settings-wrap">
        <section className="card" aria-label="Profil">
          <div className="card-header">
            <div className="card-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '18px', height: '18px', color: 'var(--text-tertiary)'}} aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profil Utama
            </div>
          </div>
          <div className="setting-fields">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input type="email" id="email" className="form-input" defaultValue="user@finme.id" readOnly />
              </div>
              <button className="btn btn-ghost" type="button" aria-label="Edit email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </button>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="nama">Nama</label>
              <input type="text" id="nama" className="form-input" defaultValue="Ahmad Fauzi" />
            </div>
          </div>
        </section>
        </div>
      </div>
    </main>
  );
}
