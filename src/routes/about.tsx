import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Vision } from "@/components/site/Vision";
import { FinalCta } from "@/components/site/FinalCta";
import { pageMeta } from "@/lib/seo";
import familyImg from "@/assets/family-home.jpg";
import logoFull from "@/assets/lota-logo-full.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta(
      "About Us — A better way to build back home | Lota Africa",
      "Lota Africa was born to help millions of Africans abroad build, own and invest back home with trusted professionals, transparency and accountability.",
    ),
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Distance should never limit what you can <span className="font-serif font-normal italic text-sunset">build.</span></>}
        image={familyImg}
        imageAlt="Family on the veranda of their new home"
      />
      <section className="py-24 md:py-32">
        <div className="container-lota grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our story" title="Born from a simple observation." />
            <div className="reveal mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Lota Africa was born from a simple observation: millions of Africans living abroad want to build, acquire assets,
                invest and create opportunities back home, but the process is often filled with uncertainty.
              </p>
              <p>
                The lack of trusted professionals, transparent project management, reliable reporting and accountability makes even
                the simplest projects difficult.
              </p>
              <p className="font-semibold text-foreground">
                People shouldn't have to choose between abandoning their dreams and risking their hard-earned money. We believe
                there's a better way.
              </p>
              <p>
                Lota is building a platform that brings together project owners, verified professionals, vendors and project
                managers to make executing projects back home more accessible, transparent and accountable.
              </p>
              <p>
                We're starting with the projects that matter most to people: homes, land, vehicles and businesses. But our ambition
                goes much further.
              </p>
              <p>
                We want to become the trusted infrastructure through which Africans everywhere can build, own and invest back home.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="reveal sticky top-36 rounded-[2rem] border border-border bg-card p-10 text-center shadow-soft">
              <img src={logoFull.url} alt="Lota Africa — Your plans back home. In safe hands." width={900} height={626} loading="lazy" className="mx-auto w-full max-w-sm" />
              <p className="mt-8 font-serif text-3xl italic">Lota. A better way to build back home.</p>
            </div>
          </div>
        </div>
      </section>
      <Vision image={familyImg} />
      <FinalCta />
    </>
  );
}
