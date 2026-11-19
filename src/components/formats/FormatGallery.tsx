"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Dialog } from "radix-ui";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { QuotePreview } from "@/components/visuals/QuotePreview";
import { formatFilters, quotationFormats, type FormatTag, type QuotationFormat } from "@/content/quotation-formats";
import { cn } from "@/lib/utils";

function Preview({ f, className, sizes }: { f: QuotationFormat; className?: string; sizes: string }) {
  if (f.image) {
    return (
      <Image
        src={f.image}
        alt={`${f.name} quotation format`}
        width={f.orientation === "landscape" ? 1188 : 840}
        height={f.orientation === "landscape" ? 840 : 1188}
        sizes={sizes}
        className={cn("h-auto w-full rounded-[3px] shadow-lift", className)}
      />
    );
  }
  return <QuotePreview id={f.id} name={f.name} landscape={f.orientation === "landscape"} className={className} />;
}

const tagLabel: Record<FormatTag, string> = {
  drawings: "Drawings",
  branded: "Branded",
  compact: "Compact",
  formal: "Formal",
};

export function FormatGallery() {
  const [filter, setFilter] = useState<"all" | FormatTag>("all");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const list = quotationFormats.filter((f) => filter === "all" || f.tags.includes(filter));
  const current = open == null ? null : list[open];

  const step = (d: number) => setOpen((i) => (i == null ? i : (i + d + list.length) % list.length));

  return (
    <div>
      <div role="group" aria-label="Filter formats" className="flex flex-wrap gap-2">
        {formatFilters.map((ft) => {
          const count = ft.id === "all" ? quotationFormats.length : quotationFormats.filter((f) => f.tags.includes(ft.id as FormatTag)).length;
          return (
            <button
              key={ft.id}
              type="button"
              aria-pressed={filter === ft.id}
              onClick={() => setFilter(ft.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                filter === ft.id
                  ? "border-brand bg-brand text-white dark:border-accent dark:bg-accent dark:text-[#06101f]"
                  : "border-line-strong bg-surface text-ink hover:border-accent",
              )}
            >
              {ft.label}
              <span className={cn("rounded-full px-1.5 text-xs", filter === ft.id ? "bg-white/20" : "bg-surface-2 text-muted")}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout={!reduce} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((f, i) => (
            <motion.li
              key={f.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative flex aspect-[4/3.6] items-center justify-center overflow-hidden bg-surface-2 bg-blueprint p-6"
                aria-label={`Enlarge ${f.name} preview`}
              >
                <div className={cn("transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]", f.orientation === "landscape" ? "w-[92%]" : "w-[62%]")}>
                  <Preview f={f} sizes="(min-width:1024px) 260px, (min-width:640px) 40vw, 70vw" />
                </div>
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-medium text-ink opacity-90 shadow-card transition-opacity group-hover:opacity-100">
                  <Maximize2 className="size-3.5" aria-hidden="true" /> Zoom
                </span>
              </button>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{f.name}</h3>
                  {f.orientation === "landscape" && <span className="dim-label shrink-0 rounded bg-surface-2 px-1.5 py-1 text-muted">Landscape</span>}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.description}</p>
                <p className="mt-3 text-sm text-ink-soft"><span className="font-medium">Good for:</span> {f.bestFor}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {f.tags.map((t) => (
                    <li key={t} className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-brand dark:text-accent">{tagLabel[t]}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Dialog.Root open={current != null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col outline-none"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
          >
            {current && (
              <>
                <div className="flex items-center gap-3 px-4 py-3 text-white sm:px-6">
                  <div className="min-w-0">
                    <Dialog.Title className="truncate font-display text-lg font-semibold">{current.name}</Dialog.Title>
                    <Dialog.Description className="truncate text-sm text-on-navy-muted">{current.description}</Dialog.Description>
                  </div>
                  <span className="ml-auto shrink-0 font-mono text-xs text-on-navy-muted">{(open ?? 0) + 1} / {list.length}</span>
                  <Dialog.Close className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close">
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.id}
                      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn("max-h-full", current.orientation === "landscape" ? "w-full max-w-4xl" : "h-full max-w-full")}
                      style={current.orientation === "landscape" ? undefined : { aspectRatio: "210 / 297" }}
                    >
                      <Preview f={current} sizes="90vw" className="max-h-full" />
                    </motion.div>
                  </AnimatePresence>
                  {list.length > 1 && (
                    <>
                      <button type="button" onClick={() => step(-1)} aria-label="Previous format" className="absolute left-2 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-navy shadow-lift hover:bg-white sm:left-6">
                        <ChevronLeft className="size-5" />
                      </button>
                      <button type="button" onClick={() => step(1)} aria-label="Next format" className="absolute right-2 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-navy shadow-lift hover:bg-white sm:right-6">
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
