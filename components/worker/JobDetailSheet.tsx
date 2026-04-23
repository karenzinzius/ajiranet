"use client";

import { useEffect } from "react";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  employer: string;
  location: string;
  wage: string;
  tags: string[];
  description?: string;
};

type Props = {
  job: Job | null;
  onClose: () => void;
};

export function JobDetailSheet({ job, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${job ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${job ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-auto max-w-2xl rounded-t-[2rem] border-t border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.4)]">

          {/* Handle */}
          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[color:var(--border)]" />

          {/* Back button */}
          <button
            onClick={onClose}
            className="mb-4 flex items-center gap-2 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back to browse
          </button>

          {job && (
            <div className="space-y-5">
              {/* Job info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.tags.map((t) => (
                    <span key={t} className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-0.5 text-xs text-[color:var(--text)]">{t}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-semibold text-[color:var(--text)]">{job.title}</h2>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{job.employer} · {job.location}</p>
                <p className="mt-2 text-base font-semibold text-[color:var(--accent)]">{job.wage}</p>
              </div>

              {job.description && (
                <p className="text-sm leading-7 text-[color:var(--muted)]">{job.description}</p>
              )}

              {/* Actions */}
              <div className="grid gap-3">
                <Link
                  href={`/worker/messages/new?employer=${encodeURIComponent(job.employer)}&job=${encodeURIComponent(job.title)}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  Send message
                </Link>

                <Link
                  href={`/worker/${job.id}/gallery`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  View gallery
                </Link>

                <button
                  onClick={() => alert("Report submitted — thank you.")}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  Report this job
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}