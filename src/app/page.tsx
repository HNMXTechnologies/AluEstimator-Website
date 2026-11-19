import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, IndianRupee, Landmark, Ruler, Wallet } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { MiniEstimator } from "@/components/home/MiniEstimator";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeatureRows } from "@/components/home/FeatureRows";
import { Pipeline } from "@/components/home/Pipeline";
import { Devices, InstallBadge } from "@/components/home/Devices";
import { PricingCards } from "@/components/pricing/PricingCards";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqAccordion } from "@/components/ui/Accordion";
import { WhatsAppIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { beforeAfter, builtForIndia, devices, pipeline } from "@/content/home";
import { faqs } from "@/content/faq";
import { plans, pricingNotes } from "@/content/pricing";
import { canonicalPath, site } from "@/content/site";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "AluEstimator — Aluminium window estimation & quotation software for India" },
  description:
    "Aluminium window estimation software for fabricators in India. Cut lengths, optimised cutting plan, glass, coating and a branded GST quotation on WhatsApp — in minutes.",
  alternates: { canonical: canonicalPath("/") },
};

const indiaIcons = {
  gst: Landmark,
  rupee: IndianRupee,
  dora: Ruler,
  whatsapp: null,
  payments: Wallet,
  gstin: Building2,
} as const;

function jsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "AluEstimator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS, Windows, macOS (installable web app)",
      description:
        "Estimation, quotation and business-management software for aluminium window, door and partition fabricators in India.",
      url: site.url,
      offers: plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.monthly,
        priceCurrency: "INR",
        description: `${p.bestFor}. Per month, excluding 18% GST.`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.slice(0, 6).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
      />

      <Hero />
      <StatsStrip />

      {/* Pain → solution */}
      <Section labelledBy="ba-title">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <SectionHeader id="ba-title" eyebrow="Before vs after" title={beforeAfter.title} sub={beforeAfter.sub} />
          <Reveal delay={0.1}>
            <BeforeAfter />
          </Reveal>
        </div>
      </Section>

      {/* Live mini-estimator */}
      <section id="try-it" aria-labelledby="try-title" className="relative border-y border-line bg-surface-2/60 py-20 sm:py-28">
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeader
            id="try-title"
            eyebrow="Try it yourself"
            title="Type a size. Watch the cutting plan build itself."
            sub="Change the width, height or unit — the part list, cut lengths and the cutting plan on 12 ft pipes update instantly."
            align="center"
          />
          <Reveal delay={0.1} className="mt-12">
            <MiniEstimator />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <Section labelledBy="hiw-title">
        <SectionHeader
          id="hiw-title"
          eyebrow="How it works"
          title="Four steps from site to signed quote."
          sub="Set up your designs once. After that, every job is just sizes in, quotation out."
        />
        <HowItWorks />
      </Section>

      {/* Hero features */}
      <Section labelledBy="feat-title" className="border-t border-line bg-surface">
        <SectionHeader
          id="feat-title"
          eyebrow="Built for fabricators"
          title="Software that knows how an aluminium window is built."
          sub="Not another billing app. AluEstimator understands tracks, shutters, pipes, glass and coating — and then also does the billing."
          align="center"
          className="mb-20"
        />
        <FeatureRows />
      </Section>

      {/* Pipeline */}
      <section aria-labelledby="pipe-title" className="relative overflow-hidden bg-navy-gradient py-20 sm:py-28">
        <div className="bg-blueprint-navy pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeader id="pipe-title" eyebrow="End to end" title={pipeline.title} sub={pipeline.sub} align="center" onNavy className="mb-14" />
          <Pipeline />
        </div>
      </section>

      {/* Works everywhere */}
      <Section labelledBy="dev-title" className="overflow-hidden">
        <div className="text-center">
          <SectionHeader id="dev-title" eyebrow="Works everywhere" title={devices.title} sub={devices.sub} align="center" />
          <Reveal delay={0.1} className="mt-6 flex justify-center">
            <InstallBadge />
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-14 pb-12">
          <Devices />
        </Reveal>
        <p className="mt-4 text-center text-xs text-muted">Illustrative screens.</p>
      </Section>

      {/* Built for India */}
      <Section labelledBy="india-title" className="border-y border-line bg-surface">
        <SectionHeader id="india-title" eyebrow="Built for India" title={builtForIndia.title} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {builtForIndia.items.map((it, i) => {
            const Icon = indiaIcons[it.key];
            return (
              <Reveal as="li" key={it.key} delay={i * 0.05} className="bg-surface p-6 sm:p-7">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-brand dark:text-accent">
                  {Icon ? <Icon className="size-5" aria-hidden="true" /> : <WhatsAppIcon className="size-5" />}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{it.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* Pricing teaser */}
      <Section labelledBy="price-title">
        <SectionHeader
          id="price-title"
          eyebrow="Pricing"
          title={
            <>
              {pricingNotes.headline} — from {formatINR(plans[0].monthly)}/month.
            </>
          }
          sub="Plans differ only by volume: people, branches, catalogue size and documents per month. Prices exclude 18% GST."
          align="center"
          className="mb-12"
        />
        <PricingCards />
        <p className="mt-10 text-center">
          <Link href="/pricing" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand hover:gap-2.5 dark:text-accent">
            Compare every plan limit <ArrowRight className="size-4 transition-all" aria-hidden="true" />
          </Link>
        </p>
      </Section>


      {/* FAQ preview */}
      <Section labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <SectionHeader id="faq-title" eyebrow="FAQ" title="Questions fabricators ask us." />
            <Reveal delay={0.1}>
              <Link href="/faq" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand hover:gap-2.5 dark:text-accent">
                See all questions <ArrowRight className="size-4 transition-all" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FaqAccordion items={faqs.slice(0, 6)} />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
