"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register, ApiError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) return setError("Passwords do not match");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    setIsLoading(true);
    try {
      await register({ name, email, password });
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const field =
    "border-white/10 bg-black/30 pl-10 text-[#f3f0e8] placeholder:text-[#5c584f] focus-visible:border-[#e2b84f] focus-visible:ring-[#e2b84f]/25";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#08070a] p-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_360px_at_50%_28%,rgba(226,184,79,0.07),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md"
      >
        <Link href="/" className="mb-8 block text-center">
          <span className="font-desi text-gold text-4xl">namaste</span>
        </Link>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#f3f0e8]">Create your account</h1>
            <p className="mt-2 text-sm text-[#8f8b81]">Free — takes about a minute</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-300"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#cfc9bb]">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6b62]" />
                <Input id="name" placeholder="Your name" value={name}
                  onChange={(e) => setName(e.target.value)} required className={field} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#cfc9bb]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6b62]" />
                <Input id="email" type="email" placeholder="you@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required className={field} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#cfc9bb]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6b62]" />
                <Input id="password" type="password" placeholder="At least 8 characters" value={password}
                  onChange={(e) => setPassword(e.target.value)} required className={field} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-[#cfc9bb]">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6b62]" />
                <Input id="confirm" type="password" placeholder="Re-enter your password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required className={field} />
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="btn-gold w-full rounded-lg py-2.5 text-sm disabled:opacity-60 disabled:animate-none">
              {isLoading ? (
                <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</span>
              ) : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#8f8b81]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-gold hover:brightness-110">Sign in</Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-[#5c584f]">
          <Link href="/" className="transition-colors hover:text-[#8f8b81]">Back to home</Link>
        </p>
      </motion.div>
    </div>
  );
}
