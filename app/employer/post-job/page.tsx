"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

export default function PostJobPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.jobs;
  const router = useRouter();

  const [form, setForm] = useState({ title: "", loc: "", desc: "" });
  const [isPosted, setIsPosted] = useState(false);

  const handlePost = () => {
    // Logic to save job would go here
    setIsPosted(true);
    
    // Auto-return to jobs list after 2 seconds
    setTimeout(() => {
      router.push("/employer/jobs");
    }, 2000);
  };

  if (isPosted) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center space-y-4">
        <div className="h-20 w-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-[color:var(--text)]">Job Posted Successfully!</h2>
        <p className="text-[color:var(--muted)]">Returning to your jobs list...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="pb-2">
        <h1 className="text-3xl font-bold text-[color:var(--text)]">{t.createTitle}</h1>
        <p className="text-[color:var(--muted)]">Fill in the details to find the right talent.</p>
      </div>

      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 space-y-4">
        <input 
          placeholder={t.placeholderTitle} 
          className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none focus:border-[color:var(--accent)]"
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})}
        />
        <input 
          placeholder={t.placeholderLoc} 
          className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none focus:border-[color:var(--accent)]"
          value={form.loc}
          onChange={e => setForm({...form, loc: e.target.value})}
        />
        <textarea 
          placeholder={t.placeholderDesc} 
          rows={6} 
          className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none focus:border-[color:var(--accent)]"
          value={form.desc}
          onChange={e => setForm({...form, desc: e.target.value})}
        />
        <button 
          onClick={handlePost}
          className="w-full py-4 bg-[color:var(--accent)] text-slate-950 font-bold rounded-2xl hover:opacity-90 transition mt-4"
        >
          {t.btnPost}
        </button>
      </div>
    </div>
  );
}