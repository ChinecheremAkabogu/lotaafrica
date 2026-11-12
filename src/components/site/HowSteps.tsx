import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    title: "Tell us what you want to achieve.",
    body: "Submit your project through our simple online form. Tell us what you want to build, buy, launch or accomplish. You don't need to have everything figured out.",
  },
  {
    title: "We understand your project.",
    body: "Our team reviews your request, gets in touch and learns more about your goals, location, budget and timeline.",
  },
  {
    title: "Get a project plan.",
    body: "We work with you to define the scope, expected costs, execution approach and milestones. You'll understand what needs to happen before committing to execution.",
  },
  {
    title: "Get connected to the right people.",
    body: "Where your project proceeds, we help coordinate suitable, verified vendors, professionals and project managers based on your needs.",
  },
  {
    title: "Fund and track your project.",
    body: "Our planned milestone-based funding structure is designed to make payments accountable to agreed project stages. You'll receive progress updates, supporting evidence and documentation.",
  },
  {
    title: "See your plans become reality.",
    body: "From the first milestone to completion, you'll have visibility into the work being done, the money spent and the assets acquired.",
  },
];

export function HowSteps({ image }: { image: string }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-lota grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  From an idea to something you can <span className="font-serif font-normal italic text-sunset">actually see.</span>
                </>
              }
              intro="We believe executing a project back home should be straightforward. Here's how the Lota experience is designed to work."
            />
            <div className="reveal relative mt-10 overflow-hidden rounded-3xl shadow-soft">
              <img src={image} alt="A Lota-verified project manager inspecting a building site in Nigeria" loading="lazy" width={1504} height={1104} className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-fade-up" />
              <p className="absolute bottom-5 left-5 right-5 font-serif text-2xl italic text-ink-foreground">
                Your project should never feel like a mystery.
              </p>
            </div>
          </div>
        </div>
        <ol className="space-y-4 lg:col-span-7">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="reveal group flex gap-6 rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-soft md:p-8"
            >
              <span className="font-display text-4xl font-extrabold text-sunset md:text-5xl">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-bold md:text-2xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
          <li className="reveal pt-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/start-a-project">
                Let's Get Started <ArrowRight />
              </Link>
            </Button>
          </li>
        </ol>
      </div>
    </section>
  );
}
