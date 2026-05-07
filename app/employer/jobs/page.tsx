"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

type JobStatus = "Active" | "Paused" | "Closed";

type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  wage: string;
  apps: number;
  status: JobStatus;
  boosted: boolean;
  duration: string;
  postedAt: string;
};

const statusColor: Record<JobStatus, string> = {
  Active: "bg-green-500/10 text-green-600",
  Paused: "bg-yellow-500/10 text-yellow-600",
  Closed: "bg-[color:var(--border)] text-[color:var(--muted)]",
};

export default function EmployerJobsPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.jobs;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | JobStatus>("all");

  useEffect(() => { loadJobs(); }, []);

  const loadJobs = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, category, location, wage, duration, status, boosted, created_at")
      .eq("employer_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setJobs(data.map((j) => ({
        id: j.id,
        title: j.title,
        category: j.category ?? "",
        location: j.location ?? "",
        wage: j.wage ?? "",
        apps: 0,
        status: (j.status as JobStatus) ?? "Active",
        boosted: j.boosted ?? false,
        duration: j.duration ?? "",
        postedAt: new Date(j.created_at).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        }),
      })));
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    await supabase.from("jobs").delete().eq("id", id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  const filterOptions: Array<{ key: "all" | JobStatus; label: string }> = [
    { key: "all", label: t.filterAll },
    { key: "Active", label: t.filterActive },
    { key: "Paused", label: t.filterPaused },
    { key: "Closed", label: t.filterClosed },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.activeTitle}</p>
          <h1 className="mt-1 text-3xl font-bold text-[color:var(--text)]">{t.title}</h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{t.subtitle}</p>
        </div>
        <Link
          href="/employer/post-job"
          className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--accent)] px-5 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 shadow-lg shadow-[color:var(--accent)]/20 whitespace-nowrap"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          {t.postNew}
        </Link>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filter === key ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
          >
            {label}
            {key === "all"
              ? <span className="ml-1.5 opacity-60">({jobs.length})</span>
              : <span className="ml-1.5 opacity-60">({jobs.filter((j) => j.status === key).length})</span>
            }
          </button>
        ))}
      </div>

      {/* Jobs list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-10 text-center">
          <p className="text-[color:var(--muted)] text-sm">{jobs.length === 0 ? "No jobs posted yet." : t.noJobs}</p>
          <Link href="/employer/post-job" className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent)] hover:underline">
            {t.postNew} →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="group flex items-start justify-between gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 transition hover:border-[color:var(--accent)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)]"
            >
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-[color:var(--text)]">{job.title}</h3>
                  {job.boosted && (
                    <span className="flex items-center gap-1 rounded-full bg-[color:var(--accent)]/10 px-2 py-0.5 text-[10px] font-bold text-[color:var(--accent)]">
                      ⚡ Boosted
                    </span>
                  )}
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${statusColor[job.status]}`}>
                    {job.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[color:var(--muted)]">
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                    TSh {job.wage}/mo
                  </span>
                  <span>{job.category} · {job.duration}</span>
                  {job.apps > 0 && (
                    <span className="text-[color:var(--accent)] font-medium">{job.apps} {t.applicantsCount}</span>
                  )}
                </div>

                <p className="text-[10px] text-[color:var(--muted)]">Posted {job.postedAt}</p>
              </div>

              <button
                onClick={() => handleDelete(job.id)}
                className="mt-1 flex-shrink-0 rounded-xl p-2 text-[color:var(--muted)] opacity-0 group-hover:opacity-100 transition hover:bg-red-500/10 hover:text-red-500"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
