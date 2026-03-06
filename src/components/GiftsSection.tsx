import ScrollReveal from "./ScrollReveal";

const gifts = [
  {
    name: "Entry Gift",
    tagline: "A lembrança perfeita para iniciar a viagem.",
    price: "A partir de 19,99€",
    num: "01",
    featured: false,
  },
  {
    name: "Cilindro Duas Tampas",
    tagline: "Elegância em cerâmica e cortiça.",
    price: "A partir de 29,99€",
    num: "02",
    featured: false,
  },
  {
    name: "Cilindro Cortiça",
    tagline: "Sofisticação e durabilidade.",
    price: "A partir de 49,99€",
    num: "03",
    featured: false,
  },
  {
    name: "Cubo Duas Tampas",
    tagline: "Estilo moderno em cerâmica e cortiça.",
    price: "A partir de 69,99€",
    num: "04",
    featured: false,
  },
  {
    name: "Cubo Cortiça",
    tagline: "O bloco maciço para colecionadores.",
    price: "A partir de 99,99€",
    num: "05",
    featured: false,
  },
  {
    name: "Madeira de Carvalho + Latão",
    tagline: "Clássico intemporal.",
    price: "A partir de 230€",
    num: "06",
    featured: false,
  },
  {
    name: "Madeira de Nogueira + Latão",
    tagline: "A nossa embalagem mais exclusiva.",
    price: "A partir de 260€",
    num: "07",
    featured: true,
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
              7 Unique Gifts.{" "}
              <span className="block">7 Ways to Keep Time.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-lg text-foreground/60 font-light max-w-xl mx-auto">
              Each packaging is a vessel for memory — crafted to endure long after the wine is
              gone.
            </p>
          </ScrollReveal>
        </div>

        {/* Gift cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gifts.slice(0, 6).map((gift, i) => (
            <ScrollReveal key={gift.num} delay={0.1 + i * 0.08}>
              <div className="border border-border/30 p-8 hover:border-primary/30 transition-all duration-500 group bg-card/10 hover:bg-card/30 h-full flex flex-col">
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary/40 mb-4">
                  {gift.num}
                </p>
                <h3 className="text-xl font-light text-foreground/90 mb-2 group-hover:text-primary transition-colors duration-500">
                  {gift.name}
                </h3>
                <div className="h-px w-8 bg-primary/20 mb-3 group-hover:w-16 transition-all duration-500" />
                <p className="text-xs text-muted-foreground/60 font-light italic mb-4 flex-1">
                  {gift.tagline}
                </p>
                <p className="text-sm text-primary/70 font-light tracking-wide">
                  {gift.price}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Most exclusive — featured */}
        <ScrollReveal delay={0.5}>
          <div className="mt-4 border border-primary/20 p-10 hover:border-primary/40 transition-all duration-500 group bg-primary/5 hover:bg-primary/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary/40 mb-3">
                  {gifts[6].num} — Most Exclusive
                </p>
                <h3 className="text-2xl md:text-3xl font-light text-gold-gradient mb-2">
                  {gifts[6].name}
                </h3>
                <p className="text-sm text-muted-foreground/60 font-light italic">
                  {gifts[6].tagline}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-light text-primary/80 tracking-wide">
                  {gifts[6].price}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Second Life Concept note */}
        <ScrollReveal delay={0.65}>
          <div className="text-center mt-16">
            <div className="h-px w-16 mx-auto bg-primary/20 mb-6" />
            <p className="text-xs tracking-[0.3em] uppercase text-primary/50">
              Second Life Concept
            </p>
            <p className="mt-2 text-sm text-muted-foreground/50 font-light italic">
              Crafted to live beyond the wine.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GiftsSection;
