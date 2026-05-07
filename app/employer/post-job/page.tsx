"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { useStore, BOOST_COST, type BoostPlan } from "@/lib/store";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "Cleaning", "Childcare", "Cooking", "Laundry",
  "Driving", "Elderly Care", "Gardening", "Errands",
  "Security", "Plumbing", "Electrical", "Other",
];

const DURATIONS = [
  "1 Day", "2–3 Days", "1 Week", "2 Weeks", "1 Month", "Ongoing",
];

export default function PostJobPage() {
  const { lang } = useLang();
  const t = translations[lang].employer.jobs;
  const router = useRouter();
  const { employerWalletBalance, deductEmployerWallet } = useStore();

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    wage: "",
    duration: "",
    desc: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form & { submit?: string }>>({});
  const [boostPlan, setBoostPlan] = useState<"none" | BoostPlan>("none");
  const [boostError, setBoostError] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.title.trim()) e.title = t.placeholderTitle;
    if (!form.category) e.category = "Select a category";
    if (!form.location.trim()) e.location = t.placeholderLoc;
    if (!form.wage.trim()) e.wage = "Enter expected wage";
    if (!form.duration) e.duration = "Select duration";
    if (!form.desc.trim()) e.desc = t.placeholderDesc;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePost = async () => {
    if (!validate()) return;
    setBoostError(false);
    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    if (boostPlan !== "none") {
      const ok = deductEmployerWallet(BOOST_COST[boostPlan]);
      if (!ok) { setBoostError(true); setSubmitting(false); return; }
    }

    const { error } = await supabase.from("jobs").insert({
      employer_id: user.id,
      title: form.title,
      category: form.category,
      location: form.location,
      wage: form.wage,
      duration: form.duration,
      description: form.desc,
      status: "Active",
      boosted: boostPlan !== "none",
      boost_plan: boostPlan,
    });

    setSubmitting(false);

    if (error) {
      setErrors({ submit: error.message } as typeof errors);
      return;
    }

    setIsPosted(true);
    setTimeout(() => router.push("/employer/jobs"), 2200);
  };

  if (isPosted) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center space-y-4">
        <div className="h-20 w-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-[color:var(--text)]">{t.postSuccess}</h2>
        <p className="text-[color:var(--muted)]">{t.returning}</p>
      </div>
    );
  }

  const inputClass = (err?: string) =>
    `w-full rounded-2xl border ${err ? "border-red-500/60 bg-red-500/5" : "border-[color:var(--border)] bg-[color:var(--bg)]"} p-4 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.createTitle}</p>
        <h1 className="mt-2 text-3xl font-bold text-[color:var(--text)]">{t.createTitle}</h1>
        <p className="mt-1 text-sm text-[color:var(--muted)]">{t.subtitle}</p>
        {/* Employer name badge */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-2 text-xs font-semibold text-[color:var(--muted)]">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          {t.postedBy}: <span className="text-[color:var(--text)]">Acme Corp</span>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-5">

        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.placeholderTitle}</label>
          <input
            placeholder="e.g. Live-in Housekeeper Needed"
            className={inputClass(errors.title)}
            value={form.title}
            onChange={(e) => set("title")(e.target.value)}
          />
          {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.category}</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => set("category")(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${form.category === cat ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.placeholderLoc}</label>
          <input
            placeholder="e.g. Oyster Bay, Dar es Salaam"
            className={inputClass(errors.location)}
            value={form.location}
            onChange={(e) => set("location")(e.target.value)}
          />
          {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
        </div>

        {/* Wage + Duration row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.wage}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[color:var(--muted)]">TSh</span>
              <input
                placeholder="e.g. 350,000"
                className={`${inputClass(errors.wage)} pl-12`}
                value={form.wage}
                onChange={(e) => set("wage")(e.target.value)}
              />
            </div>
            {errors.wage && <p className="text-xs text-red-500">{errors.wage}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.duration}</label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => set("duration")(d)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${form.duration === d ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
                >
                  {d}
                </button>
              ))}
            </div>
            {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">{t.placeholderDesc}</label>
          <textarea
            placeholder="Describe the role, responsibilities, working hours, and any requirements…"
            rows={5}
            className={`${inputClass(errors.desc)} resize-none rounded-[1.5rem]`}
            value={form.desc}
            onChange={(e) => set("desc")(e.target.value)}
          />
          {errors.desc && <p className="text-xs text-red-500">{errors.desc}</p>}
        </div>

        {/* Preview strip */}
        {form.title && form.category && form.wage && form.duration && (
          <div className="rounded-2xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 p-4 text-sm space-y-1">
            <p className="font-semibold text-[color:var(--text)]">{form.title}</p>
            <p className="text-[color:var(--muted)]">{form.category} · {form.location || "Location TBD"} · {form.duration}</p>
            <p className="font-semibold text-[color:var(--accent)]">TSh {form.wage}/mo</p>
          </div>
        )}

        {/* Boost plan picker */}
        <div className="space-y-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-[color:var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <p className="text-sm font-semibold text-[color:var(--text)]">{t.boost}</p>
          </div>
          <p className="text-xs text-[color:var(--muted)] leading-4">{t.boostNote}</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { key: "none", label: t.boostNone, cost: null },
              { key: "week", label: t.boostWeek, cost: BOOST_COST.week },
              { key: "month", label: t.boostMonth, cost: BOOST_COST.month },
            ] as { key: "none" | BoostPlan; label: string; cost: number | null }[]).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => { setBoostPlan(key); setBoostError(false); }}
                className={`rounded-2xl border px-3 py-2.5 text-xs font-semibold text-center transition ${boostPlan === key ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]" : "border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-[color:var(--muted)]">
            {t.boostWalletBalance}: <span className="font-semibold text-[color:var(--text)]">TSh {employerWalletBalance.toLocaleString()}</span>
            {boostPlan !== "none" && (
              <span className="ml-2 text-[color:var(--accent)]">
                → TSh {(employerWalletBalance - BOOST_COST[boostPlan]).toLocaleString()} after boost
              </span>
            )}
          </p>
          {boostError && (
            <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-500">{t.boostInsufficient}</p>
          )}
        </div>

        {"submit" in errors && errors.submit && (
          <p className="rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">{errors.submit}</p>
        )}

        <button
          onClick={handlePost}
          disabled={submitting}
          className="w-full py-4 bg-[color:var(--accent)] text-slate-950 font-bold rounded-2xl hover:opacity-90 transition shadow-lg shadow-[color:var(--accent)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Posting…" : boostPlan !== "none" ? `⚡ ${t.btnPost}` : t.btnPost}
        </button>
      </div>
    </div>
  );
}
