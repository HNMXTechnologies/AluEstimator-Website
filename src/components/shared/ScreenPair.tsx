import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export type Shot = { src: string; width: number; height: number; alt: string };

/** Real screenshot captured from the AluEstimator app (see README → Screenshots). */
export const shots = {
  templates: { src: "/screens/templates.webp", width: 2000, height: 866, alt: "Window template library in AluEstimator with live drawings of each design" },
  windowGroup: { src: "/screens/window-group.webp", width: 2200, height: 1008, alt: "Window sizes entered in a spreadsheet-like grid beside the window drawing" },
  partition: { src: "/screens/partition.webp", width: 2200, height: 1092, alt: "Partition configurator in AluEstimator with bays, panes, a fan and dimensions" },
  quotation: { src: "/screens/quotation.webp", width: 2200, height: 974, alt: "A GST quotation in AluEstimator with status, totals and line items" },
  coating: { src: "/screens/coating.webp", width: 2200, height: 705, alt: "Coating workflow in AluEstimator: requests sent, partially returned and completed" },
  appQuotations: { src: "/screens/app-quotations.webp", width: 2400, height: 1500, alt: "AluEstimator quotations screen on a laptop" },
  appWindowGroup: { src: "/screens/app-window-group.webp", width: 2400, height: 1500, alt: "AluEstimator window sizes screen on a tablet" },
  mTemplates: { src: "/screens/m-templates.webp", width: 1170, height: 2532, alt: "Window templates on a phone" },
  mWindowGroup: { src: "/screens/m-window-group.webp", width: 1170, height: 2532, alt: "Entering window sizes on a phone" },
  mPartition: { src: "/screens/m-partition.webp", width: 1170, height: 2532, alt: "Partition configurator on a phone" },
  mQuotations: { src: "/screens/m-quotations.webp", width: 1170, height: 2532, alt: "Quotations list on a phone" },
  mCoating: { src: "/screens/m-coating.webp", width: 1170, height: 2532, alt: "Coating workflow on a phone" },
} satisfies Record<string, Shot>;

export function BrowserShot({ shot, className, priority }: { shot: Shot; className?: string; priority?: boolean }) {
  return (
    <figure className={cn("overflow-hidden rounded-xl border border-line bg-surface shadow-lift", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-2" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#f87171]/70" />
        <span className="size-2.5 rounded-full bg-[#fbbf24]/70" />
        <span className="size-2.5 rounded-full bg-[#34d399]/70" />
        <span className="ml-3 h-4 flex-1 max-w-56 rounded bg-surface px-2 font-mono text-[10px] leading-4 text-muted">app.aluestimator.in</span>
      </div>
      <Image
        src={asset(shot.src)}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(min-width: 1024px) 620px, 100vw"
        className="block h-auto w-full"
        priority={priority}
      />
    </figure>
  );
}

export function PhoneShot({ shot, className }: { shot: Shot; className?: string }) {
  return (
    <figure className={cn("rounded-[26px] bg-gradient-to-b from-[#2a3446] to-[#161d2a] p-[5px] shadow-lift ring-1 ring-white/5", className)}>
      <div className="relative overflow-hidden rounded-[21px] bg-white">
        <span className="absolute top-1.5 left-1/2 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
        <Image
          src={asset(shot.src)}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(min-width: 1024px) 160px, 34vw"
          className="block aspect-[9/17] h-auto w-full object-cover object-top"
        />
      </div>
    </figure>
  );
}

/** Desktop crop in a browser frame, with the same feature on a phone overlapping the corner. */
export function ScreenPair({ desktop, phone, className }: { desktop: Shot; phone?: Shot; className?: string }) {
  return (
    <div className={cn("relative", phone && "pr-[16%] pb-10 sm:pr-[14%]", className)}>
      <BrowserShot shot={desktop} />
      {phone && <PhoneShot shot={phone} className="absolute right-0 bottom-0 w-[30%] max-w-[180px] sm:w-[26%]" />}
    </div>
  );
}
