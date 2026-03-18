import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Sun, Moon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

import collectionImg from "@/assets/collection.jpg";
import giftPackagingImg from "@/assets/gift-packaging.jpg";
import storeInteriorImg from "@/assets/store-interior.jpg";

const Index = () => {
  const conceptRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleScroll = () => {
    conceptRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pillars = [
    { titlePt: "Descoberta", titleEn: "Discovery", descPt: "Explorar a história do Vinho do Porto", descEn: "Explore Port wine history" },
    { titlePt: "Tempo", titleEn: "Time", descPt: "Cápsulas seladas para o futuro", descEn: "Sealed capsules for the future" },
    { titlePt: "Singularidade", titleEn: "Singularity", descPt: "Cada peça é única e irrepetível", descEn: "Each piece is unique and irreplaceable" },
    { titlePt: "Hedonismo", titleEn: "Hedonism", descPt: "Celebrar o prazer e a sensibilidade", descEn: "Celebrate pleasure and sensuality" },
    { titlePt: "Memória", titleEn: "Memory", descPt: "Histórias que perduram para sempre", descEn: "Stories that last forever" },
  ];

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-lg tracking-[0.2em] font-light text-primary"
          >
            THE 100'S
          </motion.div>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="text-foreground/70 hover:text-primary transition-colors duration-200"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "pt" : "en")}
              className="text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-primary transition-colors"
            >
              {language === "en" ? "PT" : "EN"}
            </button>
            <Link
              to="/academy/login"
              className="text-xs tracking-[0.15em] uppercase text-primary hover:text-primary/80 transition-colors border border-primary px-3 py-1.5"
            >
              {language === "pt" ? "ACADEMIA" : "ACADEMY"}
            </Link>
          </div>
        </nav>
      </header>

      {/* Section 1 — Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-screen flex flex-col items-center justify-center pt-20"
      >
        <div className="text-center space-y-8 max-w-3xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl font-light text-gold-gradient tracking-tight"
          >
            THE 100'S
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-3xl md:text-5xl font-light text-foreground"
          >
            {language === "pt"
              ? "Uma Cápsula de Memória"
              : "A Memory Capsule"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg md:text-xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {language === "pt"
              ? "100ml de história do Vinho do Porto, selada para o futuro."
              : "100ml of Port wine history, sealed for the future."}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            onClick={handleScroll}
            className="inline-block border border-primary/50 px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary hover:border-primary hover:shadow-lg transition-all duration-500"
          >
            {language === "pt"
              ? "Começar a Experiência →"
              : "Begin the Experience →"}
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-primary/40" />
        </motion.div>
      </motion.section>

      {/* Section 2 — The Concept */}
      <motion.section
        ref={conceptRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <img
              src={collectionImg}
              alt="The Concept"
              className="w-full h-auto rounded-sm"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-xs tracking-[0.4em] uppercase text-primary/60">
                {language === "pt" ? "O Conceito" : "The Concept"}
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-gold-gradient">
                {language === "pt" ? "Memória" : "Memory"}
              </h2>
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {language === "pt"
                  ? "Não vendemos vinho. Criamos cápsulas de tempo — 100ml de Vinho do Porto transformados em memórias tangíveis que duram para sempre."
                  : "We don't sell wine. We create time capsules — 100ml of Port wine transformed into tangible memories that last forever."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </motion.section>

      {/* Section 3 — Five Pillars */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-6">
                {language === "pt" ? "Os Cinco Pilares" : "Five Pillars"}
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-gold-gradient">
                {language === "pt" ? "Fundação" : "Foundation"}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-16">
            {pillars.map((pillar, idx) => (
              <ScrollReveal key={idx} delay={0.1 * idx}>
                <motion.div
                  className="text-center space-y-4"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-light text-primary/30">{idx + 1}</div>
                  <h3 className="text-2xl font-light text-foreground">
                    {language === "pt" ? pillar.titlePt : pillar.titleEn}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground">
                    {language === "pt" ? pillar.descPt : pillar.descEn}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 4 — Product Showcase */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6 order-2 md:order-1">
              <p className="text-xs tracking-[0.4em] uppercase text-primary/60">
                {language === "pt" ? "Produtos" : "Products"}
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-gold-gradient">
                {language === "pt"
                  ? "Sete designs. Cinco gamas. Um legado."
                  : "Seven designs. Five ranges. One legacy."}
              </h2>
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {language === "pt"
                  ? "Cada cápsula é uma obra de arte, cuidadosamente desenhada e produzida para preservar histórias únicas."
                  : "Each capsule is a work of art, carefully designed and produced to preserve unique stories."}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <img
              src={giftPackagingImg}
              alt="Products"
              className="w-full h-auto rounded-sm order-1 md:order-2"
            />
          </ScrollReveal>
        </div>
      </motion.section>

      {/* Section 5 — The Store */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <img
              src={storeInteriorImg}
              alt="The Store"
              className="w-full h-auto rounded-sm"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-xs tracking-[0.4em] uppercase text-primary/60">
                {language === "pt" ? "Experiência" : "Experience"}
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-gold-gradient">
                {language === "pt" ? "A Casa dos 100's" : "The House of 100's"}
              </h2>
              <p className="text-lg font-light text-muted-foreground mb-4">
                Rua Sá da Bandeira 150, Porto
              </p>
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {language === "pt"
                  ? "Visite nosso espaço imersivo e descubra a história por trás de cada cápsula."
                  : "Visit our immersive space and discover the story behind each capsule."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 border-t border-border/20"
      >
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-gold-gradient mb-4">
              THE 100'S
            </h2>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {language === "pt" ? "Cápsulas de Memória" : "Memory Capsules"}
            </p>
          </div>

          <Link
            to="/academy/login"
            className="inline-block border border-primary/50 px-10 py-4 text-sm tracking-[0.2em] uppercase text-primary hover:border-primary hover:shadow-lg transition-all duration-500"
          >
            {language === "pt"
              ? "ENTRAR NA ACADEMIA"
              : "ENTER ACADEMY"}
          </Link>

          <div className="h-px w-16 mx-auto bg-primary/20" />

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground/50">
              <button
                onClick={() => setLanguage(language === "en" ? "pt" : "en")}
                className="hover:text-muted-foreground/80 transition-colors"
              >
                {language === "en" ? "Português" : "English"}
              </button>
              <span>|</span>
              <a href="#" className="hover:text-muted-foreground/80 transition-colors">
                {language === "pt" ? "Instagram" : "Instagram"}
              </a>
              <span>|</span>
              <a href="#" className="hover:text-muted-foreground/80 transition-colors">
                {language === "pt" ? "LinkedIn" : "LinkedIn"}
              </a>
            </div>
            <p className="text-xs text-muted-foreground/30">
              © {new Date().getFullYear()} The 100's. {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
