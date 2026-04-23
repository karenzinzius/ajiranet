"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/worker/dashboard", label: "Feed" },
  { href: "/worker/jobs", label: "Jobs" },
  { href: "/worker/gallery", label: "Gallery" },
  { href: "/worker/messages", label: "Messages" },
  { href: "/worker/settings", label: "Settings" },
];

export function WorkerHeader({ unreadMessages = 0, unreadNotifications = 0 }: { unreadMessages?: number; unreadNotifications?: number }) {
  const pathname = usePathname();

  return (
    <header className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
      <div className="flex items-center justify-between px-6 py-4">
        <Image src="/AjiraNet2-svg.svg" alt="AjiraNet" width={110} height={36} priority />

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />

          {/* Notifications */}
          <Link href="/worker/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {unreadNotifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadNotifications}
              </span>
            )}
          </Link>

          {/* Messages */}
          <Link href="/worker/messages" className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {unreadMessages > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadMessages}
              </span>
            )}
          </Link>

          {/* Avatar */}
          <Link href="/worker/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-sm font-semibold text-[color:var(--accent)] transition hover:bg-[color:var(--accent)]/20">
            JD
          </Link>
        </div>
      </div>

      {/* Subnav */}
      <div className="flex gap-1 border-t border-[color:var(--border)] px-4 py-2">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              pathname === href
                ? "bg-[color:var(--accent)]/10 text-[color:var(--accent)]"
                : "text-[color:var(--muted)] hover:text-[color:var(--text)]"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}