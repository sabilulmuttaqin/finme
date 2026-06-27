"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { PlusIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon, TrendingUpIcon, EditIcon, TrashIcon, LaptopIcon, WarningIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

const AddCategoryModal = dynamic(() => import("@/components/AddCategoryModal"), { ssr: false });

export default function Kategori() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<{ name: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [txRes, catRes] = await Promise.all([
        supabase.from('transactions').select('*'),
        supabase.from('categories').select('*')
      ]);
      if (txRes.data) setTransactions(txRes.data);
      if (catRes.data) setDbCategories(catRes.data);
      setIsLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel('public:kategori')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshTrigger]);

  const categories = useMemo(() => {
    const catMap: Record<string, any> = {};
    
    dbCategories.forEach(cat => {
      catMap[cat.name] = { ...cat, total: 0, count: 0 };
    });

    transactions.forEach(t => {
      if (!catMap[t.category]) {
        catMap[t.category] = { name: t.category, total: 0, count: 0, type: t.type, icon: null, color: null };
      }
      catMap[t.category].total += t.amount;
      catMap[t.category].count += 1;
    });

    return Object.values(catMap).sort((a: any, b: any) => b.total - a.total);
  }, [transactions, dbCategories]);

  const formatRp = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const getIconForCategory = (name: string, iconKey: string | null) => {
    if (iconKey === 'coffee') return <CoffeeIcon />;
    if (iconKey === 'truck') return <TruckIcon />;
    if (iconKey === 'book') return <BookIcon />;
    if (iconKey === 'cart') return <CartIcon />;
    if (iconKey === 'laptop') return <LaptopIcon />;
    const n = name.toLowerCase();
    if (n.includes('makan') || n.includes('minum') || n.includes('kopi')) return <CoffeeIcon />;
    if (n.includes('transpor') || n.includes('bensin') || n.includes('grab')) return <TruckIcon />;
    if (n.includes('langgan') || n.includes('spotify') || n.includes('netflix')) return <BookIcon />;
    if (n.includes('belanja') || n.includes('pasar') || n.includes('supermarket')) return <CartIcon />;
    return <TrendingUpIcon />;
  };

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
      await supabase.from('categories').delete().eq('user_id', user.id).eq('name', deleteTarget);
      setRefreshTrigger(prev => prev + 1);
      showToast("Kategori berhasil dihapus!");
    }
    setDeleteTarget(null);
  };

  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[14px] transition-all duration-200 cursor-pointer bg-primary text-white border border-primary shadow-[0_1px_2px_rgba(255,107,0,0.1)] hover:bg-primary-hover hover:border-primary-hover hover:shadow-[0_4px_12px_rgba(255,107,0,0.2)] hover:-translate-y-[1px] [&>svg]:w-4 [&>svg]:h-4";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Kelola Kategori</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Tambah, edit, dan atur kategori transaksi</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className={btnPrimaryClass} type="button" onClick={openAdd}>
            <PlusIcon aria-hidden="true" />
            Tambah Kategori
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Daftar kategori">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-[13px] text-text-tertiary">Memuat kategori...</div>
        ) : categories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[13px] text-text-tertiary">Kategori belum tersedia. Ketik pengeluaran di Telegram!</div>
        ) : categories.map((cat, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:shadow-sm transition-all duration-200 group">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 [&>svg]:w-6 [&>svg]:h-6"
                  style={{
                    backgroundColor: cat.color ? `${cat.color}20` : (cat.type === 'income' ? 'var(--color-success-surface)' : 'var(--color-primary-surface)'),
                    color: cat.color || (cat.type === 'income' ? 'var(--color-success)' : 'var(--color-primary)')
                  }}
                  aria-hidden="true"
                >
                  {getIconForCategory(cat.name, cat.icon)}
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-md flex items-center justify-center text-text-tertiary hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer border-none bg-transparent" aria-label={`Edit kategori ${cat.name}`} onClick={() => openEdit(cat.name)}>
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-md flex items-center justify-center text-text-tertiary hover:bg-danger-surface hover:text-danger transition-colors cursor-pointer border-none bg-transparent" aria-label={`Hapus kategori ${cat.name}`} onClick={() => handleDeleteConfirm(cat.name)}>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-[17px] font-semibold text-text-primary mb-1 capitalize truncate" title={cat.name}>{cat.name}</div>
              <div className="text-[13px] text-text-secondary flex items-center justify-between mb-4">
                <span>{cat.count} transaksi</span>
                <span className={cat.type === 'income' ? 'text-success' : 'text-danger'}>{cat.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[12px] text-text-tertiary uppercase tracking-wider font-medium">Total Perputaran</span>
                <span className={`font-mono text-[15px] font-bold ${cat.type === 'income' ? 'text-success' : 'text-text-primary'}`}>
                  {cat.type === 'income' ? '+' : ''}{formatRp(cat.total)}
                </span>
              </div>
            </div>
          ))}
      </section>

      <AddCategoryModal 
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

      {toast && (
        <div className="fixed top-6 right-6 z-[200] animate-slide-in-right">
          <div className="bg-surface border border-success/20 text-success px-6 py-3.5 rounded-xl shadow-[0_4px_12px_rgba(22,163,74,0.1)] flex items-center gap-3 text-[14.5px] font-medium">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/></svg>
            {toast}
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-200" role="dialog" aria-modal="true" onClick={(e) => {
          if (e.target === e.currentTarget) setDeleteTarget(null);
        }}>
          <div className="bg-surface rounded-2xl w-full max-w-[400px] shadow-xl p-6 transform transition-transform duration-200 scale-100">
            <div className="w-12 h-12 rounded-full bg-danger-surface text-danger flex items-center justify-center mb-4 [&>svg]:w-6 [&>svg]:h-6">
              <WarningIcon />
            </div>
            <h2 className="text-[18px] font-semibold text-text-primary mb-2">Hapus Kategori?</h2>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">
              Apakah Anda yakin ingin menghapus kategori <span className="font-semibold text-text-primary capitalize">"{deleteTarget}"</span>? Kategori ini akan hilang dari daftar jika tidak ada transaksi yang menggunakannya.
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
