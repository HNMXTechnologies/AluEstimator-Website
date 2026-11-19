"use client";

import { animate } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useEffect, useRef } from "react";
import { stats, type Stat } from "@/content/social-proof";
import { formatIndianNumber } from "@/lib/utils";

/**
 * The final number is in the HTML (no-JS, SEO, and never a "0+" flash).
 * If the strip starts below the fold it is reset to 0 and counts up once
 * it scrolls fully into view. Text is written to the DOM directly, so the
 * animation causes no React re-renders.
 */
function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const dp = stat.decimals ?? 0;
  const final = formatIndianNumber(stat.value, dp) + stat.suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already visible on load: keep the final value
    const write = (v: number) => (el.textContent = formatIndianNumber(v, dp) + stat.suffix);
    write(0);
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        stop = animate(0, stat.value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: write }).stop;
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
      write(stat.value);
    };
  }, [reduce, dp, stat.value, stat.suffix]);

  return (
    <span className="tabular">
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">{final}</span>
    </span>
  );
}

export function StatsStrip() {
  return (
    <section aria-label="AluEstimator in numbers" className="border-y border-line bg-surface">
      {/* SAMPLE — replace before launch (stats.isSample) */}
      <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.items.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-1 py-8 sm:py-10 ${i % 2 ? "pl-5 sm:pl-8" : "pr-5 sm:pr-8"} ${
              i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""
            } ${i % 2 ? "border-l border-line lg:border-l" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}
          >
            <dt className="order-2 text-sm text-muted">{s.label}</dt>
            <dd className="order-1 font-display text-[clamp(28px,4vw,40px)] leading-none font-semibold text-ink">
              <Counter stat={s} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
