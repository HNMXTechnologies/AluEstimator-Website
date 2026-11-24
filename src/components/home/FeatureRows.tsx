import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { featureRows } from "@/content/home";
import { cn } from "@/lib/utils";
import { ScreenPair, shots } from "@/components/shared/ScreenPair";
import { FormatFan, PartitionVisual } from "./FeatureVisuals";

type Row = (typeof featureRows)[keyof typeof featureRows];

function FeatureRow({ row, visual, flip, href, id }: { row: Row; visual: ReactNode; flip?: boolean; href: string; id: string }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(flip && "lg:order-2")}>
        <Eyebrow>{row.eyebrow}</Eyebrow>
        <h3 id={id} className="mt-3 text-[clamp(26px,3.6vw,38px)] leading-[1.1] font-semibold">{row.title}</h3>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{row.body}</p>
        <ul className="mt-6 grid gap-3">
          {row.points.map((p) => (
            <li key={p} className="flex gap-3 text-[15.5px] text-ink-soft">
              <Check className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <Link href={href} className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand hover:gap-2.5 dark:text-accent">
          Learn more<span className="sr-only"> about {row.eyebrow}</span> <ArrowRight className="size-4 transition-all" aria-hidden="true" />
        </Link>
      </Reveal>
      <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
        {visual}
      </Reveal>
    </div>
  );
}

export function FeatureRows() {
  return (
    <div className="grid gap-24 sm:gap-32">
      <FeatureRow id="f-engine" row={featureRows.engine} visual={<ScreenPair desktop={shots.cuttingList} phone={shots.mCuttingList} />} href="/features#estimator" />
      <FeatureRow id="f-formats" row={featureRows.formats} visual={<FormatFan />} flip href="/quotation-formats" />
      <FeatureRow id="f-partitions" row={featureRows.partitions} visual={<PartitionVisual />} href="/features#partitions" />
      <FeatureRow id="f-coating" row={featureRows.coating} visual={<ScreenPair desktop={shots.coating} phone={shots.mCoating} />} flip href="/features#inventory" />
    </div>
  );
}
