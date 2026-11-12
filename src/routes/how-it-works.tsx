import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { HowSteps } from "@/components/site/HowSteps";
import { Journey } from "@/components/site/Journey";
import { FinalCta } from "@/components/site/FinalCta";
import { pageMeta } from "@/lib/seo";
import siteImg from "@/assets/site-manager.jpg";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: pageMeta(
      "How It Works — From idea to completed project | Lota Africa",
      "Submit your project, get a clear plan, connect with verified professionals and track milestone-based progress from anywhere in the world.",
    ),
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>From an idea to something you can <span className="font-serif font-normal italic text-sunset">actually see.</span></>}
        intro="We believe executing a project back home should be straightforward. Here's how the Lota experience is designed to work."
        image={siteImg}
        imageAlt="Project manager inspecting a building site"
      />
      <HowSteps image={siteImg} />
      <Journey />
      <div className="pt-24 md:pt-32" />
      <FinalCta />
    </>
  );
}
