"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { MenuDrawer } from "@/components/ui/MenuDrawer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

const navLinks = [
  {
    href: "/worker/dashboard", label: "Home",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    href: "/worker/applications", label: "My Applications",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    href: "/worker/saved", label: "Saved Jobs",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
  },
  {
    href: "/worker/gallery", label: "My Gallery",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  },
  {
    href: "/worker/earnings", label: "Earnings",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  },
  {
    href: "/worker/help", label: "Help & Support",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  },
  {
    href: "/worker/settings", label: "Settings",
    icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  },
];

type Props = { children: React.ReactNode; unreadMessages?: number; unreadNotifications?: number; };

export function WorkerFrame({ children, unreadMessages = 0, unreadNotifications = 0 }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const t = translations[lang].worker.nav;
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <SearchOverlay role="worker" open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MenuDrawer role="worker" open={menuOpen} onClose={() => setMenuOpen(false)} userName="John Doe" initials="JD" />

      {/* ── DESKTOP ── */}
      <div className="hidden lg:flex h-screen overflow-hidden">

        {/* Sidebar */}
        <aside className="flex w-60 flex-col border-r border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-6 overflow-y-auto flex-shrink-0">
          <Image src="/AjiraNet1.svg" alt="AjiraNet" width={100} height={32} priority className="mb-8" />

          {/* Nav links */}
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  pathname === href
                    ? "bg-[color:var(--accent)]/10 text-[color:var(--accent)]"
                    : "text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--bg)]"
                }`}
              >
                {icon} {label}
              </Link>
            ))}
          </nav>

          {/* Bottom — language, theme, logout */}
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
            <div className="px-1">
              <ThemeToggle />
            </div>
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-500/5">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              {t.signOut}
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Desktop top bar — search left, icons right */}
          <header className="flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-sm text-[color:var(--muted)] transition hover:border-[color:var(--accent)] w-64"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              Search jobs…
            </button>

            {/* Top right icons */}
            <div className="flex items-center gap-2">
              {/* Saved */}
              <Link href="/worker/saved" className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${pathname === "/worker/saved" ? "border-[color:var(--accent)] text-[color:var(--accent)]" : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"}`}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
              </Link>

              {/* Messages */}
              <Link href="/worker/messages" className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition ${pathname === "/worker/messages" ? "border-[color:var(--accent)] text-[color:var(--accent)]" : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"}`}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                {unreadMessages > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{unreadMessages}</span>}
              </Link>

              {/* Notifications */}
              <Link href="/worker/notifications" className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition ${pathname === "/worker/notifications" ? "border-[color:var(--accent)] text-[color:var(--accent)]" : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"}`}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                {unreadNotifications > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{unreadNotifications}</span>}
              </Link>

              {/* Profile avatar */}
              <Link href="/worker/profile" className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition ${pathname === "/worker/profile" ? "bg-[color:var(--accent)] text-slate-950" : "bg-[color:var(--accent)]/10 text-[color:var(--accent)] hover:bg-[color:var(--accent)]/20"}`}>
                JD
              </Link>
            </div>
          </header>

          {/* Greeting */}
          <div className="px-8 pt-6 pb-2 flex-shrink-0">
            <p className="text-2xl font-semibold text-[color:var(--text)]">{greeting}, John. 👋</p>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto px-8 py-4">{children}</main>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex flex-col lg:hidden min-h-screen">

        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 sticky top-0 z-30 flex-shrink-0">
          <Image src="/AjiraNet1.svg" alt="AjiraNet" width={90} height={28} priority />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--border)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--border)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </header>

        {/* Greeting */}
        <div className="px-4 pt-5 pb-1">
          <p className="text-xl font-semibold text-[color:var(--text)]">{greeting}, John. 👋</p>
        </div>

        {/* Page content */}
        <main className="flex-1 px-4 py-4 pb-24">{children}</main>

        {/* Mobile bottom bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[color:var(--border)] bg-[color:var(--surface)] py-2 px-2">
          <Link href="/worker/dashboard" className={`flex flex-col items-center gap-0.5 p-2 transition ${pathname === "/worker/dashboard" ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[10px]">Home</span>
          </Link>
          <Link href="/worker/applications" className={`flex flex-col items-center gap-0.5 p-2 transition ${pathname === "/worker/applications" ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span className="text-[10px]">{t.applications}</span>
          </Link>
          <Link href="/worker/messages" className={`relative flex flex-col items-center gap-0.5 p-2 transition ${pathname === "/worker/messages" ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            {unreadMessages > 0 && <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{unreadMessages}</span>}
            <span className="text-[10px]">Messages</span>
          </Link>
          <Link href="/worker/saved" className={`flex flex-col items-center gap-0.5 p-2 transition ${pathname === "/worker/saved" ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            <span className="text-[10px]">{t.saved}</span>
          </Link>
          <Link href="/worker/profile" className={`flex flex-col items-center gap-0.5 p-2 transition ${pathname === "/worker/profile" ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px]">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}