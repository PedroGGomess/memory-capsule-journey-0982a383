import ScrollReveal from "./ScrollReveal";

interface StoryProps {
  image: string;
  title: string;
  lines: readonly string[];
  imagePosition?: "left" | "right" | "full";
  children?: React.ReactNode;
}

const StorySection = ({ image, title, lines, imagePosition = "right", children }: StoryProps) => {
  const isFullWidth = imagePosition === "full";

  if (isFullWidth) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full bg image */}
        <div className="absolute inset-0">
          <img src={image} alt={title} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>

        <div className="relative z-10 text-center section-padding max-w-3xl mx-auto py-32">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-6">{title}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-light text-gold-gradient mb-12">{title}</h2>
          </ScrollReveal>
          {lines.map((line, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.15}>
              <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed mb-4">
                {line}
              </p>
            </ScrollReveal>
          ))}
          {children && <ScrollReveal delay={0.6}>{children}</ScrollReveal>}
        </div>
      </section>
    );
  }

  const isLeft = imagePosition === "left";

  return (
    <section className="min-h-screen flex items-center section-padding py-32">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto w-full ${isLeft ? "" : ""}`}>
        <div className={`flex flex-col justify-center ${isLeft ? "lg:order-2" : "lg:order-1"}`}>
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-6">{title}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gold-gradient mb-10">
              {title}
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {lines.map((line, i) => (
              <ScrollReveal key={i} delay={0.3 + i * 0.15}>
                <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed">
                  {line}
                </p>
              </ScrollReveal>
            ))}
          </div>
          {children && <ScrollReveal delay={0.6}><div className="mt-10">{children}</div></ScrollReveal>}
        </div>

        <div className={`flex items-center justify-center ${isLeft ? "lg:order-1" : "lg:order-2"}`}>
          <ScrollReveal delay={0.3}>
            <div className="relative">
              <img
                src={image}
                alt={title}
                className="w-full max-w-md lg:max-w-lg rounded-sm object-cover shadow-2xl"
              />
              <div className="absolute inset-0 border border-primary/10 rounded-sm" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
