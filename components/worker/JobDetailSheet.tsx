"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { ReportModal } from "@/components/ui/ReportModal";

const JOB_REPORT_REASONS = [
  "False job information",
  "Suspected scam",
  "Spam or duplicate",
  "Inappropriate content",
  "Position already filled",
  "Other",
];

const WORKER = {
  name: "Juma Hassan",
  rating: 4.7,
  reviews: 14,
  skills: ["Cleaning", "Laundry", "Errands"],
};

export type Job = {
  id: string;
  title: string;
  employer: string;
  location: string;
  wage: string;
  tags: string[];
  description?: string;
};

type Props = {
  job: Job | null;
  onClose: () => void;
};

export function JobDetailSheet({ job, onClose }: Props) {
  const router = useRouter();
  const { addMessage, addWorkerApplication, workerApplications, savedJobs, toggleSavedJob } = useStore();
  const { lang } = useLang();
  const t = translations[lang].worker.job;

  const [showReport, setShowReport] = useState(false);
  const [applied, setApplied] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const alreadyApplied = job ? workerApplications.some((a) => a.jobId === job.id) : false;
  const isSaved = job ? savedJobs.some((j) => j.id === job.id) : false;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!job) {
      setApplied(false);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    }
  }, [job]);

  const handleSendMessage = () => {
    if (!job) return;
    addMessage({
      from: WORKER.name,
      fromRole: "worker",
      to: "employer",
      subject: `Inquiry about: ${job.title}`,
      body: `Hello,\n\nI came across your job posting "${job.title}" on AjiraNet and I am very interested in the opportunity. I have relevant experience and I'm available to discuss the role at your convenience.\n\nKind regards,\n${WORKER.name}`,
    });
    addMessage({
      from: job.employer,
      fromRole: "employer",
      to: "worker",
      subject: `Message sent to ${job.employer}`,
      body: `Your message about "${job.title}" was sent to ${job.employer}. You'll hear back soon.`,
    });
    onClose();
    router.push("/worker/messages");
  };

  const handleApply = () => {
    if (!job || alreadyApplied || applied) return;
    addWorkerApplication({
      jobId: job.id,
      jobTitle: job.title,
      employer: job.employer,
      location: job.location,
      wage: job.wage,
      tags: job.tags,
      description: job.description,
      workerName: WORKER.name,
      workerRating: WORKER.rating,
      workerReviews: WORKER.reviews,
      workerSkills: WORKER.skills,
    });
    addMessage({
      from: WORKER.name,
      fromRole: "worker",
      to: "employer",
      subject: `New application: ${job.title}`,
      body: `${WORKER.name} has applied for your "${job.title}" position.\n\nRating: ⭐ ${WORKER.rating} (${WORKER.reviews} reviews)\nSkills: ${WORKER.skills.join(", ")}\n\nReview the application in your Applicants dashboard.`,
    });
    setApplied(true);
    // Auto-clear after 5 seconds, no navigation
    flashTimer.current = setTimeout(() => setApplied(false), 5000);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!job) return;
    toggleSavedJob({ id: job.id, title: job.title, employer: job.employer, location: job.location, wage: job.wage, tags: job.tags, description: job.description });
  };

  return (
    <>
      {/* Report modal — z-[70] renders above sheet */}
      {job && (
        <ReportModal
          open={showReport}
          targetName={job.title}
          reasons={JOB_REPORT_REASONS}
          onClose={() => setShowReport(false)}
        />
      )}

      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${job ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${job ? "translate-y-0" : "translate-y-full"}`}>
        <div className={`mx-auto max-w-2xl rounded-t-[2rem] border-t border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.4)] max-h-[90vh] overflow-y-auto transition-all duration-300 ${showReport ? "blur-sm pointer-events-none" : ""}`}>

          <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[color:var(--border)]" />

          {/* Header row: back + bookmark */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
              {t.back}
            </button>
            {job && (
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-xs font-semibold transition ${isSaved ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10 text-[color:var(--accent)]" : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"}`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                {isSaved ? t.saved : t.save}
              </button>
            )}
          </div>

          {job && (
            <div className="space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-0.5 text-xs text-[color:var(--text)]">{tag}</span>
                ))}
                {alreadyApplied && (
                  <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-0.5 text-xs font-semibold text-green-600">{t.appliedBadge}</span>
                )}
              </div>

              {/* Job info */}
              <div>
                <h2 className="text-2xl font-semibold text-[color:var(--text)]">{job.title}</h2>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{job.employer} · {job.location}</p>
                <p className="mt-2 text-base font-semibold text-[color:var(--accent)]">{job.wage}</p>
              </div>

              {job.description && (
                <p className="text-sm leading-7 text-[color:var(--muted)]">{job.description}</p>
              )}

              {/* Apply success flash — stays until dismissed or 5s */}
              {applied && (
                <div className="flex items-start gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3">
                  <svg className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  <div>
                    <p className="text-sm font-semibold text-green-600">{t.applicationSent}</p>
                    <p className="text-xs text-green-600/80 leading-5">{t.applicationSentDesc}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="grid gap-3">
                <button
                  onClick={handleApply}
                  disabled={alreadyApplied}
                  className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition shadow-lg ${
                    alreadyApplied
                      ? "border border-green-500/30 bg-green-500/10 text-green-600 cursor-default"
                      : "bg-[color:var(--accent)] text-slate-950 hover:opacity-90 shadow-[color:var(--accent)]/20"
                  }`}
                >
                  {alreadyApplied ? (
                    <>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      {t.applied}
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                      {t.apply}
                    </>
                  )}
                </button>

                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--border)] px-5 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  {t.sendMessage}
                </button>

                <button
                  onClick={() => setShowReport(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  {t.report}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
