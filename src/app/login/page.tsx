import Link from "next/link";

export default function Login() {
  return (
    <div style={{
      minHeight: '100dvh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '24px'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '420px',
        padding: '32px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="8" fill="var(--primary)"/>
              <path d="M8 10h12M8 14h8M8 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Fin<span style={{ color: 'var(--primary)' }}>Me</span>
            </span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Selamat Datang Kembali</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Masuk untuk melanjutkan ke dashboard Anda</p>
        </div>

        <form>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" htmlFor="email">Email</label>
            <input type="email" id="email" className="form-input" placeholder="nama@email.com" required />
          </div>
          
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="password">Kata Sandi</label>
              <a href="#" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 500 }}>Lupa kata sandi?</a>
            </div>
            <input type="password" id="password" className="form-input" placeholder="••••••••" required />
          </div>

          <Link href="/dashboard" className="btn btn-primary" style={{ display: 'flex', width: '100%', justifyContent: 'center', minHeight: '44px', fontSize: '14px', marginBottom: '24px' }}>
            Masuk
          </Link>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Belum punya akun? <a href="#" style={{ color: 'var(--primary)', fontWeight: 500 }}>Daftar sekarang</a>
        </div>
      </div>
    </div>
  );
}
