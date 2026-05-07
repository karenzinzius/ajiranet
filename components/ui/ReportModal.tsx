"use client";

import { useRef, useState } from "react";

const DEFAULT_REASONS = [
  "Inappropriate content",
  "Spam or misleading",
  "Suspected scam",
  "Fake profile",
  "Harassment",
  "Other",
];

type Props = {
  open: boolean;
  targetName: string;
  onClose: () => void;
  reasons?: string[];
};

export function ReportModal({ open, targetName, onClose, reasons = DEFAULT_REASONS }: Props) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setScreenshot(file.name);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!reason) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setReason("");
    setMessage("");
    setScreenshot(null);
    setSubmitted(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-2xl space-y-5">

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h2 className="text-lg font-bold text-[color:var(--text)]">Report submitted</h2>
            <p className="text-sm text-[color:var(--muted)] leading-6">
              Thank you for keeping AjiraNet safe. Our team will review your report for <span className="font-semibold text-[color:var(--text)]">{targetName}</span> within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="w-full rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 transition hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-bold text-[color:var(--text)]">Report {targetName}</h2>
              <p className="mt-1 text-sm text-[color:var(--muted)]">Help us understand what's wrong. Your report is confidential.</p>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">Reason</p>
              <div className="grid grid-cols-2 gap-2">
                {reasons.map((r) => (
                  <button
                    key={r}
                    onClick={() => setReason(r)}
                    className={`rounded-2xl border px-3 py-2.5 text-xs font-semibold text-left transition ${reason === r ? "border-red-500 bg-red-500/10 text-red-500" : "border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-red-500/50"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">Describe what happened (optional)</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide any additional details…"
                rows={3}
                className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 text-sm text-[color:var(--text)] outline-none transition focus:border-red-500 resize-none"
              />
            </div>

            {/* Screenshot */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)] mb-2">Attach screenshot (optional)</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              {screenshot ? (
                <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3">
                  <svg className="h-4 w-4 text-[color:var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span className="flex-1 text-xs text-[color:var(--text)] truncate">{screenshot}</span>
                  <button onClick={() => setScreenshot(null)} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[color:var(--border)] py-3 text-xs font-semibold text-[color:var(--muted)] transition hover:border-red-500/50 hover:text-red-500"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  Attach screenshot
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 rounded-2xl border border-[color:var(--border)] py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!reason}
                className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
