"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

export default function WorkerMessagesPage() {
  const { workerMessages, markMessageRead } = useStore();
  const [selected, setSelected] = useState<string | null>(null);

  const open = workerMessages.find((m) => m.id === selected) ?? null;
  const unread = workerMessages.filter((m) => !m.read).length;

  const handleOpen = (id: string) => {
    setSelected(id);
    markMessageRead(id, "worker");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">Inbox</p>
        <h1 className="mt-1 text-2xl font-bold text-[color:var(--text)]">Messages</h1>
        {unread > 0 && (
          <p className="text-sm text-[color:var(--muted)]">{unread} unread message{unread !== 1 ? "s" : ""}</p>
        )}
      </div>

      {workerMessages.length === 0 ? (
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
          <h2 className="font-bold text-[color:var(--text)]">No messages yet</h2>
          <p className="text-sm text-[color:var(--muted)]">Messages from employers will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          {/* List */}
          <div className="space-y-2">
            {workerMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleOpen(msg.id)}
                className={`w-full rounded-[1.5rem] border p-5 text-left transition ${selected === msg.id ? "border-[color:var(--accent)] bg-[color:var(--accent)]/5" : msg.read ? "border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--accent)]" : "border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-xs font-bold text-[color:var(--accent)]">
                      {msg.from.charAt(0)}
                    </div>
                    <p className={`text-sm font-semibold ${!msg.read ? "text-[color:var(--accent)]" : "text-[color:var(--text)]"}`}>{msg.from}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] text-[color:var(--muted)]">{msg.time}</span>
                    {!msg.read && <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />}
                  </div>
                </div>
                <p className="mt-1.5 ml-10 text-xs font-semibold text-[color:var(--text)] truncate">{msg.subject}</p>
                <p className="mt-0.5 ml-10 text-xs text-[color:var(--muted)] line-clamp-1">{msg.body.split("\n")[0]}</p>
              </button>
            ))}
          </div>

          {/* Body */}
          {open ? (
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 space-y-4 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[color:var(--text)]">{open.subject}</h2>
                  <p className="text-xs text-[color:var(--muted)]">From: {open.from} · {open.time}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-[color:var(--muted)] hover:text-[color:var(--text)]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="border-t border-[color:var(--border)] pt-4">
                <p className="text-sm leading-7 text-[color:var(--text)] whitespace-pre-line">{open.body}</p>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex rounded-[2rem] border border-dashed border-[color:var(--border)] bg-[color:var(--surface)]/50 p-12 items-center justify-center text-sm text-[color:var(--muted)]">
              Select a message to read
            </div>
          )}
        </div>
      )}
    </div>
  );
}
