"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogoIcon, SidebarToggleIcon, GridIcon, DollarIcon, WalletIcon, BarChartIcon, TagIcon, SettingsIcon, ChevronDownIcon, LogoutIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: { isOpen: boolean, onClose: () => void, isCollapsed: boolean, onToggleCollapse: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isPengaturanOpen, setIsPengaturanOpen] = useState(pathname.startsWith('/pengaturan'));

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('lastActivity');
    router.push('/login');
  };

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
            <BrandLogoIcon aria-hidden="true" className="shrink-0" />
            <span className="text-[18px] font-bold tracking-[-0.02em]">Fin<span className="text-primary">Me</span></span>
          </div>
          <button type="button" onClick={onToggleCollapse} className="lg:hidden bg-none border-none cursor-pointer text-text-tertiary p-1 flex items-center justify-center hover:bg-surface-secondary rounded-md" aria-label="Toggle Sidebar">
            <SidebarToggleIcon className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-tertiary pt-4 px-3 pb-1.5"><span>Menu</span></div>
        <Link href="/dashboard" className={isActive("/dashboard")} aria-current={pathname === "/dashboard" ? "page" : undefined}>
          <GridIcon aria-hidden="true" />
          <span>Dashboard</span>
        </Link>
        <Link href="/transaksi" className={isActive("/transaksi")}>
          <DollarIcon aria-hidden="true" />
          <span>Transaksi</span>
        </Link>
        <Link href="/anggaran" className={isActive("/anggaran")}>
          <WalletIcon aria-hidden="true" />
          <span>Anggaran</span>
        </Link>
        <Link href="/analitik" className={isActive("/analitik")}>
          <BarChartIcon aria-hidden="true" />
          <span>Analitik</span>
        </Link>
        <Link href="/kategori" className={isActive("/kategori")}>
          <TagIcon aria-hidden="true" />
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
              <SettingsIcon aria-hidden="true" />
              <span>Pengaturan</span>
            </div>
            <ChevronDownIcon className={`transition-transform duration-200 ${isPengaturanOpen && !isCollapsed ? 'rotate-180' : ''}`} />
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
        <button onClick={handleLogout} className={`${navItemBase} text-danger mt-2 border-t border-border pt-4 rounded-none hover:bg-danger-surface hover:text-danger w-full justify-start cursor-pointer bg-transparent border-x-0 border-b-0`}>
          <LogoutIcon aria-hidden="true" />
          <span>Keluar</span>
        </button>
      </nav>
    </>
  );
}
