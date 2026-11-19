"use client";

import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Building2, Check, Copy, Eye, EyeOff, Layers, Lock, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import { cn } from "@/lib/utils";

function useAppear() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: inView ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  });
  return { ref, item };
}

function Frame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-surface shadow-lift", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="ml-1 truncate text-xs font-medium text-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}

/* Estimator: template library */
const templates = [
  { series: "27mm", name: "2 Track", shutters: 2 as const, net: false, done: 100, used: 148 },
  { series: "27mm", name: "3 Track + Net", shutters: 3 as const, net: true, done: 100, used: 96 },
  { series: "Domal", name: "3 Shutter", shutters: 3 as const, net: false, done: 92, used: 41 },
  { series: "Mini Domal", name: "2 Track + Net", shutters: 2 as const, net: true, done: 75, used: 12 },
];

export function EstimatorVisual() {
  const { ref, item } = useAppear();
  return (
    <div ref={ref} role="img" aria-label="Window template library with live drawings, completeness and usage for each design">
      <Frame title="Window templates · 4 designs">
        <div className="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-5" aria-hidden="true">
          {templates.map((t, i) => (
            <motion.div key={t.name + t.series} {...item(i)} className="rounded-xl border border-line bg-bg p-2.5 sm:p-3">
              <div className="rounded-lg border border-line bg-surface bg-blueprint p-2">
                <WindowElevation width={60} height={44} shutters={t.shutters} net={t.net} idPrefix={`tpl${i}`} title="" />
              </div>
              <p className="mt-2 dim-label text-muted">{t.series}</p>
              <p className="truncate font-display text-sm font-semibold sm:text-[15px]">{t.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <span className={cn("block h-full", t.done === 100 ? "bg-success" : "bg-waste")} style={{ width: `${t.done}%` }} />
                </div>
                <span className="font-mono text-[10.5px] text-muted">{t.done}%</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
                <span>Used {t.used}×</span>
                <Copy className="size-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </Frame>
    </div>
  );
}

/* Inventory: stock table */
const stock = [
  { item: "27mm Outer frame · 12 ft", finish: "Mill", qty: 64, low: false },
  { item: "27mm Shutter · 12 ft", finish: "White RAL 9016", qty: 18, low: true },
  { item: "Domal Interlock · 15 ft", finish: "Black anodized", qty: 40, low: false },
  { item: "Roller kit (4 parts)", finish: "—", qty: 120, low: false },
];

export function StockVisual() {
  const { ref, item } = useAppear();
  return (
    <div ref={ref}>
      <Frame title="Pipe stock">
        <table className="w-full text-[13px]">
          <caption className="sr-only">Example stock list</caption>
          <thead className="bg-surface-2 text-left text-xs text-muted">
            <tr>
              <th scope="col" className="px-4 py-2 font-medium">Item</th>
              <th scope="col" className="hidden px-4 py-2 font-medium sm:table-cell">Finish</th>
              <th scope="col" className="px-4 py-2 text-right font-medium">In stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {stock.map((s, i) => (
              <motion.tr key={s.item} {...item(i)}>
                <td className="px-4 py-2.5">{s.item}</td>
                <td className="hidden px-4 py-2.5 text-muted sm:table-cell">{s.finish}</td>
                <td className="px-4 py-2.5 text-right tabular">
                  {s.low && <span className="mr-2 rounded bg-waste/15 px-1.5 py-0.5 text-[11px] font-medium text-[#8a4d10] dark:text-waste">Low</span>}
                  {s.qty}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Frame>
    </div>
  );
}

/* Billing: customer ledger */
const ledger = [
  { date: "02 Nov", ref: "INV/25-26/0142", type: "Invoice", debit: 84500, credit: 0 },
  { date: "05 Nov", ref: "UPI · advance", type: "Payment", debit: 0, credit: 40000 },
  { date: "18 Nov", ref: "INV/25-26/0157", type: "Invoice", debit: 26250, credit: 0 },
  { date: "21 Nov", ref: "Cheque 004512", type: "Payment", debit: 0, credit: 44500 },
];
const inr = (n: number) => (n ? `₹${new Intl.NumberFormat("en-IN").format(n)}` : "—");

export function LedgerVisual() {
  const { ref, item } = useAppear();
  const rows = ledger.map((r, i) => ({
    ...r,
    bal: ledger.slice(0, i + 1).reduce((s, x) => s + x.debit - x.credit, 0),
  }));
  const bal = rows[rows.length - 1].bal;
  return (
    <div ref={ref}>
      <Frame title="Customer ledger · Mehta Builders">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] text-[13px]">
            <caption className="sr-only">Example customer ledger</caption>
            <thead className="bg-surface-2 text-left text-xs text-muted">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">Date</th>
                <th scope="col" className="px-4 py-2 font-medium">Entry</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">Debit</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">Credit</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r, i) => (
                <motion.tr key={r.ref} {...item(i)}>
                  <td className="px-4 py-2.5 whitespace-nowrap text-muted">{r.date}</td>
                  <td className="px-4 py-2.5">
                    <span className={cn("mr-2 rounded px-1.5 py-0.5 text-[11px] font-medium", r.type === "Invoice" ? "bg-accent-soft text-brand dark:text-accent" : "bg-success/12 text-success")}>
                      {r.type}
                    </span>
                    <span className="font-mono text-[12px]">{r.ref}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right tabular">{inr(r.debit)}</td>
                  <td className="px-4 py-2.5 text-right tabular">{inr(r.credit)}</td>
                  <td className="px-4 py-2.5 text-right font-medium tabular">{inr(r.bal)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-line bg-surface-2 px-4 py-3 text-sm">
          <span className="text-muted">Outstanding</span>
          <span className="font-display text-lg font-semibold">{inr(bal)}</span>
        </div>
      </Frame>
    </div>
  );
}

/* Team: workspaces + role permissions */
const workspaces = [
  { name: "Shree Aluminium", city: "Ahmedabad", gstin: "24·····1Z5" },
  { name: "Shree Glass Studio", city: "Vadodara", gstin: "24·····2Z3" },
];
const perms = [
  { label: "Create estimates", on: true },
  { label: "Send quotations", on: true },
  { label: "See purchase rates", on: false },
  { label: "See margins & job profit", on: false },
];

export function TeamVisual() {
  const { ref, item } = useAppear();
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-[1fr_1.1fr]">
      <Frame title="Workspaces">
        <div className="grid gap-2 p-3">
          {workspaces.map((w, i) => (
            <motion.div key={w.name} {...item(i)} className="flex items-center gap-3 rounded-lg border border-line bg-bg p-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-navy text-on-navy"><Building2 className="size-4" aria-hidden="true" /></span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{w.name}</span>
                <span className="block text-xs text-muted">{w.city} · GSTIN {w.gstin}</span>
              </span>
            </motion.div>
          ))}
          <motion.div {...item(2)} className="flex items-center gap-2 rounded-lg border border-dashed border-accent/60 bg-accent-soft/50 p-3 text-xs font-medium text-brand dark:text-accent">
            <Layers className="size-4" aria-hidden="true" /> Combined view · read-only
          </motion.div>
        </div>
      </Frame>
      <Frame title="Role · Site measurer">
        <ul className="grid gap-1 p-3">
          {perms.map((p, i) => (
            <motion.li key={p.label} {...item(i + 1)} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm">
              <span className="flex items-center gap-2">
                {p.on ? <Eye className="size-4 text-muted" aria-hidden="true" /> : <EyeOff className="size-4 text-muted" aria-hidden="true" />}
                {p.label}
              </span>
              <span className={cn("relative h-5 w-9 shrink-0 rounded-full", p.on ? "bg-success" : "bg-line-strong")} aria-label={p.on ? "Allowed" : "Hidden"}>
                <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow", p.on ? "left-[18px]" : "left-0.5")} />
              </span>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-xs text-muted">
          <ShieldCheck className="size-4 text-success" aria-hidden="true" /> Two-factor sign-in
          <Lock className="ml-3 size-4" aria-hidden="true" /> Audit trail
        </div>
      </Frame>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-soft">
          <Check className="mt-1 size-4.5 shrink-0 text-success" aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  );
}
