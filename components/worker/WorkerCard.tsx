import Link from "next/link";
import { SkillBadge } from "./SkillBadge";

type WorkerCardProps = {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  reviews: number;
  availability: string; // Changed from strict types to string for translation support
  availabilityStatus: "Available now" | "Available next month" | "Busy"; // Keep this for styling
  skills: string[];
  verified: boolean;
  // Translation Props
  verifiedLabel?: string;
  reviewsLabel?: string;
};

const availabilityStyles = {
  "Available now": "bg-green-500/10 text-green-600",
  "Available next month": "bg-yellow-500/10 text-yellow-600",
  "Busy": "bg-red-500/10 text-red-600",
};

export function WorkerCard({ 
  id, name, role, location, rating, reviews, 
  availability, availabilityStatus, 
  skills, verified, 
  verifiedLabel = "Verified", 
  reviewsLabel = "reviews" 
}: WorkerCardProps) {
  return (
    <Link
      href={`/worker/${id}`}
      className="group block rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] transition hover:border-[color:var(--accent)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-lg font-semibold text-[color:var(--accent)]">
            {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-[color:var(--text)]">{name}</p>
              {verified && (
                <span className="rounded-full bg-[color:var(--accent)]/10 px-2 py-0.5 text-xs font-medium text-[color:var(--accent)]">
                  ✓ {verifiedLabel}
                </span>
              )}
            </div>
            <p className="text-sm text-[color:var(--muted)]">{role}</p>
            <p className="text-sm text-[color:var(--muted)]">{location}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-semibold text-[color:var(--text)]">{rating.toFixed(1)} ⭐</p>
          <p className="text-xs text-[color:var(--muted)]">{reviews} {reviewsLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillBadge key={skill} label={skill} />
          ))}
        </div>
        <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${availabilityStyles[availabilityStatus]}`}>
          {availability}
        </span>
      </div>
    </Link>
  );
}