"use client";

import { useState } from "react";
import Link from "next/link";

type NotifType = "message" | "application" | "review" | "match";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  group: "Today" | "Yesterday" | "Earlier";
  read: boolean;
  href: string;
};

const initialNotifs: Notification[] = [
  {
    id: "n-1",
    type: "application",
    title: "You've been shortlisted!",
    body: "The Kimaro Family shortlisted you for 'Live-in housekeeper needed'. Check your application.",
    time: "2h ago",
    group: "Today",
    read: false,
    href: "/worker/applications",
  },
  {
    id: "n-2",
    type: "message",
    title: "New message from Dr. Patel",
    body: "Hello, we'd like to schedule an interview for the nanny position. Are you available this Friday?",
    time: "5h ago",
    group: "Today",
    read: false,
    href: "/worker/messages",
  },
  {
    id: "n-3",
    type: "match",
    title: "New job match in your area",
    body: "A new 'Home Cleaning' job was posted in Kinondoni that matches your skills.",
    time: "8h ago",
    group: "Today",
    read: true,
    href: "/worker/dashboard",
  },
  {
    id: "n-4",
    type: "review",
    title: "New review received",
    body: "Mama Amina left you a 5-star review: 'Excellent work, very thorough and punctual!'",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
    href: "/worker/profile",
  },
  {
    id: "n-5",
    type: "application",
    title: "Application update",
    body: "Unfortunately, Villa Serengeti has moved forward with another candidate for the gardening role.",
    time: "Yesterday",
    group: "Yesterday",
    read: true,
    href: "/worker/applications",
  },
  {
    id: "n-6",
    type: "match",
    title: "3 new cooking jobs posted",
    body: "New opportunities matching your 'Cooking' skill were posted this week in Msasani and Masaki.",
    time: "3 days ago",
    group: "Earlier",
    read: true,
    href: "/worker/dashboard",
  },
];

const typeIcon: Record<NotifType, React.ReactNode> = {
  message: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  application: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  review: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  match: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
};

const typeColor: Record<NotifType, string> = {
  message: "bg-blue-500/10 text-blue-500",
  application: "bg-[color:var(--accent)]/10 text-[color:var(--accent)]",
  review: "bg-yellow-500/10 text-yellow-500",
  match: "bg-green-500/10 text-green-600",
};

const groups = ["Today", "Yesterday", "Earlier"] as const;

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);

  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex items-start justify-between gap-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Activity</p>
          <h1 className="mt-2 text-3xl font-semibold text-[color:var(--text)]">Notifications</h1>
          {unread > 0 && (
            <p className="mt-1 text-sm text-[color:var(--muted)]">{unread} unread notification{unread !== 1 ? "s" : ""}</p>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="flex-shrink-0 rounded-2xl border border-[color:var(--border)] px-4 py-2 text-xs font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            Mark all read
          </button>
        )}
      </section>

      {/* Grouped list */}
      {groups.map((group) => {
        const items = notifs.filter((n) => n.group === group);
        if (items.length === 0) return null;
        return (
          <section key={group} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] px-1">{group}</p>
            {items.map((notif) => (
              <Link
                key={notif.id}
                href={notif.href}
                onClick={() => markRead(notif.id)}
                className={`flex items-start gap-4 rounded-[2rem] border p-5 transition hover:border-[color:var(--accent)] ${notif.read ? "border-[color:var(--border)] bg-[color:var(--surface)]" : "border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5"}`}
              >
                {/* Icon */}
                <div className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${typeColor[notif.type]}`}>
                  {typeIcon[notif.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${notif.read ? "text-[color:var(--text)]" : "text-[color:var(--accent)]"}`}>
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-[color:var(--muted)]">{notif.time}</span>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />}
                    </div>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{notif.body}</p>
                </div>
              </Link>
            ))}
          </section>
        );
      })}

      {notifs.length === 0 && (
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center space-y-3">
          <p className="text-4xl">🔔</p>
          <p className="font-semibold text-[color:var(--text)]">All caught up</p>
          <p className="text-sm text-[color:var(--muted)]">No new notifications right now.</p>
        </div>
      )}
    </div>
  );
}
