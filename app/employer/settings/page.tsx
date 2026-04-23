"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n/context";

export default function SettingsPage() {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: lang === "en" ? "Profile" : "Wasifu" },
    { id: "security", label: lang === "en" ? "Security" : "Ulinzi" },
    { id: "billing", label: lang === "en" ? "Payments" : "Malipo" },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[color:var(--text)]">
          {lang === "en" ? "Settings" : "Mipangilio"}
        </h1>
        <p className="text-[color:var(--muted)]">Manage your business account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[color:var(--border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-bold transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-[color:var(--accent)] text-[color:var(--accent)]"
                : "text-[color:var(--muted)] hover:text-[color:var(--text)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-[color:var(--muted)] px-2">Business Name</label>
                <input className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none" defaultValue="AjiraNet Corp" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-[color:var(--muted)] px-2">Email Address</label>
                <input className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none" defaultValue="employer@ajira.net" />
              </div>
            </div>
            <button className="px-8 py-4 bg-[color:var(--accent)] text-slate-950 font-bold rounded-2xl">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <p className="text-[color:var(--muted)]">Update your password to keep your account secure.</p>
            <input type="password" placeholder="Current Password" className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none" />
            <input type="password" placeholder="New Password" className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 outline-none" />
            <button className="px-8 py-4 bg-red-500/10 text-red-500 font-bold rounded-2xl border border-red-500/20">
              Update Password
            </button>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="text-center py-10 space-y-4">
            <div className="mx-auto w-16 h-16 bg-[color:var(--muted)]/10 rounded-full flex items-center justify-center text-[color:var(--muted)] text-2xl">💳</div>
            <p className="text-[color:var(--muted)]">No payment methods added yet.</p>
            <button className="px-6 py-3 border border-[color:var(--accent)] text-[color:var(--accent)] font-bold rounded-xl">
              + Add Card or Mobile Money
            </button>
          </div>
        )}
      </div>
    </div>
  );
}