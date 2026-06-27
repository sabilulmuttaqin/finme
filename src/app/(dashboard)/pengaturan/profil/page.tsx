import { UserIcon, EditIcon } from "@/components/icons";

export default function ProfilPengaturan() {
  const cardClass = "bg-surface border border-border rounded-xl";
  const cardHeaderClass = "px-5 py-4 border-b border-border";
  const cardTitleClass = "text-[16px] font-semibold text-text-primary flex items-center gap-2";
  const settingFieldsClass = "p-5 flex flex-col gap-5";
  const formRowClass = "flex flex-col md:flex-row gap-4 items-start md:items-end";
  const formGroupClass = "flex flex-col gap-2 flex-1 w-full";
  const formLabelClass = "text-[13px] font-medium text-text-secondary";
  const formInputClass = "bg-surface-secondary border border-border rounded-lg px-4 py-2.5 text-[14px] text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all";
  const formInputReadOnlyClass = `${formInputClass} !bg-surface !border-transparent opacity-80 cursor-default focus:!border-transparent focus:!ring-0`;
  const btnGhostClass = "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-[14px] transition-colors duration-200 cursor-pointer bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary [&>svg]:w-4 [&>svg]:h-4";

  return (
    <main className="flex-1 p-8 lg:ml-[260px] pt-24 lg:pt-8" id="main-content">
      <div className="max-w-[800px] mx-auto w-full">
        <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-[24px] font-bold tracking-[-0.02em]">Pengaturan Profil</h1>
            <p className="text-[13px] text-text-secondary mt-0.5">Konfigurasi detail akun pribadi Anda</p>
          </div>
        </header>

        <div className="flex flex-col gap-6 w-full">
          <section className={cardClass} aria-label="Profil">
            <div className={cardHeaderClass}>
              <div className={cardTitleClass}>
                <UserIcon className="w-[18px] h-[18px] text-text-tertiary" aria-hidden="true" />
                Profil Utama
              </div>
            </div>
            <div className={settingFieldsClass}>
              <div className={formRowClass}>
                <div className={formGroupClass}>
                  <label className={formLabelClass} htmlFor="email">Email</label>
                  <input type="email" id="email" className={formInputReadOnlyClass} defaultValue="user@finme.id" readOnly />
                </div>
                <button className={btnGhostClass} type="button" aria-label="Edit email">
                  <EditIcon aria-hidden="true" />
                  Edit
                </button>
              </div>
              <div className={formGroupClass}>
                <label className={formLabelClass} htmlFor="nama">Nama</label>
                <input type="text" id="nama" className={formInputClass} defaultValue="Ahmad Fauzi" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
