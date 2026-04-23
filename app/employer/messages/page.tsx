"use client";

import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

export default function MessagesPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.messages;

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[color:var(--bg)] px-6">
      <div className="w-full max-w-2xl text-center rounded-[3rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        
        <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--muted)] mb-2">
          {t.label}
        </p>
        
        <h1 className="text-3xl font-bold text-[color:var(--text)]">
          {t.emptyTitle}
        </h1>
        
        <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
          {t.emptySubtitle}
        </p>
      </div>
    </main>
  );
}