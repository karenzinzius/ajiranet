"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { EscrowStatus } from "@/components/ui/EscrowStatus";

export default function HiredHistoryPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.history;
  const a = translations[lang].employer.actions; // reused from previous blocks

  const [activeHires, setActiveHires] = useState([
    { id: 101, name: "Anna Mary", job: "Gardening", amount: "35,000", status: "pending_release" as const }
  ]);

  const releaseFunds = (id: number) => {
    if(confirm(t.confirmRelease)) {
      setActiveHires(activeHires.filter(h => h.id !== id));
      alert(t.successAlert);
    }
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t.title}</h2>
          <span className="px-3 py-1 bg-[color:var(--accent)]/10 text-[color:var(--accent)] rounded-full text-xs font-bold">
            {activeHires.length} {t.ongoing}
          </span>
        </div>

        {activeHires.map(hire => (
          <div key={hire.id} className="p-6 rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <h3 className="text-lg font-bold">{hire.name}</h3>
                   {/* Pass 't' or specific labels to EscrowStatus if needed */}
                   <EscrowStatus status={hire.status} />
                </div>
                <p className="text-sm text-[color:var(--muted)]">{t.task}: {hire.job}</p>
                <p className="text-xl font-black text-[color:var(--accent)]">{hire.amount} TZS</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3 rounded-2xl bg-[color:var(--bg)] border border-[color:var(--border)] text-xs font-bold hover:border-[color:var(--accent)] transition">
                  {t.chat}
                </button>
                <button 
                  onClick={() => releaseFunds(hire.id)}
                  className="px-8 py-3 rounded-2xl bg-[color:var(--accent)] text-slate-950 text-xs font-bold hover:opacity-90 transition"
                >
                  {t.finish}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">{t.paymentHistory}</h2>
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-[color:var(--bg)] text-[color:var(--muted)] uppercase text-[10px] tracking-tighter">
              <tr>
                <th className="p-5 font-bold">{t.tableWorker}</th>
                <th className="p-5 font-bold">{t.tableDate}</th>
                <th className="p-5 font-bold">{t.tableAmount}</th>
                <th className="p-5 font-bold">{t.tableStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              <tr className="hover:bg-[color:var(--bg)]/50 transition">
                <td className="p-5 font-bold">Juma Bakari</td>
                <td className="p-5 text-[color:var(--muted)]">12 Apr 2026</td>
                <td className="p-5 font-bold">50,000/=</td>
                <td className="p-5 text-green-500 font-bold">{t.paid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}