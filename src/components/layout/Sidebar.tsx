"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: { isOpen: boolean, onClose: () => void, isCollapsed: boolean, onToggleCollapse: () => void }) {
  const pathname = usePathname();
  const [isPengaturanOpen, setIsPengaturanOpen] = useState(pathname.startsWith('/pengaturan'));

  const navItemBase = "flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-[13px] font-medium text-text-secondary transition-colors duration-150 min-h-[44px] hover:bg-surface-secondary hover:text-text-primary [&>svg]:shrink-0 [&>svg]:w-[18px] [&>svg]:h-[18px]";
  const navItemActive = "bg-primary-surface text-primary font-semibold";

  const isActive = (path: string) => {
    return pathname === path ? `${navItemBase} ${navItemActive}` : navItemBase;
  };

  return (
    <>
      {/* Sidebar Backdrop */}
      <div 
        className={`fixed inset-0 bg-stone-900/50 z-40 flex items-center justify-center p-4 opacity-0 transition-opacity duration-200 lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none'}`} 
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <nav 
        className={`w-[260px] bg-surface border-r border-border py-6 px-4 flex flex-col gap-2 fixed top-0 left-0 bottom-0 z-40 overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} 
        aria-label="Navigasi utama"
      >
        {/* Brand */}
        <div className="flex items-center justify-between pb-5 mb-2 border-b border-border px-2">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="shrink-0">
              <rect width="28" height="28" rx="8" fill="#FF6B00"/>
              <path d="M8 10h12M8 14h8M8 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-[18px] font-bold tracking-[-0.02em]">Fin<span className="text-primary">Me</span></span>
          </div>
          <button type="button" onClick={onToggleCollapse} className="bg-none border-none cursor-pointer text-text-tertiary p-1 flex items-center justify-center hover:bg-surface-secondary rounded-md" aria-label="Toggle Sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/>
            </svg>
          </button>
        </div>

        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-tertiary pt-4 px-3 pb-1.5"><span>Menu</span></div>
        <Link href="/dashboard" className={isActive("/dashboard")} aria-current={pathname === "/dashboard" ? "page" : undefined}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          <span>Dashboard</span>
        </Link>
        <Link href="/transaksi" className={isActive("/transaksi")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span>Transaksi</span>
        </Link>
        <Link href="/anggaran" className={isActive("/anggaran")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>
          <span>Anggaran</span>
        </Link>
        <Link href="/analitik" className={isActive("/analitik")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span>Analitik</span>
        </Link>
        <Link href="/kategori" className={isActive("/kategori")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          <span>Kategori</span>
        </Link>

        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-tertiary pt-4 px-3 pb-1.5"><span>Lainnya</span></div>
        <div className="flex flex-col">
          <button 
            type="button" 
            className={`${navItemBase} ${pathname.startsWith('/pengaturan') ? navItemActive : ''} w-full justify-between border-none cursor-pointer font-inherit bg-transparent`} 
            onClick={() => {
              if (isCollapsed) {
                onToggleCollapse();
                setIsPengaturanOpen(true);
              } else {
                setIsPengaturanOpen(!isPengaturanOpen);
              }
            }}
          >
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span>Pengaturan</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isPengaturanOpen && !isCollapsed ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {isPengaturanOpen && !isCollapsed && (
            <div className="pl-8 flex flex-col gap-1 mt-1">
              <Link href="/pengaturan/profil" className={`${pathname === "/pengaturan/profil" ? navItemActive : ''} ${navItemBase} min-h-[36px] bg-transparent hover:bg-surface-secondary`}>
                <span>Edit Profil</span>
              </Link>
              <Link href="/pengaturan/umum" className={`${pathname === "/pengaturan/umum" ? navItemActive : ''} ${navItemBase} min-h-[36px] bg-transparent hover:bg-surface-secondary`}>
                <span>Umum (General)</span>
              </Link>
            </div>
          )}
        </div>

        <div className="flex-1"></div>
        <Link href="/login" className={`${navItemBase} text-danger mt-2 border-t border-border pt-4 rounded-none hover:bg-danger-surface hover:text-danger`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>Keluar</span>
        </Link>
      </nav>
    </>
  );
}
