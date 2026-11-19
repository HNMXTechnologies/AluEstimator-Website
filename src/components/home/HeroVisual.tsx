"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Move3d } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import { cn } from "@/lib/utils";

const Window3D = dynamic(() => import("@/components/visuals/Window3D"), { ssr: false });

function canUse3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 4) < 4) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors",
        active
          ? "border-brand bg-brand text-white dark:border-accent dark:bg-accent dark:text-[#06101f]"
          : "border-line-strong bg-surface/80 text-ink hover:border-accent",
      )}
    >
      {children}
    </button>
  );
}

/** Dimension line drawn around the visual (architect's W / H callouts). */
function DimLine({ orientation, label, delay }: { orientation: "h" | "v"; label: string; delay: number }) {
  const reduce = useReducedMotion();
  const draw = {
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] as const },
  };
  if (orientation === "h") {
    return (
      <div className="pointer-events-none absolute inset-x-[8%] -bottom-1 h-8 text-accent" aria-hidden="true">
        <svg className="size-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
          <motion.path d="M0 2V18M100 2V18M0 10H100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" {...draw} />
        </svg>
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.8 }}
          className="dim-label absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-bg px-2 text-accent"
        >
          {label}
        </motion.span>
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-y-[10%] -right-1 w-8 text-accent" aria-hidden="true">
      <svg className="size-full overflow-visible" viewBox="0 0 20 100" preserveAspectRatio="none">
        <motion.path d="M2 0H18M2 100H18M10 0V100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" {...draw} />
      </svg>
      <motion.span
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.8 }}
        className="dim-label absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 rounded bg-bg px-2 whitespace-nowrap text-accent"
      >
        {label}
      </motion.span>
    </div>
  );
}

export function HeroVisual() {
  const [shutters, setShutters] = useState<2 | 3>(2);
  const [net, setNet] = useState(false);
  const [enable3D, setEnable3D] = useState(false);
  const [ready3D, setReady3D] = useState(false);
  const coarse = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(pointer: coarse)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false,
  );

  useEffect(() => {
    if (!canUse3D()) return;
    // Load 3D after the page is idle so it never competes with first paint.
    const start = () => setEnable3D(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (document.readyState === "complete") {
      if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 2500 });
      else setTimeout(start, 1200);
    } else {
      const onLoad = () => (w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200));
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-[4/3.3] w-full max-w-[560px] pr-8 pb-8">
        {/* blueprint plate */}
        <div className="absolute inset-0 right-8 bottom-8 rounded-2xl border border-line bg-surface/60 shadow-card bg-blueprint" aria-hidden="true" />
        <div className="absolute inset-0 right-8 bottom-8">
          {/* SVG elevation: always rendered first (fast LCP, no-JS and low-end fallback) */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center p-[9%] transition-opacity duration-700",
              ready3D ? "opacity-0" : "opacity-100",
            )}
          >
            <WindowElevation width={60} height={48} shutters={shutters} net={net} idPrefix="hero" title="Aluminium sliding window, front elevation" />
          </div>
          {enable3D && (
            <div className={cn("absolute inset-0 transition-opacity duration-700", ready3D ? "opacity-100" : "opacity-0")}>
              <Window3D shutters={shutters} net={net} interactive={!coarse} onReady={() => setReady3D(true)} />
            </div>
          )}
          <span className="dim-label absolute top-3 left-3 rounded-sm bg-surface/85 px-2 py-1 text-muted">
            27mm series · {shutters} track{net ? " + net" : ""}
          </span>
          {ready3D && !coarse && (
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-surface/85 px-2.5 py-1 text-xs text-muted">
              <Move3d className="size-3.5" aria-hidden="true" /> Drag to rotate
            </span>
          )}
        </div>
        <DimLine orientation="h" label={`W 1524 mm`} delay={0.4} />
        <DimLine orientation="v" label={`H 1219 mm`} delay={0.7} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Window type">
        <Chip active={shutters === 2} onClick={() => setShutters(2)}>2 Track</Chip>
        <Chip active={shutters === 3} onClick={() => setShutters(3)}>3 Track</Chip>
        <Chip active={net} onClick={() => setNet((v) => !v)}>+ Mosquito net</Chip>
      </div>
    </div>
  );
}
