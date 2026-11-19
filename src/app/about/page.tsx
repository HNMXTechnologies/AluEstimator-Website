import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { WindowElevation } from "@/components/visuals/WindowElevation";
import { about, principles } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About — built in Ahmedabad for aluminium fabricators",
  description:
    "AluEstimator was started in Ahmedabad by a team that grew up around aluminium fabrication workshops, to put the whole job in one simple app.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  // SAMPLE — replace before launch (about.isSample, site.isSample)
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built by people who grew up around fabrication workshops."
        sub={`Founded ${site.founded}. We make software that understands how an aluminium window is built.`}
      />

      <Section labelledBy="story-title">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <h2 id="story-title" className="text-[clamp(26px,3.6vw,38px)] leading-[1.1] font-semibold">Our story</h2>
            <div className="mt-6 grid gap-4 text-[17px] leading-relaxed text-ink-soft">
              {about.story.map((p) => <p key={p}>{p}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl border border-line bg-surface bg-blueprint p-6 shadow-lift sm:p-10">
              <WindowElevation width={72} height={54} shutters={3} widthLabel="1829 mm" heightLabel="1372 mm" idPrefix="about" title="Technical drawing of a three-shutter aluminium window" />
              <p className="dim-label mt-4 text-center text-muted">Every pipe, every cut, every rupee</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="tl-title" className="border-y border-line bg-surface">
        <SectionHeader id="tl-title" eyebrow="Timeline" title="How AluEstimator grew." className="mb-12" />
        <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="absolute top-[22px] right-0 left-0 hidden h-px bg-line md:block" aria-hidden="true" />
          <div className="absolute top-0 bottom-0 left-[21px] w-px bg-line md:hidden" aria-hidden="true" />
          {about.timeline.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.1} className="relative pl-16 md:pl-0">
              <span className="absolute left-0 flex size-11 items-center justify-center rounded-full border border-accent bg-surface font-mono text-[11px] font-medium text-brand md:relative dark:text-accent">
                {t.year}
              </span>
              <h3 className="font-display text-lg font-semibold md:mt-5">{t.title}</h3>
              <p className="mt-1.5 text-[15px] text-muted">{t.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section labelledBy="pr-title">
        <SectionHeader id="pr-title" eyebrow="What we care about" title="Software a workshop owner can trust with their money." className="mb-12" />
        <ul className="grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="co-title" className="border-t border-line bg-surface-2/60">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader id="co-title" eyebrow="Company" title={site.legalName} sub={`GSTIN ${site.gstin}`} />
          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: MapPin, label: "Office", value: `${site.address.line1}, ${site.address.line2}, ${site.address.country}` },
                { icon: Phone, label: "Phone / WhatsApp", value: site.phoneDisplay, href: `tel:${site.phoneE164}` },
                { icon: Mail, label: "Email", value: site.emails.general, href: `mailto:${site.emails.general}` },
                { icon: Clock, label: "Support hours", value: site.supportHours },
              ].map((c) => (
                <li key={c.label} className="rounded-2xl border border-line bg-surface p-5">
                  <c.icon className="size-5 text-brand dark:text-accent" aria-hidden="true" />
                  <p className="mt-3 text-sm text-muted">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-0.5 block font-medium break-words hover:text-brand dark:hover:text-accent">{c.value}</a>
                  ) : (
                    <p className="mt-0.5 font-medium">{c.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
