"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    // For simplicity, assume it's email. In real app, check if username or email.
    const { error } = await supabase.auth.signInWithPassword({
      email: emailOrUsername,
      password,
    });

    setLoading(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    // Redirect based on role
    const { getUserRole, getRoleRedirectPath } = await import("@/lib/auth");
    const role = await getUserRole();
    router.push(getRoleRedirectPath(role));
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)]">
      <div className="mx-auto flex max-w-md flex-col gap-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl shadow-[rgba(0,0,0,0.8)]">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Welcome back
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--text)]">
            Log in to your account
          </h1>
          <p className="text-sm text-[color:var(--muted)]">
            Access your dashboard, search workers, and manage requests from one
            place.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1">
            <label className="text-xs font-medium text-[color:var(--text)]" htmlFor="emailOrUsername">
              Email or username
            </label>
            <input
              id="emailOrUsername"
              type="text"
              value={emailOrUsername}
              onChange={(event) => setEmailOrUsername(event.target.value)}
              required
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)]/20"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-xs font-medium text-[color:var(--text)]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)]/20"
            />
          </div>

          {status ? (
            <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
              {status}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[color:var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[color:var(--surface)] px-2 text-[color:var(--muted)]">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-xs font-medium text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2 text-xs font-medium text-[color:var(--text)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          <p className="text-xs text-[color:var(--muted)]">
            Don’t have an account?{' '}
            <a href="/auth/register" className="text-[color:var(--accent)] hover:underline">
              Register now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
