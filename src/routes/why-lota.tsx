import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { WhyGrid } from "@/components/site/WhyGrid";
import { Problem } from "@/components/site/Problem";
import { FinalCta } from "@/components/site/FinalCta";
import { pageMeta } from "@/lib/seo";
import siteImg from "@/assets/site-manager.jpg";
import diasporaImg from "@/assets/diaspora-phone.jpg";

export const Route = createFileRoute("/why-lota")({
  head: () => ({
    meta: pageMeta(
      "Why Lota — Verified people, transparent execution | Lota Africa",
      "Verified professionals, transparent execution, milestone-based funding, proof of progress and proper ownership documentation for your projects back home.",
    ),
  }),
  component: WhyLota,
});

function WhyLota() {
  return (
    <>
      <PageHero
        eyebrow="Why Lota"
        title={<>Build back home <span className="font-serif font-normal italic text-sunset">with confidence.</span></>}
        intro="We're not just interested in helping you spend money back home. We want to help you create things that last."
        image={siteImg}
        imageAlt="Verified project manager on site"
      />
      <WhyGrid />
      <Problem image={diasporaImg} />
      <FinalCta />
    </>
  );
}
