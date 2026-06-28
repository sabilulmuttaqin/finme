"use client";

import { useState, useEffect } from "react";
import { TrendingUpIcon, TrendingDownIcon, SearchIcon, MessageIcon, InfoIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon, ChevronLeftIcon, ChevronRightIcon, WalletIcon, EditIcon, TrashIcon } from "@/components/icons";
import { FilterDropdown } from "@/components/FilterDropdown";
import { createClient } from "@/lib/supabase/client";
import Toast from "@/components/Toast";
import AddTransactionModal from "@/components/AddTransactionModal";

export default function Transaksi() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [filterBulan, setFilterBulan] = useState("Semua Waktu");
  const [filterKategori, setFilterKategori] = useState("Semua Kategori");
  const [filterUrutkan, setFilterUrutkan] = useState("Terbaru");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [editTxData, setEditTxData] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      let query = supabase.from('transactions').select('*').eq('user_id', user.id);
      
      if (activeTab === 'Pemasukan') query = query.eq('type', 'income');
      if (activeTab === 'Pengeluaran') query = query.eq('type', 'expense');
      
      if (filterKategori !== 'Semua Kategori') query = query.eq('category', filterKategori);
      
      if (searchQuery) query = query.or(`description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`);

      if (filterUrutkan === 'Terbaru') query = query.order('created_at', { ascending: false });
      if (filterUrutkan === 'Terlama') query = query.order('created_at', { ascending: true });
      if (filterUrutkan === 'Terbesar') query = query.order('amount', { ascending: false });
      if (filterUrutkan === 'Terkecil') query = query.order('amount', { ascending: true });

      if (filterUrutkan === 'Terkecil') query = query.order('amount', { ascending: true });

      if (filterBulan && filterBulan !== 'Semua Waktu') {
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const parts = filterBulan.split(" ");
        if (parts.length === 2) {
          const monthIdx = monthNames.indexOf(parts[0]);
          const year = parseInt(parts[1]);
          if (monthIdx !== -1 && !isNaN(year)) {
            const startDate = new Date(year, monthIdx, 1).toISOString();
            const endDate = new Date(year, monthIdx + 1, 0, 23, 59, 59, 999).toISOString();
            query = query.gte('created_at', startDate).lte('created_at', endDate);
          }
        }
      }

      const { data } = await query;
      if (data) setTransactions(data);
      setIsLoading(false);
    };

    fetchTransactions();

    const channel = supabase
      .channel('public:transactions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
        fetchTransactions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeTab, filterBulan, filterKategori, filterUrutkan, searchQuery]);

  const handleDeleteTx = async () => {
    if (!deleteModalId) return;
    const { error } = await supabase.from('transactions').delete().eq('id', deleteModalId);
    if (!error) {
      setTransactions(transactions.filter(t => t.id !== deleteModalId));
      setToast("Transaksi berhasil dihapus");
      setTimeout(() => setToast(null), 3000);
    }
    setDeleteModalId(null);
  };
  
  const txPageItemClass = "group grid grid-cols-[1fr_auto] md:grid-cols-[100px_1fr_120px_120px_140px_80px] gap-4 px-6 py-4 items-center border-b border-border-light hover:bg-surface-secondary/50 transition-colors duration-150 last:border-b-0 cursor-pointer";
  const txIconClass = "w-10 h-10 rounded-full flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5";
  const txIconExpenseClass = `${txIconClass} bg-danger-surface text-danger`;
  const txIconIncomeClass = `${txIconClass} bg-success-surface text-success`;

  const pageBtnClass = "w-8 h-8 rounded-md flex items-center justify-center text-[13px] font-medium text-text-secondary transition-colors duration-200 hover:bg-surface-secondary hover:text-text-primary [&>svg]:w-4 [&>svg]:h-4";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Transaksi</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Riwayat semua transaksi keuangan</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="flex items-center p-1 bg-surface-secondary rounded-lg border border-border/60 shadow-sm w-full md:w-auto overflow-x-auto">
            <button className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap ${activeTab === 'Semua' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'}`} type="button" onClick={() => setActiveTab('Semua')}>Semua</button>
            <button className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap [&>svg]:w-4 [&>svg]:h-4 ${activeTab === 'Pemasukan' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'}`} type="button" onClick={() => setActiveTab('Pemasukan')}>
              <TrendingUpIcon aria-hidden="true" />
              Pemasukan
            </button>
            <button className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap [&>svg]:w-4 [&>svg]:h-4 ${activeTab === 'Pengeluaran' ? 'bg-surface shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'}`} type="button" onClick={() => setActiveTab('Pengeluaran')}>
              <TrendingDownIcon aria-hidden="true" />
              Pengeluaran
            </button>
          </div>
          <div className="relative flex items-center w-full md:w-auto [&>svg]:absolute [&>svg]:left-3 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-text-tertiary [&>svg]:pointer-events-none">
            <SearchIcon aria-hidden="true" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface border border-border shadow-sm rounded-lg pl-9 pr-4 py-2.5 text-[13px] text-text-primary w-full md:w-[260px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-text-tertiary" 
              placeholder="Cari transaksi..." 
              aria-label="Cari transaksi" 
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center gap-3 mb-6 w-full">
        <FilterDropdown 
          label="Bulan" 
          value={filterBulan} 
          onChange={setFilterBulan} 
          options={["Semua Waktu", "Juni 2026", "Mei 2026", "April 2026", "Maret 2026", "Februari 2026", "Januari 2026"]} 
        />
        <FilterDropdown 
          label="Kategori" 
          value={filterKategori} 
          onChange={setFilterKategori} 
          options={["Semua Kategori", "Makanan", "Transportasi", "Langganan", "Belanja", "Pemasukan", "Lainnya"]} 
        />
        <FilterDropdown 
          label="Urutkan" 
          value={filterUrutkan} 
          onChange={setFilterUrutkan} 
          options={["Terbaru", "Terlama", "Terbesar", "Terkecil"]} 
        />
      </div>

      <section className="bg-surface border border-border rounded-xl" style={{overflow: 'hidden'}} aria-label="Daftar transaksi">
        <div style={{padding: '20px 24px 0'}}>
          <div className="flex items-center justify-between py-4 border-b border-border">
            <span className="text-[13px] text-text-secondary">Menampilkan <span className="font-semibold text-text-primary">{transactions.length}</span> transaksi</span>
            <span className="font-semibold text-text-primary">{filterBulan}</span>
          </div>
        </div>

        <div className="w-full">
          <div className="hidden md:grid grid-cols-[100px_1fr_120px_120px_140px_80px] gap-4 px-6 py-3 bg-surface-secondary border-b border-border text-[12px] font-medium text-text-tertiary uppercase tracking-wider items-center">
            <span>Tanggal</span>
            <span>Deskripsi</span>
            <span>Kategori</span>
            <span>Sumber</span>
            <span style={{textAlign: 'right'}}>Jumlah</span>
            <span></span>
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <div className="py-12 text-center text-[13px] text-text-tertiary">Memuat transaksi...</div>
            ) : transactions.length === 0 ? (
              <div className="py-12 text-center text-[13px] text-text-tertiary">Tidak ada transaksi ditemukan.</div>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className={txPageItemClass}>
                  <span className="hidden md:block text-[13px] text-text-tertiary font-mono whitespace-nowrap">
                    {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={tx.type === 'income' ? txIconIncomeClass : txIconExpenseClass} aria-hidden="true">
                      {tx.type === 'income' ? <TrendingUpIcon /> : <WalletIcon />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-medium text-text-primary truncate capitalize">{tx.description || tx.category}</div>
                      <div className="block md:hidden text-[12px] text-text-tertiary mt-0.5 truncate capitalize">{tx.category} &middot; {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</div>
                    </div>
                  </div>
                  <span className="hidden md:inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-secondary text-text-secondary whitespace-nowrap max-w-max capitalize">{tx.category}</span>
                  <span className="hidden md:flex items-center gap-1.5 text-[12px] text-text-tertiary [&>svg]:w-3.5 [&>svg]:h-3.5">
                    {tx.is_manual_web ? <InfoIcon aria-hidden="true" /> : <MessageIcon aria-hidden="true" />}
                    {tx.is_manual_web ? 'Manual' : 'Telegram'}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <div className={`text-right font-mono tabular-nums text-[14px] font-semibold whitespace-nowrap ${tx.type === 'income' ? 'text-success' : 'text-text-primary'}`}>
                      {tx.type === 'income' ? '+' : '-'}Rp{tx.amount.toLocaleString('id-ID')}
                    </div>
                  </div>
                  
                  {/* Action Buttons always visible */}
                  <div className="flex items-center gap-1 justify-end ml-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditTxData(tx); }}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-text-tertiary hover:bg-surface-secondary hover:text-text-primary transition-colors cursor-pointer border-none bg-transparent"
                      type="button"
                      aria-label="Edit"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setDeleteModalId(tx.id); }}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-text-tertiary hover:bg-danger-surface hover:text-danger transition-colors cursor-pointer border-none bg-transparent"
                      type="button"
                      aria-label="Hapus"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <nav className="flex items-center justify-center gap-2 mt-8 mb-4" aria-label="Navigasi halaman">
        <button className={`${pageBtnClass} opacity-50 cursor-not-allowed hover:bg-transparent hover:text-text-secondary`} aria-label="Halaman sebelumnya" disabled>
          <ChevronLeftIcon aria-hidden="true" />
        </button>
        <button className={`${pageBtnClass} bg-primary text-white hover:bg-primary hover:text-white`} aria-label="Halaman 1" aria-current="page">1</button>
        <button className={pageBtnClass} aria-label="Halaman 2">2</button>
        <button className={pageBtnClass} aria-label="Halaman 3">3</button>
        <span className="text-text-tertiary px-1" aria-hidden="true">...</span>
        <button className={pageBtnClass} aria-label="Halaman 12">12</button>
        <button className={pageBtnClass} aria-label="Halaman selanjutnya">
          <ChevronRightIcon aria-hidden="true" />
        </button>
      </nav>

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl w-full max-w-[400px] shadow-lg p-6 text-center">
            <h2 className="text-[17px] font-semibold text-text-primary mb-2">Hapus Transaksi</h2>
            <p className="text-[14px] text-text-secondary mb-6">Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3 w-full">
              <button className="flex-1 px-4 py-2.5 rounded-lg font-medium text-[14px] bg-surface-secondary text-text-primary hover:bg-border/50 transition-colors" onClick={() => setDeleteModalId(null)}>Batal</button>
              <button className="flex-1 px-4 py-2.5 rounded-lg font-medium text-[14px] bg-danger text-white hover:bg-danger/90 transition-colors" onClick={handleDeleteTx}>Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTxData && (
        <AddTransactionModal 
          isOpen={true} 
          initialData={editTxData}
          onClose={(msg) => {
            setEditTxData(null);
            if (msg) {
              setToast(msg);
              setTimeout(() => setToast(null), 3000);
            }
          }} 
        />
      )}

      {/* Custom Toast */}
      {toast && <Toast message={toast} />}
    </main>
  );
}
