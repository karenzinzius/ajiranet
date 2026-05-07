"use client";

import { useRef, useState } from "react";
import { SkillBadge } from "@/components/worker/SkillBadge";
import { ReviewCard } from "@/components/worker/ReviewCard";
import Link from "next/link";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { useStore, BOOST_COST, type BoostPlan } from "@/lib/store";

const profile = {
  name: "John Doe",
  initials: "JD",
  role: "Home Cleaner & Childcare Specialist",
  location: "Kinondoni, Dar es Salaam",
  phone: "+255 712 345 678",
  memberSince: "January 2025",
  bio: "Experienced home cleaner and childcare provider with over 3 years working with families across Dar es Salaam. Reliable, trustworthy, and certified in first aid. I take pride in delivering consistent, high-quality service that gives families peace of mind.",
  rating: 4.8,
  totalReviews: 31,
  jobsCompleted: 28,
  skills: ["Cleaning", "Childcare", "Laundry", "Cooking", "Ironing", "Errands"],
  availability: "Available now" as const,
  verified: true,
};

const reviews = [
  { author: "The Kimaro Family", rating: 5.0, date: "April 2026", text: "John is incredibly reliable and thorough. Our home has never been cleaner and our children adore him. Highly recommend to any family looking for a trustworthy helper." },
  { author: "Dr. & Mrs. Patel", rating: 4.8, date: "March 2026", text: "Excellent work ethic and great with the kids. Always on time and communicates clearly. We've extended his contract for another three months." },
  { author: "Mama Amina", rating: 5.0, date: "February 2026", text: "Fantastic job every single visit. Very thorough and always goes above and beyond. We feel very comfortable having him in our home." },
  { author: "The Ngowi Family", rating: 4.6, date: "January 2026", text: "Good work, professional attitude. Sometimes needs a reminder on specific tasks but overall a great hire and we would use him again." },
];

const availabilityStyle = {
  "Available now": "bg-green-500/10 text-green-600",
  "Available next month": "bg-yellow-500/10 text-yellow-600",
  "Busy": "bg-red-500/10 text-red-600",
};

