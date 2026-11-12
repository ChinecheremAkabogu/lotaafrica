import { useEffect, useState } from "react";
import { Eyebrow } from "./SectionHeading";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image: string;
  imageAlt: string;
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img src={image} alt={imageAlt} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" width={1920} height={1088} />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="container-lota py-24 md:py-32">
        <div className={loaded ? "max-w-3xl animate-rise" : "max-w-3xl"}>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] text-ink-foreground md:text-6xl lg:text-7xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">{intro}</div>}
        </div>
      </div>
    </section>
  );
}
