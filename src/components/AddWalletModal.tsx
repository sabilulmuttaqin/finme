"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, WalletIcon, CreditCardIcon, LandmarkIcon, ScanIcon, GiftIcon, SmartphoneIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

const ICONS = [
  { id: "wallet", svg: <WalletIcon /> },
  { id: "card", svg: <CreditCardIcon /> },
  { id: "bank", svg: <LandmarkIcon /> },
  { id: "qris", svg: <ScanIcon /> },
  { id: "phone", svg: <SmartphoneIcon /> },
  { id: "gift", svg: <GiftIcon /> },
];

export default function AddWalletModal({ isOpen, onClose, initialData }: { isOpen: boolean, onClose: (successMsg?: string) => void, initialData?: { name: string } | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0].id);
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  // Shared classes
  const formGroupClass = "flex flex-col gap-1.5 mb-4";
  const formLabelClass = "text-[12px] font-medium text-text-secondary";
  const formInputClass = "px-3 py-2.5 border border-border rounded-sm text-[13px] bg-surface text-text-primary transition-colors duration-150 min-h-[44px] focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary-surface placeholder:text-text-tertiary";
  const btnClass = "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-medium transition-colors duration-150 min-h-[44px] cursor-pointer";

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name);
      } else {
        setName("");
      }
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 opacity-100" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-surface rounded-2xl w-full max-w-[520px] shadow-lg transform transition-transform duration-200 translate-y-0 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pt-5 px-6 pb-0">
          <h2 id="modalTitle" className="text-[17px] font-semibold">{initialData ? 'Edit Dompet' : 'Tambah Dompet'}</h2>
          <button className="w-9 h-9 rounded-sm flex items-center justify-center text-text-tertiary transition-colors duration-150 hover:bg-surface-secondary hover:text-text-primary border-none bg-transparent cursor-pointer" onClick={() => onClose()} aria-label="Tutup modal">
            <CloseIcon className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="pt-5 px-6 pb-6">
          <form aria-label="Form dompet" onSubmit={async (e) => {
            e.preventDefault();
            setIsSaving(true);
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) throw new Error("User not found");

              if (initialData) {
                const { error } = await supabase.from('wallets').update({
                  name: name.trim(),
                  icon: selectedIcon
                }).eq('user_id', user.id).eq('name', initialData.name);
                if (error) throw error;
                onClose("Dompet berhasil diperbarui!");
              } else {
                const { error } = await supabase.from('wallets').insert([{
                  user_id: user.id,
                  name: name.trim(),
                  icon: selectedIcon
                }]);
                if (error) throw error;
                onClose("Dompet berhasil ditambahkan!");
              }
            } catch (err: any) {
              alert("Gagal menyimpan dompet: " + err.message);
            } finally {
              setIsSaving(false);
            }
          }}>
            <div className={formGroupClass}>
              <label className={formLabelClass} htmlFor="wallet-name">Nama Dompet <span className="text-danger" aria-label="wajib diisi">*</span></label>
              <input ref={inputRef} className={formInputClass} type="text" id="wallet-name" placeholder="Contoh: GoPay, DANA, BCA" required value={name} onChange={e => setName(e.target.value)} />
            </div>
            
            <div className={formGroupClass}>
              <label className={formLabelClass}>Ikon</label>
              <div className="grid grid-cols-6 gap-2" role="radiogroup" aria-label="Pilih ikon dompet">
                {ICONS.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    className={`w-full aspect-square rounded-sm border-2 flex items-center justify-center cursor-pointer transition-colors duration-150 [&>svg]:w-5 [&>svg]:h-5 ${selectedIcon === icon.id ? 'border-primary text-primary bg-primary-surface' : 'border-border text-text-secondary hover:border-primary-light hover:text-primary hover:bg-primary-surface'}`}
                    role="radio"
                    aria-checked={selectedIcon === icon.id}
                    onClick={() => setSelectedIcon(icon.id)}
                  >
                    {icon.svg}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button className={`${btnClass} bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary`} type="button" onClick={() => onClose()} disabled={isSaving}>Batal</button>
              <button className={`${btnClass} bg-primary text-white border-none hover:bg-primary-dark`} type="submit" disabled={isSaving}>
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
