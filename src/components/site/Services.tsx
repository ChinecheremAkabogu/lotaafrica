import { Link } from "@tanstack/react-router";
import { Home, MapPinned, Car, Store, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

export const SERVICES = [
  {
    icon: Home,
    title: "Build your home",
    body: "From buying land to building your dream home, retirement property or family residence. Get support with project planning, construction oversight, documentation and progress reporting.",
  },
  {
    icon: MapPinned,
    title: "Buy land and property",
    body: "Find and acquire land or property with support for verification, due diligence, transaction documentation and ownership records.",
  },
  {
    icon: Car,
    title: "Buy a car",
    body: "Purchase a vehicle for yourself or your family back home. Get help with sourcing, inspection, purchase coordination and documentation.",
  },
  {
    icon: Store,
    title: "Start or manage a business",
    body: "Turn your business idea into reality. Whether it's a restaurant, lounge, gym, supermarket or another venture, get support with setup, procurement and ongoing project coordination.",
  },
  {
    icon: TrendingUp,
    title: "Build or expand an investment",
    body: "Have another idea? Lota gives you a way to submit your project and explore how to get it executed.",
  },
  {
    icon: Sparkles,
    title: "Your project. Your terms.",
    body: "Don't see what you need? Tell us what you have in mind. We are building Lota to support more than the usual categories of diaspora projects.",
  },
];

export function Services() {
  return (
    <section className="bg-grain py-24 md:py-32">
      <div className="container-lota">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What Lota does"
            title={
              <>
                One platform. <span className="font-serif font-normal italic text-sunset">Every plan</span> you have back home.
              </>
            }
            intro="Whether you're planning something personal, building an investment portfolio or creating a business, Lota helps you move from an idea to actual execution."
          />
          <Button asChild variant="ink" size="xl" className="reveal shrink-0">
            <Link to="/start-a-project">
              Submit Your Project <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-sunset opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25" />
              <span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary transition-all duration-500 group-hover:bg-sunset group-hover:text-primary-foreground">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
