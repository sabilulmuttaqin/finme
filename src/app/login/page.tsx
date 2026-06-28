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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
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
          alert("Pendaftaran berhasil! Anda akan masuk sekarang.");
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
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
                {isLogin ? "Welcome back!" : "Create an account"}
              </h2>
              <p className="text-text-secondary text-sm mb-8 stagger-2">
                {isLogin ? "Mulai kelola keuanganmu sekarang juga" : "Daftar untuk mengelola keuangan Anda"}
              </p>

              {errorMsg && (
                <div className="mb-6 p-3 rounded-xl bg-danger-surface text-danger text-[13px] border border-danger/20 stagger-2 font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Email Input */}
                  <div className="stagger-3">
                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          </div>
                          <input 
                            type="email" 
                            placeholder="contoh@email.com" 
                            className="block w-full pl-12 pr-4 py-3.5 bg-surface-secondary border border-transparent rounded-xl text-sm focus:bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-text-tertiary font-bold text-text-primary" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                  </div>

                  {/* Password Input */}
                  <div className="stagger-3" style={{ animationDelay: '0.35s' }}>
                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                          </div>
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Kata sandi" 
                            className="block w-full pl-12 pr-12 py-3.5 bg-surface-secondary border border-transparent rounded-xl text-sm focus:bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-text-tertiary font-bold text-text-primary" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer bg-transparent border-none"
                            tabIndex={-1}
                          >
                              {showPassword ? (
                                <svg className="h-5 w-5 text-text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                              ) : (
                                <svg className="h-5 w-5 text-text-tertiary hover:text-text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                              )}
                          </button>
                      </div>
                      
                      {isLogin && (
                        <div className="flex justify-end mt-2">
                            <a href="#" className="text-[13px] text-primary hover:text-primary-dark font-bold transition-colors">Lupa password?</a>
                        </div>
                      )}
                  </div>

                  {/* Confirm Password Input (For Register) */}
                  {!isLogin && (
                    <div className="stagger-3" style={{ animationDelay: '0.4s' }}>
                      <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-text-tertiary group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                          </div>
                          <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Konfirmasi kata sandi" 
                            className="block w-full pl-12 pr-12 py-3.5 bg-surface-secondary border border-transparent rounded-xl text-sm focus:bg-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-text-tertiary font-bold text-text-primary" 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            minLength={6}
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer bg-transparent border-none"
                            tabIndex={-1}
                          >
                              {showConfirmPassword ? (
                                <svg className="h-5 w-5 text-text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                              ) : (
                                <svg className="h-5 w-5 text-text-tertiary hover:text-text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                              )}
                          </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4 stagger-4">
                      <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/30 focus:ring-4 focus:ring-primary/20 outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
                          {isLoading ? "Memproses..." : (isLogin ? "Masuk" : "Daftar")}
                      </button>
                  </div>

              </form>

              {/* Signup Link */}
              <div className="mt-8 text-center stagger-4" style={{ animationDelay: '0.5s' }}>
                  <p className="text-[13px] text-text-secondary">
                      {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                      <button 
                        type="button" 
                        className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setErrorMsg("");
                          setConfirmPassword("");
                        }}
                      >
                        {isLogin ? "Daftar sekarang" : "Masuk di sini"}
                      </button>
                  </p>
              </div>
              
              {/* Copyright Footer */}
              <div className="mt-16 text-center text-[11px] font-bold text-text-tertiary tracking-wider stagger-4" style={{ animationDelay: '0.6s' }}>
                  &copy; {new Date().getFullYear()} FINME ALL RIGHTS RESERVED
              </div>

          </div>
      </div>

    </div>
  );
}
