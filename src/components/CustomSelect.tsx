"use client";

import { useState, useRef, useEffect } from "react";

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string; // e.g. "Pengeluaran" or "Pemasukan"
}

interface CustomSelectProps {
  id?: string;
  value: string;
  options: DropdownOption[];
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function CustomSelect({ id, value, options, onChange, disabled, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        className={`flex items-center justify-between w-full px-3 py-2.5 border rounded-sm text-[13px] bg-surface text-text-primary transition-all duration-150 min-h-[44px] focus:outline-none ${
          isOpen
            ? "border-primary ring-[3px] ring-primary-surface"
            : "border-border hover:border-primary/40"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selected ? (
            <span className="capitalize truncate text-text-primary">{selected.label}</span>
          ) : (
            <span className="text-text-tertiary">{placeholder || "Pilih..."}</span>
          )}
          {selected?.sublabel && (
            <span className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              selected.sublabel === "Pemasukan"
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }`}>
              {selected.sublabel}
            </span>
          )}
        </div>
        <span className={`shrink-0 text-text-tertiary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-[200] animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="py-1.5 max-h-[220px] overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-[13px] text-text-tertiary">Tidak ada pilihan</div>
            ) : options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-[13px] transition-colors cursor-pointer ${
                  value === opt.value
                    ? "bg-primary-surface text-primary font-medium"
                    : "text-text-primary hover:bg-surface-secondary"
                }`}
                role="option"
                aria-selected={value === opt.value}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="capitalize truncate">{opt.label}</span>
                  {opt.sublabel && (
                    <span className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      opt.sublabel === "Pemasukan"
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}>
                      {opt.sublabel}
                    </span>
                  )}
                </div>
                {value === opt.value && (
                  <span className="shrink-0 text-primary"><CheckIcon /></span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
