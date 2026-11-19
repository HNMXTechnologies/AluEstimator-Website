import type { Metadata } from "next";
import { canonicalPath } from "@/content/site";
import { LegalPage } from "@/components/shared/LegalPage";
import Content from "@/content/legal/refund.mdx";

export const metadata: Metadata = {
  title: "Refund policy (draft)",
  description: "AluEstimator free trial, cancellation and refund policy for monthly and yearly plans.",
  alternates: { canonical: canonicalPath("/legal/refund") },
};

export default function Page() {
  return (
    <LegalPage title="Refund policy" current="/legal/refund">
      <Content />
    </LegalPage>
  );
}
