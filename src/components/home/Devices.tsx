import { Download, LayoutDashboard, LayoutGrid, FileText, Boxes, Users, Search } from "lucide-react";
import { WindowElevation } from "@/components/visuals/WindowElevation";

/** Placeholder app screens drawn with brand tokens — replace with real screenshots later. */

function Sidebar() {
  const items = [LayoutDashboard, LayoutGrid, FileText, Boxes, Users];
  return (
    <div className="flex w-9 flex-col items-center gap-2.5 bg-navy py-2.5">
      <span className="size-4 rounded bg-[#7ea6ff]" />
      {items.map((I, i) => (
        <I key={i} className={i === 0 ? "size-3.5 text-white" : "size-3.5 text-on-navy-muted"} />
      ))}
    </div>
  );
}

function DashboardScreen() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 88, 70, 92, 80, 96];
  return (
    <div className="flex h-full bg-bg text-[8px]">
      <Sidebar />
      <div className="flex-1 p-2.5">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-display text-[10px] font-semibold">Dashboard</span>
          <span className="ml-auto flex items-center gap-1 rounded border border-line bg-surface px-1.5 py-0.5 text-muted"><Search className="size-2.5" /> Search</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[["Sales", "₹8,42,500"], ["Quotations", "38"], ["Unpaid", "₹1,12,400"], ["Customers", "214"]].map(([k, v]) => (
            <div key={k} className="rounded border border-line bg-surface p-1.5">
              <p className="text-muted">{k}</p>
              <p className="font-display text-[10px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-[2fr_1fr] gap-1.5">
          <div className="rounded border border-line bg-surface p-1.5">
            <p className="mb-1 text-muted">Sales trend</p>
            <div className="flex h-16 items-end gap-[3px]">
              {bars.map((b, i) => <span key={i} className="flex-1 rounded-t-[1px] bg-accent" style={{ height: `${b}%`, opacity: 0.5 + i / 24 }} />)}
            </div>
          </div>
          <div className="rounded border border-line bg-surface p-1.5">
            <p className="mb-1 text-muted">Top customers</p>
            {["Mehta Builders", "Shah Interiors", "Patel Homes", "Desai Infra"].map((c, i) => (
              <div key={c} className="flex justify-between border-t border-line py-0.5 first:border-0"><span>{c}</span><span className="text-muted">{4 - i}</span></div>
            ))}
          </div>
        </div>
        <div className="mt-1.5 rounded border border-line bg-surface p-1.5">
          <p className="mb-1 text-muted">Setup progress</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-2"><span className="block h-full w-4/5 bg-success" /></div>
        </div>
      </div>
    </div>
  );
}

function BuilderScreen() {
  return (
    <div className="flex h-full bg-bg text-[8px]">
      <Sidebar />
      <div className="grid flex-1 grid-cols-[1fr_1.1fr] gap-2 p-2.5">
        <div>
          <p className="font-display text-[10px] font-semibold">27mm · 3 Track + Net</p>
          <div className="mt-1.5 flex gap-1">
            {["Profiles", "Glass", "Accessories", "Locks"].map((t, i) => (
              <span key={t} className={i === 0 ? "rounded bg-brand px-1 py-0.5 text-white" : "rounded bg-surface-2 px-1 py-0.5 text-muted"}>{t}</span>
            ))}
          </div>
          <div className="mt-1.5 grid gap-1">
            {[["Outer frame top", "W"], ["Outer frame side", "H"], ["Shutter top", "w/2 − 0.5"], ["Shutter interlock", "h − 2"], ["Net shutter top", "w/2 − 0.5"]].map(([p, f]) => (
              <div key={p} className="flex items-center justify-between rounded border border-line bg-surface px-1.5 py-1">
                <span>{p}</span><span className="rounded bg-accent-soft px-1 font-mono text-brand dark:text-accent">{f}</span>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-success"><span className="size-1.5 rounded-full bg-success" /> Design 92% complete</div>
        </div>
        <div className="flex items-center rounded border border-line bg-surface bg-blueprint p-2">
          <WindowElevation width={60} height={48} shutters={2} net idPrefix="dev-tab" title="" />
        </div>
      </div>
    </div>
  );
}

function PhoneScreen() {
  const cuts = [["Outer frame", "1524", "2"], ["Outer frame", "1219", "2"], ["Shutter top", "787", "4"], ["Shutter side", "1168", "4"]];
  return (
    <div className="flex h-full flex-col bg-bg text-[8px]">
      <div className="bg-navy px-2.5 pt-4 pb-2 text-on-navy">
        <p className="text-on-navy-muted">Mehta bungalow</p>
        <p className="font-display text-[11px] font-semibold">Cutting list</p>
      </div>
      <div className="grid gap-1 p-2">
        <div className="grid grid-cols-2 gap-1">
          <div className="rounded border border-line bg-surface p-1.5"><p className="text-muted">Pipes</p><p className="font-display text-[11px] font-semibold">4 × 12 ft</p></div>
          <div className="rounded border border-line bg-surface p-1.5"><p className="text-muted">Waste</p><p className="font-display text-[11px] font-semibold">9.0%</p></div>
        </div>
        {[[42, 42], [33, 33, 32], [22, 22, 22, 22]].map((p, i) => (
          <div key={i} className="flex h-3 gap-[1px] rounded-sm bg-brushed p-[1px]">
            {p.map((c, j) => <span key={j} className="rounded-[1px] bg-accent" style={{ width: `${c}%` }} />)}
            <span className="flex-1 bg-hatch" />
          </div>
        ))}
        {cuts.map(([n, l, q]) => (
          <div key={n + l} className="flex justify-between rounded border border-line bg-surface px-1.5 py-1"><span>{n}</span><span className="font-mono">{l} × {q}</span></div>
        ))}
        <span className="mt-1 rounded bg-whatsapp py-1 text-center font-semibold text-white">Share on WhatsApp</span>
      </div>
    </div>
  );
}

export function Devices() {
  return (
    <div className="relative mx-auto max-w-5xl" aria-label="AluEstimator on a laptop, tablet and phone (illustrative screens)" role="img">
      {/* laptop */}
      <div className="relative mx-auto w-[88%] sm:w-[72%]">
        <div className="rounded-t-xl border-[6px] border-b-0 border-[#1d2635] bg-[#1d2635] shadow-lift">
          <div className="aspect-[16/10] overflow-hidden rounded-t-[4px]">
            <DashboardScreen />
          </div>
        </div>
        <div className="relative -mx-[7%] h-3 rounded-b-xl bg-gradient-to-b from-[#c9d2de] to-[#9aa7b8]">
          <span className="absolute top-0 left-1/2 h-1 w-[14%] -translate-x-1/2 rounded-b bg-[#8592a5]" />
        </div>
      </div>
      {/* tablet */}
      <div className="absolute -bottom-6 -left-1 w-[44%] sm:-left-2 sm:w-[34%]">
        <div className="rounded-xl border-[5px] border-[#1d2635] bg-[#1d2635] shadow-lift">
          <div className="aspect-[4/3] overflow-hidden rounded-[5px]"><BuilderScreen /></div>
        </div>
      </div>
      {/* phone */}
      <div className="absolute -right-1 -bottom-10 w-[26%] sm:right-0 sm:w-[17%]">
        <div className="rounded-[18px] border-[4px] border-[#1d2635] bg-[#1d2635] shadow-lift">
          <div className="aspect-[9/19] overflow-hidden rounded-[14px]"><PhoneScreen /></div>
        </div>
      </div>
    </div>
  );
}

export function InstallBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium shadow-card">
      <Download className="size-4 text-brand dark:text-accent" aria-hidden="true" /> Install app — no app store needed
    </span>
  );
}
