import { Compass, ClipboardList, Inbox, Search, Rocket } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { icon: Compass, title: "Visitor discovers Lota", body: "Homepage, social media, referral or search" },
  { icon: ClipboardList, title: "Submits a project", body: "Two-minute enquiry form" },
  { icon: Inbox, title: "Lota receives the enquiry", body: "CRM record and automatic notifications" },
  { icon: Search, title: "Project discovery and assessment", body: "Requirements, location, budget and feasibility" },
  { icon: Rocket, title: "Project proposal and execution", body: "Agreed scope, verified delivery partners and milestones" },
];

export function Journey() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-sunset opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 size-[30rem] rounded-full bg-gold opacity-10 blur-3xl" />
      <div className="container-lota relative">
        <SectionHeading
          tone="light"
          eyebrow="The actual customer journey"
          title={
            <>
              Five steps from <span className="font-serif font-normal italic text-sunset">first click</span> to a project in motion.
            </>
          }
          intro="A clear, accountable path — so you always know where your plans stand."
        />
        <ol className="relative mt-16 grid gap-5 md:grid-cols-5">
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-ink-foreground/25 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="reveal group relative rounded-3xl border border-ink-foreground/10 bg-ink-foreground/[0.04] p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-ink-foreground/[0.08]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="relative grid size-14 place-items-center rounded-2xl bg-sunset shadow-glow">
                  <s.icon className="size-6 text-primary-foreground" />
                </span>
                <span className="font-display text-5xl font-extrabold text-ink-foreground/10 transition-colors group-hover:text-gold/30">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold">Step {i + 1}</p>
              <h3 className="mt-2 text-xl font-bold leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
