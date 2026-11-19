"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import Link from "next/link";
import { plans, pricingNotes } from "@/content/pricing";
import { cn, formatINR } from "@/lib/utils";

export function PricingCards() {
  const [yearly, setYearly] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div role="radiogroup" aria-label="Billing period" className="relative inline-grid grid-cols-2 rounded-full border border-line bg-surface p-1 shadow-card">
          {[
            { v: false, label: "Monthly" },
            { v: true, label: "Yearly" },
          ].map((o) => (
            <button
              key={o.label}
              role="radio"
              aria-checked={yearly === o.v}
              type="button"
              onClick={() => setYearly(o.v)}
              className={cn(
                "relative z-10 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors sm:px-5",
                yearly === o.v ? "text-white dark:text-[#06101f]" : "text-muted hover:text-ink",
              )}
            >
              {yearly === o.v && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {o.label}
              {o.v && (
                <span className={cn("rounded-full px-2 py-0.5 text-[11px]", yearly ? "bg-white/20" : "bg-success/12 text-success")}>
                  {pricingNotes.yearlyBadge}
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">{pricingNotes.yearlyExplainer}</p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-4 lg:items-stretch lg:gap-5">
        {plans.map((p) => {
          const price = yearly ? p.yearly : p.monthly;
          return (
            <div
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-surface p-6 shadow-card md:p-5 lg:p-6",
                p.popular ? "border-brand ring-4 ring-accent-soft lg:-my-3 lg:py-9 dark:border-accent" : "border-line",
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white dark:text-[#06101f]">Most popular</span>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 min-h-10 text-sm text-muted">{p.bestFor}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="relative inline-block overflow-hidden font-display text-[44px] leading-none font-semibold tabular md:text-[36px] lg:text-[44px]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={price}
                      className="inline-block"
                      initial={reduce ? false : { y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    >
                      {formatINR(price)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-sm text-muted">/{yearly ? "year" : "month"}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{pricingNotes.gstNote}</p>
              <ul className="mt-6 grid gap-2.5 text-[15px]">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4.5 shrink-0 text-success" aria-hidden="true" /> {h}
                  </li>
                ))}
                <li className="flex gap-2.5 font-medium">
                  <Check className="mt-0.5 size-4.5 shrink-0 text-success" aria-hidden="true" /> Every module and feature
                </li>
              </ul>
              <div className="mt-auto pt-8">
                <Link href={`/contact?plan=${p.id}`} className={buttonClass(p.popular ? "primary" : "secondary", "lg", "w-full")}>
                  Book a free demo
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