export default function ProfilePage() {
  const { lang } = useLang();
  const t = translations[lang].worker.profile;
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "gallery">("overview");
  const [cvFile, setCvFile] = useState<string | null>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const { workerWalletBalance, workerBoost, activateWorkerBoost } = useStore();
  const [selectedBoostPlan, setSelectedBoostPlan] = useState<"none" | BoostPlan>("none");
  const [boostError, setBoostError] = useState(false);
  const [boostSuccess, setBoostSuccess] = useState(false);

  const handleActivateBoost = () => {
    if (selectedBoostPlan === "none") return;
    setBoostError(false);
    const ok = activateWorkerBoost(selectedBoostPlan);
    if (!ok) { setBoostError(true); return; }
    setBoostSuccess(true);
    setSelectedBoostPlan("none");
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file.name);
  };

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left — avatar + info */}
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-2xl font-bold text-[color:var(--accent)]">
                {profile.initials}
              </div>
              {profile.verified && (
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--accent)] text-[10px] text-slate-950 font-bold">✓</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[color:var(--text)]">{profile.name}</h1>
              <p className="text-sm text-[color:var(--muted)]">{profile.role}</p>
              <p className="text-sm text-[color:var(--muted)]">{profile.location}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${availabilityStyle[profile.availability]}`}>
                  {profile.availability}
                </span>
                {profile.verified && (
                  <span className="rounded-full bg-[color:var(--accent)]/10 px-3 py-0.5 text-xs font-medium text-[color:var(--accent)]">
                    ✓ {t.verified}
                  </span>
                )}
                {workerBoost && (
                  <span className="rounded-full bg-yellow-400/10 px-3 py-0.5 text-xs font-bold text-yellow-500">
                    {t.boostBadge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right — actions */}
          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/worker/settings"
              className="rounded-2xl border border-[color:var(--border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              {t.editProfile}
            </Link>
            <Link
              href="/worker/gallery"
              className="rounded-2xl border border-[color:var(--border)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              {t.manageGallery}
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[color:var(--border)] pt-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-[color:var(--text)]">{profile.rating.toFixed(1)}</p>
            <p className="mt-0.5 text-xs text-[color:var(--muted)]">{t.stats.avgRating}</p>
          </div>
          <div className="text-center border-x border-[color:var(--border)]">
            <p className="text-2xl font-bold text-[color:var(--text)]">{profile.totalReviews}</p>
            <p className="mt-0.5 text-xs text-[color:var(--muted)]">{t.stats.reviews}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[color:var(--text)]">{profile.jobsCompleted}</p>
            <p className="mt-0.5 text-xs text-[color:var(--muted)]">{t.stats.jobsDone}</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {(["overview", "reviews", "gallery"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition flex-shrink-0 ${activeTab === tab ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"}`}
          >
            {t.tabs[tab]}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] mb-3">{t.aboutMe}</p>
            <p className="text-sm leading-7 text-[color:var(--text)]">{profile.bio}</p>
          </section>

          <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] mb-3">{t.skills}</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => <SkillBadge key={skill} label={skill} />)}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] mb-4">{t.contactInfo}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <svg className="h-4 w-4 text-[color:var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                <span className="text-[color:var(--text)]">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="h-4 w-4 text-[color:var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-[color:var(--text)]">{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="h-4 w-4 text-[color:var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span className="text-[color:var(--muted)]">{t.memberSince} {profile.memberSince}</span>
              </div>
            </div>
          </section>

          {/* CV / Resume upload */}
          <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] mb-4">{t.cvTitle}</p>
            <p className="text-sm text-[color:var(--muted)] mb-4">{t.cvNote}</p>
            <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvUpload} />
            {cvFile ? (
              <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 px-4 py-3">
                <svg className="h-5 w-5 flex-shrink-0 text-[color:var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span className="flex-1 text-sm font-medium text-[color:var(--text)] truncate">{cvFile}</span>
                <div className="flex gap-3">
                  <button onClick={() => cvRef.current?.click()} className="text-xs font-semibold text-[color:var(--accent)] hover:underline">{t.cvChange}</button>
                  <button onClick={() => setCvFile(null)} className="text-xs font-semibold text-red-500 hover:underline">{t.cvRemove}</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => cvRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[color:var(--border)] py-5 text-sm font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                {t.cvUpload}
              </button>
            )}
          </section>

          {/* Boost Profile */}
          <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-500">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div>
                <p className="font-semibold text-[color:var(--text)]">{t.boostTitle}</p>
                <p className="text-xs text-[color:var(--muted)]">{t.boostSubtitle}</p>
              </div>
            </div>

            {workerBoost ? (
              <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-4 space-y-1">
                <p className="text-sm font-bold text-yellow-500">{t.boostBadge} {t.boostActive}</p>
                <p className="text-xs text-[color:var(--muted)]">
                  {t.boostExpires}: <span className="font-semibold text-[color:var(--text)]">{workerBoost.expiresAt}</span>
                  {" · "}
                  {workerBoost.plan === "week" ? "1 Week plan" : "1 Month plan"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {boostSuccess && (
                  <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 px-4 py-3 text-sm font-semibold text-yellow-500">
                    ⚡ Boost activated successfully!
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: "none" as const, label: t.boostNone },
                    { key: "week" as const, label: t.boostWeek },
                    { key: "month" as const, label: t.boostMonth },
                  ]).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => { setSelectedBoostPlan(key); setBoostError(false); setBoostSuccess(false); }}
                      className={`rounded-2xl border px-3 py-2.5 text-xs font-semibold text-center transition ${selectedBoostPlan === key ? "border-yellow-400 bg-yellow-400/10 text-yellow-500" : "border-[color:var(--border)] text-[color:var(--text)] hover:border-yellow-400/50"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[color:var(--muted)]">
                  {t.boostWalletBalance}: <span className="font-semibold text-[color:var(--text)]">TSh {workerWalletBalance.toLocaleString()}</span>
                  {selectedBoostPlan !== "none" && (
                    <span className="ml-2 text-yellow-500">
                      → TSh {(workerWalletBalance - BOOST_COST[selectedBoostPlan]).toLocaleString()} after boost
                    </span>
                  )}
                </p>
                {boostError && (
                  <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-500">{t.boostInsufficient}</p>
                )}
                <button
                  onClick={handleActivateBoost}
                  disabled={selectedBoostPlan === "none"}
                  className="w-full rounded-2xl bg-yellow-400 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ⚡ {t.boostActivate}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Reviews tab */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <p className="text-sm text-[color:var(--muted)] px-1">{reviews.length} reviews from verified employers</p>
          {reviews.map((r, i) => <ReviewCard key={i} {...r} />)}
        </div>
      )}

      {/* Gallery tab */}
      {activeTab === "gallery" && (
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-center space-y-4 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-4xl">📷</p>
          <p className="font-semibold text-[color:var(--text)]">Your portfolio photos appear here</p>
          <p className="text-sm text-[color:var(--muted)]">Employers viewing your profile will see your gallery on this tab.</p>
          <Link
            href="/worker/gallery"
            className="inline-block rounded-2xl bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)]"
          >
            {t.manageGallery}
          </Link>
        </div>
      )}
    </div>
  );
}
