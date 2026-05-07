"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SkillBadge } from "@/components/worker/SkillBadge";
import { ReportModal } from "@/components/ui/ReportModal";
import { useStore } from "@/lib/store";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

export type SheetWorker = {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  reviews: number;
  availability: string;
  availabilityStatus: "Available now" | "Available next month" | "Busy";
  skills: string[];
  verified: boolean;
  wage?: string;
  about?: string;
  gallery?: string[];
  cv?: {
    summary?: string;
    experience?: Array<{ title: string; company: string; period: string; desc?: string }>;
    education?: Array<{ degree: string; school: string; period: string }>;
  };
  workerReviews?: Array<{ rating: number; text: string; reviewer: string; date: string; jobType: string }>;
};

const DEFAULT_GALLERY = ["🧹", "🍳", "🌿", "👶", "👕", "🏡", "🚗", "🛁"];

const MOCK_CV = {
  summary: "Experienced domestic worker with 4 years of proven service in Dar es Salaam. Known for reliability, attention to detail, and excellent communication with employers.",
  experience: [
    { title: "House Cleaner & Cook", company: "Private household – Masaki", period: "2022 – Present", desc: "Full-time cleaning and cooking for a family of 5." },
    { title: "Childcare Assistant", company: "Private household – Oyster Bay", period: "2020 – 2022", desc: "Caring for two children aged 2 and 5, school pick-ups, meal preparation." },
  ],
  education: [
    { degree: "Certificate in Domestic Services", school: "Dar es Salaam Vocational Training Centre", period: "2019" },
    { degree: "Secondary Education (Form IV)", school: "Mwl. Nyerere Secondary School", period: "2018" },
  ],
};

const MOCK_REVIEWS = [
  { rating: 5, text: "Absolutely excellent. Reliable, professional and very thorough. Would hire again without hesitation.", reviewer: "Amina H.", date: "Apr 2026", jobType: "Cleaning" },
  { rating: 4, text: "Great cook, friendly with our kids. Only minor issue was scheduling a couple of times.", reviewer: "David M.", date: "Jan 2026", jobType: "Cooking & Childcare" },
  { rating: 5, text: "On time every day for three weeks. Left our home spotless. Highly recommended.", reviewer: "Grace K.", date: "Nov 2025", jobType: "House Cleaning" },
];

const availStyle = {
  "Available now": "bg-green-500/10 text-green-600",
  "Available next month": "bg-yellow-500/10 text-yellow-600",
  "Busy": "bg-red-500/10 text-red-500",
};

type Tab = "overview" | "gallery" | "cv" | "reviews";

type Props = {
  worker: SheetWorker | null;
  onClose: () => void;
  onHire?: (w: SheetWorker) => void;
};

