"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Mail, ArrowLeft, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { sendPasswordReset, authErrorMessage } from "@/lib/firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(trimmed);
      setSent(true);
    } catch (err) {
      // Don't reveal whether an account exists for this email
      if (err?.code === "auth/user-not-found") {
        setSent(true);
      } else {
        setError(authErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h1 className="mt-4 text-xl font-extrabold text-[#0F172A]">Check your inbox</h1>
              <p className="mt-2 text-sm text-[#64748B]">
                If an account exists for <strong className="text-[#0F172A]">{email.trim()}</strong>,
                we&apos;ve sent a link to reset your password.
              </p>
              <Link
                href="/auth/login"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] hover:underline"
              >
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-extrabold text-[#0F172A]">Reset your password</h1>
              <p className="mt-1 text-sm text-[#64748B]">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-semibold text-[#334155]">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-4 py-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-4 py-3 text-sm font-bold text-[#0F172A] hover:bg-[#F0AE00] disabled:opacity-60 transition-colors"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>

              <Link
                href="/auth/login"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#0F172A]"
              >
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
