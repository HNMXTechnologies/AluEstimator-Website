import { Check, ArrowRight } from "lucide-react";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,#000_30%,transparent_80%)]" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-20 lg:pb-24">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="mt-4 text-[clamp(36px,6.2vw,64px)] leading-[1.02] font-semibold text-gradient-steel">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">{hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Book a free demo <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={site.whatsappUrl} variant="whatsapp" size="lg">
              <WhatsAppIcon /> Chat on WhatsApp
            </ButtonLink>
          </div>
          <p className="mt-3 text-sm text-muted">
            Free {site.offer.trialDays}-day trial, set up by our team after the demo.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-ink-soft">
            {hero.bullets.map((b) => (
              <li key={b} className="inline-flex items-center gap-2">
                <Check className="size-4 text-success" aria-hidden="true" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
