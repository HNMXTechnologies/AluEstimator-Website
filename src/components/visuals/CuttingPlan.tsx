"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { STOCK_LENGTH_IN, formatLength, type CuttingPlan as Plan, type PartKind, type Unit } from "@/lib/demo-estimator";
import { cn } from "@/lib/utils";

export const KIND_STYLE: Record<Exclude<PartKind, "glass">, { label: string; bg: string; swatch: string }> = {
  frame: { label: "Outer frame", bg: "bg-[var(--cut-4)] text-white dark:text-[#0a1220]", swatch: "bg-[var(--cut-4)]" },
  shutter: { label: "Shutter", bg: "bg-[var(--cut-1)] text-white dark:text-[#0a1220]", swatch: "bg-[var(--cut-1)]" },
  net: { label: "Net shutter", bg: "bg-[var(--cut-3)] text-[#0a1220]", swatch: "bg-[var(--cut-3)]" },
};

export function CuttingPlanBars({ plan, unit, className }: { plan: Plan; unit: Unit; className?: string }) {
  const reduce = useReducedMotion();
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 170, damping: 24 };

  return (
    <div className={cn("grid gap-2.5", className)}>
      <AnimatePresence initial={false}>
        {plan.pipes.map((pipe) => {
          const wasteStart = (pipe.used / STOCK_LENGTH_IN) * 100;
          return (
            <motion.div
              key={pipe.index}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-[52px_1fr] items-center gap-2"
            >
              <span className="font-mono text-[11px] text-muted">Pipe {pipe.index + 1}</span>
              <div
                className="relative h-9 overflow-hidden rounded-md border border-line-strong bg-brushed"
                role="img"
                aria-label={`Pipe ${pipe.index + 1}: ${pipe.cuts.map((c) => formatLength(c.length, unit)).join(", ")}; waste ${formatLength(STOCK_LENGTH_IN - pipe.used, unit)}`}
              >
                {/* waste */}
                <motion.div
                  className="absolute inset-y-0 right-0 bg-hatch"
                  initial={false}
                  animate={{ left: `${wasteStart}%` }}
                  transition={spring}
                />
                <AnimatePresence initial={false}>
                  {pipe.cuts.map((c, i) => {
                    const left = (c.offset / STOCK_LENGTH_IN) * 100;
                    const width = (c.length / STOCK_LENGTH_IN) * 100;
                    const style = KIND_STYLE[c.kind as keyof typeof KIND_STYLE];
                    return (
                      <motion.div
                        key={c.key}
                        className={cn(
                          "absolute inset-y-1 flex items-center justify-center overflow-hidden rounded-[3px] font-mono text-[10.5px] whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,.25)]",
                          style.bg,
                        )}
                        initial={reduce ? false : { left: "100%", width: `${width}%`, opacity: 0 }}
                        animate={{ left: `${left}%`, width: `${width}%`, opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ ...spring, delay: reduce ? 0 : i * 0.04 }}
                      >
                        {width > 13 ? formatLength(c.length, unit) : ""}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function CuttingLegend({ kinds }: { kinds: (keyof typeof KIND_STYLE)[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
      {kinds.map((k) => (
        <li key={k} className="inline-flex items-center gap-1.5">
          <span className={cn("size-3 rounded-sm", KIND_STYLE[k].swatch)} /> {KIND_STYLE[k].label}
        </li>
      ))}
      <li className="inline-flex items-center gap-1.5">
        <span className="size-3 rounded-sm bg-hatch" /> Waste / offcut
      </li>
    </ul>
  );
}
