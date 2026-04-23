"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

export default function EmployerJobsPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.jobs; // Accessing the jobs sub-block

  const [jobs, setJobs] = useState([
    { id: 1, title: "House cleaning needed", location: "Mikocheni", apps: 3, status: "Active" },
    { id: 2, title: "Gardening services", location: "Masaki", apps: 5, status: "Active" },
  ]);

  const [form, setForm] = useState({ title: "", loc: "", desc: "" });

  const handleDelete = (id: number) => {
    if (confirm(t.confirmDelete)) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Title */}
      <div className="pb-2">
        <h1 className="text-3xl font-bold text-[color:var(--text)]">{t.title}</h1>
        <p className="text-[color:var(--muted)]">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 2. POSTING SECTION */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[color:var(--muted)] mb-6">{t.createTitle}</h2>
            <div className="space-y-4">
              <input 
                placeholder={t.placeholderTitle} 
                className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none focus:border-[color:var(--accent)]"
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
              />
              <input 
                placeholder={t.placeholderLoc} 
                className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none focus:border-[color:var(--accent)]"
                value={form.loc}
                onChange={e => setForm({...form, loc: e.target.value})}
              />
              <textarea 
                placeholder={t.placeholderDesc} 
                rows={4} 
                className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none focus:border-[color:var(--accent)]"
                value={form.desc}
                onChange={e => setForm({...form, desc: e.target.value})}
              />
              <button className="w-full py-4 bg-[color:var(--accent)] text-slate-950 font-bold rounded-2xl hover:opacity-90 transition">
                {t.btnPost}
              </button>
            </div>
          </div>
        </div>

        {/* 3. ACTIVE JOBS LIST */}
        <div className="lg:col-span-7">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[color:var(--muted)]">{t.activeTitle}</h2>
              <span className="px-3 py-1 bg-[color:var(--accent)]/10 text-[color:var(--accent)] text-xs font-bold rounded-full">
                {jobs.length} {t.liveSuffix}
              </span>
            </div>

            <div className="space-y-3">
              {jobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] hover:border-[color:var(--accent)] transition group">
                  <div>
                    <h3 className="font-bold text-[color:var(--text)]">{job.title}</h3>
                    <div className="flex gap-3 text-xs text-[color:var(--muted)] mt-1">
                      <span>{job.location}</span>
                      <span className="text-[color:var(--accent)] font-medium">{job.apps} {t.applicantsCount}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(job.id)}
                    className="p-2 text-red-400 opacity-0 group-hover:opacity-100 transition hover:bg-red-500/10 rounded-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}