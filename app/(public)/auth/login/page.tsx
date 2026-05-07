"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const { getUserRole, getRoleRedirectPath } = await import("@/lib/auth");
    const role = await getUserRole();
    router.push(getRoleRedirectPath(role));
  };

  return (
    <main className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)]">
      <div className="mx-auto max-w-md space-y-8">

        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Welcome back</p>
          <h1 className="mt-4 text-3xl font-semibold text-[color:var(--text)]">Sign in to AjiraNet</h1>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Access your dashboard and manage your work.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-[color:var(--accent)] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[color:var(--accent)] py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[color:var(--accent)]/20"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-xs text-[color:var(--muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-[color:var(--accent)] hover:underline">
              Create one
            </Link>
          </p>
        </form>

      </div>
    </main>
  );
}
