"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Read every clause",
    body: "Your PDF is parsed and split into individual clauses — nothing is skimmed or summarized away.",
  },
  {
    n: "02",
    title: "Match against real complaints",
    body: "Each clause is compared against tens of thousands of real consumer complaints to surface language that has hurt borrowers before.",
  },
  {
    n: "03",
    title: "Check it against your numbers",
    body: "Your income, EMI, and credit score feed an affordability check, so the risk is judged for you — not for an average borrower.",
  },
  {
    n: "04",
    title: "Get a plain-English report",
    body: "A clear report tells you what's dangerous, what to negotiate, and what your rights are under Indian lending rules.",
  },
];

const compare = [
  {
    label: "A generic chatbot",
    items: ["No complaint grounding", "Same answer for everyone", "No Indian loan focus"],
    good: false,
  },
  {
    label: "Contract Analyzer",
    items: ["Grounded in real complaints", "Tailored to your income & EMI", "Built for Indian loan types"],
    good: true,
  },
  {
    label: "A lawyer",
    items: ["Expensive", "Days to get a report", "Not available at 2am"],
    good: false,
  },
];

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-screen bg-[#08070a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_320px_at_50%_0%,rgba(226,184,79,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8f8b81] transition-colors hover:text-[#e2b84f]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 mb-16"
        >
          <p className="font-desi text-gold text-3xl mb-3">how it works</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f0e8]">
            Four steps, in about fifteen seconds
          </h1>
          <p className="mt-4 max-w-xl text-[#8f8b81] leading-relaxed">
            No legalese, no guesswork. Here's exactly what happens after you
            upload a contract.
          </p>
        </motion.header>

        {/* Steps — a genuine sequence, so numbering earns its place */}
        <ol className="relative space-y-10 border-l border-[#241f16] pl-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#3a3020] bg-[#0f0e12] text-[10px] font-semibold text-[#e2b84f]">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-[#f3f0e8]">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#8f8b81]">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="rule-gold my-16" />

        {/* Why not a chatbot */}
        <h2 className="text-2xl font-bold text-[#f3f0e8]">
          Why not just ask a chatbot?
        </h2>
        <p className="mt-3 text-sm text-[#8f8b81] max-w-xl leading-relaxed">
          A general chatbot can say a clause "looks risky." We tell you it matches
          real complaints where borrowers were actually harmed — and what it means
          for your budget.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {compare.map((col) => (
            <div
              key={col.label}
              className={`rounded-2xl border p-5 ${
                col.good
                  ? "border-[#e2b84f]/30 bg-gradient-to-b from-[#e2b84f]/[0.06] to-transparent"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <p
                className={`mb-4 text-sm font-semibold ${
                  col.good ? "text-gold" : "text-[#8f8b81]"
                }`}
              >
                {col.label}
              </p>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs">
                    <span
                      className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        col.good
                          ? "bg-[#e2b84f]/20 text-[#e2b84f]"
                          : "bg-white/5 text-[#6f6b62]"
                      }`}
                    >
                      {col.good ? "✓" : "—"}
                    </span>
                    <span className={col.good ? "text-[#cfc9bb]" : "text-[#6f6b62]"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/dashboard"
            className="btn-gold group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base"
          >
            Analyze Your Contract
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
