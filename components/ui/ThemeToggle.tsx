"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
<button
  type="button"
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
  title={`Theme: ${theme === "dark" ? "Dark" : "Light"}`}
  className="group flex h-11 items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
>
  <span className={`transition-all duration-300 ${
    theme === "light"
      ? "text-[color:var(--accent)] scale-125"
      : "opacity-40 group-hover:opacity-70"
  }`}>
    ☀︎
  </span>

  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`transition-all duration-300 ${
      theme === "dark"
        ? "text-[color:var(--accent)] scale-125"
        : "opacity-40 group-hover:opacity-70"
    }`}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
</button>
  );
}
