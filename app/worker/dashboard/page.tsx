"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { JobDetailSheet, Job } from "@/components/worker/JobDetailSheet";
import { useStore } from "@/lib/store";
import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n";

const boostedJobs: Job[] = [
  { id: "b1", title: "Live-in housekeeper needed", employer: "The Kimaro Family", location: "Oyster Bay", wage: "TSh 400,000/mo", tags: ["Housekeeping"], description: "We are looking for a live-in housekeeper to manage our home in Oyster Bay. Must have experience with a large household and be comfortable with children." },
  { id: "b2", title: "Full-time nanny for 3 children", employer: "Dr. & Mrs. Patel", location: "Masaki", wage: "TSh 350,000/mo", tags: ["Childcare"], description: "Experienced nanny needed for three children aged 2, 5, and 8. Must be patient, warm, and reliable." },
  { id: "b3", title: "Personal chef — 5 days a week", employer: "Amani Holdings", location: "Msasani", wage: "TSh 600,000/mo", tags: ["Cooking"], description: "We need a personal chef to prepare lunch and dinner Monday to Friday for a family of 5. Must know both Swahili and continental cuisine." },
  { id: "b4", title: "Garden & grounds maintenance", employer: "Villa Serengeti", location: "Mikocheni", wage: "TSh 280,000/mo", tags: ["Gardening"], description: "Maintain a large garden including lawn, flower beds, and outdoor areas. Experience with tropical plants preferred." },
];

type JobWithDate = Job & { postedAt: string };

// Dates relative to today 2026-05-07
const nearbyJobs: JobWithDate[] = [
  { id: "j5",  title: "Part-time house cleaning",          employer: "Mama Amina",        location: "Kinondoni",   wage: "TSh 80,000/wk",   tags: ["Cleaning"],  description: "Three times a week cleaning for a 3-bedroom apartment. Flexible hours.",                                                              postedAt: "2026-05-07" },
  { id: "j6",  title: "Childcare support for two toddlers", employer: "Family of 4",       location: "Mikocheni",   wage: "TSh 120,000/wk",  tags: ["Childcare"], description: "Looking for a warm, patient caregiver for two toddlers aged 1 and 3 while parents work from home.",                             postedAt: "2026-05-07" },
  { id: "j7",  title: "Laundry & ironing assistant",        employer: "Mr. Juma",          location: "Sinza",       wage: "TSh 60,000/wk",   tags: ["Laundry"],   description: "Weekly laundry and ironing for a family of 6. Approximately 4-5 hours per visit.",                                              postedAt: "2026-05-05" },
  { id: "j8",  title: "Elderly care companion",             employer: "Bibi Fatma",        location: "Kariakoo",    wage: "TSh 200,000/mo",  tags: ["Care"],      description: "Daily companion and light care assistant for an elderly woman. Must be kind, patient, and speak Swahili.",                   postedAt: "2026-05-04" },
  { id: "j9",  title: "Driver & errands assistant",         employer: "Startup Office",    location: "CBD",         wage: "TSh 300,000/mo",  tags: ["Driving"],   description: "Office driver and errands runner. Must have a valid license and be familiar with Dar es Salaam roads.",                       postedAt: "2026-05-01" },
  { id: "j10", title: "Cook for busy household",            employer: "The Ngowi Family",  location: "Mbezi Beach", wage: "TSh 250,000/mo",  tags: ["Cooking"],   description: "Daily cooking for a family of 4. Must be able to prepare both local and continental meals.",                                  postedAt: "2026-04-15" },
];

const allTags = ["All", "Cleaning", "Childcare", "Cooking", "Laundry", "Driving", "Care", "Gardening"];

type DateFilter = "any" | "24h" | "3d" | "7d" | "month";

const DATE_FILTERS: { key: DateFilter; label: string }[] = [
  { key: "any",   label: "Any time" },
  { key: "24h",  label: "Last 24h" },
  { key: "3d",   label: "3 days" },
  { key: "7d",   label: "7 days" },
  { key: "month",label: "This month" },
];

const TODAY = new Date("2026-05-07");

