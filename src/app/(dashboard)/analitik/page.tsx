"use client";

import { useState, useEffect, useMemo } from "react";
import { ColumnChartIcon, TrendingDownIcon, WarningIcon, TrendingUpIcon, WalletIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

export default function Analitik() {
  const [timeRange, setTimeRange] = useState("Bulan Ini");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
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
  }, []);

  const formatRp = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const { metrics, barData, lineData, categoryBreakdown, top5 } = useMemo(() => {
    if (!transactions.length) return { 
      metrics: { avgPerDay: 0, highestDayAmount: 0, highestDayDate: "-", topCat: "-", topCatAmount: 0, savings: 0 }, 
      barData: [], lineData: [], categoryBreakdown: [], top5: [] 
    };

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let startMs = new Date(currentYear, currentMonth, 1).getTime(); // default Bulan Ini
    if (timeRange === "Minggu Ini") {
      const d = new Date();
      d.setDate(d.getDate() - d.getDay());
      startMs = d.getTime();
    } else if (timeRange === "3 Bulan") {
      const d = new Date();
      d.setMonth(d.getMonth() - 3);
      startMs = d.getTime();
    } else if (timeRange === "6 Bulan") {
      const d = new Date();
      d.setMonth(d.getMonth() - 6);
      startMs = d.getTime();
    } else if (timeRange === "1 Tahun") {
      const d = new Date();
      d.setFullYear(d.getFullYear() - 1);
      startMs = d.getTime();
    }

    const currentPeriodTx = transactions.filter(t => new Date(t.created_at).getTime() >= startMs);
    const lastPeriodTx = transactions.filter(t => {
      const txTime = new Date(t.created_at).getTime();
      const diff = now.getTime() - startMs;
      return txTime >= (startMs - diff) && txTime < startMs;
    });

    const expensesThisMonth = currentPeriodTx.filter(t => t.type === 'expense');
    const expensesLastMonth = lastPeriodTx.filter(t => t.type === 'expense');

    const totalExpenseThisMonth = expensesThisMonth.reduce((s, t) => s + t.amount, 0);
    const totalExpenseLastMonth = expensesLastMonth.reduce((s, t) => s + t.amount, 0);
    
    // Rata-rata/hari
    const daysPassed = now.getDate();
    const avgPerDay = totalExpenseThisMonth / (daysPassed || 1);

    // Hari tertinggi
    const dailyExpenses: Record<string, number> = {};
    expensesThisMonth.forEach(t => {
      const date = new Date(t.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'});
      dailyExpenses[date] = (dailyExpenses[date] || 0) + t.amount;
    });
    let highestDayAmount = 0;
    let highestDayDate = "-";
    for (const [date, amt] of Object.entries(dailyExpenses)) {
      if (amt > highestDayAmount) {
        highestDayAmount = amt;
        highestDayDate = date;
      }
    }

    // Kategori Terboros
    const catExpenses: Record<string, number> = {};
    expensesThisMonth.forEach(t => {
      catExpenses[t.category] = (catExpenses[t.category] || 0) + t.amount;
    });
    let topCat = "-";
    let topCatAmount = 0;
    for (const [cat, amt] of Object.entries(catExpenses)) {
      if (amt > topCatAmount) {
        topCatAmount = amt;
        topCat = cat;
      }
    }

    // Penghematan
    const savings = totalExpenseLastMonth - totalExpenseThisMonth;

    // BarData (6 Months)
    const monthsStr = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    const barData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const m = d.getMonth();
      const y = d.getFullYear();
      
      const tx = transactions.filter(t => {
        const dTx = new Date(t.created_at);
        return dTx.getMonth() === m && dTx.getFullYear() === y;
      });

      barData.push({
        name: monthsStr[m],
        Pemasukan: tx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        Pengeluaran: tx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      });
    }

    // LineData (4 weeks approx)
    const lineData = [];
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    for (let i = 3; i >= 0; i--) {
      const start = new Date(now.getTime() - ((i + 1) * weekMs));
      const end = new Date(now.getTime() - (i * weekMs));
      const tx = transactions.filter(t => {
        const dt = new Date(t.created_at);
        return dt >= start && dt <= end;
      });
      lineData.push({
        name: `Minggu ${4-i}`,
        Pemasukan: tx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
        Pengeluaran: tx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      });
    }

    // Category breakdown
    const categoryBreakdown = Object.keys(catExpenses).map(name => ({
      name,
      amount: catExpenses[name],
      pct: (catExpenses[name] / (totalExpenseThisMonth || 1)) * 100
    })).sort((a, b) => b.amount - a.amount).slice(0, 5);

    // Top 5 transactions
    const top5 = expensesThisMonth.sort((a, b) => b.amount - a.amount).slice(0, 5);

    return {
      metrics: { avgPerDay, highestDayAmount, highestDayDate, topCat, topCatAmount, savings },
      barData, lineData, categoryBreakdown, top5
    };
  }, [transactions, timeRange]);

  // Shared classes
  const metricCardClass = "bg-surface border border-border rounded-xl px-6 py-5 flex flex-col gap-2 transition-shadow duration-200 hover:shadow-md";
  const metricLabelClass = "flex items-center gap-2 text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]";
  const iconCircleClass = "w-8 h-8 rounded-lg flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4";
  const metricValueClass = "font-mono text-[28px] font-bold tabular-nums tracking-[-0.03em] leading-[1.2]";
  const cardClass = "bg-surface border border-border rounded-xl p-6 transition-shadow duration-200 hover:shadow-sm";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-[24px] font-bold tracking-[-0.02em]">Analitik</h1>
          <p className="text-[13px] text-text-secondary mt-0.5">Analisis mendalam keuangan Anda</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-surface-secondary rounded-sm p-1 gap-1 w-full md:w-auto overflow-x-auto">
            {["Minggu Ini", "Bulan Ini", "3 Bulan", "6 Bulan", "1 Tahun"].map(range => (
              <button 
                key={range}
                type="button" 
                className={`px-4 py-2 text-[13px] font-medium rounded-sm transition-colors duration-150 whitespace-nowrap min-w-max ${timeRange === range ? "bg-surface text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"}`} 
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" aria-label="Metrik analitik">
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-primary-surface text-primary`} aria-hidden="true"><ColumnChartIcon /></span>
            Rata-rata / Hari
          </div>
          <div className={metricValueClass}>{formatRp(metrics.avgPerDay)}</div>
          <div className="text-[12px] text-text-tertiary mt-1">Pengeluaran harian bulan ini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-danger-surface text-danger`} aria-hidden="true"><TrendingDownIcon /></span>
            Hari Tertinggi
          </div>
          <div className={metricValueClass}>{formatRp(metrics.highestDayAmount)}</div>
          <div className="text-[12px] text-text-tertiary mt-1">{metrics.highestDayDate}</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-warning-surface text-warning`} aria-hidden="true"><WarningIcon /></span>
            Kategori Terboros
          </div>
          <div className={`${metricValueClass} text-[20px] capitalize`}>{metrics.topCat}</div>
          <div className="text-[12px] text-text-tertiary mt-1">{formatRp(metrics.topCatAmount)} bulan ini</div>
        </article>
        <article className={metricCardClass}>
          <div className={metricLabelClass}>
            <span className={`${iconCircleClass} bg-success-surface text-success`} aria-hidden="true"><TrendingUpIcon /></span>
            Penghematan
          </div>
          <div className={`${metricValueClass} ${metrics.savings >= 0 ? 'text-success' : 'text-danger'}`}>
            {metrics.savings >= 0 ? `+${formatRp(metrics.savings)}` : formatRp(metrics.savings)}
          </div>
          <div className="text-[12px] text-text-tertiary mt-1">vs bulan lalu</div>
        </article>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6" aria-label="Grafik perbandingan">
        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Pemasukan vs Pengeluaran</div><div className="text-[12px] text-text-tertiary font-normal">6 bulan terakhir</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Bar Chart</span>
          </div>
          <div className="w-full h-[220px]" role="img" aria-label="Grafik batang perbandingan pemasukan dan pengeluaran 6 bulan terakhir">
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={2} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-light)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} dy={10} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => formatRp(Number(val))}
                  />
                  <Bar dataKey="Pemasukan" fill="#16A34A" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Pengeluaran" fill="#FF6B00" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[13px] text-text-tertiary">Belum ada data...</div>
            )}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: '#16A34A'}}></span>Pemasukan</div>
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: '#FF6B00'}}></span>Pengeluaran</div>
          </div>
        </article>

        <article className={cardClass}>
          <div className="flex items-center justify-between mb-5">
            <div><div className="text-[15px] font-semibold">Tren Mingguan</div><div className="text-[12px] text-text-tertiary font-normal">4 minggu terakhir</div></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Line Chart</span>
          </div>
          <div className="w-full h-[220px]" role="img" aria-label="Grafik garis tren pengeluaran mingguan 4 minggu terakhir">
            {lineData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-light)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-tertiary)' }} dy={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => formatRp(Number(val))}
                  />
                  <Line type="monotone" dataKey="Pemasukan" stroke="#16A34A" strokeWidth={2} dot={{ r: 4, fill: "#16A34A", strokeWidth: 2, stroke: "var(--color-surface)" }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Pengeluaran" stroke="#FF6B00" strokeWidth={2} dot={{ r: 4, fill: "#FF6B00", strokeWidth: 2, stroke: "var(--color-surface)" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[13px] text-text-tertiary">Belum ada data...</div>
            )}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: '#16A34A'}}></span>Pemasukan</div>
            <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium"><span className="w-3 h-3 rounded-[3px]" style={{background: '#FF6B00'}}></span>Pengeluaran</div>
          </div>
        </article>
      </section>

      <section className={`${cardClass} mb-6`} aria-label="Breakdown kategori">
        <div className="flex items-center justify-between mb-5">
          <div><div className="text-[15px] font-semibold">Breakdown per Kategori</div><div className="text-[12px] text-text-tertiary font-normal">Distribusi pengeluaran bulan ini</div></div>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary">Top 5</span>
        </div>
        <div className="flex flex-col gap-4">
          {categoryBreakdown.length > 0 ? categoryBreakdown.map((c, i) => (
            <div key={c.name} className="grid grid-cols-[100px_1fr_40px_90px] md:grid-cols-[120px_1fr_50px_110px] items-center gap-2 md:gap-4">
              <div className="text-[13px] font-medium text-text-secondary capitalize truncate" title={c.name}>{c.name}</div>
              <div className="h-2 bg-surface-secondary rounded-full overflow-hidden w-full"><div className="h-full rounded-full transition-all duration-500 ease-out" style={{width: `${c.pct}%`, background: 'var(--color-primary)'}}></div></div>
              <div className="text-[11px] font-medium text-right font-mono" style={{color: 'var(--color-primary)'}}>{c.pct.toFixed(1)}%</div>
              <div className="font-mono tabular-nums text-text-primary text-[13px] font-semibold text-right">{formatRp(c.amount)}</div>
            </div>
          )) : (
            <div className="text-[13px] text-text-tertiary text-center py-4">Belum ada pengeluaran bulan ini.</div>
          )}
        </div>
      </section>

      <section className={cardClass} aria-label="Top 5 pengeluaran terbesar">
        <div className="flex items-center justify-between mb-5">
          <div><div className="text-[15px] font-semibold">Top 5 Pengeluaran Terbesar</div><div className="text-[12px] text-text-tertiary font-normal">Bulan ini</div></div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-left mt-2 min-w-[500px]">
            <thead>
              <tr>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border w-[50px]">#</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border">Deskripsi</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border">Kategori</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border">Tanggal</th>
                <th className="text-[12px] font-medium text-text-tertiary pb-4 border-b border-border text-right">Nominal</th>
              </tr>
            </thead>
            <tbody>
              {top5.length > 0 ? top5.map((t, i) => (
                <tr key={t.id}>
                  <td className="py-4 border-b border-border-light text-[13px]">
                    <div className="w-6 h-6 rounded-sm flex items-center justify-center text-[12px] font-bold font-mono bg-surface-secondary text-text-tertiary">{i + 1}</div>
                  </td>
                  <td className="py-4 border-b border-border-light text-[13px] font-medium capitalize">{t.description || t.category}</td>
                  <td className="py-4 border-b border-border-light text-[13px]"><span className="inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full bg-surface-secondary text-text-secondary capitalize">{t.category}</span></td>
                  <td className="py-4 border-b border-border-light text-[12px] text-text-tertiary whitespace-nowrap">{new Date(t.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</td>
                  <td className="py-4 border-b border-border-light font-mono tabular-nums text-danger font-semibold text-right whitespace-nowrap">-{formatRp(t.amount)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[13px] text-text-tertiary">Belum ada pengeluaran bulan ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
