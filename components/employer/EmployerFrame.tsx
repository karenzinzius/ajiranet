"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { MenuDrawer } from "@/components/ui/MenuDrawer";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const t = translations[lang].employer.nav;
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  // Move Nav Links inside so 't' is defined
  const employerNavLinks = [
    { href: "/employer/dashboard", label: t.dashboard, icon: <HomeIcon /> },
    { href: "/employer/jobs", label: t.myJobs, icon: <BriefcaseIcon /> },
    { href: "/employer/post-job", label: t.postJob, icon: <PlusIcon /> },
    { href: "/employer/applicants", label: t.applicants, icon: <UsersIcon /> },
    { href: "/employer/saved-workers", label: t.saved, icon: <BookmarkIcon /> },
    { href: "/employer/history", label: t.history, icon: <HistoryIcon /> },
    { href: "/employer/wallet", label: t.wallet, icon: <WalletIcon /> },
    { href: "/employer/verification", label: t.verify, icon: <ShieldIcon /> },
    { href: "/employer/settings", label: t.settings, icon: <SettingsIcon /> },
  ];

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t.greetingMorning
      : hour < 17
        ? t.greetingAfternoon
        : t.greetingEvening;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.dataset.theme as "light" | "dark";
      if (theme) setCurrentTheme(theme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "dark-theme" : "light-theme"} bg-[color:var(--bg)] text-[color:var(--text)]`}
    >
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
        <aside className="flex w-64 flex-col border-r border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-6 overflow-y-auto flex-shrink-0">
          {/* Logo switching logic */}
          <div className="mb-8 px-2">
            <Image
              src={theme === "dark" ? "/AjiraNet2-svg.svg" : "/AjiraNet1.svg"}
              alt="AjiraNet"
              width={110}
              height={35}
              priority
              style={{ height: "auto", width: "auto" }}
            />
          </div>

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

          <div className="mt-4 space-y-4 border-t border-[color:var(--border)] pt-4">
            {/* Language Toggle */}
            <div className="flex gap-2 px-1">
              {(["en", "sw"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 rounded-xl py-1.5 text-xs font-bold transition ${
                    lang === l
                      ? "bg-[color:var(--accent)] text-slate-950"
                      : "border border-[color:var(--border)] text-[color:var(--muted)]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="space-y-2">
              <p className="px-2 text-[10px] uppercase tracking-widest text-[color:var(--muted)] font-bold">
                Appearance
              </p>
              <div className="[&>button]:w-full [&>button]:justify-center">
                <ThemeToggle />
              </div>
            </div>

            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-500/5 font-semibold">
              <SignOutIcon /> {t.signOut}
            </button>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-sm text-[color:var(--muted)] transition hover:border-[color:var(--accent)] w-64"
            >
              <SearchIcon /> {t.searchPlaceholder}
            </button>

            <div className="flex items-center gap-2">
              <Link
                href="/employer/post-job"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--accent)] text-slate-950 hover:opacity-90 transition"
              >
                <PlusIcon />
              </Link>
              <Link
                href="/employer/messages"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] transition"
              >
                <ChatIcon />
                {unreadMessages > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadMessages}
                  </span>
                )}
              </Link>
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-[color:var(--accent)] font-bold text-xs border border-[color:var(--accent)]/20">
                {companyName.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </header>

          <div className="px-8 pt-6 pb-2 flex-shrink-0">
            <h1 className="text-2xl font-semibold">
              {greeting}, {companyName}.
            </h1>
            <p className="text-sm text-[color:var(--muted)]">{t.subHeader}</p>
          </div>
          <main className="flex-1 overflow-y-auto px-8 py-4">{children}</main>
        </div>
      </div>

      {/* ── MOBILE (Simplified Labels) ── */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <header className="flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 sticky top-0 z-30">
          <Image
            src={
              currentTheme === "dark" ? "/AjiraNet2-svg.svg" : "/AjiraNet1.svg"
            }
            alt="AjiraNet"
            width={90}
            height={32}
            style={{ height: "50px", width: "auto" }}
          />
          <button
            onClick={() => setMenuOpen(true)}
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-[color:var(--border)] text-[color:var(--muted)]"
          >
            <MenuIcon />
          </button>
        </header>
        <main className="flex-1 px-4 py-4 pb-24">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[color:var(--border)] bg-[color:var(--surface)] py-2 px-4 shadow-lg">
          <MobileNavLink
            href="/employer/dashboard"
            active={pathname === "/employer/dashboard"}
            icon={<HomeIcon />}
            label={lang === "en" ? "Home" : "Mwanzo"}
          />
          <MobileNavLink
            href="/employer/jobs"
            active={pathname.includes("/jobs")}
            icon={<BriefcaseIcon />}
            label={lang === "en" ? "My Jobs" : "Kazi Zangu"}
          />
          <Link
            href="/employer/post-job"
            className="bg-[color:var(--accent)] text-slate-950 rounded-full p-2 -mt-8 border-4 border-[color:var(--bg)] shadow-md"
          >
            <PlusIcon />
          </Link>
          <MobileNavLink
            href="/employer/applicants"
            active={pathname.includes("/applicants")}
            icon={<UsersIcon />}
            label={lang === "en" ? "Applicants" : "Wafanyakazi"}
          />
          <MobileNavLink
            href="/employer/messages"
            active={pathname.includes("/messages")}
            icon={<ChatIcon />}
            label={lang === "en" ? "Chats" : "Mazungumzo"}
          />
        </nav>
      </div>
    </div>
  );
}

// Sub-components for icons to keep it clean
const HomeIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const PlusIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const BookmarkIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
);
const HistoryIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const WalletIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const SettingsIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4" />
  </svg>
);
const SignOutIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const SearchIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);
const ChatIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const MenuIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

function MobileNavLink({
  href,
  active,
  icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-0.5 p-2 ${active ? "text-[color:var(--accent)]" : "text-[color:var(--muted)]"}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
