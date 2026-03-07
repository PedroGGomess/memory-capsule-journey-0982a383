import ScrollReveal from "./ScrollReveal";
import collectionImg from "@/assets/collection.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const wines = [
  { type: "Tawny", ages: ["Young", "10 Years", "30 Years", "50 Years", "100 Years"] },
  { type: "White", ages: ["Young", "10 Years", "30 Years", "50 Years", "100 Years"] },
];

const CollectionSection = () => {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center section-padding py-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-20">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-6">{t.collection.label}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-light text-gold-gradient mb-8">
              {t.collection.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-foreground/70 font-light">{t.collection.subtitle1}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-foreground/70 font-light">{t.collection.subtitle2}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="relative mb-20">
            <img
              src={collectionImg}
              alt="The 100's Collection"
              className="w-full max-w-4xl mx-auto rounded-sm object-cover"
            />
            <div className="absolute inset-0 border border-primary/10 rounded-sm max-w-4xl mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {wines.map((wine, wi) => (
            <ScrollReveal key={wine.type} delay={0.4 + wi * 0.2}>
              <div className="text-center">
                <h3 className="text-2xl font-light text-primary mb-8 tracking-wider">
                  {wine.type}
                </h3>
                <div className="space-y-3">
                  {wine.ages.map((age) => (
                    <div
                      key={age}
                      className="border-b border-border/50 pb-3 text-foreground/60 font-light text-sm tracking-wider hover:text-primary transition-colors duration-500"
                    >
                      {age}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.8}>
          <div className="text-center mt-20">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {t.collection.tagline1}
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50 mt-3">
              {t.collection.tagline2}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CollectionSection;
