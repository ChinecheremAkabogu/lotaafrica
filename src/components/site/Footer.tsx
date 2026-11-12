import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { LOTA_EMAIL, LOTA_TAGLINE } from "@/lib/site";
import { Logo } from "./Logo";

const FOOTER_NAV = [
  { to: "/", label: "Home" },
  { to: "/what-we-do", label: "What We Do" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About Us" },
  { to: "/faqs", label: "FAQs" },
  { to: "/start-a-project", label: "Start a Project" },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-sunset" />
      <div className="container-lota grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-lg text-ink-muted">A trusted path to building, owning and investing back home.</p>
          <p className="mt-3 font-serif text-2xl italic text-gold">{LOTA_TAGLINE}</p>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">Navigate</h3>
          <ul className="mt-5 space-y-3">
            {FOOTER_NAV.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-medium transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-muted">Contact</h3>
          <a
            href={`mailto:${LOTA_EMAIL}`}
            className="mt-5 flex items-center gap-3 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-4 transition-colors hover:border-gold/60"
          >
            <span className="grid size-10 place-items-center rounded-full bg-sunset">
              <Mail className="size-5 text-primary-foreground" />
            </span>
            <span>
              <span className="block text-xs text-ink-muted">Email us</span>
              <span className="font-semibold">{LOTA_EMAIL}</span>
            </span>
          </a>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-lota flex flex-col gap-4 py-8 text-xs text-ink-muted md:flex-row md:items-start md:justify-between">
          <p className="shrink-0">© 2026 Lota Africa. All rights reserved.</p>
          <p className="max-w-3xl md:text-right">
            Lota Africa is developing its platform and service network. Project availability, verification, funding
            arrangements and execution timelines are subject to assessment and agreed terms. Submitting a project enquiry
            does not constitute acceptance, a funding commitment or a guarantee of execution.
          </p>
        </div>
      </div>
    </footer>
  );
}
