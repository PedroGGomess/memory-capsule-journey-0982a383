import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, BarChart3, Award, Sparkles, ArrowRight, X, ChevronLeft
} from "lucide-react";
import logoImg from "@/assets/Logo.png";

interface TourStep {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  position: "center" | "bottom-right" | "bottom-left" | "top-right";
  accent?: boolean;
}

const TOUR_SEEN_KEY = "the100s-tour-seen";

const tourSteps: TourStep[] = [
  {
    icon: Bot,
    title: "Bem-vindo à Academy",
    subtitle: "O TEU GUIA PESSOAL",
    description: "Olá! Sou o teu assistente The 100's. Vou levar-te numa viagem por toda a Academy — cada módulo, cada ferramenta. Prepara-te para descobrir o universo The 100's.",
    path: "/academy",
    position: "center",
    accent: true,
  },
  {
    icon: BookOpen,
    title: "A Nossa História",
    subtitle: "MÓDULO 1",
    description: "Tudo começa aqui. Descobre a origem da The 100's, a nossa missão e o que nos diferencia no universo dos vinhos premium.",
    path: "/academy/module/story",
    position: "bottom-right",
  },
  {
    icon: Compass,
    title: "Filosofia",
    subtitle: "MÓDULO 2",
    description: "Os valores e princípios que guiam cada decisão. Entende a essência por trás de cada garrafa.",
    path: "/academy/module/philosophy",
    position: "bottom-left",
  },
  {
    icon: Wine,
    title: "Produtos",
    subtitle: "MÓDULO 3",
    description: "Conhece a nossa coleção — vinhos, design e a experiência sensorial por trás de cada rótulo.",
    path: "/academy/module/products",
    position: "bottom-right",
  },
  {
    icon: Gift,
    title: "Conceito de Presente",
    subtitle: "MÓDULO 4",
    description: "Cada garrafa é uma experiência. Aprende como transformamos o ato de oferecer em algo memorável.",
    path: "/academy/module/gift",
    position: "bottom-left",
  },
  {
    icon: Store,
    title: "Experiência em Loja",
    subtitle: "MÓDULO 5",
    description: "As 6 zonas da jornada do cliente. Descobre como criar momentos inesquecíveis no nosso espaço.",
    path: "/academy/module/store",
    position: "bottom-right",
  },
  {
    icon: MessageCircle,
    title: "Voz da Marca",
    subtitle: "MÓDULO 6",
    description: "O tom, o estilo, a forma como comunicamos. Aprende a falar como The 100's.",
    path: "/academy/module/brand-voice",
    position: "bottom-left",
  },
  {
    icon: Users,
    title: "Experiência do Cliente",
    subtitle: "MÓDULO 7",
    description: "A arte de criar conexões autênticas com cada pessoa que nos visita.",
    path: "/academy/module/customer-experience",
    position: "bottom-right",
  },
  {
    icon: BarChart3,
    title: "Modelo de Negócio",
    subtitle: "MÓDULO 8",
    description: "Os números, a estratégia e a visão por trás do negócio The 100's.",
    path: "/academy/module/business-model",
    position: "bottom-left",
  },
  {
    icon: Award,
    title: "Certificação",
    subtitle: "MÓDULO 9",
    description: "O teu objetivo final. Completa todos os módulos e recebe o teu certificado oficial The 100's Academy.",
    path: "/academy/module/certification",
    position: "bottom-right",
    accent: true,
  },
  {
    icon: Bot,
    title: "Estou aqui para ti",
    subtitle: "O TEU ASSISTENTE IA",
    description: "Sempre que tiveres dúvidas, precisares de ajuda ou quiseres explorar mais — encontra-me aqui. Estou sempre disponível para ti. Boa jornada!",
    path: "/academy/module/ai-assistant",
    position: "center",
    accent: true,
  },
];

