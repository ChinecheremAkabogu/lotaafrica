import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ProjectForm } from "@/components/site/ProjectForm";
import { LOTA_EMAIL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import familyImg from "@/assets/family-home.jpg";

export const Route = createFileRoute("/start-a-project")({
  head: () => ({
    meta: pageMeta(
      "Start Your Project — Two-minute enquiry | Lota Africa",
      "Tell Lota Africa what you want to build, buy or launch back home. It takes about two minutes, with no commitment and no pressure.",
    ),
  }),
  component: StartProject,
});

function StartProject() {
  return (
    <>
      <PageHero
        eyebrow="Start your project"
        title={<>Have a project in mind? Let's bring it <span className="font-serif font-normal italic text-sunset">to life.</span></>}
        intro="You don't need a complete business plan, architectural drawing or detailed budget to get started. Tell us what you want to accomplish. We'll take it from there."
        image={familyImg}
        imageAlt="Family celebrating their new home"
      />
      <section id="project-form" className="bg-grain py-20 md:py-28">
        <div className="container-lota grid gap-10 lg:grid-cols-12">
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft lg:sticky lg:top-36">
              <h2 className="text-2xl font-extrabold">Start your project</h2>
              <p className="mt-3 text-muted-foreground">
                Whether it's a home, land, car, business or something entirely different, we'd love to hear about it.
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex gap-3"><Clock className="size-5 shrink-0 text-primary" /> Takes approximately two minutes.</li>
                <li className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-primary" /> No commitment, no payment required.</li>
                <li className="flex gap-3"><Sparkles className="size-5 shrink-0 text-primary" /> Our team reviews every submission and gets in touch.</li>
              </ul>
              <div className="mt-8 rounded-2xl bg-ink p-5 text-ink-foreground">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">Email us directly</p>
                <a href={`mailto:${LOTA_EMAIL}`} className="mt-2 flex items-center gap-2 font-semibold text-gold hover:underline">
                  <Mail className="size-4" /> {LOTA_EMAIL}
                </a>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <ProjectForm />
          </div>
        </div>
      </section>
    </>
  );
}
