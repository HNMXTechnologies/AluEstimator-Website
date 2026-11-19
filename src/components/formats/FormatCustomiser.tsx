"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useId, useState } from "react";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { id: "logo", label: "Logo & tagline" },
  { id: "drawings", label: "Window drawings" },
  { id: "hsn", label: "HSN codes" },
  { id: "tax", label: "Tax breakup" },
  { id: "words", label: "Amount in words" },
  { id: "bank", label: "Bank details" },
  { id: "terms", label: "Terms & conditions" },
  { id: "sign", label: "Signature & acceptance" },
] as const;

type Opt = (typeof OPTIONS)[number]["id"];

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: () => void }) {
  const id = useId();
  return (
    <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 hover:bg-surface-2">
      <span className="text-sm">{label}</span>
      <input id={id} type="checkbox" role="switch" checked={on} onChange={onChange} className="peer sr-only" />
      <span className={cn("relative h-6 w-10 shrink-0 rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent", on ? "bg-brand dark:bg-accent" : "bg-line-strong")} aria-hidden="true">
        <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-[left]", on ? "left-[18px]" : "left-0.5")} />
      </span>
    </label>
  );
}

function Block({ show, children }: { show: boolean; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={reduce ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduce ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const items = [
  { n: "W1", room: "Hall", size: "1524 × 1219 mm", amt: "₹14,220", net: false },
  { n: "W2", room: "Bedroom 1", size: "1220 × 1219 mm", amt: "₹11,560", net: true },
];

/** Illustrative: shows how quotation sections can be switched on and off. */
export function FormatCustomiser() {
  const [on, setOn] = useState<Record<Opt, boolean>>({
    logo: true, drawings: true, hsn: false, tax: true, words: true, bank: true, terms: false, sign: true,
  });
  const flip = (k: Opt) => setOn((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
      <fieldset className="h-fit rounded-2xl border border-line bg-surface p-2 shadow-card">
        <legend className="sr-only">Quotation sections</legend>
        {OPTIONS.map((o) => (
          <Toggle key={o.id} label={o.label} on={on[o.id]} onChange={() => flip(o.id)} />
        ))}
      </fieldset>

      {/* paper */}
      <div className="rounded-2xl border border-line bg-surface-2 bg-blueprint p-3 sm:p-6" aria-label="Quotation preview (illustrative)" role="img">
        <div className="mx-auto max-w-xl rounded-[4px] bg-white p-4 text-[12px] text-[#1f2937] shadow-lift sm:p-7 sm:text-[13px]" aria-hidden="true">
          <div className="flex items-start justify-between gap-4 border-b-2 border-[#1e40af] pb-3">
            <div className="flex items-center gap-2">
              <Block show={on.logo}>
                <span className="mr-1 flex size-9 items-center justify-center rounded-md bg-[#0f1f3d] text-[10px] font-bold text-white">SA</span>
              </Block>
              <div>
                <p className="font-display text-sm font-semibold sm:text-base">Shree Aluminium</p>
                <Block show={on.logo}><p className="text-[11px] text-[#64748b]">Windows · Doors · Partitions</p></Block>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#1e40af]">QUOTATION</p>
              <p className="font-mono text-[11px] text-[#64748b]">QT/25-26/0142</p>
            </div>
          </div>

          <p className="mt-3 text-[#475569]"><b className="text-[#1f2937]">Subject:</b> Aluminium windows for Mehta bungalow</p>

          <table className="mt-3 w-full">
            <thead>
              <tr className="border-b border-[#cbd5e1] text-left text-[11px] text-[#64748b]">
                <th className="py-1.5 font-medium">Item</th>
                {on.hsn && <th className="py-1.5 font-medium">HSN</th>}
                <th className="py-1.5 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.n} className="border-b border-[#e2e8f0] align-top">
                  <td className="py-2">
                    <div className="flex gap-3">
                      <Block show={on.drawings}>
                        <div className="w-14 sm:w-16"><WindowElevation width={60} height={48} net={it.net} idPrefix={`cust-${it.n}`} title="" /></div>
                      </Block>
                      <div>
                        <p className="font-medium">{it.n} · {it.room}</p>
                        <p className="text-[11px] text-[#64748b]">{it.size} · 2 Track{it.net ? " + net" : ""}</p>
                      </div>
                    </div>
                  </td>
                  {on.hsn && <td className="py-2 font-mono text-[11px]">7610</td>}
                  <td className="py-2 text-right tabular">{it.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 ml-auto w-full max-w-[220px] space-y-1 text-right">
            <p className="flex justify-between"><span className="text-[#64748b]">Subtotal</span><span className="tabular">₹25,780</span></p>
            <Block show={on.tax}>
              <p className="flex justify-between"><span className="text-[#64748b]">CGST 9%</span><span className="tabular">₹2,320</span></p>
              <p className="flex justify-between"><span className="text-[#64748b]">SGST 9%</span><span className="tabular">₹2,320</span></p>
            </Block>
            <p className="flex justify-between border-t border-[#1f2937] pt-1 font-semibold"><span>Total</span><span className="tabular">₹30,420</span></p>
          </div>
          <Block show={on.words}><p className="mt-2 text-[11px] text-[#475569] italic">Rupees Thirty Thousand Four Hundred Twenty Only</p></Block>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Block show={on.bank}>
              <div className="rounded border border-[#e2e8f0] p-2 text-[11px] text-[#475569]">
                <p className="font-semibold text-[#1f2937]">Bank details</p>
                <p>A/c name, bank, IFSC, UPI</p>
              </div>
            </Block>
            <Block show={on.terms}>
              <div className="rounded border border-[#e2e8f0] p-2 text-[11px] text-[#475569]">
                <p className="font-semibold text-[#1f2937]">Terms</p>
                <p>Validity, payment, delivery</p>
              </div>
            </Block>
          </div>
          <Block show={on.sign}>
            <div className="mt-4 flex items-end justify-between gap-4 text-[11px] text-[#64748b]">
              <div className="w-28 border-t border-[#94a3b8] pt-1">Customer acceptance</div>
              <div className="w-28 border-t border-[#94a3b8] pt-1 text-right">Authorised signatory</div>
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
}
