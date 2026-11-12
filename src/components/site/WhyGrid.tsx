import { BadgeCheck, Eye, Milestone, Camera, FileCheck2, HeartHandshake } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const PILLARS = [
  { icon: BadgeCheck, title: "Verified people", body: "We are building a network of vetted professionals, contractors, vendors and project managers. The people handling your projects should meet clear verification and accountability standards." },
  { icon: Eye, title: "Transparent execution", body: "Know what is happening, who is responsible, what has been completed and what comes next." },
  { icon: Milestone, title: "Milestone-based funding", body: "Our planned escrow and milestone-payment model is designed to connect project funding with agreed deliverables, rather than relying on blind transfers." },
  { icon: Camera, title: "Proof of progress", body: "Receive visual updates, project reports, receipts and supporting documentation so you can follow your project from wherever you are." },
  { icon: FileCheck2, title: "Ownership and documentation", body: "Your investment should leave you with more than photographs and promises. We want every completed project to have the appropriate records, receipts and ownership documentation." },
  { icon: HeartHandshake, title: "Built around your peace of mind", body: "You have a life, a career and responsibilities abroad. You shouldn't have to spend every waking hour chasing contractors, calling suppliers or asking family members for updates." },
];

export function WhyGrid() {
  return (
    <section className="bg-sand py-24 md:py-32">
      <div className="container-lota">
        <SectionHeading
          align="center"
          eyebrow="Why Lota"
          title={
            <>
              Built for people who want to build back home <span className="font-serif font-normal italic text-sunset">with confidence.</span>
            </>
          }
          intro="We're not just interested in helping you spend money back home. We want to help you create things that last."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="reveal group bg-card p-8 transition-colors duration-500 hover:bg-background md:p-10">
              <p.icon className="size-8 text-primary transition-transform duration-500 group-hover:scale-110" strokeWidth={1.75} />
              <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="reveal mx-auto mt-12 max-w-2xl text-center font-serif text-3xl italic text-foreground">
          Lota exists to make the process more organised and accountable.
        </p>
      </div>
    </section>
  );
}
