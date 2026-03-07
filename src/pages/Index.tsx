import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import LandingNav from "@/components/LandingNav";
import StorySection from "@/components/StorySection";
import MemorySection from "@/components/MemorySection";
import CollectionSection from "@/components/CollectionSection";
import GiftsSection from "@/components/GiftsSection";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

import heroDropImg from "@/assets/hero-drop.jpg";
import hourglassImg from "@/assets/hourglass.jpg";
import bottleImg from "@/assets/bottle-closeup.jpg";
import hedonismImg from "@/assets/hedonism.jpg";

const Index = () => {
  const journeyRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleBegin = () => {
    journeyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen">
      <LandingNav />
      <HeroSection onBegin={handleBegin} />

      <motion.div
        ref={journeyRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {/* Divider */}
        <div className="flex items-center justify-center py-16">
          <div className="h-px w-24 bg-primary/20" />
          <div className="mx-4 h-1.5 w-1.5 rounded-full bg-primary/40" />
          <div className="h-px w-24 bg-primary/20" />
        </div>

        {/* Section 2 — Discovery */}
        <StorySection
          image={heroDropImg}
          title={t.sections.discovery.title}
          imagePosition="right"
          lines={t.sections.discovery.lines as string[]}
        />

        {/* Section 3 — Time */}
        <StorySection
          image={hourglassImg}
          title={t.sections.time.title}
          imagePosition="left"
          lines={t.sections.time.lines as string[]}
        />

        {/* Section 4 — Singularity */}
        <StorySection
          image={bottleImg}
          title={t.sections.singularity.title}
          imagePosition="right"
          lines={t.sections.singularity.lines as string[]}
        />

        {/* Section 5 — Hedonism */}
        <StorySection
          image={hedonismImg}
          title={t.sections.hedonism.title}
          imagePosition="full"
          lines={t.sections.hedonism.lines as string[]}
        />

        {/* Section 6 — What is The 100's */}
        <section className="min-h-[60vh] flex items-center section-padding py-32">
          <div className="max-w-4xl mx-auto w-full">
            <ScrollReveal>
              <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-8">{t.brand.label}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="text-4xl md:text-6xl font-light text-gold-gradient mb-10">
                {t.brand.title}
              </h2>
            </ScrollReveal>
            <div className="space-y-6 max-w-2xl">
              <ScrollReveal delay={0.25}>
                <p className="text-lg text-foreground/70 font-light leading-relaxed">
                  {t.brand.p1}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <p className="text-lg text-foreground/70 font-light leading-relaxed">
                  {t.brand.p2}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.45}>
                <p className="text-lg text-foreground/70 font-light leading-relaxed">
                  {t.brand.p3}
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.55}>
              <div className="mt-12 h-px w-16 bg-primary/20" />
              <p className="mt-6 text-xs tracking-[0.3em] uppercase text-muted-foreground/50">
                {t.brand.tagline}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 7 — Gifts */}
        <GiftsSection />

        {/* Section 8 — Memory */}
        <MemorySection />

        {/* Section 9 — Collection */}
        <CollectionSection />

        {/* Footer */}
        <footer className="py-20 text-center section-padding border-t border-border/30">
          <p className="text-2xl md:text-3xl font-light text-gold-gradient mb-4">The 100's</p>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            {t.footer.subtitle}
          </p>
          <p className="text-xs text-muted-foreground/40 mb-8">
            {t.footer.tagline}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/academy/login"
              className="inline-block border border-primary/30 px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold"
            >
              {t.footer.enterAcademy}
            </Link>
            <Link
              to="/gym-admin/login"
              className="inline-flex items-center gap-2 border border-border/30 px-8 py-4 text-sm tracking-[0.25em] uppercase text-muted-foreground/60 transition-all duration-500 hover:border-border/60 hover:text-muted-foreground"
            >
              {t.footer.adminDashboard}
            </Link>
          </div>
          <div className="mt-10 h-px w-16 mx-auto bg-primary/20" />
          <p className="mt-8 text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} The 100's. {t.footer.rights}
          </p>
        </footer>
      </motion.div>
    </div>
  );
};

export default Index;
