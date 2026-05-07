"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"worker" | "employer">("worker");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "employer" || roleParam === "worker") setRole(roleParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, full_name: fullName },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Redirect straight to dashboard — Supabase trigger creates the profile row
    if (role === "employer") {
      router.push("/employer/dashboard");
    } else {
      router.push("/worker/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)]">
      <div className="mx-auto max-w-md space-y-8">

        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">Create account</p>
          <h1 className="mt-4 text-3xl font-semibold text-[color:var(--text)]">Join AjiraNet</h1>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Registering as a <span className="font-semibold text-[color:var(--accent)]">{role}</span>
          </p>
        </div>

        {/* Role picker */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("worker")}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${role === "worker" ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-slate-950" : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)]"}`}
          >
            I am a Worker
          </button>
          <button
            type="button"
            onClick={() => setRole("employer")}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${role === "employer" ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-slate-950" : "border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)]"}`}
          >
            I am an Employer
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="e.g. Juma Hassan"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
            />
          </div>

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
            <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min. 8 characters"
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Repeat password"
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
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="text-center text-xs text-[color:var(--muted)]">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-[color:var(--accent)] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[color:var(--bg)] flex items-center justify-center text-sm text-[color:var(--muted)]">Loading…</div>}>
      <RegisterForm />
    </Suspense>
  );
}
