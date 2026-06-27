"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DownloadIcon, PlusIcon, WalletIcon, TrendingUpIcon, ArrowUpIcon, TrendingDownIcon, ArrowDownIcon, StarIcon, SettingsIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon } from "@/components/icons";
import Toast from "@/components/Toast";
import { createClient } from "@/lib/supabase/client";
import { LineChart, Line, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AddTransactionModal = dynamic(() => import("@/components/AddTransactionModal"), { ssr: false });

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const supabase = createClient();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
      const [txRes, bdgRes] = await Promise.all([
        supabase.from('transactions').select('*').order('created_at', { ascending: false }),
        supabase.from('budgets').select('category, limit_amount')
      ]);
        
      if (txRes.data) setTransactions(txRes.data);
      if (bdgRes.data) {
        const bdgMap: Record<string, number> = {};
        bdgRes.data.forEach(b => bdgMap[b.category] = b.limit_amount);
        setBudgets(bdgMap);
      }
      setIsLoading(false);
    }, [supabase]);

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('public:transactions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
        fetchData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'budgets' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchData]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const formatRp = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const { lineChartData, donutData, categoryColors } = useMemo(() => {
    if (!transactions.length) return { lineChartData: [], donutData: [], categoryColors: {} };

    // Line Chart: Expense last 30 days
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const expenses30d = transactions.filter(t => t.type === 'expense' && new Date(t.created_at) >= last30Days);
    const dailyMap: Record<string, number> = {};
    expenses30d.forEach(t => {
      const date = new Date(t.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      dailyMap[date] = (dailyMap[date] || 0) + t.amount;
    });
    
    const lineChartData = Object.keys(dailyMap).reverse().map(date => ({
      name: date,
      value: dailyMap[date]
    }));

    // Donut Chart: Expense by Category this month
    const thisMonth = new Date().getMonth();
    const expensesThisMonth = transactions.filter(t => t.type === 'expense' && new Date(t.created_at).getMonth() === thisMonth);
    
    const catMap: Record<string, number> = {};
    expensesThisMonth.forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });

    const donutData = Object.keys(catMap).map(cat => ({
      name: cat,
      value: catMap[cat]
    })).sort((a, b) => b.value - a.value); // Sort highest first

    const COLORS = ['#FF6B00', '#FF8A33', '#FFB366', '#1C1917', '#A8A29E', '#d97706', '#9ca3af', '#4b5563'];
    const categoryColors: Record<string, string> = {};
    donutData.forEach((d, i) => categoryColors[d.name] = COLORS[i % COLORS.length]);

    return { lineChartData, donutData, categoryColors };
  }, [transactions]);

  // Shared classes
  const btnClass = "inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-medium transition-colors duration-150 min-h-[44px] cursor-pointer";
  const btnPrimary = `${btnClass} bg-primary text-white hover:bg-primary-dark border-none`;
  const btnGhost = `${btnClass} bg-surface border border-border text-text-secondary hover:bg-surface-secondary hover:text-text-primary`;
  const metricCardClass = "bg-surface border border-border rounded-xl px-6 py-5 flex flex-col gap-2 transition-shadow duration-200 hover:shadow-md";
  const metricLabelClass = "flex items-center gap-2 text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]";
  const iconCircleClass = "w-8 h-8 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4";
  const metricValueClass = "font-mono text-[28px] font-bold tabular-nums tracking-[-0.03em] leading-[1.2]";
  const metricChangeClass = "inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full w-fit [&>svg]:w-3 [&>svg]:h-3";
  const cardClass = "bg-surface border border-border rounded-xl p-6 transition-shadow duration-200 hover:shadow-sm";
  const txItemClass = "flex items-center gap-3 py-3 border-b border-border-light last:border-b-0";
  const txIconClass = "w-9 h-9 rounded-sm flex items-center justify-center shrink-0 [&>svg]:w-4 [&>svg]:h-4";
  const txAmountClass = "font-mono text-[14px] font-semibold tabular-nums text-right whitespace-nowrap";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-sm text-[12px] text-text-secondary mb-6" role="status" aria-live="polite">
        <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true"></span>
        Realtime terhubung via Supabase
        <span className="ml-auto font-mono font-variant-numeric:tabular-nums">Terakhir sinkron: 2 detik lalu</span>
      </div>

      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Dashboard</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Juni 2026 &middot; Ringkasan keuangan bulan berjalan</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className={btnGhost} type="button" aria-label="Ekspor laporan PDF">
            <DownloadIcon className="w-4 h-4" aria-hidden="true" />
            Ekspor PDF
          </button>
          <button className={btnPrimary} type="button" onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="w-4 h-4" aria-hidden="true" />
            Tambah Manual
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-label="Ringkasan finansial">
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-primary-surface text-primary`} aria-hidden="true"><WalletIcon /></span>
            Total Saldo
          </div>
          <div className={metricValueClass}>{isLoading ? "..." : formatRp(balance)}</div>
          <div className={`${metricChangeClass} bg-surface-secondary text-text-tertiary`}>Terkini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-success-surface text-success`} aria-hidden="true"><TrendingUpIcon /></span>
            Pemasukan
          </div>
          <div className={metricValueClass}>{isLoading ? "..." : formatRp(totalIncome)}</div>
          <div className={`${metricChangeClass} bg-surface-secondary text-text-tertiary`}>Bulan ini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-danger-surface text-danger`} aria-hidden="true"><TrendingDownIcon /></span>
            Pengeluaran
          </div>
          <div className={metricValueClass}>{isLoading ? "..." : formatRp(totalExpense)}</div>
          <div className={`${metricChangeClass} bg-surface-secondary text-text-tertiary`}>Bulan ini</div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" aria-label="Grafik analitik">
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Tren Pengeluaran Harian</div><div className="text-[12px] text-text-tertiary font-normal">30 hari terakhir</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Line Chart</span>
          </div>
          <div className="w-full h-[200px]" role="img" aria-label="Grafik garis tren pengeluaran harian">
            {lineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{fontSize: 10, fill: 'var(--color-text-tertiary)'}} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--color-text-primary)' }}
                    formatter={(val: any) => [formatRp(Number(val)), "Pengeluaran"]}
                  />
                  <Line type="monotone" dataKey="value" stroke="#FF6B00" strokeWidth={2} dot={{ r: 3, fill: "#FF6B00", strokeWidth: 2, stroke: "var(--color-surface)" }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[12px] text-text-tertiary">Belum ada data pengeluaran</div>
            )}
          </div>
        </article>
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Distribusi Kategori</div><div className="text-[12px] text-text-tertiary font-normal">Pengeluaran bulan ini</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Donut Chart</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-[160px] h-[160px] shrink-0 relative">
              {donutData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(val: any) => formatRp(Number(val))} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[15px] font-bold text-text-primary">{formatRp(donutData.reduce((s, d) => s + d.value, 0)).replace('Rp', '')}</span>
                    <span className="text-[10px] text-text-tertiary">Total</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[12px] text-text-tertiary text-center border-[8px] border-surface-secondary rounded-full">Kosong</div>
              )}
            </div>
            <div className="flex flex-col gap-2.5 flex-1 w-full max-h-[160px] overflow-y-auto pr-2">
              {donutData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-[13px]">
                  <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{background: categoryColors[d.name]}} aria-hidden="true"></span>
                  <span className="flex-1 text-text-secondary capitalize truncate">{d.name}</span>
                  <span className="font-mono font-semibold tabular-nums text-[13px]">{formatRp(d.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="bg-linear-to-br from-[#1C1917] to-[#292524] border border-[#3a3633] rounded-xl p-6 text-[#FAFAF9] mb-6" aria-label="AI Weekly Insight">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[16px] font-semibold flex items-center gap-2 text-[#FAFAF9] [&>svg]:text-primary">
            <StarIcon width="18" height="18" aria-hidden="true" />
            Weekly Financial Insight
          </div>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary-surface text-primary">AI Insight</span>
        </div>
        <p className="text-[13px] leading-[1.7] text-[#D6D3D1] [&>strong]:text-[#FAFAF9] [&>strong]:font-semibold">
          Pengeluaran <strong>Makanan</strong> minggu ini naik <strong>23%</strong> dibanding minggu lalu, didorong oleh 4 transaksi makan di luar di atas Rp80.000. Kategori <strong>Transportasi</strong> stabil di Rp25.000/hari. Saran: pertimbangkan meal-prep untuk 2 hari kerja agar bisa hemat hingga <strong>Rp160.000/minggu</strong>.
        </p>
        <div className="flex gap-2 mt-4">
          <button className="text-[12px] px-3.5 py-2 rounded-sm bg-white/10 text-[#FAFAF9] border border-white/10 transition-colors duration-150 min-h-[36px] cursor-pointer hover:bg-white/20" type="button">Lihat Detail</button>
          <button className="text-[12px] px-3.5 py-2 rounded-sm bg-white/10 text-[#FAFAF9] border border-white/10 transition-colors duration-150 min-h-[36px] cursor-pointer hover:bg-white/20" type="button">Tanya AI</button>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" aria-label="Budget dan transaksi">
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Anggaran Bulanan</div><div className="text-[12px] text-text-tertiary font-normal">Progress per kategori</div></div>
            <Link href="/anggaran" className={`${btnGhost} px-3 py-1.5 min-h-[36px] text-[12px]`}>
              <SettingsIcon width="14" height="14" className="w-3.5 h-3.5" aria-hidden="true" />
              Atur Limit
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {donutData.length > 0 ? donutData.slice(0, 4).map(d => {
              const limit = budgets[d.name] || 1000000; // default 1jt if not set
              const pct = Math.min((d.value / limit) * 100, 100);
              const isDanger = pct > 90;
              const isWarning = pct > 75 && !isDanger;
              return (
                <div key={d.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="flex items-center gap-1.5 font-medium [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:text-text-tertiary capitalize"><CoffeeIcon aria-hidden="true" />{d.name}</span>
                    <span className="font-mono tabular-nums text-text-secondary text-[12px]">{formatRp(d.value)} / {formatRp(limit)}</span>
                  </div>
                  <div className="h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ease-out ${isDanger ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-primary'}`} style={{width: `${pct}%`}}></div>
                  </div>
                  <span className={`text-[11px] font-medium text-right ${isDanger ? 'text-danger' : isWarning ? 'text-warning' : 'text-primary'}`}>{pct.toFixed(1)}%</span>
                </div>
              )
            }) : (
              <div className="text-[13px] text-text-tertiary text-center py-4">Belum ada pengeluaran</div>
            )}
          </div>
        </article>

        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Transaksi Terakhir</div><div className="text-[12px] text-text-tertiary font-normal">Via Telegram Bot</div></div>
            <Link href="/transaksi" className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary hover:bg-border transition-colors">Lihat Semua</Link>
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <div className="py-8 text-center text-[13px] text-text-tertiary">Memuat data...</div>
            ) : transactions.length === 0 ? (
              <div className="py-8 text-center text-[13px] text-text-tertiary">Belum ada transaksi. Hubungkan Bot Telegram Anda!</div>
            ) : (
              transactions.slice(0, 6).map((tx) => (
                <div key={tx.id} className={txItemClass}>
                  <div className={`${txIconClass} ${tx.type === 'income' ? 'bg-success-surface text-success' : 'bg-danger-surface text-danger'}`} aria-hidden="true">
                    {tx.type === 'income' ? <TrendingUpIcon /> : <WalletIcon />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis capitalize">{tx.description || tx.category}</div>
                    <div className="text-[11px] text-text-tertiary flex items-center gap-1.5 mt-px">
                      <span className="capitalize">{tx.category}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                  <div className={`${txAmountClass} ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatRp(tx.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
      
      <AddTransactionModal isOpen={isModalOpen} onClose={(msg) => {
        setIsModalOpen(false);
        if (msg) {
          showToast(msg);
          fetchData();
        }
      }} />

      {toast && <Toast message={toast} />}
    </main>
  );
}
