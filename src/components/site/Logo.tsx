import { Link } from "@tanstack/react-router";
import mark from "@/assets/lota-logo-mark.png";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="Lota Africa home">
      <img src={mark} alt="" width={883} height={559} className="h-11 w-auto transition-transform duration-500 group-hover:-rotate-3 md:h-12" />
      <span className="font-display text-xl font-extrabold leading-none tracking-tight md:text-2xl">
        <span className={tone === "dark" ? "text-ink" : "text-ink-foreground"}>Lota</span>{" "}
        <span className="text-sunset">Africa</span>
      </span>
    </Link>
  );
}
