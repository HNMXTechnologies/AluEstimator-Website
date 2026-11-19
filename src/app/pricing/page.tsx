import type { Metadata } from "next";
import { CalendarCheck, FileSpreadsheet, Headphones, ShieldCheck } from "lucide-react";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PricingCards } from "@/components/pricing/PricingCards";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { Faq } from "@/content/faq";
import { plans, pricingNotes } from "@/content/pricing";
import { canonicalPath, site } from "@/content/site";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — all features on every plan, from ₹799/month",
  description:
    "AluEstimator pricing: Basic ₹799, Pro ₹1,999 and Enterprise ₹4,999 per month (+18% GST). Every plan includes every feature. Yearly billing gets 2 months free.",
  alternates: { canonical: canonicalPath("/pricing") },
};

const notes = [
  { icon: CalendarCheck, title: `${site.offer.trialDays}-day free trial`, body: `Full features, set up by our team after a ${site.offer.demoMinutes}-minute demo.` },
  { icon: FileSpreadsheet, title: "Free Excel import help", body: "We help bring your window designs and opening stock across." },
  { icon: ShieldCheck, title: "Every feature included", body: "Plans differ only by people, branches, catalogue size and documents per month." },
  { icon: Headphones, title: "Real support", body: `${site.supportHours}.` },
];

// Answers follow the plan configuration (brief §6) and draft refund policy (§11.6).
const pricingFaqs: Faq[] = [
  {
    q: "Are prices inclusive of GST?",
    a: "No. All prices are per month (or per year on yearly billing) and exclude 18% GST, which is added to your invoice.",
  },
  {
    q: "How does yearly billing work?",
    a: `${pricingNotes.yearlyExplainer} For example, Pro is ${formatINR(plans[1].yearly)} a year instead of ${formatINR(plans[1].monthly * 12)}.`,
  },
  {
    q: "Can I start without paying?",
    a: `Yes. Book a demo and our team sets up a ${site.offer.trialDays}-day free trial with every feature. You only pay if you decide to continue.`,
  },
  {
    q: "What happens if I need more seats or branches?",
    a: "Talk to our team about moving to a higher plan. Pro adds a second workspace and 8 staff seats; Enterprise gives 10 workspaces and unlimited staff.",
  },
  {
    q: "Can I cancel?",
    a: "Monthly plans can be cancelled any time (no refund for the current month). Yearly plans can be refunded pro-rata within 30 days of purchase.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={pricingNotes.headline}
        sub={`Simple plans from ${formatINR(plans[0].monthly)}/month. Pick the size that fits your team — every module is included in all of them.`}
        align="center"
      />

      <Section labelledBy="plans-title" className="pt-12 sm:pt-16">
        <h2 id="plans-title" className="sr-only">Plans</h2>
        <PricingCards />
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {notes.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 0.05} className="flex gap-3">
              <n.icon className="mt-0.5 size-5 shrink-0 text-brand dark:text-accent" aria-hidden="true" />
              <div>
                <h3 className="font-display font-semibold">{n.title}</h3>
                <p className="mt-0.5 text-sm text-muted">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="compare-title" className="border-y border-line bg-surface">
        <SectionHeader id="compare-title" eyebrow="Compare" title="Every limit, side by side." sub="Prices exclude 18% GST." className="mb-10" />
        <ComparisonTable />
      </Section>

      <Section labelledBy="pfaq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <SectionHeader id="pfaq-title" eyebrow="Pricing FAQ" title="Questions about plans and billing." />
          <Reveal delay={0.1}>
            <FaqAccordion items={pricingFaqs} />
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Not sure which plan fits?" sub="Book a free demo. We'll look at your team and branches and recommend the right plan — then set up your 14-day free trial." />
    </>
  );
}
