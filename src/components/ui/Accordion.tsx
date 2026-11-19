"use client";

import { Accordion as A } from "radix-ui";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/faq";

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <A.Root type="single" collapsible className="divide-y divide-line rounded-2xl border border-line bg-surface">
      {items.map((f, i) => (
        <A.Item key={f.q} value={`q${i}`}>
          <A.Header asChild>
            <h3>
              <A.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-[17px] font-medium text-ink hover:text-brand dark:hover:text-accent">
                {f.q}
                <Plus className="size-5 shrink-0 text-muted transition-transform duration-300 group-data-[state=open]:rotate-45" aria-hidden="true" />
              </A.Trigger>
            </h3>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=closed]:animate-[acc-up_.25s_ease] data-[state=open]:animate-[acc-down_.3s_ease]">
            <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
