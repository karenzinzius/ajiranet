"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"worker" | "employer">("worker");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "employer" || roleParam === "worker") {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (email !== confirmEmail) {
      setStatus("Emails do not match.");
      return;
    }
    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, username },
      },
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Registration successful! Check your email to confirm your account.");
      setTimeout(() => router.push("/auth/login"), 2000);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)]">
      <div className="mx-auto max-w-md space-y-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Create account
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-[color:var(--text)]">
            Join the marketplace
          </h1>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
            Register as a {role} and start connecting with trusted partners.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-[0_35px_80px_-40px_rgba(0,0,0,0.72)]">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[color:var(--text)]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 block w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] placeholder-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[color:var(--text)]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] placeholder-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-[color:var(--text)]">
                Confirm email address
              </label>
              <input
                id="confirmEmail"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] placeholder-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none"
                placeholder="Confirm your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[color:var(--text)]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] placeholder-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[color:var(--text)]">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)] placeholder-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[color:var(--text)]">I am a</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("worker")}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    role === "worker"
                      ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-slate-950"
                      : "border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"
                  }`}
                >
                  Worker
                </button>
                <button
                  type="button"
                  onClick={() => setRole("employer")}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    role === "employer"
                      ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-slate-950"
                      : "border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] hover:border-[color:var(--accent)]"
                  }`}
                >
                  Employer
                </button>
              </div>
            </div>
          </div>

          {status && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600">
              {status}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--accent-strong)] disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-[color:var(--muted)]">
            Already have an account?{" "}
            <a href="/auth/login" className="font-semibold text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]">
              Sign in
            </a>
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[color:var(--border)]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[color:var(--bg)] px-2 text-[color:var(--muted)]">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
            onClick={() => alert("Google sign-in coming soon")}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 text-sm font-medium text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
            onClick={() => alert("Apple sign-in coming soon")}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Apple
          </button>
        </div>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[color:var(--bg)] px-6 py-10 text-[color:var(--text)] flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}