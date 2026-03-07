import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const MemorySection = () => {
  const [message, setMessage] = useState("");
  const [sealed, setSealed] = useState(false);
  const { t } = useLanguage();

  const handleSeal = () => {
    if (message.trim()) {
      setSealed(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding py-32">
      <div className="max-w-2xl mx-auto text-center w-full">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-6">{t.memory.label}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="text-4xl md:text-6xl font-light text-gold-gradient mb-8">{t.memory.title}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="text-lg text-foreground/70 font-light mb-4">{t.memory.p1}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <p className="text-lg text-foreground/70 font-light mb-4">
            {t.memory.p2}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <p className="text-lg text-foreground/70 font-light mb-12">
            {t.memory.p3}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <AnimatePresence mode="wait">
            {!sealed ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <p className="text-sm tracking-[0.2em] uppercase text-primary/50 mb-4">
                  {t.memory.prompt}
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.memory.placeholder}
                  className="w-full min-h-[140px] bg-secondary/50 border border-border text-foreground p-6 text-base font-light resize-none focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/40"
                />
                <button
                  onClick={handleSeal}
                  disabled={!message.trim()}
                  className="border border-primary/30 px-10 py-3 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t.memory.sealButton}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="sealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="space-y-6"
              >
                <div className="inline-block border border-primary/30 px-12 py-10 glow-gold">
                  <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">
                    {t.memory.sealedLabel}
                  </p>
                  <p className="text-lg text-foreground/80 font-light italic">"{message}"</p>
                  <div className="mt-6 h-px w-16 mx-auto bg-primary/30" />
                  <p className="mt-4 text-xs text-muted-foreground">
                    {t.memory.sealedCaption}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MemorySection;
