import { cn } from "@/lib/utils";

export function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em]",
        tone === "dark" ? "bg-accent text-accent-foreground" : "bg-ink-foreground/10 text-gold",
      )}
    >
      <span className="size-1.5 rounded-full bg-sunset" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("reveal max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-5 text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl",
          tone === "dark" ? "text-foreground" : "text-ink-foreground",
        )}
      >
        {title}
      </h2>
      {intro && (
        <div className={cn("mt-5 text-lg leading-relaxed", tone === "dark" ? "text-muted-foreground" : "text-ink-muted")}>
          {intro}
        </div>
      )}
    </div>
  );
}
