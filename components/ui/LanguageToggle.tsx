"use client";

import { Fragment } from "react";
import { useLang } from "@/lib/i18n/context";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] text-sm font-medium">
      {(["en", "sw"] as const).map((l, i) => (
        <Fragment key={l}>
          {i !== 0 && <span className="text-[color:var(--border)]">|</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            className={`px-3 py-1.5 transition-colors ${
              lang === l
                ? "bg-[color:var(--accent)] text-white"
                : "text-[color:var(--text)] hover:text-[color:var(--accent)]"
            }`}
          >
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  );
}