import { MessageIcon, BellIcon, DownloadIcon, InfoIcon, WarningIcon, TrashIcon, RotateIcon, CheckCircleIcon, PowerIcon, FileIcon } from "@/components/icons";

export default function UmumPengaturan() {
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
                <input type="text" id="chat-id" className={formInputReadOnlyClass} defaultValue="123456789" readOnly />
              </div>
              <div className="flex items-center gap-2 text-[13px] text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true"></span>
                <span>Status:</span>
                <span className="text-success font-medium">Terhubung</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button className={btnGhostClass} type="button">
                  <CheckCircleIcon aria-hidden="true" />
                  Test Koneksi
                </button>
                <button className={btnDangerGhostClass} type="button">
                  <PowerIcon aria-hidden="true" />
                  Putuskan
                </button>
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
                  <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0 peer" />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-secondary border border-border rounded-full transition-colors duration-300 before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition-transform before:duration-300 before:shadow-sm peer-checked:bg-primary peer-checked:border-primary peer-checked:before:translate-x-[20px]"></span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-[14px] font-medium text-text-primary">Alert Budget 100%</span>
                <label className="relative inline-block w-11 h-6 shrink-0 group">
                  <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0 peer" />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-secondary border border-border rounded-full transition-colors duration-300 before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition-transform before:duration-300 before:shadow-sm peer-checked:bg-primary peer-checked:border-primary peer-checked:before:translate-x-[20px]"></span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-[14px] font-medium text-text-primary">Daily Reminder</span>
                <label className="relative inline-block w-11 h-6 shrink-0 group">
                  <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0 peer" />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-surface-secondary border border-border rounded-full transition-colors duration-300 before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition-transform before:duration-300 before:shadow-sm peer-checked:bg-primary peer-checked:border-primary peer-checked:before:translate-x-[20px]"></span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border mt-1">
                <span className="text-[14px] font-medium text-text-primary">Waktu Reminder</span>
                <input type="time" className="bg-surface-secondary border border-border rounded-md px-3 py-1.5 text-[14px] text-text-primary focus:outline-none focus:border-primary transition-colors font-mono" defaultValue="21:00" />
              </div>
            </div>
          </section>

          <section className={cardClass} aria-label="Ekspor Data">
            <div className={cardHeaderClass}>
              <div className={cardTitleClass}>
                <DownloadIcon className="w-[18px] h-[18px] text-text-tertiary" aria-hidden="true" />
                Ekspor Data
              </div>
            </div>
            <div className={settingFieldsClass}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button className={btnGhostClass} type="button">
                  <FileIcon aria-hidden="true" />
                  Ekspor PDF Bulan Ini
                </button>
                <button className={btnGhostClass} type="button">
                  <DownloadIcon aria-hidden="true" />
                  Ekspor CSV Semua Data
                </button>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-text-tertiary mt-2 [&>svg]:w-3.5 [&>svg]:h-3.5 [&>svg]:shrink-0">
                <InfoIcon aria-hidden="true" />
                Data diekspor dari server, tidak membebani browser
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
                <button className={btnDangerClass} type="button">
                  <TrashIcon aria-hidden="true" />
                  Hapus Semua Transaksi
                </button>
                <p className="text-[13px] text-text-secondary sm:text-right max-w-[360px]">Semua data transaksi akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
                <button className={btnDangerGhostClass} type="button">
                  <RotateIcon aria-hidden="true" />
                  Reset Anggaran
                </button>
                <p className="text-[13px] text-text-secondary sm:text-right max-w-[360px]">Semua anggaran akan direset ke nilai default. Riwayat transaksi tidak terpengaruh.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
