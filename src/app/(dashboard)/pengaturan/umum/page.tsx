"use client";

import { useState, useEffect } from "react";
import { MessageIcon, BellIcon, WarningIcon, TrashIcon, CheckCircleIcon, PowerIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";

export default function UmumPengaturan() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Settings state (local storage based)
  const [alert80, setAlert80] = useState(true);
  const [alert100, setAlert100] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState("21:00");

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const supabase = createClient();

  useEffect(() => {
    let channel: any;

    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data } = await supabase.from('users').select('*').eq('id', authUser.id).single();
        if (data) {
          setUser(data);
          if (data.telegram_sync_token && data.telegram_sync_token_expires && new Date(data.telegram_sync_token_expires) > new Date()) {
            setOtpCode(data.telegram_sync_token);
          }
          
          channel = supabase.channel('user-settings-changes')
            .on(
              'postgres_changes',
              { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${authUser.id}` },
              (payload) => {
                const updatedUser = payload.new;
                setUser(updatedUser);
                if (updatedUser.telegram_chat_id) {
                  setOtpCode("");
                  setShowOtpModal(false);
                }
              }
            )
            .subscribe();
        }
      }
      setIsLoading(false);
    };
    fetchUser();

    // Load settings from local storage
    const savedSettings = localStorage.getItem('finme_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.alert80 !== undefined) setAlert80(parsed.alert80);
        if (parsed.alert100 !== undefined) setAlert100(parsed.alert100);
        if (parsed.dailyReminder !== undefined) setDailyReminder(parsed.dailyReminder);
        if (parsed.reminderTime !== undefined) setReminderTime(parsed.reminderTime);
      } catch (e) {}
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Save settings on change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('finme_settings', JSON.stringify({
        alert80, alert100, dailyReminder, reminderTime
      }));
    }
  }, [alert80, alert100, dailyReminder, reminderTime, isLoading]);

  const generateOTP = async () => {
    try {
      if (!user) throw new Error("Belum login");

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const { error } = await supabase.from('users').update({
        telegram_sync_token: otp,
        telegram_sync_token_expires: expiresAt.toISOString()
      }).eq('id', user.id);

      if (error) throw error;
      
      setOtpCode(otp);
      setShowOtpModal(true);
    } catch (err: any) {
      alert("Gagal men-generate OTP: " + err.message);
    }
  };

  const disconnectTelegram = async () => {
    if (confirm("Apakah Anda yakin ingin memutuskan integrasi Telegram? Anda tidak akan bisa mencatat transaksi lewat Telegram lagi.")) {
      const { error } = await supabase.from('users').update({ telegram_chat_id: null }).eq('id', user.id);
      if (!error) {
        setUser({ ...user, telegram_chat_id: null });
        alert("Berhasil diputuskan.");
      } else {
        alert("Gagal memutuskan: " + error.message);
      }
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("PERINGATAN: Apakah Anda yakin ingin menghapus akun permanen?")) {
      alert("Fitur hapus akun permanen saat ini dinonaktifkan demi keamanan. Silakan hubungi support FinMe jika Anda ingin menghapus data Anda sepenuhnya.");
    }
  };

  const cardClass = "bg-surface border border-border rounded-xl";
  const cardHeaderClass = "px-5 py-4 border-b border-border";
  const cardTitleClass = "text-[16px] font-semibold text-text-primary flex items-center gap-2";
  const settingFieldsClass = "p-5 flex flex-col gap-5";
  const formGroupClass = "flex flex-col gap-2 flex-1 w-full";
  const formLabelClass = "text-[13px] font-medium text-text-secondary";
  const formInputClass = "bg-surface-secondary border border-border rounded-lg px-4 py-2.5 text-[14px] text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all";
  const formInputReadOnlyClass = `${formInputClass} !bg-surface !border-transparent opacity-80 cursor-default focus:!border-transparent focus:!ring-0 font-mono tabular-nums`;
  const btnGhostClass = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary [&>svg]:w-4 [&>svg]:h-4";
  const btnDangerGhostClass = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-danger-surface text-danger hover:bg-danger hover:text-white border-transparent [&>svg]:w-4 [&>svg]:h-4";
  const btnDangerClass = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-danger text-white hover:bg-[#DC2626] border-danger shadow-[0_1px_2px_rgba(239,68,68,0.1)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.2)] [&>svg]:w-4 [&>svg]:h-4";
  const btnPrimaryClass = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-primary text-white hover:bg-primary-hover shadow-sm [&>svg]:w-4 [&>svg]:h-4";

  if (isLoading) {
    return <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8 text-text-secondary text-[13px]">Memuat pengaturan...</main>;
  }

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <div className="max-w-[800px] mx-auto w-full">
        <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-[24px] font-bold tracking-[-0.02em]">Pengaturan Umum</h1>
            <p className="text-[13px] text-text-secondary mt-0.5">Konfigurasi aplikasi dan notifikasi</p>
          </div>
        </header>

        <div className="flex flex-col gap-6 w-full">
          <section className={cardClass} aria-label="Telegram Bot">
            <div className={cardHeaderClass}>
              <div className={cardTitleClass}>
                <MessageIcon className="w-[18px] h-[18px] text-text-tertiary" aria-hidden="true" />
                Telegram Bot
              </div>
            </div>
            <div className={settingFieldsClass}>
              <div className={formGroupClass}>
                <label className={formLabelClass} htmlFor="chat-id">Telegram Chat ID</label>
                <input type="text" id="chat-id" className={formInputReadOnlyClass} value={user?.telegram_chat_id || "Belum terhubung"} readOnly />
              </div>
              <div className="flex items-center gap-2 text-[13px] text-text-secondary">
                {user?.telegram_chat_id ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true"></span>
                    <span>Status:</span>
                    <span className="text-success font-medium">Terhubung</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-text-tertiary shrink-0" aria-hidden="true"></span>
                    <span>Status:</span>
                    <span className="text-text-tertiary font-medium">Belum Terhubung</span>
                  </>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {user?.telegram_chat_id ? (
                  <button className={btnDangerGhostClass} type="button" onClick={disconnectTelegram}>
                    <PowerIcon aria-hidden="true" />
                    Putuskan
                  </button>
                ) : otpCode ? (
                  <div className="flex flex-col gap-3 w-full bg-surface-secondary border border-border rounded-lg p-4 mt-2">
                    <p className="text-[13px] text-text-secondary">
                      Kode OTP Anda: <strong className="text-[16px] font-mono text-text-primary ml-1 tracking-widest">{otpCode}</strong>
                    </p>
                    <p className="text-[12px] text-text-tertiary">
                      Kirim pesan <code className="bg-surface px-1.5 py-0.5 rounded border border-border text-primary font-mono">/link {otpCode}</code> ke bot Telegram. Berlaku 10 menit.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <a href={`https://t.me/trackinguangsab_bot?text=/link%20${otpCode}`} target="_blank" rel="noreferrer" className={btnPrimaryClass}>
                        <MessageIcon className="w-4 h-4" />
                        Pergi ke Telegram
                      </a>
                      <button className={btnGhostClass} type="button" onClick={generateOTP}>
                        Buat Kode Baru
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className={btnPrimaryClass} type="button" onClick={generateOTP}>
                    <CheckCircleIcon aria-hidden="true" />
                    Hubungkan Telegram
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className={cardClass} aria-label="Notifikasi">
            <div className={cardHeaderClass}>
              <div className={cardTitleClass}>
                <BellIcon className="w-[18px] h-[18px] text-text-tertiary" aria-hidden="true" />
                Notifikasi
              </div>
            </div>
            <div className={settingFieldsClass}>
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-[14px] font-medium text-text-primary">Alert Budget 80%</span>
                <label className="relative inline-block w-11 h-6 shrink-0 group">
                  <input type="checkbox" checked={alert80} onChange={(e) => setAlert80(e.target.checked)} className="opacity-0 w-0 h-0 peer" />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-secondary border border-border rounded-full transition-colors duration-300 before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition-transform before:duration-300 before:shadow-sm peer-checked:bg-primary peer-checked:border-primary peer-checked:before:translate-x-[20px]"></span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-[14px] font-medium text-text-primary">Alert Budget 100%</span>
                <label className="relative inline-block w-11 h-6 shrink-0 group">
                  <input type="checkbox" checked={alert100} onChange={(e) => setAlert100(e.target.checked)} className="opacity-0 w-0 h-0 peer" />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-secondary border border-border rounded-full transition-colors duration-300 before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition-transform before:duration-300 before:shadow-sm peer-checked:bg-primary peer-checked:border-primary peer-checked:before:translate-x-[20px]"></span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-[14px] font-medium text-text-primary">Daily Reminder</span>
                <label className="relative inline-block w-11 h-6 shrink-0 group">
                  <input type="checkbox" checked={dailyReminder} onChange={(e) => setDailyReminder(e.target.checked)} className="opacity-0 w-0 h-0 peer" />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-secondary border border-border rounded-full transition-colors duration-300 before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition-transform before:duration-300 before:shadow-sm peer-checked:bg-primary peer-checked:border-primary peer-checked:before:translate-x-[20px]"></span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border mt-1">
                <span className="text-[14px] font-medium text-text-primary">Waktu Reminder</span>
                <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} className="bg-surface-secondary border border-border rounded-md px-3 py-1.5 text-[14px] text-text-primary focus:outline-none focus:border-primary transition-colors font-mono" />
              </div>
            </div>
          </section>

          <section className={`${cardClass} border-danger-surface bg-danger-surface/20`} aria-label="Zona Bahaya">
            <div className={cardHeaderClass}>
              <div className="text-danger font-semibold text-[16px] flex items-center gap-2">
                <WarningIcon className="w-[18px] h-[18px]" aria-hidden="true" />
                Zona Bahaya
              </div>
            </div>
            <div className={settingFieldsClass}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
                <button className={btnDangerClass} type="button" onClick={handleDeleteAccount}>
                  <TrashIcon aria-hidden="true" />
                  Hapus Akun
                </button>
                <p className="text-[13px] text-text-secondary sm:text-right max-w-[360px]">Semua data transaksi akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.</p>
              </div>
              
            </div>
          </section>
        </div>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 bg-stone-900/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-200" role="dialog" onClick={(e) => {
          if (e.target === e.currentTarget) setShowOtpModal(false);
        }}>
          <div className="bg-surface rounded-2xl w-full max-w-[400px] shadow-lg overflow-hidden transform transition-transform duration-200 translate-y-0 scale-100">
            <div className="flex items-center justify-between pt-5 px-6 pb-4 border-b border-border">
              <h2 className="text-[17px] font-semibold text-text-primary">Hubungkan Telegram</h2>
              <button className="w-8 h-8 rounded-md flex items-center justify-center text-text-tertiary hover:bg-surface-secondary hover:text-text-primary transition-colors bg-transparent border-none cursor-pointer" onClick={() => setShowOtpModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="p-6 text-center">
              <p className="text-[14px] text-text-secondary mb-4">
                Kode sinkronisasi Anda:
              </p>
              <div className="bg-surface-secondary border border-border rounded-xl p-4 mb-4 flex justify-center items-center">
                <span className="text-[32px] font-mono font-bold tracking-[0.2em] text-text-primary">{otpCode}</span>
              </div>
              <p className="text-[13px] text-text-tertiary mb-8">
                Penting: Jangan tutup halaman ini sebelum Anda mengirim pesan ke bot. Kode ini hanya berlaku 10 menit.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <a href={`https://t.me/trackinguangsab_bot?text=/link%20${otpCode}`} target="_blank" rel="noreferrer" className={btnPrimaryClass} onClick={() => setShowOtpModal(false)}>
                  <MessageIcon className="w-4 h-4" />
                  Lanjut ke Telegram
                </a>
                <button type="button" className={`${btnGhostClass} w-full`} onClick={() => setShowOtpModal(false)}>
                  Nanti Saja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
