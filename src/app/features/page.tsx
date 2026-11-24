import type { Metadata } from "next";
import { canonicalPath } from "@/content/site";
import type { ReactNode } from "react";
import { Cloud, Laptop, Moon, Search, ShieldCheck, Smartphone, Lock } from "lucide-react";
import { CheckList, LedgerVisual, TeamVisual } from "@/components/features/ModuleVisuals";
import { ScreenPair, shots } from "@/components/shared/ScreenPair";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { featureModules, platformQualities, type FeatureModule } from "@/content/features";

export const metadata: Metadata = {
  title: "Features — estimation, quotations, partitions, inventory & billing",
  description:
    "Every AluEstimator feature: window template builder, cutting plan, six GST quotation formats, partition configurator, coating & stock tracking, invoices, customer ledger and multi-branch workspaces.",
  alternates: { canonical: canonicalPath("/features") },
};

const visuals: Record<FeatureModule["id"], ReactNode> = {
  estimator: <ScreenPair desktop={shots.calculation} phone={shots.mCalculation} />,
  quotations: <ScreenPair desktop={shots.quotation} phone={shots.mQuotations} />,
  partitions: <ScreenPair desktop={shots.partition} phone={shots.mPartition} />,
  inventory: <ScreenPair desktop={shots.coating} phone={shots.mCoating} />,
  billing: <LedgerVisual />,
  team: <TeamVisual />,
};

const platformIcons = [Smartphone, Laptop, Moon, Search, ShieldCheck, Lock, Cloud];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything an aluminium workshop needs, in one app."
        sub="From the first site measurement to the final payment. Every plan includes every module below — plans differ only by volume."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg">Book a free demo</ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="lg">See pricing</ButtonLink>
        </div>
      </PageHero>

      {/* In-page module nav */}
      <nav aria-label="Feature modules" className="sticky top-16 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="container-x">
          <ul className="-mx-1 flex gap-1 overflow-x-auto py-2 [mask-image:linear-gradient(90deg,#000_88%,transparent)] [scrollbar-width:none] lg:[mask-image:none]">
            {featureModules.map((m) => (
              <li key={m.id} className="shrink-0">
                <a
                  href={`#${m.id}`}
                  className="inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {m.nav}
                </a>
              </li>
            ))}
            <li className="shrink-0">
              <a href="#platform" className="inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:bg-surface-2 hover:text-ink">
                Platform
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {featureModules.map((m, idx) => (
        <section
          key={m.id}
          id={m.id}
          aria-labelledby={`${m.id}-title`}
          className={`scroll-mt-32 py-20 sm:py-28 ${idx % 2 ? "border-y border-line bg-surface" : ""}`}
        >
          <div className="container-x">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <Reveal>
                <Eyebrow>{m.eyebrow}</Eyebrow>
                <h2 id={`${m.id}-title`} className="mt-3 text-[clamp(28px,4vw,44px)] leading-[1.08] font-semibold">
                  {m.title}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">{m.intro}</p>
              </Reveal>
              <Reveal delay={0.1}>{visuals[m.id]}</Reveal>
            </div>

            <div className={`mt-14 grid gap-5 sm:grid-cols-2 ${m.groups.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {m.groups.map((g, i) => (
                <Reveal
                  key={g.title}
                  delay={i * 0.05}
                  className={`rounded-2xl border border-line p-6 ${idx % 2 ? "bg-bg" : "bg-surface"} ${
                    m.groups.length === 5 && i === 0 ? "lg:row-span-2" : ""
                  }`}
                >
                  <h3 className="mb-4 font-display text-lg font-semibold">{g.title}</h3>
                  <CheckList items={g.items} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="platform" aria-labelledby="platform-title" className="scroll-mt-32 border-t border-line bg-surface py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow>Platform</Eyebrow>
            <h2 id="platform-title" className="mt-3 text-[clamp(28px,4vw,44px)] leading-[1.08] font-semibold">
              Works on every device. Keeps every firm&apos;s data separate.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {platformQualities.map((q, i) => {
              const Icon = platformIcons[i];
              return (
                <Reveal as="li" key={q.title} delay={i * 0.04} className="bg-surface p-6">
                  <Icon className="size-5 text-brand dark:text-accent" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-semibold">{q.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{q.body}</p>
                </Reveal>
              );
            })}
            <li className="hidden bg-surface p-6 sm:block" aria-hidden="true" />
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
