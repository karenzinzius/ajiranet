"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

export default function EmployerProfilePage() {
  const { lang } = useLang();
  const t = translations[lang].employer.profile;

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [location, setLocation] = useState("Dar es Salaam");

  const handleSave = () => {
    alert(t.alertSaved);
  };

  return (
    <main className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)]">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
            {t.badge}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text)]">
            {t.headerTitle}
          </h1>
        </header>

        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.detailsTitle}</p>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="mt-6 space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-[color:var(--text)]">{t.lblName}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-[color:var(--text)]">{t.lblEmail}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-[color:var(--text)]">{t.lblLocation}</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
            </div>
            <button
              type="submit"
              className="inline-flex rounded-3xl bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)]"
            >
              {t.btnSave}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}