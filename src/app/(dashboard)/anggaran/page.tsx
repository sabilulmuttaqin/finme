"use client";

import { useState, useEffect, useMemo } from "react";
import { WalletIcon, TrendingDownIcon, CheckIcon, SaveIcon, CoffeeIcon, TruckIcon, BookIcon, CartIcon, LaptopIcon, TrashIcon } from "@/components/icons";
import { FilterDropdown } from "@/components/FilterDropdown";
import Toast from "@/components/Toast";
import { createClient } from "@/lib/supabase/client";

export default function Anggaran() {
  const [filterBulan, setFilterBulan] = useState("Semua Waktu");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [limits, setLimits] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const supabase = createClient();

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data: trx } = await supabase.from('transactions').select('*').eq('type', 'expense').eq('user_id', user.id);
      const { data: bdg } = await supabase.from('budgets').select('*').eq('user_id', user.id);
      const { data: cat } = await supabase.from('categories').select('name, type').eq('user_id', user.id);
      
      if (trx) setTransactions(trx);
      if (cat) setDbCategories(cat.filter(c => c.type !== 'income').map(c => c.name.toLowerCase()));
      if (bdg) {
        setBudgets(bdg);
        const lim: Record<string, number> = {};
        bdg.forEach(b => lim[b.category] = b.limit_amount);
        setLimits(lim);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSaveLimit = async (category: string, newLimit: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const period = "2026-06"; // Default period for now
      await supabase
        .from('budgets')
        .upsert({ 
          user_id: user.id, 
          category: category, 
          limit_amount: newLimit, 
          period_month_year: period 
        }, { onConflict: 'user_id,category,period_month_year' });
        
      showToast(`Limit ${category} berhasil disimpan!`);
    } catch (err: any) {
      console.error('Gagal menyimpan limit: ', err.message);
    }
  };

 

  const getIconForCategory = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('makan') || n.includes('minum') || n.includes('kopi')) return <CoffeeIcon />;
    if (n.includes('transpor') || n.includes('bensin') || n.includes('grab')) return <TruckIcon />;
    if (n.includes('langgan') || n.includes('spotify') || n.includes('netflix')) return <BookIcon />;
    if (n.includes('belanja') || n.includes('pasar') || n.includes('supermarket')) return <CartIcon />;
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>;
  };

  const budgetData = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};
    transactions.forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });

    const combinedCategories = Array.from(new Set([...Object.keys(expensesByCategory), ...Object.keys(limits), ...dbCategories]));

    return combinedCategories.map(cat => {
      const used = expensesByCategory[cat] || 0;
      const limit = limits[cat] || 0; // Default limit 0
      const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : (used > 0 ? 100 : 0);
      return { category: cat, used, limit, pct };
    }).sort((a, b) => b.pct - a.pct);
  }, [transactions, limits]);

  const totalLimit = budgetData.reduce((sum, b) => sum + b.limit, 0);
  const totalUsed = budgetData.reduce((sum, b) => sum + b.used, 0);
  const totalPct = totalLimit > 0 ? (totalUsed / totalLimit) * 100 : 0;
  const formatRp = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  // Shared classes
  const metricCardClass = "bg-surface border border-border rounded-xl px-6 py-5 flex flex-col gap-2 transition-shadow duration-200 hover:shadow-md";
  const metricLabelClass = "flex items-center gap-2 text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]";
  const iconCircleClass = "w-8 h-8 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4";
  const metricValueClass = "font-mono text-[28px] font-bold tabular-nums tracking-[-0.03em] leading-[1.2]";
  
  const budgetCardClass = "bg-surface border border-border rounded-xl p-5 hover:border-border-hover transition-colors duration-200";
  const budgetIconClass = "w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center text-text-secondary [&>svg]:w-5 [&>svg]:h-5";
  const budgetInputClass = "w-28 bg-surface border border-border rounded-md px-2 py-1 text-right text-[13px] font-mono font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Anggaran</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Kelola batas pengeluaran bulanan per kategori</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <FilterDropdown
            value={filterBulan}
            onChange={setFilterBulan}
            options={["Semua Waktu"]}
          />
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-label="Ringkasan anggaran">
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-primary-surface text-primary`} aria-hidden="true"><WalletIcon /></span>
            Total Budget
          </div>
          <div className={metricValueClass}>{formatRp(totalLimit)}</div>
          <div className="text-[12px] text-text-tertiary mt-1">Batas pengeluaran bulan ini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-danger-surface text-danger`} aria-hidden="true"><TrendingDownIcon /></span>
            Terpakai
          </div>
          <div className={metricValueClass}>{formatRp(totalUsed)}</div>
          <div className="text-[12px] text-text-tertiary mt-1">{totalPct.toFixed(1)}% dari total budget</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-success-surface text-success`} aria-hidden="true"><CheckIcon /></span>
            Sisa
          </div>
          <div className={metricValueClass}>{formatRp(Math.max(0, totalLimit - totalUsed))}</div>
          <div className="text-[12px] text-text-tertiary mt-1">{Math.max(0, 100 - totalPct).toFixed(1)}% tersisa</div>
        </article>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Daftar anggaran per kategori">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-[13px] text-text-tertiary">Memuat anggaran...</div>
        ) : budgetData.length === 0 ? (
           <div className="col-span-full py-12 text-center text-[13px] text-text-tertiary">Belum ada kategori anggaran.</div>
        ) : budgetData.map((b) => {
          const isDanger = b.pct >= 90;
          const isWarning = b.pct >= 75 && !isDanger;
          const colorClass = isDanger ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-primary';
          const textClass = isDanger ? 'text-danger' : isWarning ? 'text-warning' : 'text-primary';

          return (
            <div key={b.category} className={`${budgetCardClass} group`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={budgetIconClass} aria-hidden="true">
                    {getIconForCategory(b.category)}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-text-primary capitalize">{b.category}</div>
                    <div className="text-[12px] text-text-tertiary mt-0.5">Terpakai {formatRp(b.used)}</div>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex flex-col items-end">
                    <label htmlFor={`limit-${b.category}`} className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider mb-1">Limit (Rp)</label>
                    <input 
                      type="number" 
                      id={`limit-${b.category}`} 
                      value={limits[b.category] || ""} 
                      placeholder="0"
                      onChange={(e) => setLimits({...limits, [b.category]: Number(e.target.value)})}
                      onBlur={(e) => handleSaveLimit(b.category, Number(e.target.value))}
                      className={budgetInputClass} 
                    />
                  </div>
                  
                </div>
              </div>
              <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden mb-3">
                <div className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`} style={{width: `${b.pct}%`}}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-text-secondary font-mono">{formatRp(b.used)} / {formatRp(b.limit)}</span>
                <span className={`text-[12px] font-bold font-mono ${textClass}`}>{b.pct.toFixed(1)}%</span>
              </div>
            </div>
          )
        })}
      </section>

      {toast && <Toast message={toast} />}
    </main>
  );
}
