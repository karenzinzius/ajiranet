"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
type TopicKey = "All" | "Payments" | "Applicants" | "Account" | "Disputes";

const TOPIC_MAP: Record<number, TopicKey> = {
  0: "Account",
  1: "Payments",
  2: "Payments",
  3: "Account",
  4: "Disputes",
  5: "Disputes",
  6: "Applicants",
  7: "Payments",
};

export default function EmployerHelpPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.help;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [topic, setTopic] = useState<TopicKey>("All");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const topicLabels: Record<TopicKey, string> = {
    All: t.topicAll,
    Payments: t.topicPayments,
    Applicants: t.topicApplicants,
    Account: t.topicAccount,
    Disputes: t.topicDisputes,
  };

  const filteredFaq = t.faqItems
    .map((item, i) => ({ ...item, index: i }))
    .filter(({ index }) => topic === "All" || TOPIC_MAP[index] === topic);

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.title}</p>
          <h1 className="mt-3 text-3xl font-bold text-[color:var(--text)]">{t.title}</h1>
          <p className="mt-2 text-sm text-[color:var(--muted)]">{t.subtitle}</p>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] font-bold">{t.faqTitle}</h2>

          {/* Topic chips */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(topicLabels) as TopicKey[]).map((key) => (
              <button
                key={key}
                onClick={() => { setTopic(key); setOpenIndex(null); }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${topic === key ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
              >
                {topicLabels[key]}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div className="space-y-2">
            {filteredFaq.map(({ q, a, index }) => (
              <div key={index} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[color:var(--text)]">{q}</span>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-[color:var(--muted)] transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5">
                    <div className="flex gap-3 rounded-2xl bg-[color:var(--accent)]/5 border border-[color:var(--accent)]/20 p-4">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                      </div>
                      <p className="text-sm text-[color:var(--text)] leading-6">{a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-5">
          <div>
            <h2 className="text-lg font-bold text-[color:var(--text)]">{t.contactTitle}</h2>
            <p className="mt-1 text-sm text-[color:var(--muted)]">{t.contactSubtitle}</p>
          </div>

          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="text-lg font-bold text-[color:var(--text)]">{t.contactSent}</h3>
              <p className="text-sm text-[color:var(--muted)]">{t.contactSentDesc}</p>
              <button
                onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
                className="text-sm font-semibold text-[color:var(--accent)] hover:underline"
              >
                {t.contactSendAnother}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.contactName}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amina Hassan"
                    className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.contactEmail}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.contactMessage}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contactMessage}
                  rows={4}
                  className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] resize-none"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!name.trim() || !email.trim() || !message.trim()}
                className="w-full rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[color:var(--accent)]/20"
              >
                {t.contactSend}
              </button>
              <p className="text-center text-xs text-[color:var(--muted)]">{t.supportEmail}</p>
            </div>
          )}
        </div>

    </div>
  );
}
