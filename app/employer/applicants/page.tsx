"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

const initialApplicants = [
  { id: 1, name: "Hamisi Juma", job: "House Painting", rating: 4.8, price: "50,000", reviews: 12 },
  { id: 2, name: "Sarah John", job: "House Painting", rating: 4.5, price: "45,000", reviews: 8 },
];

export default function ApplicantsPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.nav;
  
  const [applicants, setApplicants] = useState(initialApplicants);

  const handleHire = (id: number) => {
    alert(t.alertHired);
    setApplicants(applicants.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.applicantsTitle}</h1>
        <p className="text-[color:var(--muted)] text-sm">{t.applicantsSubtitle}</p>
      </div>

      <div className="grid gap-4">
        {applicants.map((app) => (
          <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--accent)]/50 transition">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="h-14 w-14 rounded-2xl bg-[color:var(--accent)]/10 flex items-center justify-center font-bold text-[color:var(--accent)] text-xl">
                {app.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{app.name}</h3>
                <div className="flex items-center gap-2 text-xs text-[color:var(--muted)]">
                  <span className="text-amber-500">⭐ {app.rating}</span>
                  <span>•</span>
                  <span>{app.reviews} {t.reviews}</span>
                  <span>•</span>
                  <span className="font-bold text-[color:var(--text)]">{app.price}/=</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setApplicants(applicants.filter(a => a.id !== app.id))}
                className="flex-1 md:flex-none px-6 py-3 rounded-2xl border border-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/5 transition"
              >
                {t.btnReject}
              </button>
              <button 
                onClick={() => handleHire(app.id)}
                className="flex-1 md:flex-none px-8 py-3 rounded-2xl bg-[color:var(--accent)] text-slate-950 text-xs font-bold hover:opacity-90 transition shadow-lg shadow-[color:var(--accent)]/20"
              >
                {t.btnHire}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}