export function WorkerDetailSheet({ worker, onClose, onHire }: Props) {
  const { addMessage, addInvitedApplicant } = useStore();
  const router = useRouter();
  const { lang } = useLang();
  const t = translations[lang].employer;
  const [tab, setTab] = useState<Tab>("overview");
  const [reportOpen, setReportOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset tab when a new worker is opened
  useEffect(() => { if (worker) setTab("overview"); }, [worker?.id]);

  const handleInvitation = () => {
    if (!worker) return;
    addMessage({
      from: "Acme Corp",
      fromRole: "employer",
      to: "worker",
      subject: `Invitation from Acme Corp`,
      body: `Hi ${worker.name},\n\nWe came across your profile on AjiraNet and would like to invite you to apply for a position with us. Please check your messages for more details.\n\nBest regards,\nAcme Corp`,
    });
    addMessage({
      from: worker.name,
      fromRole: "worker",
      to: "employer",
      subject: `Invitation sent to ${worker.name}`,
      body: `Your invitation was sent to ${worker.name}. You'll hear back soon.`,
    });
    onClose();
    router.push("/employer/messages");
  };

  const handleSave = () => {
    if (!worker) return;
    setSaved(true);
    addInvitedApplicant({
      id: worker.id,
      name: worker.name,
      role: worker.role,
      rating: worker.rating,
      wage: worker.wage || "0",
      reviews: worker.reviews,
      skills: worker.skills,
      availability: worker.availability,
    });
  };

  const gallery = worker?.gallery ?? DEFAULT_GALLERY;
  const cv = worker?.cv ?? MOCK_CV;
  const reviewsList = worker?.workerReviews ?? MOCK_REVIEWS;
  const tabs: Tab[] = ["overview", "gallery", "cv", "reviews"];
  const tabLabels: Record<Tab, string> = {
    overview: t.sheet.overview,
    gallery: t.sheet.gallery,
    cv: t.sheet.cv,
    reviews: t.sheet.reviews,
  };

  return (
    <>
      <ReportModal
        open={reportOpen}
        targetName={worker?.name ?? ""}
        onClose={() => setReportOpen(false)}
      />

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${worker ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${worker ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-auto max-w-2xl rounded-t-[2rem] border-t border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.4)] max-h-[92vh] flex flex-col">

          {/* Drag handle */}
          <div className="flex-shrink-0 pt-4 pb-2 flex justify-center">
            <div className="h-1 w-10 rounded-full bg-[color:var(--border)]" />
          </div>

          {worker && (
            <>
              {/* Header */}
              <div className="flex-shrink-0 px-6 pb-4 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-xl font-bold text-[color:var(--accent)]">
                    {worker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-[color:var(--text)]">{worker.name}</h2>
                      {worker.verified && (
                        <span className="rounded-full bg-[color:var(--accent)]/10 px-2 py-0.5 text-xs font-medium text-[color:var(--accent)]">✓ {t.common.verified}</span>
                      )}
                    </div>
                    <p className="text-sm text-[color:var(--muted)]">{worker.role} · {worker.location}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${availStyle[worker.availabilityStatus]}`}>
                        {worker.availability}
                      </span>
                      <span className="text-sm font-semibold text-[color:var(--text)]">⭐ {worker.rating.toFixed(1)}</span>
                      <span className="text-xs text-[color:var(--muted)]">({worker.reviews} {t.common.reviews})</span>
                      {worker.wage && <span className="text-sm font-semibold text-[color:var(--accent)]">TSh {worker.wage}/mo</span>}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-1">
                  {tabs.map((tb) => (
                    <button
                      key={tb}
                      onClick={() => setTab(tb)}
                      className={`flex-1 rounded-xl py-2 text-xs font-semibold transition ${tab === tb ? "bg-[color:var(--accent)] text-slate-950" : "text-[color:var(--muted)] hover:text-[color:var(--text)]"}`}
                    >
                      {tabLabels[tb]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content — scrollable */}
              <div className="flex-1 overflow-y-auto px-6 pb-2">

                {tab === "overview" && (
                  <div className="space-y-5">
                    {/* About */}
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.sheet.about}</p>
                      <p className="text-sm text-[color:var(--text)] leading-6">
                        {worker.about || cv.summary || t.sheet.noAbout}
                      </p>
                    </div>
                    {/* Skills */}
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.sheet.skills}</p>
                      <div className="flex flex-wrap gap-2">
                        {worker.skills.map((s) => <SkillBadge key={s} label={s} />)}
                      </div>
                    </div>
                    {/* Gallery preview strip */}
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.sheet.gallery}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {gallery.slice(0, 4).map((item, i) => (
                          <div key={i} className="flex aspect-square items-center justify-center rounded-2xl bg-[color:var(--bg)] border border-[color:var(--border)] text-2xl">
                            {item}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setTab("gallery")}
                        className="mt-2 text-xs font-semibold text-[color:var(--accent)] hover:underline"
                      >
                        {t.sheet.viewProfile}
                      </button>
                    </div>
                  </div>
                )}

                {tab === "gallery" && (
                  <div className="space-y-4">
                    {gallery.length === 0 ? (
                      <p className="text-sm text-[color:var(--muted)] text-center py-8">{t.sheet.noGallery}</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-3">
                        {gallery.map((item, i) => (
                          <div key={i} className="flex aspect-square items-center justify-center rounded-2xl bg-[color:var(--bg)] border border-[color:var(--border)] text-3xl">
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/worker/${worker.id}`}
                      onClick={onClose}
                      className="block text-center text-xs font-semibold text-[color:var(--accent)] hover:underline"
                    >
                      {t.sheet.viewProfile}
                    </Link>
                  </div>
                )}

                {tab === "cv" && (
                  <div className="space-y-5">
                    {cv.summary && (
                      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4">
                        <p className="text-sm text-[color:var(--text)] leading-6">{cv.summary}</p>
                      </div>
                    )}
                    {cv.experience && cv.experience.length > 0 && (
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.sheet.experience}</p>
                        <div className="space-y-3">
                          {cv.experience.map((exp, i) => (
                            <div key={i} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 space-y-1">
                              <p className="font-semibold text-sm text-[color:var(--text)]">{exp.title}</p>
                              <p className="text-xs text-[color:var(--accent)]">{exp.company}</p>
                              <p className="text-xs text-[color:var(--muted)]">{exp.period}</p>
                              {exp.desc && <p className="text-xs text-[color:var(--text)] leading-5 pt-1">{exp.desc}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {cv.education && cv.education.length > 0 && (
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.sheet.education}</p>
                        <div className="space-y-3">
                          {cv.education.map((edu, i) => (
                            <div key={i} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 space-y-1">
                              <p className="font-semibold text-sm text-[color:var(--text)]">{edu.degree}</p>
                              <p className="text-xs text-[color:var(--accent)]">{edu.school}</p>
                              <p className="text-xs text-[color:var(--muted)]">{edu.period}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {tab === "reviews" && (
                  <div className="space-y-3">
                    {reviewsList.length === 0 ? (
                      <p className="text-sm text-[color:var(--muted)] text-center py-8">{t.sheet.noReviews}</p>
                    ) : (
                      reviewsList.map((rev, i) => (
                        <div key={i} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <svg key={s} className={`h-4 w-4 ${s < rev.rating ? "text-yellow-400" : "text-[color:var(--border)]"}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                              ))}
                            </div>
                            <span className="text-xs text-[color:var(--muted)]">{rev.date}</span>
                          </div>
                          <p className="text-sm text-[color:var(--text)] leading-5">{rev.text}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[color:var(--text)]">{rev.reviewer}</span>
                            <span className="text-xs text-[color:var(--muted)]">· {rev.jobType}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Action bar */}
              <div className="flex-shrink-0 border-t border-[color:var(--border)] px-6 py-4 space-y-3">
                {/* Primary */}
                <button
                  onClick={handleInvitation}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 shadow-lg shadow-[color:var(--accent)]/20"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  {t.actions.sendInvitation}
                </button>

                {/* Secondary row */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center gap-1.5 rounded-2xl border border-[color:var(--border)] py-2.5 text-xs font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    {t.sheet.back}
                  </button>
                  <button
                    onClick={handleSave}
                    className={`flex items-center justify-center gap-1.5 rounded-2xl border py-2.5 text-xs font-semibold transition ${saved ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]" : "border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                    {saved ? "Saved" : t.actions.saveWorker}
                  </button>
                  <button
                    onClick={() => setReportOpen(true)}
                    className="flex items-center justify-center gap-1.5 rounded-2xl border border-[color:var(--border)] py-2.5 text-xs font-semibold text-red-500 transition hover:border-red-500/50 hover:bg-red-500/5"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                    {t.actions.report}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
