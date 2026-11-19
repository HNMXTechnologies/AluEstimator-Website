import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Pipeline } from "@/components/home/Pipeline";
import { BuilderStep, GridStep, PriceStep, SendStep } from "@/components/how/StepScreens";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { pipeline, steps } from "@/content/home";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works — from site measurement to GST quotation",
  description:
    "Build your window designs once, enter site sizes, get the cutting plan, cost and price, then send a branded GST quotation on WhatsApp. See each step.",
  alternates: { canonical: "/how-it-works" },
};

const details: { points: string[]; screen: ReactNode }[] = [
  {
    screen: <BuilderStep />,
    points: [
      "Organise designs as Series → Type → Option",
      "Formulas from width and height, with live values",
      "Copy a design and see what changed",
      "Checklist so nothing is left half-finished",
    ],
  },
  {
    screen: <GridStep />,
    points: [
      "Choose profile, glass, coating and locks once per group",
      "Type sizes row by row, with floor and location",
      "Work in mm, inches, feet, metres or dora",
      "Import windows from Excel for big projects",
    ],
  },
  {
    screen: <PriceStep />,
    points: [
      "Optimised cutting plan on 12, 15 or 16 ft pipes",
      "Weight, glass area, accessories, coating and waste",
      "Labour, installation, margin, transport, discount and GST",
      "Cutting list, glass order and coater order as PDFs",
    ],
  },
  {
    screen: <SendStep />,
    points: [
      "Six professional formats with window drawings",
      "Share by link, WhatsApp or email",
      "Track Draft → Sent → Approved",
      "Convert an approved quote to an invoice in one click",
    ],
  },
];

const onboarding = [
  { title: `${site.offer.demoMinutes}-minute demo`, body: "Online, or at your workshop in Gujarat. See AluEstimator on the kind of windows you make." },
  { title: "We set up your account", body: "There's no self-signup — our team creates your workspace, staff logins and roles." },
  { title: "Free Excel import", body: "We help bring your window designs and opening stock across." },
  { title: `${site.offer.trialDays}-day free trial`, body: "Every feature, on your real jobs. Pay only if you continue." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Sizes in. Quotation out."
        sub="Set up your window designs once. After that, every job is four simple steps — on your phone at the site or your computer in the office."
      />

      <section aria-label="Steps" className="py-20 sm:py-28">
        <div className="container-x grid gap-24 sm:gap-32">
          {steps.map((s, i) => (
            <div key={s.title} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? "lg:order-2" : undefined}>
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong bg-surface font-display text-lg font-semibold text-brand shadow-card dark:text-accent">
                  {i + 1}
                </span>
                <h2 className="mt-5 text-[clamp(26px,3.6vw,40px)] leading-[1.1] font-semibold">{s.title}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-muted">{s.body}</p>
                <ul className="mt-6 grid gap-2.5">
                  {details[i].points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15.5px] text-ink-soft">
                      <Check className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 ? "lg:order-1" : undefined}>
                {details[i].screen}
              </Reveal>
            </div>
          ))}
          <p className="-mt-16 text-center text-xs text-muted sm:-mt-24">Screens are illustrative.</p>
        </div>
      </section>

      <section aria-labelledby="pipe-title" className="relative overflow-hidden bg-navy-gradient py-20 sm:py-28">
        <div className="bg-blueprint-navy pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeader id="pipe-title" eyebrow="After the quote" title={pipeline.title} sub={pipeline.sub} align="center" onNavy className="mb-14" />
          <Pipeline />
        </div>
      </section>

      <Section labelledBy="start-title">
        <SectionHeader id="start-title" eyebrow="Getting started" title="How we get you started." className="mb-12" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {onboarding.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 0.06} className="relative rounded-2xl border border-line bg-surface p-6 shadow-card">
              <span className="font-mono text-xs text-muted">Step 0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{o.title}</h3>
              <p className="mt-1.5 text-[15px] text-muted">{o.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
