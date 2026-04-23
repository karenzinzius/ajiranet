"use client";

import Link from "next/link";
import { useState } from "react";
import { JobAd } from "@/lib/sampleJobs";

type JobCardProps = JobAd;

export function JobCard({ id, title, employer, location, wage, schedule, description, skills, postedAgo, status }: JobCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <Link
      href={`/jobs/${id}`}
      className="group relative block rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition hover:border-[color:var(--accent)]/60 hover:shadow-[0_35px_60px_-40px_rgba(0,0,0,0.7)]"
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSaved(!saved);
        }}
        aria-label={saved ? "Remove saved job" : "Save job"}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
      >
        {saved ? "★" : "☆"}
      </button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[color:var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
              {status}
            </span>
            <span className="text-xs text-[color:var(--muted)]">{postedAgo}</span>
          </div>
          <h2 className="text-xl font-semibold text-[color:var(--text)]">{title}</h2>
          <p className="text-sm text-[color:var(--muted)]">{description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[color:var(--muted)]">{employer}</p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--text)]">{wage}</p>
          <p className="text-sm text-[color:var(--muted)]">{schedule}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1 text-xs text-[color:var(--text)]">{location}</span>
        {skills.map((skill) => (
          <span key={skill} className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1 text-xs text-[color:var(--text)]">
            {skill}
          </span>
        ))}
      </div>
    </Link>
  );
}
