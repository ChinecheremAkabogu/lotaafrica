import { Link } from "@tanstack/react-router";
import { Mail, Menu, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LOTA_EMAIL, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="container-lota flex h-9 items-center justify-between text-xs">
          <p className="text-ink-muted">Helping Africans abroad build, own and invest back home.</p>
          <a href={`mailto:${LOTA_EMAIL}`} className="flex items-center gap-1.5 font-medium transition-colors hover:text-gold">
            <Mail className="size-3.5" /> {LOTA_EMAIL}
          </a>
        </div>
      </div>
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled ? "border-border bg-background/85 shadow-soft backdrop-blur-xl" : "border-transparent bg-background/70 backdrop-blur-md",
        )}
      >
        <div className="container-lota flex h-18 items-center justify-between gap-6 py-3">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="hero" size="pill" className="hidden sm:inline-flex">
              <Link to="/start-a-project">
                Start a Project <ArrowRight />
              </Link>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm bg-background">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="mt-6 flex flex-col gap-1">
                  {NAV_LINKS.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      activeOptions={{ exact: true }}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-3 font-display text-xl font-bold text-foreground transition-colors hover:bg-accent data-[status=active]:text-primary"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <Button asChild variant="hero" size="xl" className="mt-6 w-full">
                  <Link to="/start-a-project" onClick={() => setOpen(false)}>
                    Start a Project <ArrowRight />
                  </Link>
                </Button>
                <a href={`mailto:${LOTA_EMAIL}`} className="mt-6 flex items-center gap-2 px-4 text-sm font-semibold text-muted-foreground">
                  <Mail className="size-4 text-primary" /> {LOTA_EMAIL}
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
