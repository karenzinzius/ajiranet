"use client";
import { useLang } from "@/lib/i18n/context";

export default function VerificationPage() {
  const { lang } = useLang();
  
  const docs = [
    { label: lang === "en" ? "BRELA Certificate" : "Cheti cha BRELA", id: "brela" },
    { label: lang === "en" ? "Business License" : "Leseni ya Biashara", id: "license" },
    { label: lang === "en" ? "NIDA ID (Director)" : "Kitambulisho cha NIDA", id: "nida" },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[color:var(--text)]">
          {lang === "en" ? "Business Verification" : "Uthibitisho wa Biashara"}
        </h1>
        <p className="text-[color:var(--muted)]">
          {lang === "en" ? "Upload documents to increase trust." : "Pakia nyaraka ili kuongeza uaminifu."}
        </p>
      </div>

      <div className="space-y-4">
        {docs.map((doc) => (
          <div key={doc.id} className="p-6 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] flex items-center justify-between">
            <span className="font-semibold text-[color:var(--text)]">{doc.label}</span>
            <div>
              <input type="file" id={doc.id} className="hidden" />
              <label 
                htmlFor={doc.id} 
                className="cursor-pointer text-xs font-bold px-5 py-3 bg-[color:var(--bg)] border border-[color:var(--border)] rounded-2xl hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition block"
              >
                {lang === "en" ? "Upload PDF/JPG" : "Pakia Nyaraka"}
              </label>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-5 bg-[color:var(--accent)] text-slate-950 font-bold rounded-[2rem] shadow-lg hover:opacity-90 transition">
        {lang === "en" ? "Submit Documents" : "Tuma Nyaraka"}
      </button>
    </div>
  );
}