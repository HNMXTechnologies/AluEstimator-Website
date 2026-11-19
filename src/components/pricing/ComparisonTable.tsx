"use client";

import { useState } from "react";
import { comparisonRows, plans } from "@/content/pricing";
import { cn, formatINR } from "@/lib/utils";

export function ComparisonTable() {
  const [mobilePlan, setMobilePlan] = useState(1);

  return (
    <>
      {/* Desktop / tablet */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface shadow-card md:block">
        <table className="w-full text-[15px]">
          <caption className="sr-only">Plan limits compared</caption>
          <thead>
            <tr className="border-b border-line bg-surface-2">
              <th scope="col" className="w-[34%] px-5 py-4 text-left font-medium text-muted">Limits</th>
              {plans.map((p) => (
                <th key={p.id} scope="col" className={cn("px-5 py-4 text-left", p.popular && "bg-accent-soft")}>
                  <span className="block font-display text-lg font-semibold text-ink">{p.name}</span>
                  <span className="block text-sm font-normal text-muted">{formatINR(p.monthly)}/month</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {comparisonRows.map((r) => (
              <tr key={r.label} className="hover:bg-surface-2/60">
                <th scope="row" className="px-5 py-3.5 text-left font-normal text-ink-soft">{r.label}</th>
                {r.values.map((v, i) => (
                  <td key={i} className={cn("px-5 py-3.5 tabular", plans[i].popular && "bg-accent-soft/40", v === "Unlimited" && "font-medium text-brand dark:text-accent")}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-5 py-3.5 text-left font-medium">All modules & features</th>
              {plans.map((p) => (
                <td key={p.id} className={cn("px-5 py-3.5 font-medium text-success", p.popular && "bg-accent-soft/40")}>Included</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Phone */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Choose a plan" className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-surface-2 p-1">
          {plans.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              type="button"
              id={`plan-tab-${p.id}`}
              aria-selected={mobilePlan === i}
              aria-controls="plan-panel"
              onClick={() => setMobilePlan(i)}
              className={cn(
                "min-h-11 rounded-lg text-sm font-semibold transition-colors",
                mobilePlan === i ? "bg-surface text-brand shadow-card dark:text-accent" : "text-muted",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <dl id="plan-panel" role="tabpanel" aria-labelledby={`plan-tab-${plans[mobilePlan].id}`} className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
          {comparisonRows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 px-4 py-3 text-[15px]">
              <dt className="text-ink-soft">{r.label}</dt>
              <dd className="text-right font-medium tabular">{r.values[mobilePlan]}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 px-4 py-3 text-[15px]">
            <dt className="font-medium">All modules & features</dt>
            <dd className="font-medium text-success">Included</dd>
          </div>
        </dl>
      </div>
    </>
  );
}
