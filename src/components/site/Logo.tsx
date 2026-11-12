import { Link } from "@tanstack/react-router";
import mark from "@/assets/lota-logo-mark.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="Lota Africa home">
      <img src={mark.url} alt="" width={600} height={395} className="h-9 w-auto transition-transform duration-500 group-hover:-rotate-3 md:h-10" />
      <span className="font-display text-xl font-extrabold leading-none tracking-tight md:text-2xl">
        <span className={tone === "dark" ? "text-ink" : "text-ink-foreground"}>Lota</span>{" "}
        <span className="text-sunset">Africa</span>
      </span>
    </Link>
  );
}
