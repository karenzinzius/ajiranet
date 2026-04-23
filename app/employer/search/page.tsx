"use client";

import { useMemo, useState } from "react";
import { WorkerCard } from "@/components/worker/WorkerCard";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

const sampleWorkers = [
  { id: "alice-mwando", name: "Alice Mwando", role: "Home cleaner", location: "Mikocheni", rating: 4.8, reviews: 24, availability: "Available now" as const, skills: ["Cleaning"], verified: true },
  { id: "john-kalua", name: "John Kalua", role: "Gardener", location: "Masaki", rating: 4.6, reviews: 18, availability: "Available next month" as const, skills: ["Gardening"], verified: false },
  { id: "fatma-hassan", name: "Fatma Hassan", role: "Cook", location: "Kijitonyama", rating: 4.9, reviews: 32, availability: "Busy" as const, skills: ["Cooking"], verified: true },
];

export default function EmployerSearchPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.search;
  const common = translations[lang].employer.common;
  const dash = translations[lang].employer.dashboard; 

  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  const filteredWorkers = useMemo(() => {
    return sampleWorkers.filter((worker) => {
      const matchesQuery = query ? worker.name.toLowerCase().includes(query.toLowerCase()) || worker.role.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesSkill = skillFilter ? worker.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase())) : true;
      const matchesLocation = locationFilter ? worker.location.toLowerCase().includes(locationFilter.toLowerCase()) : true;
      const matchesAvailability = availabilityFilter ? worker.availability.toLowerCase() === availabilityFilter.toLowerCase() : true;
      const matchesRating = ratingFilter > 0 ? worker.rating >= ratingFilter : true;
      return matchesQuery && matchesSkill && matchesLocation && matchesAvailability && matchesRating;
    });
  }, [query, skillFilter, locationFilter, availabilityFilter, ratingFilter]);

  return (
    <main className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)]">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.badge}</p>
          <h1 className="mt-4 text-4xl font-semibold">{t.title}</h1>
        </header>

        <section className="grid gap-6 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-4">
            <label className="grid gap-2 text-sm">
              {t.lblSearch}
              <input value={query} onChange={(e) => setQuery(e.target.value)} className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 outline-none" />
            </label>
            <label className="grid gap-2 text-sm">
              {t.lblSkill}
              <input value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 outline-none" />
            </label>
            <label className="grid gap-2 text-sm">
              {t.lblLocation}
              <input value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 outline-none" />
            </label>
            <label className="grid gap-2 text-sm">
              {t.lblAvailability}
              <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 outline-none">
                <option value="">{t.optAll}</option>
                <option value="Available now">{t.optNow}</option>
                <option value="Available next month">{t.optNext}</option>
                <option value="Busy">{t.optBusy}</option>
              </select>
            </label>
          </div>
          <p className="text-xs text-[color:var(--muted)]">{t.tip}</p>
        </section>

        <section className="grid gap-6">
          <div className="flex flex-col gap-1 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.resultsBadge}</p>
            <p className="text-2xl font-semibold">{filteredWorkers.length} {t.foundSuffix}</p>
          </div>

          <div className="grid gap-5">
            {filteredWorkers.map((worker) => (
              <WorkerCard 
                key={worker.id} 
                {...worker}
                availabilityStatus={worker.availability}
                availability={
                  worker.availability === "Available now" ? dash.availNow : 
                  worker.availability === "Available next month" ? dash.availLater : t.optBusy
                }
                verifiedLabel={common.verified}
                reviewsLabel={common.reviews}
              />
            ))}
            {filteredWorkers.length === 0 && (
              <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center text-[color:var(--muted)]">
                {t.noResults}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}