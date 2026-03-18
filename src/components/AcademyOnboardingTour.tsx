import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Compass, Target, Sparkles, ArrowRight, X, Wine, Users, Shield,
  Monitor, Briefcase, ClipboardList, Award, MessageCircle, Gift, Store, BarChart3
} from "lucide-react";
import logoImg from "@/assets/Logo.png";
import bottleCloseup from "@/assets/bottle-closeup.jpg";
import crossSellingImg from "@/assets/academy/cross-selling.jpg";
import hedonismImg from "@/assets/hedonism.jpg";
import digitalSystemsImg from "@/assets/academy/digital-systems.svg";
import badgeImg from "@/assets/badge.png";

const TOUR_SEEN_KEY = "the100s-tour-seen";

type Phase = "welcome" | "learning-areas" | "how-it-works";

export function AcademyOnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("welcome");
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem(TOUR_SEEN_KEY);
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const finish = () => {
    localStorage.setItem(TOUR_SEEN_KEY, "true");
    setVisible(false);
    navigate("/academy");
  };

  const skip = () => {
    localStorage.setItem(TOUR_SEEN_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tour"
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Backdrop - dark warm with slight blur */}
        <div className="absolute inset-0 bg-background/98 backdrop-blur-sm" />

        {/* Warm candlelit ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Close */}
        <button onClick={skip} className="absolute top-5 right-5 z-20 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Content container */}
        <div className="relative z-10 w-full max-w-2xl mx-4">
          <AnimatePresence mode="wait">
            {/* ── PHASE 1: Welcome ── */}
            {phase === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-8"
              >
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 120 }}
                  className="relative inline-block"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-150"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img src={logoImg} alt="The 100's" className="w-20 h-20 object-contain relative" />
                </motion.div>

                <div className="space-y-6">
                  <motion.div className="space-y-3">
                    <motion.p
                      className="text-[9px] tracking-[0.5em] uppercase text-primary/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Bem-vindo / Welcome
                    </motion.p>
                    <motion.h1
                      className="text-4xl md:text-5xl font-light text-gold-gradient"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      The 100's Academy
                    </motion.h1>
                  </motion.div>

                  {/* Welcome Video */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="w-full max-w-sm mx-auto"
                  >
                    <video
                      src="/src/assets/welcome-video.mp4"
                      autoPlay
                      muted
                      loop
                      className="w-full h-auto border border-primary/30"
                      style={{ aspectRatio: "16 / 9" }}
                    />
                  </motion.div>

                  <motion.div className="space-y-3 pt-2">
                    <p className="text-sm text-muted-foreground/60 font-light max-w-sm mx-auto leading-relaxed">
                      Bem-vindo à The 100's Academy
                    </p>
                    <p className="text-sm text-muted-foreground/60 font-light max-w-sm mx-auto leading-relaxed">
                      Welcome to The 100's Academy
                    </p>
                    <p className="text-xs text-muted-foreground/50 font-light max-w-sm mx-auto leading-relaxed italic">
                      Assiste a esta mensagem de boas-vindas antes de começares. / Watch this welcome message before you begin.
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="h-px w-12 bg-primary/20" />
                  <div className="h-1 w-1 rounded-full bg-primary/30" />
                  <div className="h-px w-12 bg-primary/20" />
                </motion.div>

                <motion.button
                  onClick={() => setPhase("learning-areas")}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 border border-primary/30 px-8 py-3 text-xs tracking-[0.25em] uppercase text-primary hover:border-primary hover:bg-primary/5 transition-all duration-500"
                >
                  Continuar → / Continue →
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={skip}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="block mx-auto text-[10px] text-muted-foreground/25 hover:text-muted-foreground/50 transition-colors tracking-[0.15em] uppercase"
                >
                  Skip / Saltar
                </motion.button>
              </motion.div>
            )}

            {/* ── PHASE 2: Learning Areas ── */}
            {phase === "learning-areas" && (
              <motion.div
                key="learning-areas"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <motion.p
                    className="text-[9px] tracking-[0.4em] uppercase text-primary/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    O que vais aprender / What you'll learn
                  </motion.p>
                  <motion.h2
                    className="text-2xl font-light text-foreground/90"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Áreas de Aprendizagem / Learning Areas
                  </motion.h2>
                  <motion.p
                    className="text-xs text-muted-foreground/60 font-light max-w-lg mx-auto pt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Os módulos são adaptados ao teu cargo — só vês o que é relevante para ti. / Modules are adapted to your role — you only see what's relevant to you.
                  </motion.p>
                </div>

                {/* Learning Areas */}
                <div className="space-y-3">
                  {[
                    { icon: Wine, image: bottleCloseup, pt: "A Marca & Produto", en: "Brand & Product", desc: "História, filosofia, gamas, materiais" },
                    { icon: Target, image: crossSellingImg, pt: "A Arte de Vender", en: "Sales Mastery", desc: "Perfis de cliente, técnicas de venda, cross-selling" },
                    { icon: Users, image: hedonismImg, pt: "A Experiência", en: "The Experience", desc: "Jornada do cliente, encantamento, cultura de serviço" },
                    { icon: Monitor, image: digitalSystemsImg, pt: "Operações & Digital", en: "Operations & Digital", desc: "POS, CRM, sistemas, impressora UV" },
                    { icon: Shield, image: badgeImg, pt: "Excelência", en: "Excellence", desc: "Conduta, vocabulário, transporte, certificação" },
                  ].map((area, i) => {
                    const Icon = area.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                        className="flex items-start gap-4 px-5 py-3 rounded-sm bg-secondary/30 border border-border/30"
                      >
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="p-2 bg-primary/15 rounded-sm">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <img src={area.image} alt={area.en} className="w-10 h-10 object-cover rounded-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-light text-foreground/90">
                            {area.pt} / {area.en}
                          </p>
                          <p className="text-xs font-light text-muted-foreground/60 mt-1">
                            {area.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Continue */}
                <motion.div
                  className="flex items-center justify-between pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <button
                    onClick={skip}
                    className="text-[10px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors tracking-[0.15em] uppercase"
                  >
                    Skip / Saltar
                  </button>
                  <motion.button
                    onClick={() => setPhase("how-it-works")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border border-primary/30 px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase text-primary hover:border-primary hover:bg-primary/5 transition-all duration-500"
                  >
                    Continuar / Continue
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* ── PHASE 3: How It Works ── */}
            {phase === "how-it-works" && (
              <motion.div
                key="how-it-works"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <motion.p
                    className="text-[9px] tracking-[0.4em] uppercase text-primary/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Como funciona / How it works
                  </motion.p>
                  <motion.h2
                    className="text-2xl font-light text-foreground/90"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    O Teu Percurso / Your Journey
                  </motion.h2>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  {[
                    { num: "1", pt: "Completa os módulos ao teu ritmo", en: "Complete modules at your own pace" },
                    { num: "2", pt: "Responde aos quizzes (mínimo 80%)", en: "Answer quizzes (minimum 80%)" },
                    { num: "3", pt: "Obtém a tua Certificação The 100's", en: "Get your The 100's Certification" },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                      className="flex items-start gap-4 px-5 py-4 rounded-sm bg-secondary/30 border border-border/30"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 border border-primary/40 shrink-0 font-light text-primary text-sm">
                        {step.num}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-light text-foreground/90">
                          {step.pt}
                        </p>
                        <p className="text-sm font-light text-foreground/70 mt-1">
                          {step.en}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="h-px w-12 bg-primary/20" />
                  <Sparkles className="w-3 h-3 text-primary/30" />
                  <div className="h-px w-12 bg-primary/20" />
                </motion.div>

                <motion.button
                  onClick={finish}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px -8px rgba(180,140,60,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full inline-flex items-center justify-center gap-3 border border-primary/40 px-10 py-3.5 text-xs tracking-[0.25em] uppercase text-primary hover:border-primary hover:bg-primary/5 transition-all duration-500"
                >
                  <Sparkles className="w-4 h-4" />
                  Começar → / Start →
                </motion.button>

                <motion.p
                  className="text-[9px] text-muted-foreground/20 tracking-[0.2em] uppercase text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  Boa sorte! / Good luck!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
