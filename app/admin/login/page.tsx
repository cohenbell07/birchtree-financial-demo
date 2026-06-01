"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-paper px-4 py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
        }}
      />
      <Reveal>
        <div className="relative w-full max-w-md rounded-2xl border border-midnight/10 bg-white p-8 shadow-[0_18px_40px_rgba(11,26,44,0.09)]">
          <div className="mb-7 flex flex-col items-center text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
              <Lock className="h-[22px] w-[22px] text-gold-dark" strokeWidth={1.6} />
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-midnight">
              Admin Access
            </h1>
            <div
              className="mt-4 h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
              }}
            />
            <p className="mt-4 text-sm text-midnight/60">
              Enter your password to manage blog posts
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-midnight/80"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-midnight placeholder-midnight/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Enter admin email"
                required
                autoFocus
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-midnight/80"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-midnight/15 bg-white px-4 py-3 text-midnight placeholder-midnight/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)] disabled:opacity-60 disabled:shadow-none"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
