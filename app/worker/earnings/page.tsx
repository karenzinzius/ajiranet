"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

type Network = "M-Pesa" | "Vodacom M-Pesa" | "Airtel Money" | "Tigo Pesa";

type PayoutRecord = {
  id: string;
  job: string;
  amount: string;
  amountNum: number;
  date: string;
  network: Network;
  phone: string;
};

const payoutHistory: PayoutRecord[] = [
  { id: "p1", job: "House Cleaning — Mama Amina",  amount: "80,000",  amountNum: 80000,  date: "30 Apr 2026", network: "M-Pesa",         phone: "0712 345 678" },
  { id: "p2", job: "Childcare — Family of 4",      amount: "120,000", amountNum: 120000, date: "15 Apr 2026", network: "Vodacom M-Pesa", phone: "0754 123 456" },
  { id: "p3", job: "Elderly Care — Bibi Fatma",    amount: "200,000", amountNum: 200000, date: "2 Apr 2026",  network: "Airtel Money",   phone: "0688 901 234" },
];

const networkIcons: Record<Network, string> = {
  "M-Pesa":         "🟢",
  "Vodacom M-Pesa": "🔴",
  "Airtel Money":   "🔵",
  "Tigo Pesa":      "🟡",
};

const PENDING_NUM    = 250000;
const PENDING_AMOUNT = "250,000";
const CASHED_OUT_NUM = payoutHistory.reduce((s, p) => s + p.amountNum, 0);
const TOTAL_EARNED   = PENDING_NUM + CASHED_OUT_NUM;

function fmt(n: number) {
  return n.toLocaleString();
}

export default function EarningsPage() {
  const { lang } = useLang();
  const t = translations[lang].worker.earnings;

  const [showModal, setShowModal]           = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>("M-Pesa");
  const [phone, setPhone]                   = useState("");
  const [success, setSuccess]               = useState(false);
  const [phoneError, setPhoneError]         = useState("");

  const networks: Network[] = ["M-Pesa", "Vodacom M-Pesa", "Airtel Money", "Tigo Pesa"];

  const handleConfirm = () => {
    if (phone.trim().replace(/\s/g, "").length < 9) {
      setPhoneError(t.phoneError);
      return;
    }
    setPhoneError("");
    setSuccess(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccess(false);
    setPhone("");
    setPhoneError("");
  };

  return (
    <>
      {/* ── Cash-out modal ─────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-2xl space-y-5">
            {success ? (
              <div className="text-center space-y-4 py-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-[color:var(--text)]">{t.successTitle}</h2>
                <p className="text-sm text-[color:var(--muted)]">
                  {t.successDesc.replace("{amount}", PENDING_AMOUNT).replace("{network}", selectedNetwork)}
                </p>
                <button
                  onClick={handleCloseModal}
                  className="w-full rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 transition hover:opacity-90"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-bold text-[color:var(--text)]">{t.modalTitle}</h2>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{t.modalNote}</p>
                </div>

                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 text-center">
                  <p className="text-xs text-[color:var(--muted)]">{t.amount}</p>
                  <p className="mt-1 text-3xl font-bold text-[color:var(--accent)]">TSh {PENDING_AMOUNT}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.network}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {networks.map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelectedNetwork(n)}
                        className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-xs font-semibold text-left transition ${
                          selectedNetwork === n
                            ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]"
                            : "border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"
                        }`}
                      >
                        <span>{networkIcons[n]}</span> {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.phone}</p>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                    className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
                  />
                  {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 rounded-2xl border border-[color:var(--border)] py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 shadow-lg shadow-[color:var(--accent)]/20"
                  >
                    {t.confirm}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* ── Header + stats ────────────────────────────── */}
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <h1 className="text-3xl font-bold text-[color:var(--text)]">{t.title}</h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{t.subtitle}</p>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[color:var(--border)] pt-6">
            <div className="text-center">
              <p className="text-xl font-bold text-[color:var(--text)]">TSh {fmt(TOTAL_EARNED)}</p>
              <p className="mt-1 text-xs text-[color:var(--muted)]">{t.totalEarned}</p>
            </div>
            <div className="text-center border-x border-[color:var(--border)]">
              <p className="text-xl font-bold text-amber-500">TSh {PENDING_AMOUNT}</p>
              <p className="mt-1 text-xs text-[color:var(--muted)]">{t.pendingLabel}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">TSh {fmt(CASHED_OUT_NUM)}</p>
              <p className="mt-1 text-xs text-[color:var(--muted)]">{t.cashedOut}</p>
            </div>
          </div>
        </section>

        {/* ── Pending in escrow ─────────────────────────── */}
        <section className="rounded-[2rem] border border-amber-500/30 bg-amber-500/5 p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-5">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-amber-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600 font-semibold">{t.pendingLabel}</p>
          </div>

          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-4xl font-bold text-[color:var(--text)]">TSh {PENDING_AMOUNT}</p>
              <p className="mt-2 text-sm text-[color:var(--muted)] max-w-xs leading-6">{t.pendingNote}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 rounded-2xl bg-[color:var(--accent)] px-6 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 shadow-lg shadow-[color:var(--accent)]/20"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
              {t.requestPayout}
            </button>
          </div>
        </section>

        {/* ── Cashed out history ────────────────────────── */}
        <section className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.historyTitle}</p>

          {payoutHistory.length === 0 ? (
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-10 text-center text-sm text-[color:var(--muted)]">
              {t.noPayouts}
            </div>
          ) : (
            <div className="space-y-3">
              {payoutHistory.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[color:var(--bg)] border border-[color:var(--border)] text-2xl">
                    {networkIcons[p.network]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[color:var(--text)] truncate">{p.job}</p>
                    <p className="text-xs text-[color:var(--muted)]">{p.date}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">
                      <span className="font-medium text-[color:var(--text)]">{p.network}</span> · {p.phone}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-bold text-[color:var(--accent)]">TSh {p.amount}</p>
                    <span className="inline-block mt-1 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-green-600">
                      {t.statusCompleted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Report delayed payout ─────────────────────── */}
        <section className="rounded-[2rem] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)]/60 p-6 space-y-2">
          <p className="text-sm font-semibold text-[color:var(--text)]">{t.reportDelayed}</p>
          <p className="text-sm text-[color:var(--muted)]">{t.reportDelayedDesc}</p>
          <Link
            href="/worker/help"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--accent)] hover:underline"
          >
            {t.goToHelp} →
          </Link>
        </section>
      </div>
    </>
  );
}
