import Link from "next/link";

export default function Login() {
  const cardClass = "bg-surface border border-border rounded-xl w-full max-w-[420px] p-8";
  const formLabelClass = "text-[13px] font-medium text-text-secondary";
  const formInputClass = "bg-surface-secondary border border-border rounded-lg px-4 py-2.5 text-[14px] text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all w-full";
  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-primary text-primary-content hover:bg-[#5b3df5] border-transparent shadow-[0_1px_2px_rgba(108,93,211,0.1)] hover:shadow-[0_4px_12px_rgba(108,93,211,0.25)] flex w-full justify-center min-h-[44px] mb-6";

  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-bg p-6">
      <div className={cardClass}>
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="8" fill="var(--color-primary)"/>
              <path d="M8 10h12M8 14h8M8 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-[24px] font-bold tracking-[-0.02em] text-text-primary">
              Fin<span className="text-primary">Me</span>
            </span>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-[20px] font-semibold text-text-primary mb-1">Selamat Datang Kembali</h1>
          <p className="text-[14px] text-text-secondary">Masuk untuk melanjutkan ke dashboard Anda</p>
        </div>

        <form>
          <div className="flex flex-col gap-2 mb-4">
            <label className={formLabelClass} htmlFor="email">Email</label>
            <input type="email" id="email" className={formInputClass} placeholder="nama@email.com" required />
          </div>
          
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between items-center">
              <label className={formLabelClass} htmlFor="password">Kata Sandi</label>
              <a href="#" className="text-[12px] text-primary font-medium hover:underline">Lupa kata sandi?</a>
            </div>
            <input type="password" id="password" className={formInputClass} placeholder="••••••••" required />
          </div>

          <Link href="/dashboard" className={btnPrimaryClass}>
            Masuk
          </Link>
        </form>

        <div className="text-center text-[13px] text-text-secondary">
          Belum punya akun? <a href="#" className="text-primary font-medium hover:underline">Daftar sekarang</a>
        </div>
      </div>
    </div>
  );
}
