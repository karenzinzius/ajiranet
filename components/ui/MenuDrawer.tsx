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

export function MenuDrawer({
  role,
  open,
  onClose,
  userName = "User",
  initials = "U",
}: Props) {
  const { lang, setLang } = useLang();

  // Logic for different roles
  const links =
    role === "employer"
      ? [
          {
            href: "/employer/history",
            label: lang === "en" ? "Hired History" : "Historia ya Ajira",
          },
          {
            href: "/employer/wallet",
            label: lang === "en" ? "Wallet & Payouts" : "Mkoba na Malipo",
          },
          {
            href: "/employer/verification",
            label: lang === "en" ? "Verify Business" : "Thibitisha Biashara",
          },
          {
            href: "/employer/support",
            label: lang === "en" ? "Help & Support" : "Msaada na Huduma",
          },
        ]
      : [
          {
            href: "/worker/applications",
            label: lang === "en" ? "My Applications" : "Maombi Yangu",
          },
          {
            href: "/worker/wallet",
            label: lang === "en" ? "Earnings" : "Mapato",
          },
          {
            href: "/worker/gallery",
            label: lang === "en" ? "My Gallery" : "Picha za Kazi",
          },
          {
            href: "/worker/support",
            label: lang === "en" ? "Help & Support" : "Msaada na Huduma",
          },
        ];

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-80 transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col gap-6 bg-[color:var(--surface)] border-l border-[color:var(--border)] p-6 overflow-y-auto">
          {/* Profile Section */}
          <Link
            href={`/${role}/profile`}
            onClick={onClose}
            className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 transition hover:border-[color:var(--accent)]"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-base font-semibold text-[color:var(--accent)]">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-[color:var(--text)]">
                {userName}
              </p>
              <p className="text-xs text-[color:var(--accent)]">
                {lang === "en" ? "View profile →" : "Tazama wasifu →"}
              </p>
            </div>
          </Link>

          {/* Links */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] uppercase tracking-widest text-[color:var(--muted)] font-bold mb-2">
              {role === "employer"
                ? lang === "en"
                  ? "Management"
                  : "Usimamizi"
                : lang === "en"
                  ? "Worker Menu"
                  : "Menyu ya Mfanyakazi"}
            </p>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center rounded-xl px-3 py-3 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--bg)] hover:text-[color:var(--accent)] font-medium"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-[color:var(--border)]" />

          {/* Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="px-2 text-[10px] uppercase tracking-widest text-[color:var(--muted)] font-bold">
                Language / Lugha
              </p>
              <div className="flex gap-2">
                {(["en", "sw"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${lang === l ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] text-[color:var(--text)]"}`}
                  >
                    {l === "en" ? "EN" : "SW"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="px-2 text-[10px] uppercase tracking-widest text-[color:var(--muted)] font-bold">
                Appearance
              </p>
              <div className="[&>button]:w-full [&>button]:justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 space-y-1">
            <Link
              href={`/${role}/settings`}
              onClick={onClose}
              className="flex items-center rounded-xl px-3 py-3 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--bg)] font-medium"
            >
              {lang === "en" ? "Settings" : "Mipangilio"}
            </Link>
            <button className="flex w-full items-center rounded-xl px-3 py-3 text-sm text-red-500 font-bold transition hover:bg-red-500/5">
              {lang === "en" ? "Log out" : "Ondoka"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
