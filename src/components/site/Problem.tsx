import { AlertTriangle } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const STORIES = [
  "Money sent to build a house, but construction stopped halfway.",
  "A plot of land purchased, only for ownership to become disputed.",
  "A business funded, but nobody can properly account for the money.",
  "A car purchased for a family member, with no clarity on the actual cost or condition.",
  "Contractors who stop responding once they've received payment.",
];

export function Problem({ image }: { image: string }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-lota grid items-center gap-14 lg:grid-cols-2">
        <div className="reveal relative order-last lg:order-first">
          <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2.5rem] bg-sunset opacity-80" />
          <img src={image} alt="A Nigerian woman in London smiling at construction progress photos on her phone" loading="lazy" width={1200} height={1504} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
          <div className="absolute -bottom-6 -right-2 max-w-[16rem] rounded-2xl bg-card p-5 shadow-soft md:-right-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Peace of mind</p>
            <p className="mt-1 font-display text-lg font-bold leading-snug">Know exactly what's happening back home.</p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Trust & accountability"
            title={
              <>
                Distance shouldn't cost you your <span className="font-serif font-normal italic text-sunset">peace of mind.</span>
              </>
            }
            intro={
              <>
                <p>You work hard abroad. You save. You send money home. You make plans for the future.</p>
                <p className="mt-3">But making things happen back home isn't always straightforward. You've probably heard the stories:</p>
              </>
            }
          />
          <ul className="mt-8 space-y-3">
            {STORIES.map((s) => (
              <li key={s} className="reveal flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-ember" />
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ul>
          <div className="reveal mt-8 space-y-3 text-lg text-muted-foreground">
            <p>And sometimes, the people you trust most are the people you end up having problems with.</p>
            <p>You shouldn't have to choose between trusting blindly and giving up on your plans.</p>
          </div>
          <p className="reveal mt-6 font-display text-2xl font-bold">
            There should be a better way to build, own and invest back home.{" "}
            <span className="text-sunset">That's why we're building Lota.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
