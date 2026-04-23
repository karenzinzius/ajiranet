"use client";

import { AppLogo } from "@/components/ui/Logo";
import  { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
      <AppLogo />
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}