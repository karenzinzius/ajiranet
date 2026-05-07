"use client";

import React, { useState } from "react";
import { SkillBadge } from "@/components/worker/SkillBadge";
import { ReviewCard } from "@/components/worker/ReviewCard";
import { ReportModal } from "@/components/ui/ReportModal";
import { useStore } from "@/lib/store";

const profiles: Record<string, typeof sampleProfile> = {};

const sampleProfile = {
  name: "Alice Mwando",
  role: "Home cleaner & childcare",
  location: "Mikocheni, Dar es Salaam",
  rating: 4.8,
  reviews: 24,
  availability: "Available now" as "Available now" | "Available next month" | "Busy",
  skills: ["Cleaning", "Childcare", "Cooking"],
  verified: true,
  phoneVerified: true,
  wage: "120,000",
  description:
    "Hardworking, trustworthy cleaner with 5 years of experience looking after children and handling household chores. Always on time and handles every task with care.",
  previousEmployer: "Mr. Jackson, Dar es Salaam",
  standoutReview:
    "Alice is hardworking and extremely trustworthy. She looked after our children and kept the house spotless. Highly recommended.",
  reviewsList: [
    { author: "Miriam", rating: 5, text: "Trustworthy worker who communicates clearly and works hard every day.", date: "Mar 13, 2026" },
    { author: "Joseph", rating: 4.5, text: "Very professional and kind. My home has never been cleaner.", date: "Feb 26, 2026" },
    { author: "Hassan", rating: 5, text: "Reliable and organized. A true find for busy families.", date: "Jan 18, 2026" },
  ],
  gallery: [
    { emoji: "🧹", caption: "Deep cleaning — Masaki villa" },
    { emoji: "🍳", caption: "Meal prep for family of 5" },
    { emoji: "👶", caption: "Childcare at Oyster Bay" },
    { emoji: "👕", caption: "Laundry & ironing" },
    { emoji: "🌿", caption: "Garden tidying" },
    { emoji: "🏡", caption: "Full home setup" },
  ],
};

const availStyle = {
  "Available now": "bg-green-500/10 text-green-600",
  "Available next month": "bg-yellow-500/10 text-yellow-600",
  "Busy": "bg-red-500/10 text-red-500",
};

export default function WorkerPublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const profile = profiles[id] ?? sampleProfile;
  const { addMessage } = useStore();

  const [tab, setTab] = useState<"overview" | "reviews" | "gallery">("overview");
  const [reportOpen, setReportOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleContact = () => {
    addMessage({
      from: "Acme Corp",
      fromRole: "employer",
      to: "worker",
      subject: `Employer is interested in your profile`,
      body: `Hi ${profile.name},\n\nAn employer (Acme Corp) viewed your profile on AjiraNet and would like to connect with you regarding a potential opportunity.\n\nPlease check your messages and respond at your earliest convenience.\n\nBest regards,\nAjiraNet`,
    });
    addMessage({
      from: profile.name,
      fromRole: "worker",
      to: "employer",
      subject: `Message sent to ${profile.name}`,
      body: `Your message was sent to ${profile.name}. They will be notified and should respond shortly.`,
    });
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <>
      <ReportModal open={reportOpen} targetName={profile.name} onClose={() => setReportOpen(false)} />

      <div className="space-y-8">
        {/* Hero */}
        <section className="flex flex-col gap-6 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-2xl font-semibold text-[color:var(--accent)]">
              {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Worker profile</p>
              <h1 className="mt-1 text-3xl font-semibold text-[color:var(--text)]">{profile.name}</h1>
              <p className="mt-1 text-base text-[color:var(--muted)]">{profile.role}</p>
              <p className="text-sm font-semibold text-[color:var(--accent)]">TSh {profile.wage}/mo</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${availStyle[profile.availability]}`}>{profile.availability}</span>
            {profile.phoneVerified && <span className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--text)]">Phone verified</span>}
            {profile.verified && <span className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--text)]">✓ Verified</span>}
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {(["overview", "reviews", "gallery"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition flex-shrink-0 ${tab === t ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Left */}
          <div className="space-y-6">
            {tab === "overview" && (
              <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">About</p>
                  <p className="mt-3 text-base leading-8 text-[color:var(--text)]">{profile.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Location</p>
                    <p className="mt-2 font-semibold text-[color:var(--text)]">{profile.location}</p>
                  </div>
                  <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] p-5">
                    <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Reference</p>
                    <p className="mt-2 text-[color:var(--text)]">{profile.previousEmployer}</p>
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--bg)] p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Top review</p>
                  <p className="mt-3 text-base font-semibold text-[color:var(--text)]">"{profile.standoutReview}"</p>
                </div>
              </section>
            )}

            {tab === "reviews" && (
              <section className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Reviews ({profile.reviews})</p>
                {profile.reviewsList.map((r) => <ReviewCard key={r.author} {...r} />)}
              </section>
            )}

            {tab === "gallery" && (
              <section className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Work Gallery</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {profile.gallery.map((item, i) => (
                    <div key={i} className="group relative flex aspect-square flex-col items-center justify-center rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] text-4xl overflow-hidden">
                      <span>{item.emoji}</span>
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="text-left text-xs font-medium text-white leading-snug">{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right — contact + actions */}
          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-6">
              <div className="flex items-center justify-between rounded-3xl bg-[color:var(--bg)] p-5">
                <div>
                  <p className="text-4xl font-semibold text-[color:var(--text)]">{profile.rating.toFixed(1)}</p>
                  <p className="text-sm text-[color:var(--muted)]">Average rating</p>
                </div>
                <span className="rounded-full bg-[color:var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--accent)]">
                  {profile.reviews} reviews
                </span>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)] mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => <SkillBadge key={skill} label={skill} />)}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] p-5 space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Contact</p>

                {messageSent ? (
                  <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500 text-center">
                    ✓ Message sent to {profile.name}!
                  </div>
                ) : (
                  <button
                    onClick={handleContact}
                    className="inline-flex w-full justify-center rounded-3xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)]"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    Send message
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  className="w-full rounded-3xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-500/10"
                >
                  🚩 Report user
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
