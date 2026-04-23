"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  role: "worker" | "employer";
  open: boolean;
  onClose: () => void;
};

const workerSuggestions = ["House cleaning", "Childcare", "Cooking", "Gardening", "Driving", "Laundry", "Elderly care"];
const employerSuggestions = ["Alice Mwando", "Fatma Hassan", "Mikocheni", "Available now", "Cooking specialist", "Verified only"];

export function SearchOverlay({ role, open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/${role}/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  const suggestions = role === "worker" ? workerSuggestions : employerSuggestions;
  const placeholder = role === "worker" ? "Search jobs, locations, skills…" : "Search workers, skills, areas…";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-down panel */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto max-w-2xl px-4 pt-4 pb-6">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_35px_80px_-10px_rgba(0,0,0,0.5)]">
            {/* Input row */}
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 flex-shrink-0 text-[color:var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-base text-[color:var(--text)] outline-none placeholder:text-[color:var(--muted)]"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-[color:var(--muted)] hover:text-[color:var(--text)]">
                  ✕
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-shrink-0 rounded-xl border border-[color:var(--border)] px-3 py-1.5 text-sm text-[color:var(--muted)] hover:text-[color:var(--text)] transition"
              >
                Cancel
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestions
                .filter((s) => !query || s.toLowerCase().includes(query.toLowerCase()))
                .map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); handleSearch(); }}
                    className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1.5 text-xs font-medium text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                  >
                    {s}
                  </button>
                ))}
            </div>

            {query && (
              <button
                onClick={handleSearch}
                className="mt-4 w-full rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)]"
              >
                Search "{query}"
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}