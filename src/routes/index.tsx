import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Eye, Milestone, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/SectionHeading";
import { Problem } from "@/components/site/Problem";
import { Services } from "@/components/site/Services";
import { Journey } from "@/components/site/Journey";
import { WhyGrid } from "@/components/site/WhyGrid";
import { Vision } from "@/components/site/Vision";
import { FinalCta } from "@/components/site/FinalCta";
import { pageMeta } from "@/lib/seo";
import heroImg from "@/assets/hero-home.jpg";
import diasporaImg from "@/assets/diaspora-phone.jpg";
import familyImg from "@/assets/family-home.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "Lota Africa — Build back home without being back home",
      "Build a house, buy land or a car, or start a business back home. Lota connects Africans abroad with verified professionals and milestone-based project tracking.",
    ),
  }),
  component: Index,
});

function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <section className="relative isolate -mt-px overflow-hidden bg-ink">
      <img src={heroImg} alt="A beautiful modern family home in Lagos at golden hour" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover" />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="container-lota flex min-h-[calc(100svh-6rem)] flex-col justify-center py-20 md:py-28">
        <div className={ready ? "max-w-3xl animate-rise" : "max-w-3xl"}>
          <Eyebrow tone="light">Your life abroad. Your dreams back home.</Eyebrow>
          <h1 className="mt-7 text-5xl font-extrabold leading-[0.98] text-ink-foreground sm:text-6xl lg:text-[5.5rem]">
            You can build back home <span className="font-serif font-normal italic text-sunset">without being</span> back home.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/80 md:text-xl">
            That house you've always wanted to build. The business you've been planning to start. The land you want to own. The car
            your family needs.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            Whatever you're planning back home, Lota helps you make it happen with verified professionals, transparent project
            management and accountability at every stage. You focus on the dream. We'll help you bring it to life.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/start-a-project">
                Start Your Project <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/how-it-works">
                <PlayCircle /> See How It Works
              </Link>
            </Button>
          </div>
          <p className="mt-8 max-w-xl text-sm italic text-ink-muted">
            From your first idea to a completed project, you deserve to know exactly what's happening back home.
          </p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 bg-ink/60 backdrop-blur-md">
        <div className="container-lota grid grid-cols-1 divide-y divide-ink-foreground/10 text-ink-foreground sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { icon: BadgeCheck, t: "Verified people", d: "Vetted professionals & vendors" },
            { icon: Eye, t: "Transparent execution", d: "Know what's done and what's next" },
            { icon: Milestone, t: "Milestone-based funding", d: "Payments tied to deliverables" },
          ].map((f) => (
            <div key={f.t} className="flex items-center gap-4 py-5 sm:px-6 sm:first:pl-0">
              <f.icon className="size-7 shrink-0 text-gold" strokeWidth={1.75} />
              <div>
                <p className="font-display font-bold">{f.t}</p>
                <p className="text-sm text-ink-muted">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <Problem image={diasporaImg} />
      <Services />
      <Journey />
      <WhyGrid />
      <Vision image={familyImg} />
      <FinalCta />
    </>
  );
}
