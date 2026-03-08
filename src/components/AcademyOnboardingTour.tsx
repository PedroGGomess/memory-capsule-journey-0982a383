import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, BookOpen, Compass, Wine, Gift, Store, MessageCircle, Users, BarChart3, Award, Sparkles, FolderOpen, ArrowRight, X } from "lucide-react";
import logoImg from "@/assets/Logo.png";

interface TourStep {
  icon: React.ElementType;
  title: string;
  description: string;
  path?: string;
}

const TOUR_SEEN_KEY = "the100s-tour-seen";

const tourSteps: TourStep[] = [
  {
    icon: Bot,
    title: "Bem-vindo à The 100's Academy!",
    description: "Olá! Sou o teu assistente pessoal The 100's. Vou mostrar-te tudo o que precisas de saber para começares a tua jornada connosco. Vamos lá!",
  },
  {
    icon: BookOpen,
    title: "Módulo 1 — A Nossa História",
    description: "Descobre a origem da The 100's, a nossa missão e o que nos torna únicos no mundo dos vinhos premium.",
    path: "/academy/module/story",
  },
  {
    icon: Compass,
    title: "Módulo 2 — Filosofia",
    description: "Entende os valores e princípios que guiam cada decisão e cada garrafa que criamos.",
    path: "/academy/module/philosophy",
  },
  {
    icon: Wine,
    title: "Módulo 3 — Produtos",
    description: "Conhece a nossa coleção completa — vinhos, design e a experiência por trás de cada produto.",
    path: "/academy/module/products",
  },
  {
    icon: Gift,
    title: "Módulo 4 — Conceito de Presente",
    description: "Aprende como transformamos cada garrafa numa experiência de presente memorável.",
    path: "/academy/module/gift",
  },
  {
    icon: Store,
    title: "Módulo 5 — Experiência em Loja",
    description: "Descobre as 6 zonas da jornada do cliente e como criar momentos inesquecíveis.",
    path: "/academy/module/store",
  },
  {
    icon: MessageCircle,
    title: "Módulo 6 — Voz da Marca",
    description: "Aprende a comunicar como The 100's — o tom, o estilo e a forma como falamos com o mundo.",
    path: "/academy/module/brand-voice",
  },
  {
    icon: Users,
    title: "Módulo 7 — Experiência do Cliente",
    description: "Domina a arte de criar experiências excepcionais para cada pessoa que entra na nossa loja.",
    path: "/academy/module/customer-experience",
  },
  {
    icon: BarChart3,
    title: "Módulo 8 — Modelo de Negócio",
    description: "Compreende como funciona o negócio, os números e a estratégia por trás da marca.",
    path: "/academy/module/business-model",
  },
  {
    icon: Award,
    title: "Módulo 9 — Certificação",
    description: "Completa todos os módulos e recebe o teu certificado oficial The 100's Academy!",
    path: "/academy/module/certification",
  },
  {
    icon: Sparkles,
    title: "Ferramentas Extras",
    description: "Além dos módulos, tens acesso a ferramentas como Perguntar à Equipa, Recursos e o Assistente IA — sempre disponíveis para te ajudar.",
  },
  {
    icon: Bot,
    title: "Estou aqui para ti!",
    description: "Sempre que precisares de ajuda, podes encontrar-me na secção Assistente IA. Estou aqui para responder às tuas dúvidas sobre a The 100's. Boa jornada!",
    path: "/academy/module/ai-assistant",
  },
];

export function AcademyOnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem(TOUR_SEEN_KEY);
    if (!seen) {
      // Small delay for the page to render first
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (step < tourSteps.length - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    localStorage.setItem(TOUR_SEEN_KEY, "true");
    const lastStep = tourSteps[step];
    setVisible(false);
    if (lastStep.path) {
      navigate(lastStep.path);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(TOUR_SEEN_KEY, "true");
    setVisible(false);
  };

  const current = tourSteps[step];
  const Icon = current.icon;
  const isLast = step === tourSteps.length - 1;
  const isFirst = step === 0;
  const isLastAssistant = isLast || step === tourSteps.length - 1;

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

        {/* Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="border border-border/30 bg-card p-8 space-y-6">
            {/* Close */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo + Icon */}
            <div className="flex flex-col items-center gap-4">
              {isFirst && (
                <motion.img
                  src={logoImg}
                  alt="The 100's"
                  className="w-20 h-20 object-contain"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              )}
              <motion.div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  isLastAssistant ? "bg-primary/20" : "bg-secondary/50"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <Icon className={`w-6 h-6 ${isLastAssistant ? "text-primary" : "text-foreground/60"}`} />
              </motion.div>
            </div>

            {/* Content */}
            <div className="text-center space-y-3">
              <h3 className="text-lg font-light text-foreground">{current.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-1.5">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === step ? "w-6 bg-primary" : i < step ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-wide uppercase"
              >
                Saltar tour
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 border border-primary/30 px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                {isLast ? "Começar!" : "Seguinte"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step counter */}
            <p className="text-center text-[10px] text-muted-foreground/30 tracking-[0.2em] uppercase">
              {step + 1} / {tourSteps.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
