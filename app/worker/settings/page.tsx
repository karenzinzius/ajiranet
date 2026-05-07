"use client";

import { useState } from "react";

type Tab = "profile" | "availability" | "security" | "notifications";

const skills = ["Cleaning", "Childcare", "Cooking", "Laundry", "Ironing", "Gardening", "Driving", "Errands", "Elderly Care", "Security"];

export default function WorkerSettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");

  // Profile state
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Experienced home cleaner and childcare provider with over 3 years working with families across Dar es Salaam.");
  const [location, setLocation] = useState("Kinondoni, Dar es Salaam");
  const [phone, setPhone] = useState("+255 712 345 678");
  const [selectedSkills, setSelectedSkills] = useState(["Cleaning", "Childcare", "Laundry", "Cooking"]);
  const [profileSaved, setProfileSaved] = useState(false);

  // Availability state
  const [availability, setAvailability] = useState<"Available now" | "Available next month" | "Busy">("Available now");
  const [availSaved, setAvailSaved] = useState(false);

  // Security state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaved, setPwSaved] = useState(false);

  // Notifications state
  const [notifSettings, setNotifSettings] = useState({
    newMessages: true,
    applicationUpdates: true,
    jobMatches: true,
    reviews: true,
    promotions: false,
  });
  const [notifSaved, setNotifSaved] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const saveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const saveAvailability = () => {
    setAvailSaved(true);
    setTimeout(() => setAvailSaved(false), 2500);
  };

  const savePassword = () => {
    setPwError(null);
    if (!currentPw) { setPwError("Enter your current password."); return; }
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwSaved(true);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwSaved(false), 2500);
  };

  const saveNotifs = () => {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2500);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "availability", label: "Availability" },
    { key: "security", label: "Security" },
    { key: "notifications", label: "Notifications" },
  ];

  const inputClass = "w-full rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] px-5 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20";
  const labelClass = "block text-xs font-medium text-[color:var(--muted)] mb-1.5";
  const saveBtn = "w-full rounded-[2rem] bg-[color:var(--accent)] py-4 text-sm font-bold text-slate-950 transition hover:bg-[color:var(--accent-strong)]";

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Account</p>
        <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text)]">Settings</h1>
      </section>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition flex-shrink-0 ${tab === key ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {tab === "profile" && (
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 space-y-5 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <div>
            <label className={labelClass}>Full name</label>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Phone number</label>
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Neighbourhood, City" />
          </div>
          <div>
            <label className={labelClass}>Bio</label>
            <textarea
              className={`${inputClass} min-h-[120px] resize-none rounded-[1.5rem]`}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell employers about your experience and strengths…"
            />
          </div>
          <div>
            <label className={labelClass}>Skills</label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${selectedSkills.includes(skill) ? "bg-[color:var(--accent)] text-slate-950" : "border border-[color:var(--border)] text-[color:var(--text)] hover:border-[color:var(--accent)]"}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          <button onClick={saveProfile} className={saveBtn}>
            {profileSaved ? "✓ Profile saved!" : "Save Profile"}
          </button>
        </section>
      )}

      {/* Availability tab */}
      {tab === "availability" && (
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 space-y-5 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <p className="text-sm text-[color:var(--muted)]">
            Set your current availability. Employers use this to decide who to contact first.
          </p>
          {(["Available now", "Available next month", "Busy"] as const).map((opt) => {
            const colors = { "Available now": "border-green-500 bg-green-500/10 text-green-600", "Available next month": "border-yellow-500 bg-yellow-500/10 text-yellow-600", "Busy": "border-red-500 bg-red-500/10 text-red-500" };
            const descs = { "Available now": "You are ready to start a new job immediately.", "Available next month": "You are available but need a bit more time.", "Busy": "You are currently fully occupied." };
            return (
              <button
                key={opt}
                onClick={() => setAvailability(opt)}
                className={`w-full flex items-start gap-4 rounded-[1.5rem] border p-5 text-left transition ${availability === opt ? colors[opt] : "border-[color:var(--border)] bg-[color:var(--bg)] hover:border-[color:var(--accent)]"}`}
              >
                <span className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 ${availability === opt ? "border-current bg-current" : "border-[color:var(--border)]"}`} />
                <div>
                  <p className="font-semibold text-sm">{opt}</p>
                  <p className="mt-0.5 text-xs opacity-70">{descs[opt]}</p>
                </div>
              </button>
            );
          })}
          <button onClick={saveAvailability} className={saveBtn}>
            {availSaved ? "✓ Availability updated!" : "Save Availability"}
          </button>
        </section>
      )}

      {/* Security tab */}
      {tab === "security" && (
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 space-y-5 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <div>
            <label className={labelClass}>Current password</label>
            <input className={inputClass} type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClass}>New password</label>
            <input className={inputClass} type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Min. 8 characters" />
          </div>
          <div>
            <label className={labelClass}>Confirm new password</label>
            <input className={inputClass} type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Repeat new password" />
          </div>
          {pwError && (
            <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-400">
              {pwError}
            </div>
          )}
          {pwSaved && (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500">
              ✓ Password changed successfully.
            </div>
          )}
          <button onClick={savePassword} className={saveBtn}>
            Change Password
          </button>
        </section>
      )}

      {/* Notifications tab */}
      {tab === "notifications" && (
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 space-y-1 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          {(Object.entries(notifSettings) as [keyof typeof notifSettings, boolean][]).map(([key, val]) => {
            const labels: Record<string, string> = {
              newMessages: "New messages from employers",
              applicationUpdates: "Application status updates",
              jobMatches: "New job matches for your skills",
              reviews: "New reviews on your profile",
              promotions: "Tips, promotions, and platform news",
            };
            return (
              <div key={key} className="flex items-center justify-between gap-4 rounded-2xl py-4 border-b border-[color:var(--border)] last:border-0">
                <p className="text-sm text-[color:var(--text)]">{labels[key]}</p>
                <button
                  onClick={() => setNotifSettings((prev) => ({ ...prev, [key]: !val }))}
                  className={`relative h-6 w-11 rounded-full transition-colors flex-shrink-0 ${val ? "bg-[color:var(--accent)]" : "bg-[color:var(--border)]"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${val ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            );
          })}
          <div className="pt-4">
            <button onClick={saveNotifs} className={saveBtn}>
              {notifSaved ? "✓ Preferences saved!" : "Save Preferences"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
