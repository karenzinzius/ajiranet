"use client";

import { useMemo, useState } from "react";
import { WorkerFrame } from "@/components/worker/WorkerFrame";
import { WorkerCard } from "@/components/worker/WorkerCard";

const sampleWorkers = [
  {
    id: "alice-mwando",
    name: "Alice Mwando",
    role: "Home cleaner & childcare",
    location: "Mikocheni, Dar es Salaam",
    rating: 4.8,
    reviews: 24,
    availability: "Available now" as const,
    skills: ["Cleaning", "Childcare", "Cooking"],
    verified: true,
  },
  {
    id: "john-kalua",
    name: "John Kalua",
    role: "Gardening & errands",
    location: "Masaki, Dar es Salaam",
    rating: 4.6,
    reviews: 18,
    availability: "Available next month" as const,
    skills: ["Gardening", "Errands", "Childcare"],
    verified: false,
  },
  {
    id: "fatma-hassan",
    name: "Fatma Hassan",
    role: "Cooking specialist",
    location: "Kijitonyama, Dar es Salaam",
    rating: 4.9,
    reviews: 32,
    availability: "Busy" as const,
    skills: ["Cooking", "Cleaning", "Laundry"],
    verified: true,
  },
];

export default function WorkerSearchPage() {
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredWorkers = useMemo(() => {
    return sampleWorkers.filter((worker) => {
      const matchesQuery = query
        ? worker.name.toLowerCase().includes(query.toLowerCase()) ||
          worker.role.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesSkill = skillFilter
        ? worker.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()))
        : true;
      const matchesLocation = locationFilter
        ? worker.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
      return matchesQuery && matchesSkill && matchesLocation;
    });
  }, [query, skillFilter, locationFilter]);

  return (
    <WorkerFrame>
      <div className="space-y-8">
        <header className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Worker marketplace</p>
          <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text)]">
            Find workers by skill, area, and availability.
          </h1>
        </header>

        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="grid gap-2 text-sm text-[color:var(--muted)]">
              Name or role
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Alice, cleaner, nanny…"
                className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
            </label>
            <label className="grid gap-2 text-sm text-[color:var(--muted)]">
              Skill
              <input
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                placeholder="Cooking, Gardening…"
                className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
            </label>
            <label className="grid gap-2 text-sm text-[color:var(--muted)]">
              Area
              <input
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Mikocheni, Masaki…"
                className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
            {filteredWorkers.length} worker{filteredWorkers.length === 1 ? "" : "s"} found
          </p>
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker) => <WorkerCard key={worker.id} {...worker} />)
          ) : (
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-center text-sm text-[color:var(--muted)]">
              No workers match your filters.
            </div>
          )}
        </section>
      </div>
    </WorkerFrame>
  );
}