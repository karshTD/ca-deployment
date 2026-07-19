"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08070a]">
      {/* subtle warm radial — replaces the old blue glow */}
      <div className="pointer-events-none absolute inset-0 hero-radial" />
      {/* faint vignette to keep the edges quiet */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,transparent_55%,#050406_100%)]" />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.12, delayChildren: 0.05 }}
        >
          {/* Signature: the desi hero word */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-desi text-gold text-5xl sm:text-6xl md:text-7xl leading-none mb-6 select-none"
          >
            namaste
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-4xl font-bold tracking-tight text-[#f3f0e8] sm:text-5xl md:text-6xl leading-[1.05]"
          >
            Protect Yourself from
            <br />
            <span className="text-gold-grad">Hidden Loan Risks</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-md text-base sm:text-lg text-[#8f8b81] leading-relaxed"
          >
            Upload your loan contract, add your financial details, and get a
            personalized, plain-English risk report before you sign.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <Link
              href="/dashboard"
              className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base"
            >
              Analyze Your Contract
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/how-it-works"
              className="group inline-flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.22em] text-[#6f6b62] transition-colors hover:text-[#b8b3a7]"
            >
              How it works
              <ChevronDown className="h-4 w-4 animate-bounce [animation-duration:2.4s] opacity-70" />
            </Link>
          </motion.div>
        </motion.div>

        {/* whisper-quiet brand mark, bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="text-[11px] tracking-wide text-[#4c4941]">
            Built for Indian borrowers
          </span>
        </div>
      </section>
    </main>
  );
}
