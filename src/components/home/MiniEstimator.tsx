"use client";

import { FlaskConical, RotateCcw } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { CuttingLegend, CuttingPlanBars } from "@/components/visuals/CuttingPlan";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import {
  DEFAULTS,
  MAX_IN,
  MIN_IN,
  UNITS,
  buildParts,
  formatInput,
  formatLength,
  parseLength,
  planCuts,
  sqft,
  type Unit,
  type WindowType,
} from "@/lib/demo-estimator";
import { cn } from "@/lib/utils";

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">{label}</legend>
      <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-lg border border-line bg-surface-2 p-1">
        {options.map((o) => (
          <label
            key={o.id}
            className={cn(
              "relative flex min-h-10 cursor-pointer items-center justify-center rounded-md px-2 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent",
              value === o.id ? "bg-surface text-brand shadow-card dark:text-accent" : "text-muted hover:text-ink",
            )}
          >
            <input
              type="radio"
              className="sr-only"
              name={label}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function LengthField({
  label,
  value,
  unit,
  error,
  onChange,
}: {
  label: string;
  value: string;
  unit: Unit;
  error?: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  const unitLabel = unit === "dora" ? "in (dora)" : UNITS.find((u) => u.id === unit)!.label;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <div
        className={cn(
          "flex items-center rounded-lg border bg-surface focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25",
          error ? "border-[#c0392b]" : "border-line-strong",
        )}
      >
        <input
          id={id}
          inputMode={unit === "dora" || unit === "in" ? "text" : "decimal"}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className="min-h-12 w-full min-w-0 bg-transparent px-3 font-mono text-lg tabular text-ink outline-none"
        />
        <span className="pr-3 font-mono text-xs whitespace-nowrap text-muted">{unitLabel}</span>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-[#c0392b] dark:text-[#ff8a7a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function MiniEstimator() {
  const [unit, setUnit] = useState<Unit>("in");
  const [type, setType] = useState<WindowType>(DEFAULTS.type);
  const [w, setW] = useState(DEFAULTS.widthIn);
  const [h, setH] = useState(DEFAULTS.heightIn);
  const [wText, setWText] = useState(formatInput(DEFAULTS.widthIn, "in"));
  const [hText, setHText] = useState(formatInput(DEFAULTS.heightIn, "in"));
  const [wErr, setWErr] = useState<string>();
  const [hErr, setHErr] = useState<string>();

  const range = `${formatLength(MIN_IN, unit)} – ${formatLength(MAX_IN, unit)}`;

  function update(text: string, setText: (s: string) => void, setVal: (n: number) => void, setErr: (e?: string) => void) {
    setText(text);
    const v = parseLength(text, unit);
    if (v == null) return setErr(unit === "dora" ? "Type inches and fractions, e.g. 48 3/8" : "Enter a number");
    if (v < MIN_IN || v > MAX_IN) return setErr(`Demo range: ${range}`);
    setErr(undefined);
    setVal(v);
  }

  function changeUnit(u: Unit) {
    setUnit(u);
    setWText(formatInput(w, u));
    setHText(formatInput(h, u));
    setWErr(undefined);
    setHErr(undefined);
  }

  function reset() {
    setType(DEFAULTS.type);
    setW(DEFAULTS.widthIn);
    setH(DEFAULTS.heightIn);
    setWText(formatInput(DEFAULTS.widthIn, unit));
    setHText(formatInput(DEFAULTS.heightIn, unit));
    setWErr(undefined);
    setHErr(undefined);
  }

  const parts = useMemo(() => buildParts(w, h, type), [w, h, type]);
  const plan = useMemo(() => planCuts(parts), [parts]);
  const glass = parts.find((p) => p.kind === "glass")!;
  const kinds = type === "3-track" ? (["frame", "shutter", "net"] as const) : (["frame", "shutter"] as const);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-waste/15 px-2.5 py-0.5 text-xs font-semibold text-[#8a4d10] dark:text-waste">
          <FlaskConical className="size-3.5" aria-hidden="true" /> Demo — simplified formulas
        </span>
        <button
          type="button"
          onClick={reset}
          className="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted hover:text-ink"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" /> Reset
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Inputs + drawing */}
        <div className="grid content-start gap-5 border-b border-line p-5 sm:p-6 lg:border-r lg:border-b-0">
          <Segmented
            label="Window type"
            value={type}
            onChange={setType}
            options={[
              { id: "2-track", label: "2 Track" },
              { id: "3-track", label: "3 Track + net" },
            ]}
          />
          <Segmented label="Unit" value={unit} onChange={changeUnit} options={UNITS} />
          <div className="grid grid-cols-2 gap-3">
            <LengthField label="Width" value={wText} unit={unit} error={wErr} onChange={(t) => update(t, setWText, setW, setWErr)} />
            <LengthField label="Height" value={hText} unit={unit} error={hErr} onChange={(t) => update(t, setHText, setH, setHErr)} />
          </div>
          <div className="mx-auto w-full max-w-md rounded-xl border border-line bg-blueprint p-3 lg:max-w-none">
            <WindowElevation
              width={w}
              height={h}
              shutters={2}
              net={type === "3-track"}
              widthLabel={formatLength(w, unit)}
              heightLabel={formatLength(h, unit)}
              idPrefix="mini"
              title={`Drawing of a ${type === "3-track" ? "3 track" : "2 track"} window, ${formatLength(w, unit)} by ${formatLength(h, unit)}`}
            />
          </div>
          <p className="text-xs text-muted">
            Area {sqft(w, h).toFixed(2)} sq ft · Glass {glass.qty} pcs, {formatLength(glass.size!.w, unit)} × {formatLength(glass.size!.h, unit)}
          </p>
        </div>

        {/* Outputs */}
        <div className="grid content-start gap-6 p-5 sm:p-6" aria-live="polite">
          <div className="grid grid-cols-3 gap-3">
            {[
              { k: "Pipes used", v: `${plan.pipes.length}`, s: "× 12 ft" },
              { k: "Waste", v: `${plan.wastePct.toFixed(1)}%`, s: formatLength(plan.waste, unit) },
              { k: "Pieces", v: `${plan.pipes.reduce((n, p) => n + p.cuts.length, 0)}`, s: `${formatLength(plan.totalCutLength, unit)} total` },
            ].map((m) => (
              <div key={m.k} className="rounded-xl border border-line bg-surface-2 p-3">
                <p className="text-xs text-muted">{m.k}</p>
                <p className="mt-1 font-display text-[clamp(20px,3vw,28px)] leading-none font-semibold tabular">{m.v}</p>
                <p className="mt-1 truncate font-mono text-[11px] text-muted">{m.s}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-base font-semibold">Cutting plan · 12 ft pipes</h3>
              <CuttingLegend kinds={[...kinds]} />
            </div>
            <CuttingPlanBars plan={plan} unit={unit} />
          </div>

          <div>
            <h3 className="mb-2 font-display text-base font-semibold">Part list</h3>
            <div className="overflow-hidden rounded-lg border border-line">
              <table className="w-full text-sm">
                <thead className="bg-surface-2 text-left text-xs text-muted">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-medium">Part</th>
                    <th scope="col" className="px-3 py-2 text-right font-medium">Qty</th>
                    <th scope="col" className="px-3 py-2 text-right font-medium">Cut length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {parts.map((p) => (
                    <tr key={p.id}>
                      <td className="px-3 py-2">{p.name}</td>
                      <td className="px-3 py-2 text-right tabular">{p.qty}</td>
                      <td className="px-3 py-2 text-right font-mono text-[13px] whitespace-nowrap tabular">
                        {p.length != null
                          ? formatLength(p.length, unit)
                          : `${formatLength(p.size!.w, unit)} × ${formatLength(p.size!.h, unit)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-muted">
              Saw allowance 1/8″ per cut. In AluEstimator you set your own formulas, profiles and stock lengths for every design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
