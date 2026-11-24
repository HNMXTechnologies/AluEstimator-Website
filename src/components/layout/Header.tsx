"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { mainNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75"
          : "border-transparent bg-bg",
      )}
    >
      <div className="container-x flex h-16 items-center gap-4">
        <Link href="/" className="-ml-1 rounded-md p-1" aria-label="AluEstimator home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-[14.5px] font-medium whitespace-nowrap transition-colors",
                      active ? "text-brand dark:text-accent" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <ButtonLink href="/contact" className="hidden sm:inline-flex">
            Book a free demo
          </ButtonLink>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-lg text-ink hover:bg-surface-2 xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,380px)] flex-col bg-bg shadow-lift outline-none">
                <div className="flex h-16 items-center justify-between border-b border-line px-4">
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>
                  <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                  <Logo />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-surface-2"
                      aria-label="Close menu"
                    >
                      <X className="size-6" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
                  <ul>
                    {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-12 items-center justify-between rounded-lg px-3 font-display text-lg font-medium text-ink hover:bg-surface-2"
                        >
                          {item.label}
                          <ArrowRight className="size-4 text-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="grid gap-2 border-t border-line p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
                  <ButtonLink href="/contact" size="lg" onClick={() => setOpen(false)}>
                    Book a free demo
                  </ButtonLink>
                  <ButtonLink href={site.whatsappUrl} variant="whatsapp" size="lg">
                    <WhatsAppIcon /> Chat on WhatsApp
                  </ButtonLink>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
