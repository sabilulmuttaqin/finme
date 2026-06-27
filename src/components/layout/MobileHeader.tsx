"use client";

export default function MobileHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="mobile-header">
      <div className="sidebar-brand">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect width="28" height="28" rx="8" fill="#FF6B00"/>
          <path d="M8 10h12M8 14h8M8 18h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>Fin<span className="dot">Me</span></span>
      </div>
      <button className="hamburger" onClick={onOpenSidebar} aria-label="Buka menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </div>
  );
}
