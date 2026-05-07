"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WorkerCard } from "@/components/worker/WorkerCard";
import { WorkerDetailSheet, SheetWorker } from "@/components/employer/WorkerDetailSheet";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

const workers: SheetWorker[] = [
  { id: "alice-mwando", name: "Alice Mwando", role: "Home cleaner & childcare", location: "Mikocheni, Dar es Salaam", wage: "400,000", rating: 4.8, reviews: 24, availability: "Available now", availabilityStatus: "Available now", skills: ["Cleaning", "Childcare", "Cooking"], verified: true },
  { id: "fatma-hassan", name: "Fatma Hassan", role: "Cooking specialist", location: "Kijitonyama, Dar es Salaam", wage: "350,000", rating: 4.9, reviews: 32, availability: "Available now", availabilityStatus: "Available now", skills: ["Cooking", "Cleaning", "Laundry"], verified: true },
  { id: "john-kalua", name: "John Kalua", role: "Gardening & errands", location: "Masaki, Dar es Salaam", wage: "280,000", rating: 4.6, reviews: 18, availability: "Available next month", availabilityStatus: "Available next month", skills: ["Gardening", "Errands", "Childcare"], verified: false },
  { id: "grace-minja", name: "Grace Minja", role: "Elderly care companion", location: "Sinza, Dar es Salaam", wage: "300,000", rating: 4.7, reviews: 15, availability: "Available now", availabilityStatus: "Available now", skills: ["Elderly Care", "Cooking"], verified: true },
];

export default function EmployerDashboardPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.dashboard;
  const common = translations[lang].employer.common;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<SheetWorker | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % workers.length);
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

  const availLabel = (w: SheetWorker) =>
    w.availabilityStatus === "Available now" ? t.availNow
    : w.availabilityStatus === "Available next month" ? t.availLater
    : t.availNow;

  return (
    <>
      <WorkerDetailSheet worker={selected} onClose={() => setSelected(null)} />

      <div className="space-y-8">

        {/* Boosted workers carousel */}
        <section>
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)] mb-4">{t.featuredTitle}</p>
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--accent)]/30 bg-[color:var(--surface)] shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {workers.map((worker) => (
                <button
                  key={worker.id}
                  onClick={() => setSelected(worker)}
                  className="min-w-full p-8 block text-left"
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
                  <p className="mt-3 text-sm font-semibold text-[color:var(--accent)]">TSh {worker.wage}/mo</p>
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-2 pb-5">
              {workers.map((_, i) => (
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
          {workers.slice(0, 3).map((w) => (
            <WorkerCard
              key={w.id}
              {...w}
              availability={availLabel(w)}
              verifiedLabel={common.verified}
              reviewsLabel={common.reviews}
              onClick={() => setSelected(w)}
            />
          ))}
        </section>

      </div>
    </>
  );
}
