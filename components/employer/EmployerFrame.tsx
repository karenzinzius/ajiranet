"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { MenuDrawer } from "@/components/ui/MenuDrawer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLang } from "@/lib/i18n/context";

const employerNavLinks = [
  {
    href: "/employer/dashboard",
    label: "Overview",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/employer/jobs",
    label: "My Jobs",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    href: "/employer/post-job",
    label: "Post a Job",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    href: "/employer/applicants",
    label: "Applicants",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: "/employer/saved-workers",
    label: "Saved Workers",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  },
  { 
  href: "/employer/history", 
  label: t.navHistory, 
  icon: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
      />
    </svg>
  ) 
},
  { 
    href: "/employer/wallet", 
    label: "Wallet & Payouts", 
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> 
  },
  { 
    href: "/employer/verification", 
    label: "Verify Business", 
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> 
  },
  {
    href: "/employer/settings",
    label: "Settings",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

type Props = {
  children: React.ReactNode;
  unreadMessages?: number;
  unreadNotifications?: number;
  companyName?: string;
};

export function EmployerFrame({
  children,
  unreadMessages = 0,
  unreadNotifications = 0,
  companyName = "Acme Corp",
}: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      {/* Role set to employer ensures SearchOverlay and MenuDrawer show employer-specific content */}
      <SearchOverlay
        role="employer"
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <MenuDrawer
        role="employer"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        userName={companyName}
        initials={companyName.substring(0, 2).toUpperCase()}
      />

      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-64 flex-col border-r border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-6 overflow-y-auto flex-shrink-0">
          <Image
            src="/AjiraNet1.svg"
            alt="AjiraNet"
            width={100}
            height={32}
            priority
            className="mb-8"
          />

          <nav className="flex flex-col gap-1 flex-1">
            {employerNavLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  pathname.startsWith(href)
                    ? "bg-[color:var(--accent)]/10 text-[color:var(--accent)]"
                    : "text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--bg)]"
                }`}
              >
                {icon} {label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-4 space-y-3 border-t border-[color:var(--border)] pt-4">
            <div className="flex gap-2 px-1">
              {(["en", "sw"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 rounded-xl py-1.5 text-xs font-semibold transition ${
                    lang === l
                      ? "bg-[color:var(--accent)] text-slate-950"
                      : "border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Theme Section in Sidebar */}
            <div className="px-1 space-y-2">
              <p className="px-2 text-[10px] uppercase tracking-widest text-[color:var(--muted)] font-bold">
                Theme
              </p>
              <div className="flex gap-2 bg-[color:var(--bg)] p-1 rounded-xl border border-[color:var(--border)]">
                {/* Light Button */}
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${
                    theme === "light"
                      ? "bg-[color:var(--surface)] shadow-sm border border-[color:var(--border)]"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <span
                    className={`text-lg ${theme === "light" ? "text-[color:var(--accent)] scale-110" : ""}`}
                  >
                    ☀︎
                  </span>
                </button>

                {/* Dark Button */}
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${
                    theme === "dark"
                      ? "bg-[color:var(--surface)] shadow-sm border border-[color:var(--border)]"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`${theme === "dark" ? "text-[color:var(--accent)] scale-110" : ""}`}
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </button>
              </div>
            </div>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-500/5">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-sm text-[color:var(--muted)] transition hover:border-[color:var(--accent)] w-64"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Search talent...
            </button>

            <div className="flex items-center gap-2">
              {/* Employer specialized shortcut: Post Job */}
              <Link
                href="/employer/post-job"
                title="Post a New Job"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--accent)] text-slate-950 hover:opacity-90 transition"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </Link>

              {/* Messages */}
              <Link
                href="/employer/messages"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] transition"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                {unreadMessages > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadMessages}
                  </span>
                )}
              </Link>

              <Link
                href="/employer/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] font-semibold text-xs border border-[color:var(--accent)]/20"
              >
                {companyName.substring(0, 2).toUpperCase()}
              </Link>
            </div>
          </header>

          <div className="px-8 pt-6 pb-2 flex-shrink-0">
            <h1 className="text-2xl font-semibold text-[color:var(--text)]">
              {greeting}, {companyName}.
            </h1>
            <p className="text-sm text-[color:var(--muted)]">
              Here's what's happening with your recruitment.
            </p>
          </div>

          <main className="flex-1 overflow-y-auto px-8 py-4">{children}</main>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex flex-col lg:hidden min-h-screen">
        <header className="flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 sticky top-0 z-30">
          <Image
            src="/AjiraNet1.svg"
            alt="AjiraNet"
            width={90}
            height={28}
            priority
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--border)] text-[color:var(--muted)]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 pb-24">{children}</main>

        <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[color:var(--border)] bg-[color:var(--surface)] py-2 px-4">
          <Link
            href="/employer/dashboard"
            className={`flex flex-col items-center gap-0.5 p-2 ${pathname === "/employer/dashboard" ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[10px]">Home</span>
          </Link>
          <Link
            href="/employer/jobs"
            className={`flex flex-col items-center gap-0.5 p-2 ${pathname.includes("/jobs") ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span className="text-[10px]">Jobs</span>
          </Link>
          <Link
            href="/employer/post-jobs"
            className="flex flex-col items-center gap-0.5 p-2 text-[color:var(--muted)]"
          >
            <div className="bg-[color:var(--accent)] text-slate-950 rounded-full p-1 -mt-6 border-4 border-[color:var(--bg)]">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="text-[10px]">Post</span>
          </Link>
          <Link
            href="/employer/applicants"
            className={`flex flex-col items-center gap-0.5 p-2 ${pathname.includes("/applicants") ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span className="text-[10px]">Applicants</span>
          </Link>
          <Link
            href="/employer/messages"
            className={`relative flex flex-col items-center gap-0.5 p-2 ${pathname.includes("/messages") ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span className="text-[10px]">Chat</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
