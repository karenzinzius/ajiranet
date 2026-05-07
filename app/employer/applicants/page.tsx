"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";
import { useStore } from "@/lib/store";

type DirectApplicant = {
  id: string;
  name: string;
  job: string;
  rating: number;
  wage: string;
  reviews: number;
  skills: string[];
  availability: string;
};

const seed: DirectApplicant[] = [
  { id: "d1", name: "Hamisi Juma", job: "House Cleaning", rating: 4.8, wage: "80,000", reviews: 12, skills: ["Cleaning", "Laundry"], availability: "Available now" },
  { id: "d2", name: "Sarah John",  job: "House Cleaning", rating: 4.5, wage: "75,000", reviews: 8,  skills: ["Cleaning", "Cooking"], availability: "Available now" },
  { id: "d3", name: "Grace Minja", job: "Childcare",      rating: 4.9, wage: "120,000", reviews: 21, skills: ["Childcare", "Cooking"], availability: "Available now" },
];

export default function ApplicantsPage() {
  const { lang } = useLang();
  const t = translations[lang].employer;
  const router = useRouter();
  const { addMessage, addEscrowItem, invitedApplicants, removeInvitedApplicant, workerApplications, removeWorkerApplication } = useStore();

  const [directApplicants, setDirectApplicants] = useState<DirectApplicant[]>(seed);
  type Source = "direct" | "invited" | "candidate";
  const [rejectTarget, setRejectTarget] = useState<{ id: string; name: string; job: string; source: Source } | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [hiredName, setHiredName] = useState<string | null>(null);

  const confirmReject = () => {
    if (!rejectTarget) return;
    addMessage({
      from: "Acme Corp",
      fromRole: "employer",
      to: "worker",
      subject: "Update on your application",
      body: `Dear ${rejectTarget.name},\n\nThank you for applying for the "${rejectTarget.job}" position. After careful consideration, we have decided to move forward with another candidate at this time.\n\n${rejectNote ? `Additional note: ${rejectNote}\n\n` : ""}We appreciate your interest and encourage you to apply again in the future. We wish you the very best in your job search.\n\nWarm regards,\nAcme Corp via AjiraNet`,
    });
    if (rejectTarget.source === "invited") removeInvitedApplicant(rejectTarget.id);
    else if (rejectTarget.source === "candidate") removeWorkerApplication(rejectTarget.id);
    else setDirectApplicants((prev) => prev.filter((a) => a.id !== rejectTarget.id));
    setRejectTarget(null);
    setRejectNote("");
  };

  const handleHire = (id: string, name: string, job: string, wage: string, source: Source = "direct") => {
    addEscrowItem({ workerName: name, workerJob: job, amount: wage, status: "secured" });
    addMessage({
      from: "Acme Corp",
      fromRole: "employer",
      to: "worker",
      subject: "🎉 You've been hired!",
      body: `Congratulations ${name}!\n\nWe are delighted to offer you the "${job}" position at Acme Corp. The agreed wage of TSh ${wage} has been secured in escrow and will be released upon satisfactory completion of the work.\n\nPlease confirm your acceptance by replying to this message. We look forward to working with you!\n\nBest regards,\nAcme Corp via AjiraNet`,
    });
    if (source === "invited") removeInvitedApplicant(id);
    else if (source === "candidate") removeWorkerApplication(id);
    else setDirectApplicants((prev) => prev.filter((a) => a.id !== id));
    setHiredName(name);
    setTimeout(() => {
      setHiredName(null);
      router.push("/employer/wallet");
    }, 2200);
  };

  const totalCount = directApplicants.length + invitedApplicants.length + workerApplications.length;

  return (
    <>
      {/* Reject modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-bold text-[color:var(--text)]">{t.applicants.rejectTitle}</h2>
            <p className="text-sm text-[color:var(--muted)]">{t.applicants.rejectBody.replace("{name}", rejectTarget.name)}</p>
            <textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder={t.applicants.rejectNotePlaceholder}
              rows={3}
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setRejectTarget(null); setRejectNote(""); }}
                className="flex-1 rounded-2xl border border-[color:var(--border)] py-3 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
              >
                {t.applicants.rejectCancel}
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white transition hover:bg-red-600"
              >
                {t.applicants.rejectSend}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hire success flash */}
      {hiredName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[2rem] border border-green-500/30 bg-[color:var(--surface)] p-8 text-center space-y-4 shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <p className="text-lg font-bold text-[color:var(--text)]">{t.nav.alertHired}</p>
            <p className="text-sm text-[color:var(--muted)]">{t.applicants.redirecting}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[color:var(--text)]">{t.nav.applicantsTitle}</h1>
          <p className="text-sm text-[color:var(--muted)]">{t.nav.applicantsSubtitle}</p>
        </div>

        {totalCount === 0 ? (
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center space-y-2">
            <p className="text-3xl">✅</p>
            <p className="font-semibold text-[color:var(--text)]">{t.applicants.allProcessed}</p>
            <p className="text-sm text-[color:var(--muted)]">{t.applicants.checkHistory}</p>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Direct applicants */}
            {directApplicants.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.applicants.directTitle}</p>
                <div className="grid gap-4">
                  {directApplicants.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      name={app.name}
                      job={app.job}
                      rating={app.rating}
                      wage={app.wage}
                      reviews={app.reviews}
                      skills={app.skills}
                      reviewsLabel={t.nav.reviews}
                      rejectLabel={t.nav.btnReject}
                      hireLabel={t.nav.btnHire}
                      onReject={() => setRejectTarget({ id: app.id, name: app.name, job: app.job, source: "direct" })}
                      onHire={() => handleHire(app.id, app.name, app.job, app.wage, "direct")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Invited applicants */}
            {invitedApplicants.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.applicants.invitedTitle}</p>
                <div className="grid gap-4">
                  {invitedApplicants.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      name={app.name}
                      job={app.role}
                      rating={app.rating}
                      wage={app.wage}
                      reviews={app.reviews}
                      skills={app.skills}
                      reviewsLabel={t.nav.reviews}
                      rejectLabel={t.nav.btnReject}
                      hireLabel={t.nav.btnHire}
                      badge={t.applicants.invitedBadge}
                      onReject={() => setRejectTarget({ id: app.id, name: app.name, job: app.role, source: "invited" })}
                      onHire={() => handleHire(app.id, app.name, app.role, app.wage, "invited")}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Worker-submitted applications */}
            {workerApplications.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{t.applicants.candidatesTitle}</p>
                <div className="grid gap-4">
                  {workerApplications.map((app) => (
                    <ApplicantCard
                      key={app.id}
                      name={app.workerName}
                      job={app.jobTitle}
                      rating={app.workerRating}
                      wage={app.wage.replace("TSh ", "").replace("/mo", "").replace("/wk", "")}
                      reviews={app.workerReviews}
                      skills={app.workerSkills}
                      reviewsLabel={t.nav.reviews}
                      rejectLabel={t.nav.btnReject}
                      hireLabel={t.nav.btnHire}
                      badge={t.applicants.candidateBadge}
                      onReject={() => setRejectTarget({ id: app.id, name: app.workerName, job: app.jobTitle, source: "candidate" })}
                      onHire={() => handleHire(app.id, app.workerName, app.jobTitle, app.wage.replace("TSh ", "").replace("/mo", "").replace("/wk", ""), "candidate")}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </>
  );
}

function ApplicantCard({
  name, job, rating, wage, reviews, skills,
  reviewsLabel, rejectLabel, hireLabel, badge,
  onReject, onHire,
}: {
  name: string; job: string; rating: number; wage: string;
  reviews: number; skills: string[]; reviewsLabel: string;
  rejectLabel: string; hireLabel: string; badge?: string;
  onReject: () => void; onHire: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--accent)]/50 transition shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="h-14 w-14 rounded-2xl bg-[color:var(--accent)]/10 flex items-center justify-center font-bold text-[color:var(--accent)] text-xl flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg text-[color:var(--text)]">{name}</h3>
            {badge && (
              <span className="rounded-full bg-[color:var(--accent)]/10 px-2 py-0.5 text-[10px] font-semibold text-[color:var(--accent)]">{badge}</span>
            )}
          </div>
          <p className="text-xs text-[color:var(--muted)] mb-1">{job}</p>
          <div className="flex items-center gap-2 text-xs text-[color:var(--muted)]">
            <span className="text-amber-500">⭐ {rating}</span>
            <span>·</span>
            <span>{reviews} {reviewsLabel}</span>
            <span>·</span>
            <span className="font-bold text-[color:var(--accent)]">TSh {wage}/mo</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-2 py-0.5 text-[10px] text-[color:var(--text)]">{s}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onReject}
          className="flex-1 md:flex-none px-6 py-3 rounded-2xl border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500/5 transition"
        >
          {rejectLabel}
        </button>
        <button
          onClick={onHire}
          className="flex-1 md:flex-none px-8 py-3 rounded-2xl bg-[color:var(--accent)] text-slate-950 text-xs font-bold hover:opacity-90 transition shadow-lg shadow-[color:var(--accent)]/20"
        >
          {hireLabel}
        </button>
      </div>
    </div>
  );
}
