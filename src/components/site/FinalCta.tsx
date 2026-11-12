import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import mark from "@/assets/lota-logo-mark.png.asset.json";
import { LOTA_EMAIL, LOTA_TAGLINE } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-lota">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-sunset p-10 text-center shadow-glow md:p-20">
          <img src={mark.url} alt="" width={600} height={395} className="pointer-events-none absolute -right-16 -top-10 w-80 animate-float opacity-15 md:w-[28rem]" />
          <h2 className="relative mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] text-primary-foreground md:text-6xl">
            Your next chapter could start back home.
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-lg text-primary-foreground/90">
            That house. That business. That investment. That future you've been planning. You don't have to keep putting it off
            because you're far away. Let's find a way to make it happen.
          </p>
          <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="ink" size="xl">
              <Link to="/start-a-project">
                Start Your Project <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={`mailto:${LOTA_EMAIL}`}>
                <Mail /> {LOTA_EMAIL}
              </a>
            </Button>
          </div>
          <p className="relative mt-8 font-serif text-xl italic text-primary-foreground/90">{LOTA_TAGLINE}</p>
        </div>
      </div>
    </section>
  );
}
