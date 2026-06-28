"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<"loading" | "success" | "exiting">("loading");

  useEffect(() => {
    // Simulasi loading sebentar biar animasinya kerasa
    const loadingTimer = setTimeout(() => {
      setPhase("success");
    }, 1200);

    // Mulai animasi transisi keluar (fade out)
    const exitTimer = setTimeout(() => {
      setPhase("exiting");
    }, 2400);

    // Redirect setelah animasi selesai
    const redirectTimer = setTimeout(() => {
      const nextUrl = searchParams.get("next") || "/dashboard";
      router.push(nextUrl);
    }, 2900);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(exitTimer);
      clearTimeout(redirectTimer);
    };
  }, [router, searchParams]);

  return (
    <div className="h-[100dvh] w-screen flex flex-col items-center justify-center bg-surface font-ui text-text-primary">
      <div className={`flex flex-col items-center text-center max-w-sm px-6 transition-all duration-500 ease-in-out ${phase === "exiting" ? "opacity-0 -translate-y-6 scale-95 blur-sm" : "animate-in fade-in slide-in-from-bottom-8 duration-700"}`}>
        
        {/* Animated Icon Container */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          
          {/* Background Pulse */}
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-slow"></div>
          
          {/* Circular Progress (Loading) */}
          {phase === "loading" && (
            <svg className="absolute inset-0 w-full h-full text-primary animate-spin-slow" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" strokeDasharray="283" strokeDashoffset="100" strokeLinecap="round" opacity="0.8" />
            </svg>
          )}

          {/* Success Checkmark (Success) */}
          {phase === "success" && (
            <div className="absolute inset-0 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 animate-in zoom-in duration-300">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}
          
          {/* Default Icon inside Loading */}
          {phase === "loading" && (
            <svg className="w-10 h-10 text-primary animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
          )}
        </div>

        {/* Text Details */}
        <h2 className="text-2xl font-bold mb-3">
          {phase === "loading" ? "Mengamankan Sesi..." : "Login Berhasil!"}
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          {phase === "loading" 
            ? "Tunggu sebentar ya, kami sedang memverifikasi kredensial Anda dan menyiapkan dasbor." 
            : "Sesi Anda telah diaktifkan. Anda akan segera dialihkan ke dasbor aplikasi."}
        </p>

      </div>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={<div className="h-[100dvh] w-screen flex items-center justify-center bg-surface"></div>}>
      <AuthSuccessContent />
    </Suspense>
  );
}
