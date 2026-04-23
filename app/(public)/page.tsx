"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLang();
  const t = translations[lang].home;

  return (
    <div className="px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <main className="space-y-8">
          <section className="grid items-center gap-10 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_36px_50px_-40px_rgba(15,23,42,0.8)] lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--muted)]">
                {t.tagline}
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text)] sm:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
                {t.heroSubtitle}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/auth/register?role=employer"
                  className="rounded-3xl bg-[color:var(--accent)] px-6 py-4 text-center text-sm font-semibold text-slate-950 shadow-lg shadow-[rgba(139,92,246,0.28)] transition hover:bg-[color:var(--accent-strong)]"
                >
                  {t.employerButton}
                </Link>
                <Link
                  href="/auth/register?role=worker"
                  className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-4 text-center text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                >
                  {t.workerButton}
                </Link>
              </div>
              <p className="text-sm text-[color:var(--muted)]">
                <Link href="/auth/login" className="font-semibold text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]">
                  {t.login}
                </Link>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}