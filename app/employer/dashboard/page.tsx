"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WorkerCard } from "@/components/worker/WorkerCard";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

const boostedWorkers = [
  { id: "alice-mwando", name: "Alice Mwando", role: "Home cleaner & childcare", location: "Mikocheni, Dar es Salaam", wage: "TSh 400,000/mo" },
  { id: "fatma-hassan", name: "Fatma Hassan", role: "Cooking specialist", location: "Kijitonyama, Dar es Salaam", wage: "TSh 350,000/mo" },
  { id: "john-kalua", name: "John Kalua", role: "Gardening & errands", location: "Masaki, Dar es Salaam", wage: "TSh 280,000/mo" },
  { id: "grace-minja", name: "Grace Minja", role: "Elderly care companion", location: "Sinza, Dar es Salaam", wage: "TSh 300,000/mo" },
];

const suggestedWorkers = [
  { id: "alice-mwando", name: "Alice Mwando", role: "Home cleaner & childcare", location: "Mikocheni, Dar es Salaam", rating: 4.8, reviews: 24, availability: "Available now" as const, skills: ["Cleaning", "Childcare", "Cooking"], verified: true },
  { id: "fatma-hassan", name: "Fatma Hassan", role: "Cooking specialist", location: "Kijitonyama, Dar es Salaam", rating: 4.9, reviews: 32, availability: "Available now" as const, skills: ["Cooking", "Cleaning", "Laundry"], verified: true },
  { id: "john-kalua", name: "John Kalua", role: "Gardening & errands", location: "Masaki, Dar es Salaam", rating: 4.6, reviews: 18, availability: "Available next month" as const, skills: ["Gardening", "Errands", "Childcare"], verified: false },
];

export default function EmployerDashboardPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.dashboard;
  const common = translations[lang].employer.common;
  
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % boostedWorkers.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoPlay();
  };

  return (
    <div className="space-y-8">

      {/* Boosted workers carousel */}
      <section>
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)] mb-4">{t.featuredTitle}</p>
        <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--accent)]/30 bg-[color:var(--surface)] shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {boostedWorkers.map((worker) => (
              <Link
                key={worker.id}
                href={`/worker/${worker.id}`}
                className="min-w-full p-8 block"
              >
                <span className="rounded-full bg-[color:var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                  {t.boostedBadge}
                </span>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-lg font-semibold text-[color:var(--accent)]">
                    {worker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[color:var(--text)]">{worker.name}</p>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{worker.role} · {worker.location}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold text-[color:var(--accent)]">{worker.wage}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-2 pb-5">
            {boostedWorkers.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-[color:var(--accent)]" : "w-2 bg-[color:var(--border)]"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Local business ad placeholder */}
      <section className="rounded-[2rem] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)]/50 p-6 flex items-center justify-center min-h-[90px]">
        <p className="text-sm text-[color:var(--muted)] text-center">
          📢 {t.adPrefix} —{" "}
          <Link href="/advertise" className="text-[color:var(--accent)] font-semibold hover:underline">{t.adLink}</Link>
        </p>
      </section>

      {/* Browse workers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.browseTitle}</p>
          <Link href="/employer/search" className="text-sm font-semibold text-[color:var(--accent)] hover:underline">
            {t.seeAll} →
          </Link>
        </div>
        {suggestedWorkers.map((w) => (
        <WorkerCard 
  key={w.id} 
  {...w} 
  // Pass styling status separately
  availabilityStatus={w.availability} 
  // Pass translated text
  availability={w.availability === "Available now" ? t.availNow : t.availLater} 
  verifiedLabel={common.verified}
  reviewsLabel={common.reviews}
/>
        ))}
      </section>

    </div>
  );
}