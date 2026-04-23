"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/context";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useEffect } from "react";

type Props = {
  role: "worker" | "employer";
  open: boolean;
  onClose: () => void;
  userName?: string;
  initials?: string;
};

export function MenuDrawer({ role, open, onClose, userName = "John", initials = "JD" }: Props) {
  const { lang, setLang } = useLang();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const roleLinks = role === "worker"
    ? [
        { href: "/worker/applications", label: "My Applications" },
        { href: "/worker/saved", label: "Saved Jobs" },
        { href: "/worker/gallery", label: "My Gallery" },
      ]
    : [
      { href: "/employer/billing", label: "Billing" },
      { href: "/employer/verification", label: "Business Verification" },
      { href: "/employer/wallet", label: "Wallet & Payouts" },
      { href: "/employer/support", label: "Support" },
      { href: "/employer/history", label: "Hire History" },
      ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-in from right */}
      <div className={`fixed right-0 top-0 bottom-0 z-50 w-72 transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-full flex-col gap-4 bg-[color:var(--surface)] border-l border-[color:var(--border)] p-6 overflow-y-auto">

          

          {/* Profile summary */}
          <Link href={`/${role}/profile`} onClick={onClose} className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 transition hover:border-[color:var(--accent)]">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-base font-semibold text-[color:var(--accent)]">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-[color:var(--text)]">{userName}</p>
              <p className="text-xs text-[color:var(--accent)]">View profile →</p>
            </div>
          </Link>

          {/* Role links */}
          <div className="space-y-1">
            <p className="px-2 text-xs uppercase tracking-widest text-[color:var(--muted)]">Quick links</p>
            {roleLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={onClose} className="flex items-center rounded-xl px-3 py-2.5 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--bg)] hover:text-[color:var(--accent)]">
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[color:var(--border)]" />

          {/* Language */}
          <div className="space-y-2">
            <p className="px-2 text-xs uppercase tracking-widest text-[color:var(--muted)]">Language</p>
            <div className="flex gap-2">
              {(["en", "sw"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${lang === l ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <p className="px-2 text-xs uppercase tracking-widest text-[color:var(--muted)]">Theme</p>
            <div className="flex gap-2">
              {["Light ", "Dark"].map((t) => (
                <button
                  key={t}
                  className="flex-1 rounded-xl border border-[color:var(--border)] py-2 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[color:var(--border)]" />

          {/* Settings + logout */}
          <div className="space-y-1">
            <Link href={`/${role}/settings`} onClick={onClose} className="flex items-center rounded-xl px-3 py-2.5 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--bg)]">
              Settings
            </Link>
            <Link href={`/${role}/profile/verification`} onClick={onClose} className="flex items-center rounded-xl px-3 py-2.5 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--bg)]">
              Verification & certificates
            </Link>
            <button className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-500/5">
              Log out
            </button>
          </div>

        </div>
      </div>
    </>
  );
}