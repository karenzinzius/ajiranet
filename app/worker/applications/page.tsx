"use client";

import { useState } from "react";
import { JobDetailSheet, Job } from "@/components/worker/JobDetailSheet";
import { useStore } from "@/lib/store";

type Status = "All" | "Pending" | "Shortlisted" | "Hired" | "Rejected";

type Application = {
  id: string;
  title: string;
  employer: string;
  location: string;
  wage: string;
  tags: string[];
  description?: string;
  status: "Pending" | "Shortlisted" | "Hired" | "Rejected";
  appliedAt: string;
};

const seedApplications: Application[] = [
  {
    id: "app-1",
    title: "Live-in housekeeper needed",
    employer: "The Kimaro Family",
    location: "Oyster Bay, Dar es Salaam",
    wage: "TSh 400,000/mo",
    tags: ["Housekeeping"],
    description: "We are looking for a live-in housekeeper to manage our home in Oyster Bay.",
    status: "Shortlisted",
    appliedAt: "20 Apr 2026",
  },
  {
    id: "app-2",
    title: "Full-time nanny for 3 children",
    employer: "Dr. & Mrs. Patel",
    location: "Masaki, Dar es Salaam",
    wage: "TSh 350,000/mo",
    tags: ["Childcare"],
    description: "Experienced nanny needed for three children aged 2, 5, and 8.",
    status: "Pending",
    appliedAt: "18 Apr 2026",
  },
  {
    id: "app-3",
    title: "Personal chef — 5 days a week",
    employer: "Amani Holdings",
    location: "Msasani, Dar es Salaam",
    wage: "TSh 600,000/mo",
    tags: ["Cooking"],
    description: "We need a personal chef to prepare lunch and dinner Monday to Friday.",
    status: "Hired",
    appliedAt: "10 Apr 2026",
  },
  {
    id: "app-4",
    title: "Garden & grounds maintenance",
    employer: "Villa Serengeti",
    location: "Mikocheni, Dar es Salaam",
    wage: "TSh 280,000/mo",
    tags: ["Gardening"],
    description: "Maintain a large garden including lawn, flower beds, and outdoor areas.",
    status: "Rejected",
    appliedAt: "5 Apr 2026",
  },
];

const statusStyles: Record<string, string> = {
  Pending:     "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Shortlisted: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Hired:       "bg-green-500/10 text-green-600 border-green-500/20",
  Rejected:    "bg-red-500/10 text-red-500 border-red-500/20",
};

const STATUS_LABEL: Record<string, string> = {
  pending:     "Pending",
  shortlisted: "Shortlisted",
  hired:       "Hired",
  rejected:    "Rejected",
};

export default function ApplicationsPage() {
  const { workerApplications } = useStore();
  const [filter, setFilter] = useState<Status>("All");
  const [selected, setSelected] = useState<Job | null>(null);

  // Merge seed + store applications
  const storeApps: Application[] = workerApplications.map((a) => ({
    id: a.id,
    title: a.jobTitle,
    employer: a.employer,
    location: a.location,
    wage: a.wage,
    tags: a.tags,
    description: a.description,
    status: STATUS_LABEL[a.status] as Application["status"],
    appliedAt: a.appliedAt,
  }));

  // Deduplicate (store takes priority)
  const storeIds = new Set(workerApplications.map((a) => a.jobId));
  const seedFiltered = seedApplications.filter((a) => !storeIds.has(a.id));
  const all: Application[] = [...storeApps, ...seedFiltered];

  const filters: Status[] = ["All", "Pending", "Shortlisted", "Hired", "Rejected"];
  const visible = filter === "All" ? all : all.filter((a) => a.status === filter);

  const counts = {
    All:         all.length,
    Pending:     all.filter((a) => a.status === "Pending").length,
    Shortlisted: all.filter((a) => a.status === "Shortlisted").length,
    Hired:       all.filter((a) => a.status === "Hired").length,
    Rejected:    all.filter((a) => a.status === "Rejected").length,
  };

  return (
    <>
      <JobDetailSheet job={selected} onClose={() => setSelected(null)} />

      <div className="space-y-8">
        {/* Header */}
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Track progress</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text)]">My Applications</h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {counts.All} application{counts.All !== 1 ? "s" : ""} sent — {counts.Hired} hired, {counts.Pending} pending.
          </p>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["Pending", "Shortlisted", "Hired", "Rejected"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-[2rem] border p-5 text-left transition ${filter === s ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5" : "border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--accent)]"}`}
            >
              <p className={`text-2xl font-bold ${statusStyles[s].split(" ")[1]}`}>{counts[s]}</p>
              <p className="mt-1 text-xs text-[color:var(--muted)]">{s}</p>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filter === f ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
            >
              {f} {f !== "All" && `(${counts[f]})`}
            </button>
          ))}
        </div>

        {/* List */}
        <section className="space-y-3">
          {visible.length === 0 ? (
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-10 text-center text-sm text-[color:var(--muted)]">
              No {filter.toLowerCase()} applications yet.
            </div>
          ) : (
            visible.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelected({ id: app.id, title: app.title, employer: app.employer, location: app.location, wage: app.wage, tags: app.tags, description: app.description })}
                className="w-full flex items-start justify-between gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] transition hover:border-[color:var(--accent)] text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-[color:var(--text)]">{app.title}</p>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[app.status]}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-[color:var(--muted)]">{app.employer} · {app.location}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {app.tags.map((t) => (
                      <span key={t} className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-0.5 text-xs text-[color:var(--text)]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-[color:var(--accent)]">{app.wage}</p>
                  <p className="mt-1 text-xs text-[color:var(--muted)]">Applied {app.appliedAt}</p>
                </div>
              </button>
            ))
          )}
        </section>
      </div>
    </>
  );
}
