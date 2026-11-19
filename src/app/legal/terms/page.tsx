import type { Metadata } from "next";
import { canonicalPath } from "@/content/site";
import { LegalPage } from "@/components/shared/LegalPage";
import Content from "@/content/legal/terms.mdx";

export const metadata: Metadata = {
  title: "Terms of service (draft)",
  description: "The terms for using AluEstimator, including plan limits, fair use, data ownership and governing law.",
  alternates: { canonical: canonicalPath("/legal/terms") },
};

export default function Page() {
  return (
    <LegalPage title="Terms of service" current="/legal/terms">
      <Content />
    </LegalPage>
  );
}
