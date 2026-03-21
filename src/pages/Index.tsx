import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Sun, Moon, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

import collectionImg from "@/assets/collection.jpg";
import giftPackagingImg from "@/assets/gift-packaging.jpg";
import storeInteriorImg from "@/assets/store-interior.jpg";
import cylinderCorkImg from "@/assets/produtos/cilindro-cork-1.jpg";
import cubeCorkImg from "@/assets/produtos/quadrado-cork-1.jpg";
import cubeOakImg from "@/assets/produtos/quadrado-carvalho-1.jpg";
import cubeWalnutImg from "@/assets/produtos/quadrado-nogueira-1.jpg";

const Index = () => {
  const conceptRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Hidden admin entry easter egg
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSecretClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        window.location.href = "/gym-admin/login";
        return 0;
      }
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => setClickCount(0), 3000);
      return newCount;
    });
  };

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

  const academyStats = [
    { value: "22", label: language === "pt" ? "Módulos" : "Modules" },
    { value: "100%", label: language === "pt" ? "Em Vídeo" : "Video Content" },
    { value: "∞", label: language === "pt" ? "Quizzes" : "Quizzes" },
    { value: "✓", label: language === "pt" ? "Certificação" : "Certification" },
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
        className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />

        <div className="text-center space-y-8 max-w-3xl mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl font-light text-gold-gradient tracking-tight"
          >
            THE 100'S
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-xs mx-auto"
          />

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
            className="inline-block border-2 border-primary px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(218,165,32,0.2)] transition-all duration-500 relative group"
          >
            <span className="relative z-10">
              {language === "pt"
                ? "Começar a Experiência"
                : "Begin the Experience"}
            </span>
            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Scroll Indicator with text */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs tracking-[0.2em] uppercase text-primary/50"
          >
            {language === "pt" ? "Rolar para Explorar" : "Scroll to Explore"}
          </motion.p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-primary/40" />
          </motion.div>
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
            <motion.div
              className="relative group overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={collectionImg}
                alt="The Concept"
                className="w-full h-auto"
              />
              {/* Gold border accent on hover */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-500" />
              <div className="absolute -inset-0.5 border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <p className="text-xs tracking-[0.4em] uppercase text-primary/60">
                {language === "pt" ? "O Conceito" : "The Concept"}
              </p>

              {/* Large decorative quote mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-8xl font-light text-primary"
              >
                "
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-light text-gold-gradient -mt-4">
                {language === "pt" ? "Memória" : "Memory"}
              </h2>

              {/* Subtle divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                className="h-px w-12 bg-primary"
              />

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

          <div className="relative mt-16">
            {/* Connecting horizontal line on desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {pillars.map((pillar, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <motion.div
                    className="text-center space-y-4 group"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Numbered indicator with gold styling */}
                    <motion.div
                      className="text-5xl font-light text-primary/40 group-hover:text-primary transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </motion.div>

                    {/* Decorative element - subtle circle */}
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border border-primary/20 group-hover:border-primary/60 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-light text-foreground group-hover:text-primary transition-colors duration-300 relative">
                      {language === "pt" ? pillar.titlePt : pillar.titleEn}
                      {/* Gold underline on hover */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: "center" }}
                      />
                    </h3>

                    <p className="text-sm font-light text-muted-foreground">
                      {language === "pt" ? pillar.descPt : pillar.descEn}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
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
              {/* Collection Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-primary border border-primary px-4 py-2 font-light">
                  {language === "pt" ? "Coleção" : "Collection"}
                </span>
              </motion.div>

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

              {/* Price ranges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-xs tracking-[0.15em] uppercase">
                  <span className="text-primary block">€20-35</span>
                  <span className="text-muted-foreground text-xs">{language === "pt" ? "Entrada" : "Entry"}</span>
                </div>
                <div className="text-xs tracking-[0.15em] uppercase">
                  <span className="text-primary block">€35-70</span>
                  <span className="text-muted-foreground text-xs">{language === "pt" ? "Premium" : "Premium"}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <img
              src={giftPackagingImg}
              alt="Products"
              className="w-full h-auto order-1 md:order-2"
            />
          </ScrollReveal>
        </div>
      </motion.section>

      {/* Section 4.5 — Product Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Cylinder Cork */}
            <ScrollReveal>
              <motion.div
                className="flex flex-col items-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full overflow-hidden mb-4">
                  <img
                    src={cylinderCorkImg}
                    alt="Cork Cylinder"
                    className="w-full h-auto"
                  />
                  {/* Gold corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                </div>
                <motion.p
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1, color: "rgb(218, 165, 32)" }}
                  className="text-xs tracking-[0.15em] uppercase text-foreground/60 text-center font-light transition-colors"
                >
                  {language === "pt" ? "Cilindro Cortiça" : "Cork Cylinder"}
                </motion.p>
              </motion.div>
            </ScrollReveal>

            {/* Cube Cork */}
            <ScrollReveal delay={0.1}>
              <motion.div
                className="flex flex-col items-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full overflow-hidden mb-4">
                  <img
                    src={cubeCorkImg}
                    alt="Cork Cube"
                    className="w-full h-auto"
                  />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                </div>
                <motion.p
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1, color: "rgb(218, 165, 32)" }}
                  className="text-xs tracking-[0.15em] uppercase text-foreground/60 text-center font-light transition-colors"
                >
                  {language === "pt" ? "Cubo Cortiça" : "Cork Cube"}
                </motion.p>
              </motion.div>
            </ScrollReveal>

            {/* Cube Oak */}
            <ScrollReveal delay={0.2}>
              <motion.div
                className="flex flex-col items-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full overflow-hidden mb-4">
                  <img
                    src={cubeOakImg}
                    alt="Oak Wood Cube"
                    className="w-full h-auto"
                  />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                </div>
                <motion.p
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1, color: "rgb(218, 165, 32)" }}
                  className="text-xs tracking-[0.15em] uppercase text-foreground/60 text-center font-light transition-colors"
                >
                  {language === "pt" ? "Cubo Carvalho" : "Oak Wood Cube"}
                </motion.p>
              </motion.div>
            </ScrollReveal>

            {/* Cube Walnut */}
            <ScrollReveal delay={0.3}>
              <motion.div
                className="flex flex-col items-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full overflow-hidden mb-4">
                  <img
                    src={cubeWalnutImg}
                    alt="Walnut Wood Cube"
                    className="w-full h-auto"
                  />
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/0 group-hover:border-primary transition-all duration-300" />
                </div>
                <motion.p
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1, color: "rgb(218, 165, 32)" }}
                  className="text-xs tracking-[0.15em] uppercase text-foreground/60 text-center font-light transition-colors"
                >
                  {language === "pt" ? "Cubo Nogueira" : "Walnut Wood Cube"}
                </motion.p>
              </motion.div>
            </ScrollReveal>
          </div>
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
            <motion.div
              className="relative group overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={storeInteriorImg}
                alt="The Store"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/60 transition-colors duration-500" />
              <div className="absolute -inset-0.5 border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <p className="text-xs tracking-[0.4em] uppercase text-primary/60">
                {language === "pt" ? "Experiência" : "Experience"}
              </p>
              <h2 className="text-5xl md:text-6xl font-light text-gold-gradient">
                {language === "pt" ? "A Casa dos 100's" : "The House of 100's"}
              </h2>

              {/* Prominent Address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 bg-primary/5 border border-primary/20 px-6 py-6"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-primary/70">
                  {language === "pt" ? "Localização" : "Location"}
                </p>
                <p className="text-lg font-light text-primary">
                  Rua Sá da Bandeira 150<br />
                  <span className="text-muted-foreground">Porto, 4000-432</span>
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-primary/60 pt-2">
                  {language === "pt" ? "Seg-Sábado: 10h-19h" : "Mon-Sat: 10am-7pm"}
                </p>
              </motion.div>

              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {language === "pt"
                  ? "Visite nosso espaço imersivo e descubra a história por trás de cada cápsula."
                  : "Visit our immersive space and discover the story behind each capsule."}
              </p>

              {/* Visit CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="inline-block border-2 border-primary px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/10 transition-all duration-500 w-full md:w-auto text-center"
              >
                {language === "pt" ? "Agendar Visita →" : "Schedule Visit →"}
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </motion.section>

      {/* Section 6 — Academy Teaser */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="max-w-7xl mx-auto w-full px-6">
          <ScrollReveal>
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="space-y-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-6xl font-light text-gold-gradient"
                >
                  {language === "pt" ? "THE 100'S ACADEMY" : "THE 100'S ACADEMY"}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-xl font-light text-muted-foreground"
                >
                  {language === "pt"
                    ? "Formação de excelência para uma equipa de excelência"
                    : "Excellence training for an excellent team"}
                </motion.p>
              </div>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
                className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
              />

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {academyStats.map((stat, idx) => (
                  <ScrollReveal key={idx} delay={0.1 * idx}>
                    <motion.div
                      className="space-y-2 group cursor-default"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="text-4xl md:text-5xl font-light text-primary/40 group-hover:text-primary transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                        {stat.label}
                      </p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Academy CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link
                  to="/academy/login"
                  className="inline-flex items-center gap-3 border-2 border-primary px-10 py-4 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(218,165,32,0.2)] transition-all duration-500 group"
                >
                  <span>
                    {language === "pt" ? "Aceder à Academia" : "Access Academy"}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 pt-4"
              >
                {language === "pt" ? "Exclusivo para Equipa The 100's" : "Exclusive for The 100's Team"}
              </motion.p>
            </div>
          </ScrollReveal>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="border-t border-border/20 bg-gradient-to-b from-background to-background/80 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <ScrollReveal>
              <div className="space-y-4">
                <h3 className="text-xl font-light text-primary tracking-[0.15em] uppercase">
                  THE 100'S
                </h3>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  {language === "pt"
                    ? "Cápsulas de tempo que preservam histórias."
                    : "Time capsules that preserve stories."}
                </p>
                <p className="text-xs text-primary/50 font-light tracking-[0.1em]">
                  {language === "pt" ? "Criado no Porto" : "Crafted in Porto"}
                </p>
              </div>
            </ScrollReveal>

            {/* Location Column */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-4">
                <h4 className="text-xs font-light text-foreground tracking-[0.2em] uppercase opacity-70">
                  {language === "pt" ? "Visite-nos" : "Visit Us"}
                </h4>
                <div className="space-y-2 text-xs font-light text-muted-foreground">
                  <p>Rua Sá da Bandeira 150</p>
                  <p>4000-432 Porto, Portugal</p>
                  <p className="pt-2 text-primary/60">
                    {language === "pt" ? "Seg-Sábado: 10h-19h" : "Mon-Sat: 10am-7pm"}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Links */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                <h4 className="text-xs font-light text-foreground tracking-[0.2em] uppercase opacity-70">
                  {language === "pt" ? "Links" : "Links"}
                </h4>
                <div className="space-y-2">
                  <Link
                    to="/academy/login"
                    className="text-xs font-light text-muted-foreground hover:text-primary transition-colors"
                  >
                    {language === "pt" ? "Academia" : "Academy"}
                  </Link>
                  <p className="text-xs font-light text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    {language === "pt" ? "Coleção" : "Collection"}
                  </p>
                  <button
                    onClick={() => setLanguage(language === "en" ? "pt" : "en")}
                    className="text-xs font-light text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {language === "en" ? "Português" : "English"}
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Social & Newsletter */}
            <ScrollReveal delay={0.3}>
              <div className="space-y-4">
                <h4 className="text-xs font-light text-foreground tracking-[0.2em] uppercase opacity-70">
                  {language === "pt" ? "Siga-nos" : "Follow"}
                </h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-8 h-8 border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center text-xs text-primary"
                    title="Instagram"
                  >
                    ig
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center text-xs text-primary"
                    title="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center text-xs text-primary"
                    title="Email"
                  >
                    @
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          />

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/50">
            <p
              className="cursor-pointer hover:text-muted-foreground/80 transition-colors"
              onClick={handleSecretClick}
            >
              © {new Date().getFullYear()} The 100's. {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-muted-foreground/80 transition-colors text-xs">
                {language === "pt" ? "Privacidade" : "Privacy"}
              </a>
              <span>—</span>
              <a href="#" className="hover:text-muted-foreground/80 transition-colors text-xs">
                {language === "pt" ? "Termos" : "Terms"}
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
