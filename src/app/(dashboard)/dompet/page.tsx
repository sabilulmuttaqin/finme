"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { PlusIcon, WalletIcon, EditIcon, TrashIcon, WarningIcon } from "@/components/icons";
import Toast from "@/components/Toast";
import { createClient } from "@/lib/supabase/client";

const AddWalletModal = dynamic(() => import("@/components/AddWalletModal"), { ssr: false });

export default function Dompet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<{ name: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dbWallets, setDbWallets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const [txRes, walletRes] = await Promise.all([
        supabase.from('transactions').select('*').eq('user_id', user.id),
        supabase.from('wallets').select('*').eq('user_id', user.id)
      ]);
      if (txRes.data) setTransactions(txRes.data);
      if (walletRes.data) setDbWallets(walletRes.data);
      setIsLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel('public:wallets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wallets' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshTrigger]);

  const wallets = useMemo(() => {
    const walletMap: Record<string, any> = {};
    
    dbWallets.forEach(w => {
      walletMap[w.name] = { ...w, total: 0, count: 0 };
    });

    transactions.forEach(t => {
      const wName = t.wallet || "Cash";
      if (!walletMap[wName]) {
        walletMap[wName] = { name: wName, total: 0, count: 0, icon: null, color: null };
      }
      
      // Calculate total: income adds, expense subtracts
      if (t.type === 'income') {
        walletMap[wName].total += t.amount;
      } else {
        walletMap[wName].total -= t.amount;
      }
      walletMap[wName].count += 1;
    });

    return Object.values(walletMap).sort((a: any, b: any) => b.total - a.total);
  }, [transactions, dbWallets]);

  const formatRp = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const openAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEdit = (name: string) => {
    setEditData({ name });
    setIsModalOpen(true);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteConfirm = (name: string) => {
    setDeleteTarget(name);
  };

  const executeDelete = async () => {
    if (!deleteTarget) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Hapus dari tabel wallets
      await supabase.from('wallets').delete().eq('user_id', user.id).eq('name', deleteTarget);
      
      // Pindahkan semua transaksi ke 'Cash'
      await supabase.from('transactions').update({ wallet: 'Cash' }).eq('user_id', user.id).eq('wallet', deleteTarget);
      
      setRefreshTrigger(prev => prev + 1);
      showToast("Dompet dihapus & transaksi dipindah ke 'Cash'!");
    }
    setDeleteTarget(null);
  };

  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[14px] transition-all duration-200 cursor-pointer bg-primary text-white border border-primary shadow-[0_1px_2px_rgba(255,107,0,0.1)] hover:bg-primary-hover hover:border-primary-hover hover:shadow-[0_4px_12px_rgba(255,107,0,0.2)] hover:-translate-y-[1px] [&>svg]:w-4 [&>svg]:h-4";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Kelola Dompet</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Tambah, edit, dan atur metode pembayaran</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className={btnPrimaryClass} type="button" onClick={openAdd}>
            <PlusIcon aria-hidden="true" />
            Tambah Dompet
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Daftar dompet">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-[13px] text-text-tertiary">Memuat dompet...</div>
        ) : wallets.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[13px] text-text-tertiary">Belum ada dompet. Tambahkan sekarang!</div>
        ) : wallets.map((w, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:shadow-sm transition-all duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 [&>svg]:w-6 [&>svg]:h-6 bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <WalletIcon />
                </div>
                <div className="flex gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-md flex items-center justify-center text-text-tertiary hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer border-none bg-transparent" aria-label={`Edit dompet ${w.name}`} onClick={() => openEdit(w.name)}>
                    <EditIcon className="w-4 h-4" />
                  </button>
                  {w.name !== "Cash" && (
                    <button className="w-8 h-8 rounded-md flex items-center justify-center text-text-tertiary hover:bg-danger-surface hover:text-danger transition-colors cursor-pointer border-none bg-transparent" aria-label={`Hapus dompet ${w.name}`} onClick={() => handleDeleteConfirm(w.name)}>
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="text-[17px] font-semibold text-text-primary mb-1 capitalize truncate" title={w.name}>{w.name}</div>
              <div className="text-[13px] text-text-secondary flex items-center justify-between mb-4">
                <span>{w.count} transaksi</span>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[12px] text-text-tertiary uppercase tracking-wider font-medium">Saldo (Estimasi)</span>
                <span className={`font-mono text-[15px] font-bold ${w.total >= 0 ? 'text-success' : 'text-danger'}`}>
                  {w.total > 0 ? '+' : ''}{formatRp(w.total)}
                </span>
              </div>
            </div>
          ))}
      </section>

      <AddWalletModal 
        isOpen={isModalOpen} 
        onClose={(successMsg) => {
          setIsModalOpen(false);
          if (successMsg) {
            setRefreshTrigger(prev => prev + 1);
            showToast(successMsg);
          }
        }} 
        initialData={editData} 
      />

      {toast && <Toast message={toast} />}

      {deleteTarget && (
        <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-200" role="dialog" aria-modal="true" onClick={(e) => {
          if (e.target === e.currentTarget) setDeleteTarget(null);
        }}>
          <div className="bg-surface rounded-2xl w-full max-w-[400px] shadow-xl p-6 transform transition-transform duration-200 scale-100">
            <div className="w-12 h-12 rounded-full bg-danger-surface text-danger flex items-center justify-center mb-4 [&>svg]:w-6 [&>svg]:h-6">
              <WarningIcon />
            </div>
            <h2 className="text-[18px] font-semibold text-text-primary mb-2">Hapus Dompet?</h2>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus dompet <span className="font-semibold text-text-primary capitalize">"{deleteTarget}"</span>? Semua transaksi yang menggunakan dompet ini akan otomatis diubah menjadi dompet <span className="font-semibold text-text-primary">"Cash"</span>.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button 
                className="px-5 py-2.5 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer border-none bg-transparent"
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </button>
              <button 
                className="px-5 py-2.5 rounded-lg text-[13px] font-medium text-white bg-danger hover:bg-danger/90 transition-colors cursor-pointer border-none shadow-[0_1px_2px_rgba(220,38,38,0.1)]"
                onClick={executeDelete}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
