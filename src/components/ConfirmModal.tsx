"use client";

import { TrashIcon } from "@/components/icons";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const iconBg = variant === "danger" ? "bg-danger-surface" : "bg-warning-surface";
  const iconColor = variant === "danger" ? "text-danger" : "text-warning";
  const confirmBtnClass =
    variant === "danger"
      ? "bg-danger hover:bg-danger/90 text-white"
      : "bg-warning hover:bg-warning/90 text-white";

  return (
    <div
      className="fixed inset-0 bg-stone-900/60 z-[200] flex items-center justify-center p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="bg-surface rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Icon header */}
        <div className="flex flex-col items-center px-6 pt-8 pb-5">
          <div className={`w-14 h-14 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center mb-4 [&>svg]:w-7 [&>svg]:h-7`}>
            <TrashIcon />
          </div>
          <h2 id="confirm-modal-title" className="text-[18px] font-bold text-text-primary text-center mb-2">
            {title}
          </h2>
          <p className="text-[13px] text-text-secondary text-center leading-relaxed">
            {description}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-0" />

        {/* Actions */}
        <div className="flex gap-3 p-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-lg font-medium text-[14px] bg-surface border border-border text-text-primary hover:bg-surface-secondary transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-[14px] transition-colors cursor-pointer ${confirmBtnClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
