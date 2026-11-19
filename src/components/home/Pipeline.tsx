"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { BookOpenCheck, Calculator, FileText, IndianRupee, Receipt, Ruler, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { pipeline } from "@/content/home";
import { cn } from "@/lib/utils";

const ICONS: Record<(typeof pipeline.stages)[number]["key"], LucideIcon> = {
  measure: Ruler,
  estimate: Calculator,
  quotation: FileText,
  invoice: Receipt,
  payment: IndianRupee,
  ledger: BookOpenCheck,
};

export function Pipeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = pipeline.stages.length;

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 1400);
    return () => clearInterval(id);
  }, [inView, reduce, n]);

  const ActiveIcon = ICONS[pipeline.stages[active].key];

  return (
    <ol ref={ref} className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
      {/* rail (desktop) */}
      <div className="absolute top-8 right-[8.33%] left-[8.33%] hidden h-0.5 bg-white/15 lg:block" aria-hidden="true">
        <motion.div
          className="h-full origin-left bg-[#7ea6ff]"
          animate={{ scaleX: reduce ? 1 : active / (n - 1) }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {pipeline.stages.map((s, i) => {
        const Icon = ICONS[s.key];
        const isActive = i === active;
        const passed = i <= active;
        return (
          <li key={s.key} className="relative flex flex-col items-center rounded-xl border border-white/10 bg-white/[.03] p-4 text-center lg:border-0 lg:bg-transparent lg:p-0">
            <div className="relative flex size-16 items-center justify-center">
              <span
                className={cn(
                  "flex size-16 items-center justify-center rounded-2xl border transition-colors duration-500",
                  passed ? "border-[#7ea6ff]/60 bg-[#1e3a78] text-white" : "border-white/15 bg-navy text-on-navy-muted",
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              {/* travelling document */}
              {isActive && !reduce && (
                <motion.span
                  layoutId="pipeline-doc"
                  className="absolute -top-3 -right-3 flex size-8 items-center justify-center rounded-lg bg-white text-brand shadow-lift"
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  aria-hidden="true"
                >
                  <AnimatePresence mode="wait">
                    <motion.span key={active} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                      <ActiveIcon className="size-4" />
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              )}
            </div>
            <p className="mt-3 font-display text-lg font-semibold text-white">{s.label}</p>
            <p className="mt-1 text-[13.5px] text-on-navy-muted">{s.note}</p>
          </li>
        );
      })}
    </ol>
  );
}
