import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import Content from "@/content/legal/privacy.mdx";

export const metadata: Metadata = {
  title: "Privacy policy (draft)",
  description: "How AluEstimator collects, uses and protects account, business and usage data.",
  alternates: { canonical: "/legal/privacy" },
};

export default function Page() {
  return (
    <LegalPage title="Privacy policy" current="/legal/privacy">
      <Content />
    </LegalPage>
  );
}