// Floating particles for ambient effect
const GoldParticles = ({ count = 12 }: { count?: number }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const getPositionClasses = (position: TourStep["position"]) => {
  switch (position) {
    case "center":
      return "items-center justify-center";
    case "bottom-right":
      return "items-end justify-end p-6 md:p-10";
    case "bottom-left":
      return "items-end justify-start p-6 md:p-10";
    case "top-right":
      return "items-start justify-end p-6 md:p-10";
    default:
      return "items-center justify-center";
  }
};

export function AcademyOnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const seen = localStorage.getItem(TOUR_SEEN_KEY);
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Navigate to the step's page
  const navigateToStep = useCallback(
    (stepIndex: number) => {
      const target = tourSteps[stepIndex];
      if (location.pathname !== target.path) {
        setIsNavigating(true);
        navigate(target.path);
        // Wait for page to render
        setTimeout(() => setIsNavigating(false), 600);
      }
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    if (visible) {
      navigateToStep(step);
    }
  }, [step, visible, navigateToStep]);

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleFinish = () => {
    localStorage.setItem(TOUR_SEEN_KEY, "true");
    setVisible(false);
    navigate("/academy/module/ai-assistant");
  };

  const handleSkip = () => {
    localStorage.setItem(TOUR_SEEN_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  const current = tourSteps[step];
  const Icon = current.icon;
  const isLast = step === tourSteps.length - 1;
  const isFirst = step === 0;
  const isCenter = current.position === "center";
  const progress = ((step + 1) / tourSteps.length) * 100;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="tour-overlay"
        className={`fixed inset-0 z-[100] flex ${getPositionClasses(current.position)}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Semi-transparent backdrop — less opaque so user can see page behind */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: isCenter
              ? "rgba(12,10,9,0.92)"
              : "rgba(12,10,9,0.65)",
          }}
          transition={{ duration: 0.5 }}
          style={{ backdropFilter: isCenter ? "blur(12px)" : "blur(4px)" }}
        />

        {/* Gold ambient particles */}
        {current.accent && <GoldParticles count={20} />}

        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <motion.div
            className="h-[2px] bg-primary/60"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-5 right-5 z-20 text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tour card */}
        <motion.div
          key={step}
          initial={{
            opacity: 0,
            y: isCenter ? 40 : 30,
            scale: isCenter ? 0.9 : 0.95,
          }}
          animate={{
            opacity: isNavigating ? 0.3 : 1,
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 ${
            isCenter ? "w-full max-w-lg mx-4" : "w-full max-w-sm"
          }`}
        >
          <div
            className={`border bg-card/95 backdrop-blur-xl overflow-hidden ${
              current.accent
                ? "border-primary/30 shadow-[0_0_60px_-12px_rgba(180,140,60,0.2)]"
                : "border-border/30 shadow-[0_0_40px_-12px_rgba(0,0,0,0.4)]"
            }`}
          >
            {/* Top accent line */}
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />

            <div className={`${isCenter ? "p-10" : "p-7"} space-y-5`}>
              {/* Logo on first step */}
              {isFirst && (
                <motion.div
                  className="flex justify-center"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, duration: 0.8, type: "spring", stiffness: 120 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10 blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <img src={logoImg} alt="The 100's" className="w-24 h-24 object-contain relative z-10" />
                  </div>
                </motion.div>
              )}

              {/* Icon + Subtitle */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    current.accent
                      ? "bg-primary/15 ring-1 ring-primary/20"
                      : "bg-secondary/40 ring-1 ring-border/20"
                  }`}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <Icon
                    className={`w-5 h-5 ${current.accent ? "text-primary" : "text-foreground/50"}`}
                  />
                </motion.div>
                <motion.p
                  className="text-[9px] tracking-[0.4em] uppercase text-primary/50 font-light"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  {current.subtitle}
                </motion.p>
              </div>

              {/* Title */}
              <motion.h3
                className={`text-center font-light ${
                  isCenter ? "text-2xl md:text-3xl text-gold-gradient" : "text-xl text-foreground/90"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {current.title}
              </motion.h3>

              {/* Divider */}
              <motion.div
                className="flex items-center justify-center gap-2"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <div className="h-px w-8 bg-primary/20" />
                <div className="h-1 w-1 rounded-full bg-primary/30" />
                <div className="h-px w-8 bg-primary/20" />
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-center text-sm text-muted-foreground/80 font-light leading-relaxed"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {current.description}
              </motion.p>

              {/* Step indicators */}
              <motion.div
                className="flex items-center justify-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {tourSteps.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`rounded-full transition-all duration-500 ${
                      i === step
                        ? "h-1.5 w-6 bg-primary"
                        : i < step
                        ? "h-1 w-1.5 bg-primary/40"
                        : "h-1 w-1.5 bg-border/40"
                    }`}
                    layout
                  />
                ))}
              </motion.div>

              {/* Actions */}
              <motion.div
                className="flex items-center justify-between pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                {step > 0 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 tracking-[0.15em] uppercase"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Anterior
                  </button>
                ) : (
                  <button
                    onClick={handleSkip}
                    className="text-[10px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-300 tracking-[0.15em] uppercase"
                  >
                    Saltar
                  </button>
                )}

                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-500 ${
                    current.accent
                      ? "border border-primary/40 text-primary hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_-4px_rgba(180,140,60,0.3)]"
                      : "border border-border/30 text-foreground/70 hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {isLast ? (
                    <>
                      Começar a jornada
                      <Sparkles className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      Seguinte
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>

          {/* Step counter below card */}
          <motion.p
            className="text-center text-[9px] text-muted-foreground/20 tracking-[0.3em] uppercase mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            {step + 1} de {tourSteps.length}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
