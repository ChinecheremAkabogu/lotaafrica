import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { FinalCta } from "@/components/site/FinalCta";
import { FAQS } from "@/lib/faqs";
import { LOTA_EMAIL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import heroImg from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: pageMeta(
      "FAQs — Your questions answered | Lota Africa",
      "Answers about how Lota Africa works, vendor verification, milestone-based funding, project updates and where we operate.",
    ),
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title={<>Questions? <span className="font-serif font-normal italic text-sunset">We've got answers.</span></>}
        intro="Everything you need to know about building, owning and investing back home with Lota."
        image={heroImg}
        imageAlt="Modern home in Lagos"
      />
      <section className="py-24 md:py-32">
        <div className="container-lota grid gap-12 lg:grid-cols-12">
          <Accordion type="single" collapsible className="reveal lg:col-span-8">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-border">
                <AccordionTrigger className="py-6 text-left font-display text-lg font-bold hover:no-underline md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <aside className="lg:col-span-4">
            <div className="reveal sticky top-36 rounded-[2rem] bg-ink p-8 text-ink-foreground">
              <h2 className="text-2xl font-bold">Still have a question?</h2>
              <p className="mt-3 text-ink-muted">Our team is happy to help. Send us an email or tell us about your project.</p>
              <a href={`mailto:${LOTA_EMAIL}`} className="mt-6 flex items-center gap-2 font-semibold text-gold hover:underline">
                <Mail className="size-4" /> {LOTA_EMAIL}
              </a>
              <Button asChild variant="hero" size="pill" className="mt-6 w-full">
                <Link to="/start-a-project">
                  Start a Project <ArrowRight />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
