import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/Button";
import { site } from "@/content/site";

/** Sticky bottom bar on phones: WhatsApp first — most visitors arrive from a WhatsApp link. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/92 px-3 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[1.35fr_1fr] gap-2">
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp px-2 text-[14.5px] font-semibold whitespace-nowrap text-white"
        >
          <WhatsAppIcon /> Chat on WhatsApp
        </a>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line-strong bg-surface px-3 text-[15px] font-semibold text-ink"
        >
          Book a demo
        </Link>
      </div>
    </div>
  );
}