function withinDays(postedAt: string, days: number) {
  const diff = (TODAY.getTime() - new Date(postedAt).getTime()) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

function matchesDateFilter(postedAt: string, filter: DateFilter) {
  if (filter === "any") return true;
  if (filter === "24h") return withinDays(postedAt, 1);
  if (filter === "3d") return withinDays(postedAt, 3);
  if (filter === "7d") return withinDays(postedAt, 7);
  if (filter === "month") return withinDays(postedAt, 30);
  return true;
}

function daysAgoLabel(postedAt: string) {
  const diff = Math.floor((TODAY.getTime() - new Date(postedAt).getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}

export default function WorkerDashboardPage() {
  const { workerApplications, savedJobs, toggleSavedJob } = useStore();
  const { lang } = useLang();
  const jt = translations[lang].worker.job;

  const [activeTag, setActiveTag] = useState("All");
  const [dateFilter, setDateFilter] = useState<DateFilter>("any");
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const appliedIds = new Set(workerApplications.map((a) => a.jobId));
  const savedIds = new Set(savedJobs.map((j) => j.id));

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % boostedJobs.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoPlay();
  };

  const filteredJobs = nearbyJobs.filter((job) => {
    const matchTag = activeTag === "All" || job.tags.includes(activeTag);
    const matchSearch = search === "" || job.title.toLowerCase().includes(search.toLowerCase()) || job.location.toLowerCase().includes(search.toLowerCase());
    const matchDate = matchesDateFilter(job.postedAt, dateFilter);
    return matchTag && matchSearch && matchDate;
  });

  return (
    <>
      <JobDetailSheet job={selectedJob} onClose={() => setSelectedJob(null)} />

      <div className="space-y-8">
        {/* Sponsored carousel */}
        <section>
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)] mb-4">Featured jobs</p>
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--accent)]/30 bg-[color:var(--surface)] shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
              {boostedJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="min-w-full p-8 text-left block"
                >
                  <span className="rounded-full bg-[color:var(--accent)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">Sponsored</span>
                  <p className="mt-4 text-2xl font-semibold text-[color:var(--text)]">{job.title}</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">{job.employer} · {job.location}</p>
                  <p className="mt-3 text-lg font-semibold text-[color:var(--accent)]">{job.wage}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-2 pb-5">
              {boostedJobs.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-[color:var(--accent)]" : "w-2 bg-[color:var(--border)]"}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Ad placeholder */}
        <section className="rounded-[2rem] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)]/50 p-6 flex items-center justify-center min-h-[90px]">
          <p className="text-sm text-[color:var(--muted)] text-center">
            📢 Advertise your business here —{" "}
            <Link href="/advertise" className="text-[color:var(--accent)] font-semibold hover:underline">contact us</Link>
          </p>
        </section>

        {/* Search + filters */}
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Browse jobs</p>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, location, skill…"
            className="w-full rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-5 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
          />

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${activeTag === tag ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Date filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[color:var(--muted)] shrink-0">Posted:</span>
            {DATE_FILTERS.map((df) => (
              <button
                key={df.key}
                onClick={() => setDateFilter(df.key)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${dateFilter === df.key ? "bg-[color:var(--accent)]/15 text-[color:var(--accent)] border border-[color:var(--accent)]/40" : "border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--muted)] hover:border-[color:var(--accent)]"}`}
              >
                {df.label}
              </button>
            ))}
          </div>
        </section>

        {/* Job listings */}
        <section className="space-y-3">
          {filteredJobs.length > 0 ? filteredJobs.map((job) => {
            const isApplied = appliedIds.has(job.id);
            const isSaved = savedIds.has(job.id);
            return (
              <div
                key={job.id}
                className="relative flex items-center gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)] transition hover:border-[color:var(--accent)]"
              >
                {/* Main click area */}
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex-1 min-w-0 text-left"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-[color:var(--text)]">{job.title}</p>
                    {isApplied && (
                      <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-green-600">{jt.appliedBadge}</span>
                    )}
                  </div>
                  <p className="text-sm text-[color:var(--muted)]">{job.employer} · {job.location}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-0.5 text-xs text-[color:var(--text)]">{tag}</span>
                    ))}
                  </div>
                </button>

                {/* Right column */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="text-sm font-semibold text-[color:var(--accent)]">{job.wage}</p>
                  <p className="text-[10px] text-[color:var(--muted)]">{daysAgoLabel(job.postedAt)}</p>
                  {/* Bookmark icon */}
                  <button
                    onClick={() => toggleSavedJob({ id: job.id, title: job.title, employer: job.employer, location: job.location, wage: job.wage, tags: job.tags, description: job.description })}
                    className={`transition ${isSaved ? "text-[color:var(--accent)]" : "text-[color:var(--muted)] hover:text-[color:var(--accent)]"}`}
                    title={isSaved ? jt.saved : jt.save}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-center text-sm text-[color:var(--muted)]">
              No jobs match your filters.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
