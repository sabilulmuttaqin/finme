"use client";

import { useState, useRef, useEffect } from "react";

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export function FilterDropdown({ 
  label, 
  options, 
  value, 
  onChange 
}: { 
  label?: string, 
  options: string[], 
  value: string, 
  onChange: (val: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-surface border border-border shadow-sm rounded-lg px-3.5 py-2.5 hover:border-primary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer w-full md:w-auto min-w-[140px] justify-between"
      >
        <div className="flex items-center gap-1.5">
          {label && <span className="text-[12px] font-medium text-text-tertiary">{label}</span>}
          <span className="text-[13px] font-semibold text-text-primary">{value}</span>
        </div>
        <span className={`text-text-tertiary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-max min-w-full bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1.5 max-h-[260px] overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors cursor-pointer ${
                  value === opt 
                    ? 'bg-primary-surface text-primary font-medium' 
                    : 'text-text-primary hover:bg-surface-secondary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
