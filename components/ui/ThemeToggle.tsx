"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    window.localStorage.setItem("theme", newTheme);
  };

  return (
    <div 
      className={`relative flex items-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-1 transition-all ${
        compact ? "w-[100px]" : "w-full"
      }`}
    >
      {/* Sliding Background */}
      <div
        className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-xl bg-[color:var(--accent)] transition-all duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Light Button */}
      <button
        type="button"
        onClick={() => toggleTheme("light")}
        className={`relative z-10 flex flex-1 items-center justify-center py-2 transition-colors duration-300 ${
          theme === "light" ? "text-slate-950" : "text-[color:var(--muted)]"
        }`}
      >
        <span className="text-sm">☀︎</span>
      </button>

      {/* Dark Button */}
      <button
        type="button"
        onClick={() => toggleTheme("dark")}
        className={`relative z-10 flex flex-1 items-center justify-center py-2 transition-colors duration-300 ${
          theme === "dark" ? "text-slate-950" : "text-[color:var(--muted)]"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  );
}