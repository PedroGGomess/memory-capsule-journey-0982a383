import ScrollReveal from "./ScrollReveal";

const gifts = [
  {
    name: "The Discovery",
    subtitle: "Tawny Young",
    tagline: "The beginning of time",
    num: "01",
  },
  {
    name: "The Decade",
    subtitle: "Tawny 10 Years",
    tagline: "A decade of patience",
    num: "02",
  },
  {
    name: "The Legacy",
    subtitle: "Tawny 30 Years",
    tagline: "Three decades of character",
    num: "03",
  },
  {
    name: "The Heritage",
    subtitle: "Tawny 50 Years",
    tagline: "Half a century of refinement",
    num: "04",
  },
  {
    name: "The Centenary",
    subtitle: "Tawny 100 Years",
    tagline: "A century in a bottle",
    num: "05",
  },
  {
    name: "The White Pearl",
    subtitle: "White Port",
    tagline: "Elegance in white",
    num: "06",
  },
  {
    name: "The Grand Collection",
    subtitle: "Curated set of bottles",
    tagline: "The complete journey",
    num: "07",
  },
];

const GiftsSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center section-padding py-32">
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-6">Gift Experiences</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="text-4xl md:text-6xl font-light text-gold-gradient mb-6">
              7 Unique Gifts
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-lg text-foreground/60 font-light max-w-xl mx-auto">
              Each gift is a capsule of time — chosen to mark a moment, celebrate a memory, or
              honour a legacy.
            </p>
          </ScrollReveal>
        </div>

        {/* Gift cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gifts.slice(0, 6).map((gift, i) => (
            <ScrollReveal key={gift.num} delay={0.1 + i * 0.08}>
              <div className="border border-border/30 p-8 hover:border-primary/30 transition-all duration-500 group bg-card/10 hover:bg-card/30">
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary/40 mb-4">
                  {gift.num}
                </p>
                <h3 className="text-xl font-light text-foreground/90 mb-1 group-hover:text-primary transition-colors duration-500">
                  {gift.name}
                </h3>
                <p className="text-sm text-primary/60 font-light mb-3">{gift.subtitle}</p>
                <div className="h-px w-8 bg-primary/20 mb-3 group-hover:w-16 transition-all duration-500" />
                <p className="text-xs text-muted-foreground/60 font-light italic">
                  {gift.tagline}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Grand Collection — featured */}
        <ScrollReveal delay={0.5}>
          <div className="mt-4 border border-primary/20 p-10 hover:border-primary/40 transition-all duration-500 group bg-primary/5 hover:bg-primary/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary/40 mb-3">
                  {gifts[6].num} — The Collection
                </p>
                <h3 className="text-2xl md:text-3xl font-light text-gold-gradient mb-1">
                  {gifts[6].name}
                </h3>
                <p className="text-sm text-primary/60 font-light">{gifts[6].subtitle}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground/60 font-light italic">
                  {gifts[6].tagline}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.65}>
          <div className="text-center mt-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50">
              7 unique gift experiences · Each bottle 100ml
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GiftsSection;
