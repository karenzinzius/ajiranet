"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

type TopicKey = "topicAll" | "topicPayments" | "topicApplications" | "topicAccount" | "topicDisputes";

const TOPIC_KEYS: TopicKey[] = [
  "topicAll",
  "topicPayments",
  "topicApplications",
  "topicAccount",
  "topicDisputes",
];


const FAQ_TOPIC_MAP: Record<number, string> = {
  0: "topicPayments",
  1: "topicPayments",
  2: "topicPayments",
  3: "topicDisputes",
  4: "topicApplications",
  5: "topicAccount",
  6: "topicAccount",
  7: "topicDisputes",
};

export default function HelpPage() {
  const { lang } = useLang();
  const t = translations[lang].worker.help;

  const [activeTopic, setActiveTopic] = useState<TopicKey>("topicAll");
  const [openFaq, setOpenFaq]         = useState<number | null>(null);

  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [message, setMessage]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const topicLabels: Record<TopicKey, string> = {
    topicAll:          t.topicAll,
    topicPayments:     t.topicPayments,
    topicApplications: t.topicApplications,
    topicAccount:      t.topicAccount,
    topicDisputes:     t.topicDisputes,
  };

  const visibleItems = t.faqItems
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => activeTopic === "topicAll" || FAQ_TOPIC_MAP[i] === activeTopic);

  const handleTopicChange = (key: TopicKey) => {
    setActiveTopic(key);
    setOpenFaq(null);
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────── */}
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Support</p>
        </div>
        <h1 className="text-3xl font-bold text-[color:var(--text)]">{t.title}</h1>
        <p className="mt-1 text-sm text-[color:var(--muted)]">{t.subtitle}</p>
      </section>

      {/* ── Topic filter chips ──────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {TOPIC_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => handleTopicChange(key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTopic === key
                ? "bg-[color:var(--accent)] text-slate-950"
                : "border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            }`}
          >
            {topicLabels[key]}
          </button>
        ))}
      </div>

      {/* ── FAQ accordion ───────────────────────────────── */}
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] mb-4">{t.faqTitle}</p>

        {visibleItems.length === 0 ? (
          <p className="py-6 text-sm text-center text-[color:var(--muted)]">No topics found.</p>
        ) : (
          <div className="space-y-0">
            {visibleItems.map(({ item, i }) => (
              <div key={i} className="border-b border-[color:var(--border)] last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <p className="text-sm font-semibold text-[color:var(--text)]">{item.q}</p>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-[color:var(--muted)] transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {openFaq === i && (
                  <div className="pb-5 flex gap-3">
                    {/* AI-style response avatar */}
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 mt-0.5">
                      <svg className="h-3.5 w-3.5 text-[color:var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div className="flex-1 rounded-2xl rounded-tl-sm bg-[color:var(--bg)] border border-[color:var(--border)] px-4 py-3">
                      <p className="text-sm leading-7 text-[color:var(--text)]">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Delayed payment alert ───────────────────────── */}
      <section className="rounded-[2rem] border border-dashed border-amber-500/40 bg-amber-500/5 p-6">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 flex-shrink-0 text-amber-500 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div>
            <p className="text-sm font-semibold text-[color:var(--text)]">{t.reportPayoutTitle}</p>
            <p className="mt-1 text-sm text-[color:var(--muted)] leading-6">{t.reportPayoutDesc}</p>
          </div>
        </div>
      </section>

      {/* ── Contact support form ────────────────────────── */}
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-5">
        <div>
          <p className="font-semibold text-[color:var(--text)]">{t.formTitle}</p>
          <p className="mt-1 text-sm text-[color:var(--muted)] leading-6">{t.formSubtitle}</p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 space-y-1 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <p className="font-semibold text-green-600">{t.privateSuccess}</p>
            <p className="text-sm text-green-600/80">{t.privateSuccessDesc}</p>
            <button
              onClick={handleReset}
              className="mt-3 text-xs font-semibold text-[color:var(--accent)] hover:underline"
            >
              {t.sendAnother}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
                  {t.formName}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.formNamePlaceholder}
                  className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
                  {t.formEmail}
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.formEmailPlaceholder}
                  type="email"
                  className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
                {t.formMessage}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.privatePlaceholder}
                rows={5}
                className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!message.trim() || submitting}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[color:var(--accent)]/20"
            >
              {submitting ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.2"/><path d="M12 2a10 10 0 0110 10"/>
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
              {submitting ? "Sending…" : t.privateSubmit}
            </button>
          </>
        )}

        <p className="text-xs text-center text-[color:var(--muted)]">
          {t.contactEmail}
        </p>
      </section>
    </div>
  );
}
