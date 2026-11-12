import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Services } from "@/components/site/Services";
import { Journey } from "@/components/site/Journey";
import { FinalCta } from "@/components/site/FinalCta";
import { pageMeta } from "@/lib/seo";
import heroImg from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/what-we-do")({
  head: () => ({
    meta: pageMeta(
      "What We Do — Homes, land, cars & businesses back home | Lota Africa",
      "Build your home, buy land and property, buy a car, start or manage a business, or grow an investment back home with Lota Africa.",
    ),
  }),
  component: WhatWeDo,
});

function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={<>One platform. Every plan you have <span className="font-serif font-normal italic text-sunset">back home.</span></>}
        intro="Whether you're planning something personal, building an investment portfolio or creating a business, Lota helps you move from an idea to actual execution."
        image={heroImg}
        imageAlt="Modern family home in Lagos at sunset"
      />
      <Services />
      <Journey />
      <div className="pt-24 md:pt-32" />
      <FinalCta />
    </>
  );
}
