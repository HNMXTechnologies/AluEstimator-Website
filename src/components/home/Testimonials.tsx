"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/content/social-proof";
import { cn } from "@/lib/utils";

export function Testimonials() {
  // SAMPLE — replace before launch (testimonials.isSample)
  const items = testimonials.items;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = (next: number) => {
    setDir(next > i || (i === items.length - 1 && next === 0) ? 1 : -1);
    setI((next + items.length) % items.length);
  };

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % items.length);
    }, 7000);
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  const t = items[i];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card sm:min-h-[260px] sm:p-10">
        <Quote className="absolute top-5 right-5 hidden size-12 text-accent-soft sm:block" aria-hidden="true" />
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={i}
            custom={dir}
            initial={reduce ? false : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <div className="flex gap-0.5 text-[#f2a91d]" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-4 fill-current" aria-hidden="true" />)}
            </div>
            <blockquote className="mt-4 font-display text-[clamp(19px,2.4vw,24px)] leading-snug font-medium text-ink">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-navy font-display text-sm font-semibold text-on-navy" aria-hidden="true">
                {t.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}, {t.firm}, {t.city}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button type="button" onClick={() => go(i - 1)} className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface hover:border-accent" aria-label="Previous testimonial">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-1">
          {items.map((it, k) => (
            <button
              key={it.name}
              type="button"
              onClick={() => go(k)}
              className="flex size-11 items-center justify-center"
              aria-label={`Show testimonial ${k + 1}`}
              aria-current={k === i}
            >
              <span className={cn("h-2 rounded-full transition-all", k === i ? "w-6 bg-brand dark:bg-accent" : "w-2 bg-line-strong")} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(i + 1)} className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface hover:border-accent" aria-label="Next testimonial">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
