import Link from "next/link";
import { WorkerFrame } from "@/components/worker/WorkerFrame";
import { SkillBadge } from "@/components/worker/SkillBadge";
import { ReviewCard } from "@/components/worker/ReviewCard";

const sampleProfile = {
  name: "Alice Mwando",
  role: "Home cleaner & childcare",
  location: "Mikocheni, Dar es Salaam",
  rating: 4.8,
  reviews: 24,
  availability: "Available now",
  skills: ["Cleaning", "Childcare", "Cooking"],
  verified: true,
  phoneVerified: true,
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
};

export default function WorkerProfilePage({ params }: { params: { id: string } }) {
  const profile = sampleProfile;

  return (
    <WorkerFrame>
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
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-600">{profile.availability}</span>
            {profile.phoneVerified && <span className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--text)]">Phone verified</span>}
            {profile.verified && <span className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[color:var(--text)]">✓ Verified</span>}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Left */}
          <div className="space-y-6">
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
          </div>

          {/* Right */}
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
                <p className="text-sm text-[color:var(--text)]">Send a message or request a quick call.</p>
                <Link href="/auth/login" className="inline-flex w-full justify-center rounded-3xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)]">
                  Contact worker
                </Link>
                <button
                  type="button"
                  className="w-full rounded-3xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-500/10"
                  onClick={() => alert("Report functionality coming soon")}
                >
                  Report user
                </button>
              </div>
            </section>
          </aside>
        </div>

        {/* Reviews */}
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Reviews</p>
          {profile.reviewsList.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </section>
      </div>
    </WorkerFrame>
  );
}