import { SectionHeading } from "./SectionHeading";

export function Vision({ image }: { image: string }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-lota">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink">
          <img src={image} alt="A Nigerian family embracing on the veranda of their newly built home at sunset" loading="lazy" width={1504} height={1104} className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative grid gap-10 p-8 md:p-16 lg:grid-cols-2">
            <div>
              <SectionHeading
                tone="light"
                eyebrow="The bigger vision"
                title={
                  <>
                    Home is more than a place. It's everything you're <span className="font-serif font-normal italic text-gold">building towards.</span>
                  </>
                }
              />
            </div>
            <div className="reveal space-y-4 self-end text-lg leading-relaxed text-ink-foreground/85">
              <p>For some people, home is a retirement house overlooking the neighbourhood where they grew up.</p>
              <p>
                For others, it's a restaurant they've always wanted to open, land they want to own, a business they want their
                children to inherit or a better future for their family.
              </p>
              <p>
                We believe millions of Africans in the diaspora should have a trusted way to participate in building the future of
                their home countries. Lota is building the infrastructure to make that possible.
              </p>
              <p>
                We envision a future where distance is no longer a barrier to ownership, investment and opportunity. Where projects
                don't have to fail because the owner lives thousands of miles away.
              </p>
              <p className="pt-2 font-serif text-3xl italic text-gold">We're creating a better way to come home.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
