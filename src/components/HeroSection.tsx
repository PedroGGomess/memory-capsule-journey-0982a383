import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  onBegin: () => void;
}

const HeroSection = ({ onBegin }: HeroSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] animate-slow-pulse" />
      </div>

      {/* Gold line accent */}
      <div className="absolute left-1/2 top-0 h-32 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

      <motion.div
        className="relative z-10 text-center section-padding"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.p
          className="mb-6 text-xs tracking-[0.4em] uppercase text-primary/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-gold-gradient mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          The 100's
        </motion.h1>

        <motion.div
          className="space-y-2 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <p className="text-lg md:text-xl text-muted-foreground font-light italic">
            {t.hero.tagline1}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground font-light italic">
            {t.hero.tagline2}
          </p>
        </motion.div>

        <motion.button
          onClick={onBegin}
          className="group relative inline-flex items-center gap-3 border border-primary/30 px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{t.hero.cta}</span>
          <motion.span
            className="inline-block"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-primary/20 to-transparent" />
    </section>
  );
};

export default HeroSection;
