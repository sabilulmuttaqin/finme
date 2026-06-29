"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const BrandLogo = () => (
  <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-logo" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1E5BFF"/>
        <stop offset="100%" stopColor="#003EBA"/>
      </linearGradient>
    </defs>
    <path d="M120 150 Q135 120 165 120 H395 L360 180 Q350 198 325 198 H100 Z" fill="#1D5AFF"/>
    <path d="M235 210 C170 210 150 255 150 310 C150 355 170 395 205 445 L245 505 L285 445 C255 395 235 355 235 315 C235 270 255 245 290 245 H350 C375 245 390 235 400 215 L410 198 H255 Z" fill="url(#grad-logo)"/>
  </svg>
);

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const router = useRouter();
  const supabase = createClient();

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const translateError = (msg: string) => {
    if (msg.includes("Email not confirmed")) return "Email belum dikonfirmasi. Cek inbox email kamu dan klik link verifikasi.";
    if (msg.includes("Invalid login credentials")) return "Email atau kata sandi salah.";
    if (msg.includes("User already registered")) return "Email ini sudah terdaftar. Silakan masuk.";
    if (msg.includes("Password should be")) return "Kata sandi minimal 6 karakter.";
    if (msg.includes("Unable to validate")) return "Sesi tidak valid. Silakan coba lagi.";
    if (msg.includes("Token has expired or is invalid")) return "Kode OTP salah atau sudah kedaluwarsa.";
    return msg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (showOtpInput) {
        // Handle OTP verification
        const { error } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: "signup"
        });
        
        if (error) throw error;
        
        showSuccess("Email berhasil diverifikasi! Mengalihkan ke dashboard...");
        setTimeout(() => router.push("/dashboard"), 1500);
        return;
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        if (password !== confirmPassword) {
          throw new Error("Kata sandi tidak cocok.");
        }
        
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        if (data.user) {
          // Tampilkan input OTP
          showSuccess("Kode OTP telah dikirim ke email Anda.");
          setShowOtpInput(true);
        }
      }
    } catch (err: any) {
      setErrorMsg(translateError(err.message || "Terjadi kesalahan."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(translateError(err.message || "Gagal masuk dengan Google."));
    }
  };

  return (
    <div className="h-[100dvh] w-screen flex flex-col md:flex-row text-text-primary bg-surface overflow-hidden font-ui">
      
      {/* Left Side: Visuals */}
      <div className="hidden md:flex w-[55%] h-full bg-surface-secondary p-12 flex-col justify-between relative overflow-hidden border-r border-border">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 z-10 stagger-1">
              <BrandLogo />
              <span className="font-bold text-xl tracking-wide">FINME</span>
          </div>

          {/* Floating Graphics Area */}
          <div className="relative flex-1 flex items-center justify-center mt-8 mb-8">
              
              {/* Current Balance Card */}
              <div className="absolute top-[15%] left-[5%] glass-card p-6 rounded-3xl animate-float-1 z-10 w-56">
                  <div className="w-10 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                  </div>
                  <p className="text-[11px] text-text-secondary font-bold mb-2 uppercase tracking-widest">Saldo Saat Ini</p>
                  <p className="text-2xl font-bold text-primary">Rp 24.359</p>
              </div>

              {/* New Transaction Card */}
              <div className="absolute bottom-[20%] left-[10%] glass-card p-6 rounded-3xl animate-float-2 z-10 border border-dashed border-border bg-surface/70 w-64 text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  </div>
                  <p className="text-[15px] font-bold mb-1">Catat Transaksi</p>
                  <p className="text-sm text-text-tertiary">Langsung dari Telegram anda</p>
              </div>

              {/* Pie Chart Card */}
              <div className="absolute right-[5%] top-[35%] glass-card p-5 rounded-3xl animate-float-3 z-20 shadow-xl shadow-text-primary/5">
                  <div className="relative w-36 h-36">
                      {/* Simplified CSS Pie Chart */}
                      <div className="w-full h-full rounded-full border-[16px] border-primary border-r-success border-b-danger border-l-warning flex items-center justify-center bg-surface shadow-inner cursor-pointer hover:scale-105 transition-transform">
                          <div className="text-center mt-1">
                              <span className="block text-2xl font-bold">34%</span>
                              <span className="block text-[11px] text-text-secondary font-bold mt-0.5">Makanan</span>
                          </div>
                      </div>
                  </div>
              </div>

          </div>

          {/* Left Footer Text */}
          <div className="z-10 stagger-2">
              <h2 className="text-3xl font-bold mb-3">Selamat datang<br />kembali!</h2>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">Mulai kelola keuangan Anda dengan lebih cepat, cermat, dan terstruktur bersama FinMe.</p>
          </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full h-full md:w-[45%] p-8 md:p-14 flex flex-col justify-center bg-surface overflow-y-auto">
          
          <div className="max-w-[340px] w-full mx-auto">
              <h2 className="text-3xl font-bold mb-3 stagger-1">
                {showOtpInput ? "Verifikasi Email" : (isLogin ? "Welcome back!" : "Create an account")}
              </h2>
              <p className="text-text-secondary text-sm mb-8 stagger-2">
                {showOtpInput 
                  ? "Masukkan kode OTP yang kami kirim ke email Anda." 
                  : "Masuk menggunakan akun Google Anda"}
              </p>

              {/* Success Toast */}
              {successMsg && (
                <div className="mb-6 p-3 rounded-xl bg-success/10 text-success text-[13px] border border-success/20 stagger-2 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/></svg>
                  {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-3 rounded-xl bg-danger-surface text-danger text-[13px] border border-danger/20 stagger-2 font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {showOtpInput ? (
                    // OTP Form
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="stagger-3">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                                </div>
                                <input 
                                  type="text" 
                                  placeholder="Kode OTP 6 Digit" 
                                  className="block w-full pl-12 pr-4 py-3.5 bg-surface-secondary border border-transparent rounded-xl text-sm focus:bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-text-tertiary font-bold text-text-primary tracking-[0.3em] text-center" 
                                  required 
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  maxLength={6}
                                />
                            </div>
                        </div>

                        <div className="pt-4 stagger-4 flex flex-col gap-3">
                            <button type="submit" disabled={isLoading || otp.length < 6} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/30 focus:ring-4 focus:ring-primary/20 outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                                {isLoading ? "Memverifikasi..." : "Verifikasi OTP"}
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                setShowOtpInput(false);
                                setOtp("");
                              }} 
                              className="w-full text-sm font-bold text-text-secondary hover:text-primary transition-colors py-2"
                            >
                                Kembali
                            </button>
                        </div>
                    </div>
                  ) : (
                    // Login / Register Form
                    <>
                      {/* Maintenance Banner */}
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-warning-surface border border-warning/30 stagger-3">
                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <p className="text-[12px] text-warning font-medium leading-relaxed">
                          Login dengan email & kata sandi sedang dalam maintenance. Gunakan <span className="font-bold">Google</span> untuk masuk.
                        </p>
                      </div>

                      {/* Email Input — disabled */}
                      <div className="stagger-3 opacity-50 cursor-not-allowed select-none">
                          <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <svg className="h-5 w-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                              </div>
                              <input 
                                type="email" 
                                placeholder="contoh@email.com" 
                                className="block w-full pl-12 pr-4 py-3.5 bg-surface-secondary border border-transparent rounded-xl text-sm outline-none placeholder-text-tertiary font-bold text-text-primary cursor-not-allowed" 
                                disabled
                                tabIndex={-1}
                              />
                          </div>
                      </div>

                      {/* Password Input — disabled */}
                      <div className="stagger-3 opacity-50 cursor-not-allowed select-none" style={{ animationDelay: '0.35s' }}>
                          <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <svg className="h-5 w-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                              </div>
                              <input 
                                type="password" 
                                placeholder="Kata sandi" 
                                className="block w-full pl-12 pr-4 py-3.5 bg-surface-secondary border border-transparent rounded-xl text-sm outline-none placeholder-text-tertiary font-bold text-text-primary cursor-not-allowed" 
                                disabled
                                tabIndex={-1}
                              />
                          </div>
                      </div>

                      {/* Submit Button — disabled */}
                      <div className="pt-2 stagger-4 opacity-50">
                          <button 
                            type="button" 
                            disabled 
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl cursor-not-allowed opacity-70"
                          >
                            {isLogin ? "Masuk" : "Daftar"}
                          </button>
                      </div>

                      {/* Divider */}
                      <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="flex-shrink-0 mx-4 text-text-tertiary text-[11px] font-bold uppercase tracking-wider">atau</span>
                        <div className="flex-grow border-t border-border"></div>
                      </div>
                    </>
                  )}
              </form>

              {/* Google Login — Primary action */}
              {!showOtpInput && (
                <div className="mb-6 stagger-3">
                  <button 
                    type="button" 
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-surface border border-border hover:bg-surface-secondary text-text-primary font-bold py-3.5 rounded-xl transition-all outline-none focus:ring-4 focus:ring-primary/20 shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Masuk dengan Google
                  </button>
                </div>
              )}

              {/* Signup Link */}
              {!showOtpInput && (
                <div className="mt-8 text-center stagger-4" style={{ animationDelay: '0.5s' }}>
                    <p className="text-[13px] text-text-secondary">
                        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                        <button 
                          type="button" 
                          className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer"
                          onClick={() => {
                            setIsLogin(!isLogin);
                            setErrorMsg("");
                            setSuccessMsg("");
                            setConfirmPassword("");
                            setShowOtpInput(false);
                            setOtp("");
                          }}
                        >
                          {isLogin ? "Daftar sekarang" : "Masuk di sini"}
                        </button>
                    </p>
                </div>
              )}
              
              {/* Copyright Footer */}
              <div className="mt-16 text-center text-[11px] font-bold text-text-tertiary tracking-wider stagger-4" style={{ animationDelay: '0.6s' }}>
                  &copy; {new Date().getFullYear()} FINME ALL RIGHTS RESERVED
              </div>

          </div>
      </div>

    </div>
  );
}
