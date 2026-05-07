"use client";

import { useState } from "react";
import { JobDetailSheet } from "@/components/worker/JobDetailSheet";
import { useStore } from "@/lib/store";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

export default function SavedJobsPage() {
  const { savedJobs, toggleSavedJob } = useStore();
  const { lang } = useLang();
  const t = translations[lang].worker.saved;

  const [selected, setSelected] = useState<typeof savedJobs[0] | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  const remove = (id: string) => {
    setRemoving(id);
    setTimeout(() => {
      toggleSavedJob(savedJobs.find((j) => j.id === id)!);
      setRemoving(null);
    }, 300);
  };

  return (
    <>
      <JobDetailSheet job={selected} onClose={() => setSelected(null)} />

      <div className="space-y-8">
        {/* Header */}
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Bookmarked</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text)]">{t.title}</h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved — {t.subtitle}
          </p>
        </section>

        {/* List */}
        <section className="space-y-3">
          {savedJobs.length === 0 ? (
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center space-y-3">
              <p className="text-4xl">🔖</p>
              <p className="font-semibold text-[color:var(--text)]">{t.empty}</p>
              <p className="text-sm text-[color:var(--muted)]">{t.emptyDesc}</p>
            </div>
          ) : (
            savedJobs.map((job) => (
              <div
                key={job.id}
                className={`flex items-start gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] transition-all duration-300 ${removing === job.id ? "opacity-0 scale-95" : "opacity-100"}`}
              >
                <button onClick={() => setSelected(job)} className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-[color:var(--text)]">{job.title}</p>
                  <p className="mt-0.5 text-sm text-[color:var(--muted)]">{job.employer} · {job.location}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-0.5 text-xs text-[color:var(--text)]">{tag}</span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-[color:var(--muted)]">Saved {job.savedAt}</p>
                </button>

                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <p className="text-sm font-semibold text-[color:var(--accent)]">{job.wage}</p>
                  <button
                    onClick={() => setSelected(job)}
                    className="rounded-2xl bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold text-slate-950 transition hover:opacity-90"
                  >
                    {t.viewApply}
                  </button>
                  <button
                    onClick={() => remove(job.id)}
                    className="flex items-center gap-1 text-xs text-[color:var(--muted)] hover:text-red-500 transition"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                    {t.removeBtn}
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
}
