"use client";

import { useState } from "react";
import { WorkerCard } from "@/components/worker/WorkerCard";
import { WorkerDetailSheet, type SheetWorker } from "@/components/employer/WorkerDetailSheet";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

const initialSaved: SheetWorker[] = [
  { id: "hamisi-juma",  name: "Hamisi Juma",  role: "Electrician & Repairs", location: "Mikocheni, Dar", rating: 4.8, reviews: 12, availability: "Available now",        availabilityStatus: "Available now",        skills: ["Wiring", "Repairs", "Plumbing"], verified: true,  wage: "150,000" },
  { id: "alice-mwando", name: "Alice Mwando", role: "Home cleaner & childcare", location: "Mikocheni, Dar", rating: 4.8, reviews: 24, availability: "Available now",        availabilityStatus: "Available now",        skills: ["Cleaning", "Childcare", "Cooking"], verified: true, wage: "120,000" },
  { id: "john-kalua",   name: "John Kalua",   role: "Gardening & errands",     location: "Masaki, Dar",    rating: 4.6, reviews: 18, availability: "Available next month", availabilityStatus: "Available next month", skills: ["Gardening", "Errands"], verified: false, wage: "90,000" },
];

export default function SavedWorkers() {
  const { lang } = useLang();
  const t = translations[lang].employer.savedWorkers;
  const common = translations[lang].employer.common;

  const [saved, setSaved] = useState(initialSaved);
  const [selected, setSelected] = useState<SheetWorker | null>(null);

  const handleRemove = (id: string) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <>
      <WorkerDetailSheet worker={selected} onClose={() => setSelected(null)} />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--text)]">{t.title}</h1>
          <p className="text-sm text-[color:var(--muted)]">{saved.length} worker{saved.length !== 1 ? "s" : ""} saved</p>
        </div>

        {saved.length === 0 ? (
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center space-y-2">
            <p className="text-3xl">🔖</p>
            <p className="font-semibold text-[color:var(--text)]">{t.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {saved.map((worker) => (
              <div key={worker.id} className="relative group">
                {/* Clicking the card opens the sheet */}
                <button className="w-full text-left" onClick={() => setSelected(worker)}>
                  <WorkerCard
                    {...worker}
                    availabilityStatus={worker.availabilityStatus}
                    verifiedLabel={common.verified}
                    reviewsLabel={common.reviews}
                  />
                </button>
                {/* Remove button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(worker.id); }}
                  className="absolute top-4 right-4 z-10 rounded-xl border border-red-500/20 bg-[color:var(--surface)] px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  {t.remove}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
