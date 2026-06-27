"use client";

import Link from "next/link";
import { BrandLogoIcon } from "@/components/icons";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const router = useRouter();
  const supabase = createClient();

  const cardClass = "bg-surface border border-border rounded-xl w-full max-w-[420px] p-8";
  const formLabelClass = "text-[13px] font-medium text-text-secondary";
  const formInputClass = "bg-surface-secondary border border-border rounded-lg px-4 py-2.5 text-[14px] text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all w-full";
  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-primary text-white hover:bg-primary-hover border-transparent shadow-[0_1px_2px_rgba(255,107,0,0.1)] hover:shadow-[0_4px_12px_rgba(255,107,0,0.25)] flex w-full justify-center min-h-[44px] mb-6";

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
    <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-bg p-6">
      <div className={cardClass}>
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2.5">
            <BrandLogoIcon width="32" height="32" aria-hidden="true" />
            <span className="text-[24px] font-bold tracking-[-0.02em] text-text-primary">
              Fin<span className="text-primary">Me</span>
            </span>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-[20px] font-semibold text-text-primary mb-1">
            {isLogin ? "Selamat Datang Kembali" : "Buat Akun Baru"}
          </h1>
          <p className="text-[14px] text-text-secondary">
            {isLogin ? "Masuk untuk melanjutkan ke dashboard Anda" : "Daftar untuk mengelola keuangan Anda"}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-danger-surface text-danger text-[13px] border border-danger/20">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <label className={formLabelClass} htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className={formInputClass} 
              placeholder="nama@email.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between items-center">
              <label className={formLabelClass} htmlFor="password">Kata Sandi</label>
              {isLogin && <a href="#" className="text-[12px] text-primary font-medium hover:underline">Lupa kata sandi?</a>}
            </div>
            <input 
              type="password" 
              id="password" 
              className={formInputClass} 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-2 mb-6">
              <label className={formLabelClass} htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className={formInputClass} 
                placeholder="••••••••" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
              />
            </div>
          )}

          <button type="submit" className={btnPrimaryClass} disabled={isLoading}>
            {isLoading ? "Memproses..." : (isLogin ? "Masuk" : "Daftar")}
          </button>
        </form>

        <div className="text-center text-[13px] text-text-secondary">
          {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
          <button 
            type="button" 
            className="text-primary font-medium hover:underline cursor-pointer bg-transparent border-none"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
              setConfirmPassword("");
            }}
          >
            {isLogin ? "Daftar sekarang" : "Masuk di sini"}
          </button>
        </div>
      </div>
    </div>
  );
}
