"use client";

export default function MobileHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex lg:hidden fixed top-0 left-0 right-0 h-[56px] bg-surface border-b border-border px-4 z-50 items-center justify-between">
      <div className="flex items-center gap-2.5 p-0 border-none m-0">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="shrink-0">
          <rect width="28" height="28" rx="8" fill="#FF6B00"/>
          <path d="M8 10h12M8 14h8M8 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="text-[18px] font-bold tracking-[-0.02em]">Fin<span className="text-primary">Me</span></span>
      </div>
      <button className="w-[44px] h-[44px] flex items-center justify-center rounded-sm text-text-secondary hover:bg-surface-secondary transition-colors duration-150" onClick={onOpenSidebar} aria-label="Buka menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[20px] h-[20px]">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
