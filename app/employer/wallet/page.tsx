"use client";

import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { EscrowStatus } from "@/components/ui/EscrowStatus";

export default function EmployerWallet() {
  const { lang } = useLang();
  const t = translations[lang].employer.wallet;

  // Mock data for the dynamic note
  const currentEscrow = { worker: "Anna Mary", job: "Gardening" };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Available Balance */}
        <div className="p-8 rounded-[2.5rem] bg-[color:var(--surface)] border border-[color:var(--border)]">
          <p className="text-[10px] font-bold text-[color:var(--muted)] uppercase tracking-widest">
            {t.balanceLabel}
          </p>
          <h2 className="text-4xl font-black mt-2">120,000/=</h2>
          <button className="mt-6 w-full py-3 bg-[color:var(--accent)] text-slate-950 rounded-2xl font-bold text-xs hover:opacity-90 transition">
            {t.topUpBtn}
          </button>
        </div>

        {/* Escrow Balance */}
        <div className="p-8 rounded-[2.5rem] bg-[color:var(--bg)] border-2 border-dashed border-[color:var(--border)]">
          <p className="text-[10px] font-bold text-[color:var(--muted)] uppercase tracking-widest">
            {t.escrowLabel}
          </p>
          <h2 className="text-4xl font-black mt-2 text-[color:var(--accent)]">35,000/=</h2>
          <p className="text-[10px] text-[color:var(--muted)] mt-4">
            {t.escrowNote.replace("{job}", currentEscrow.job).replace("{worker}", currentEscrow.worker)}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[color:var(--surface)] rounded-[2.5rem] border border-[color:var(--border)] p-6 shadow-sm">
        <h3 className="font-bold mb-6">{t.activityTitle}</h3>
        <div className="space-y-4">
           <div className="flex items-center justify-between p-4 rounded-2xl bg-[color:var(--bg)] border border-[color:var(--border)]">
             <div>
               <p className="text-sm font-bold">{t.depositLabel}: Anna Mary</p>
               <p className="text-[10px] text-[color:var(--muted)]">{t.contractLabel} #AJ-99230</p>
             </div>
             <div className="flex flex-col items-end gap-2">
               <p className="font-bold text-sm">-35,000/=</p>
               <EscrowStatus status="secured" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}