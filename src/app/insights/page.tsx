import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { InsightsDashboard } from "@/components/InsightsDashboard";
import { Chip, Container } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Site Insights",
    description: "Private, cookieless analytics for this portfolio.",
    path: "/insights",
  }),
  robots: { index: false, follow: false },
};

export default function InsightsPage() {
  return (
    <section className="hero-glow pb-16 pt-12 sm:pt-16">
      <Container>
        <Chip tone="accent">Private · cookieless analytics</Chip>
        <h1 className="mt-6 text-[30px] font-bold leading-[38px] tracking-[-0.025em] sm:text-[44px] sm:leading-[52px]">
          Site Insights
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-7 text-muted">
          Which pages people read, where they come from, and what they click. No cookies, no IP addresses, and
          visitors who send Do Not Track or Global Privacy Control are never counted.
        </p>
        <InsightsDashboard />
      </Container>
    </section>
  );
}
