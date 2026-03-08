import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, BarChart3, Award, Sparkles, ArrowRight, X
} from "lucide-react";
import logoImg from "@/assets/Logo.png";

const TOUR_SEEN_KEY = "the100s-tour-seen";

interface TourStep {
  icon: React.ElementType;
  label: string;
  description: string;
  path: string;
  accent?: boolean;
}

const steps: TourStep[] = [
  { icon: BookOpen, label: "A Nossa História", description: "A origem, a missão e o que nos torna únicos.", path: "/academy/module/story" },
  { icon: Compass, label: "Filosofia", description: "Os valores que guiam cada decisão.", path: "/academy/module/philosophy" },
  { icon: Wine, label: "Produtos", description: "A coleção e a experiência por trás de cada rótulo.", path: "/academy/module/products" },
  { icon: Gift, label: "Conceito de Presente", description: "Transformar cada garrafa numa experiência.", path: "/academy/module/gift" },
  { icon: Store, label: "Experiência em Loja", description: "As 6 zonas da jornada do cliente.", path: "/academy/module/store" },
  { icon: MessageCircle, label: "Voz da Marca", description: "O tom e o estilo The 100's.", path: "/academy/module/brand-voice" },
  { icon: Users, label: "Experiência do Cliente", description: "Criar conexões autênticas.", path: "/academy/module/customer-experience" },
  { icon: BarChart3, label: "Modelo de Negócio", description: "Estratégia e visão do negócio.", path: "/academy/module/business-model" },
  { icon: Award, label: "Certificação", description: "O teu certificado oficial The 100's.", path: "/academy/module/certification", accent: true },
];

type Phase = "welcome" | "modules" | "assistant";

export function AcademyOnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("welcome");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem(TOUR_SEEN_KEY);
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Animate module highlights one by one
  useEffect(() => {
    if (phase !== "modules") return;
    setHighlightIndex(-1);
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setHighlightIndex(i);
        i++;
        if (i >= steps.length) clearInterval(interval);
      }, 180);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, [phase]);

  const finish = () => {
    localStorage.setItem(TOUR_SEEN_KEY, "true");
    setVisible(false);
    navigate("/academy/module/ai-assistant");
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
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Close */}
        <button onClick={skip} className="absolute top-5 right-5 z-20 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Content container */}
        <div className="relative z-10 w-full max-w-xl mx-4">
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
                  <img src={logoImg} alt="The 100's" className="w-28 h-28 object-contain relative" />
                </motion.div>

                <div className="space-y-3">
                  <motion.p
                    className="text-[9px] tracking-[0.5em] uppercase text-primary/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Bem-vindo à
                  </motion.p>
                  <motion.h1
                    className="text-4xl md:text-5xl font-light text-gold-gradient"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    The 100's Academy
                  </motion.h1>
                  <motion.p
                    className="text-sm text-muted-foreground/60 font-light max-w-sm mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    A tua jornada de formação começa aqui. Vou mostrar-te tudo o que vais encontrar.
                  </motion.p>
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
                  onClick={() => setPhase("modules")}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 border border-primary/30 px-8 py-3 text-xs tracking-[0.25em] uppercase text-primary hover:border-primary hover:bg-primary/5 transition-all duration-500"
                >
                  Descobrir
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={skip}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="block mx-auto text-[10px] text-muted-foreground/25 hover:text-muted-foreground/50 transition-colors tracking-[0.15em] uppercase"
                >
                  Saltar tour
                </motion.button>
              </motion.div>
            )}

            {/* ── PHASE 2: All modules at once ── */}
            {phase === "modules" && (
              <motion.div
                key="modules"
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
                    A tua formação
                  </motion.p>
                  <motion.h2
                    className="text-2xl font-light text-foreground/90"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    9 módulos para dominares
                  </motion.h2>
                </div>

                {/* Module list */}
                <div className="space-y-1">
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    const revealed = i <= highlightIndex;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: revealed ? 1 : 0.15,
                          x: revealed ? 0 : -10,
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={`flex items-center gap-4 px-5 py-3 rounded-sm transition-colors duration-300 ${
                          revealed && s.accent ? "bg-primary/5 border border-primary/15" : revealed ? "bg-card/50" : ""
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          revealed ? (s.accent ? "bg-primary/15" : "bg-secondary/60") : "bg-secondary/20"
                        }`}>
                          <Icon className={`w-4 h-4 transition-colors duration-300 ${
                            revealed ? (s.accent ? "text-primary" : "text-foreground/60") : "text-foreground/20"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-light transition-colors duration-300 ${
                            revealed ? "text-foreground/90" : "text-foreground/20"
                          }`}>
                            {s.label}
                          </p>
                          <p className={`text-xs font-light transition-colors duration-300 truncate ${
                            revealed ? "text-muted-foreground/60" : "text-muted-foreground/15"
                          }`}>
                            {s.description}
                          </p>
                        </div>
                        <span className={`text-[9px] tracking-[0.2em] uppercase shrink-0 transition-colors duration-300 ${
                          revealed ? "text-primary/40" : "text-primary/10"
                        }`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Continue */}
                <motion.div
                  className="flex items-center justify-between pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: highlightIndex >= steps.length - 1 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <button
                    onClick={skip}
                    className="text-[10px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors tracking-[0.15em] uppercase"
                  >
                    Saltar
                  </button>
                  <motion.button
                    onClick={() => setPhase("assistant")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 border border-primary/30 px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase text-primary hover:border-primary hover:bg-primary/5 transition-all duration-500"
                  >
                    Continuar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* ── PHASE 3: AI Assistant ── */}
            {phase === "assistant" && (
              <motion.div
                key="assistant"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="relative inline-block"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-[2]"
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.8, 2.2, 1.8] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="w-20 h-20 rounded-full bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center relative">
                    <Bot className="w-9 h-9 text-primary" />
                  </div>
                </motion.div>

                <div className="space-y-3">
                  <motion.h2
                    className="text-3xl font-light text-gold-gradient"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Estou aqui para ti
                  </motion.h2>
                  <motion.p
                    className="text-sm text-muted-foreground/60 font-light max-w-sm mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Sempre que tiveres dúvidas ou precisares de ajuda, encontra-me na secção <strong className="text-foreground/70">Assistente IA</strong>. Estou sempre disponível.
                  </motion.p>
                </div>

                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="h-px w-12 bg-primary/20" />
                  <Sparkles className="w-3 h-3 text-primary/30" />
                  <div className="h-px w-12 bg-primary/20" />
                </motion.div>

                <motion.button
                  onClick={finish}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px -8px rgba(180,140,60,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 border border-primary/40 px-10 py-3.5 text-xs tracking-[0.25em] uppercase text-primary hover:border-primary hover:bg-primary/5 transition-all duration-500"
                >
                  <Sparkles className="w-4 h-4" />
                  Começar a jornada
                </motion.button>

                <motion.p
                  className="text-[9px] text-muted-foreground/20 tracking-[0.2em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Boa sorte!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
