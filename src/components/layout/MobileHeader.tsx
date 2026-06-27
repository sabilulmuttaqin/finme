"use client";

import { BrandLogoIcon, MenuIcon } from "@/components/icons";

export default function MobileHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex lg:hidden fixed top-0 left-0 right-0 h-[56px] bg-surface border-b border-border px-4 z-50 items-center justify-between">
      <div className="flex items-center gap-2.5 p-0 border-none m-0">
        <BrandLogoIcon aria-hidden="true" className="shrink-0" />
        <span className="text-[18px] font-bold tracking-[-0.02em]">Fin<span className="text-primary">Me</span></span>
      </div>
      <button className="w-[44px] h-[44px] flex items-center justify-center rounded-sm text-text-secondary hover:bg-surface-secondary transition-colors duration-150" onClick={onOpenSidebar} aria-label="Buka menu">
        <MenuIcon className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
}
