import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRoleLabel } from "@/config/roles";
import { useRef } from "react";
import logoImg from "@/assets/Logo.png";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, Sparkles, FolderOpen, Award, ArrowRight, Check, Bot, BarChart3,
  ChevronRight, Gem, BookMarked, Target, Image, Heart, Shield, Plane, Languages, Monitor, Printer, Lock, Briefcase, ClipboardList
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const ALL_MODULES = [
  { id: "story", num: 1, icon: BookOpen, navKey: "story" as const, category: "product" },
  { id: "philosophy", num: 2, icon: Compass, navKey: "philosophy" as const, category: "product" },
  { id: "products", num: 3, icon: Wine, navKey: "products" as const, category: "product" },
  { id: "gift", num: 4, icon: Gift, navKey: "gift" as const, category: "product" },
  { id: "store", num: 5, icon: Store, navKey: "store" as const, category: "sales" },
  { id: "brand-voice", num: 6, icon: MessageCircle, navKey: "brandVoice" as const, category: "knowledge" },
  { id: "customer-experience", num: 7, icon: Users, navKey: "customerExperience" as const, category: "sales" },
  { id: "business-model", num: 8, icon: BarChart3, navKey: "businessModel" as const, category: "operations" },
  { id: "tasting-guide", num: 9, icon: Wine, navKey: "tastingGuide" as const, category: "sales" },
  { id: "glossary", num: 10, icon: BookMarked, navKey: "glossary" as const, category: "knowledge" },
  { id: "cross-selling", num: 11, icon: Target, navKey: "crossSelling" as const, category: "sales" },
  { id: "visual-merchandising", num: 12, icon: Image, navKey: "visualMerchandising" as const, category: "operations" },
  { id: "client-profiles", num: 13, icon: Users, navKey: "clientProfiles" as const, category: "sales" },
  { id: "client-culture", num: 14, icon: Heart, navKey: "clientCulture" as const, category: "sales" },
  { id: "conduct", num: 15, icon: Shield, navKey: "conduct" as const, category: "knowledge" },
  { id: "transport-rules", num: 16, icon: Plane, navKey: "transportRules" as const, category: "knowledge" },
  { id: "vocabulary", num: 17, icon: Languages, navKey: "vocabulary" as const, category: "knowledge" },
  { id: "digital-systems", num: 18, icon: Monitor, navKey: "digitalSystems" as const, category: "operations" },
  { id: "uv-printer", num: 19, icon: Printer, navKey: "uvPrinter" as const, category: "operations" },
  { id: "leadership", num: 20, icon: Briefcase, navKey: "leadership" as const, category: "leadership" },
  { id: "team-ops", num: 21, icon: ClipboardList, navKey: "teamOps" as const, category: "leadership" },
  { id: "certification", num: 22, icon: Award, navKey: "certification" as const, category: "certification" },
];

const Dashboard = () => {
  const { getCompletionPercentage, isModuleCompleted, completedModules, totalModules, allowedModules, userRole, progress } = useProgress();
  const { t, language } = useLanguage();
  const pct = getCompletionPercentage();

  const modules = ALL_MODULES
    .filter((m) => allowedModules.includes(m.id))
    .map((m) => ({
      ...m,
      title: t.academy.nav[m.navKey] || m.id,
      path: m.id === "certification" ? "/academy/module/certification" : `/academy/module/${m.id}`,
    }));

  const tools = [
    { id: "ask-team", title: t.academy.nav.askTeam, icon: Sparkles, path: "/academy/module/ask-team" },
    { id: "resources", title: t.academy.nav.resources, icon: FolderOpen, path: "/academy/module/resources" },
    { id: "ai-assistant", title: t.academy.nav.aiAssistant, icon: Bot, path: "/academy/module/ai-assistant" },
  ];

  const nextModule = modules.find((m) => !isModuleCompleted(m.id));
  const roleLabel = getRoleLabel(userRole, language as "pt" | "en");

  // Separate certification module from others
  const regularModules = modules.filter((m) => m.id !== "certification");
  const certificationModule = modules.find((m) => m.id === "certification");

  // Calculate evaluation stats
  const modulesWithScores = regularModules.filter((m) => progress[m.id]?.quizScore !== undefined);
  const modulesPassed = modulesWithScores.filter((m) => (progress[m.id]?.quizScore || 0) >= 80).length;
  const averageScore = modulesWithScores.length > 0
    ? Math.round(modulesWithScores.reduce((sum, m) => sum + (progress[m.id]?.quizScore || 0), 0) / modulesWithScores.length)
    : 0;

  // Helper to get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-background via-background to-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Hero/Welcome Section ── */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden py-16 md:py-24 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-6"
            >
              <img src={logoImg} alt="The 100's" className="w-16 h-16 object-contain" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="text-[10px] tracking-[0.6em] uppercase text-primary/60 mb-3"
            >
              {t.academy.dashboard.welcomeTo}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease }}
              className="text-3xl md:text-5xl font-light text-gold-gradient mb-4 leading-tight"
            >
              {t.academy.dashboard.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm md:text-base text-foreground/50 font-light max-w-xl leading-relaxed"
            >
              {t.academy.dashboard.subtitle}
            </motion.p>

            {userRole && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-6 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/25"
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-primary/70">{roleLabel}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto pb-24">
        {/* ── Progress Overview ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="bg-card border border-border/30 rounded-lg p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div className="space-y-1 flex-1">
                <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50">
                  {t.academy.dashboard.progressLabel}
                </p>
                {nextModule && pct < 100 ? (
                  <p className="text-sm text-foreground/60 font-light">
                    {t.academy.dashboard.nextLabel} <span className="text-foreground/80 font-normal">{nextModule.title}</span>
                  </p>
                ) : pct === 100 ? (
                  <div className="flex items-center gap-2 text-primary/80">
                    <Gem className="w-4 h-4" />
                    <p className="text-sm font-light">{t.academy.dashboard.onboardingComplete}</p>
                  </div>
                ) : null}
              </div>

              <div className="flex items-end gap-2">
                <span className="text-5xl md:text-6xl font-extralight text-gold-gradient leading-none">{pct}</span>
                <span className="text-base text-muted-foreground/40 font-light mb-2">%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="h-1.5 w-full bg-border/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/70 via-primary to-primary/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.5, duration: 1.2, ease }}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/40">
                  {completedModules} / {totalModules} {t.academy.dashboard.moduleLabel.toLowerCase()}s
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Continue Where You Left Off ── */}
        {nextModule && pct < 100 && (
          <motion.section variants={itemVariants} className="mb-16">
            <Link to={nextModule.path}>
              <motion.div
                className="bg-gradient-to-r from-primary/8 to-primary/4 border border-primary/25 rounded-lg p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-lg"
                whileHover={{ y: -2 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-primary/60" />
                      <p className="text-[9px] tracking-[0.3em] uppercase text-primary/60">
                        {language === "pt" ? "Continua de onde ficaste" : "Continue where you left off"}
                      </p>
                    </div>
                    <h3 className="text-2xl font-light text-foreground mb-2">{nextModule.title}</h3>
                    <p className="text-sm text-foreground/60 font-light max-w-lg">
                      {language === "pt" ? "Retoma o teu progresso e completa este módulo para avançar na tua jornada." : "Pick up where you left off and complete this module to progress on your journey."}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors shrink-0">
                    <span className="text-sm tracking-[0.2em] uppercase font-light">
                      {language === "pt" ? "Continuar →" : "Continue →"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.section>
        )}

        {/* ── Module Sections by Category ── */}
        <motion.section variants={itemVariants} className="mb-16">
          {/* Define category labels */}
          {(() => {
            const categoryLabels = {
              product: { pt: "Marca & Produto", en: "Brand & Product" },
              sales: { pt: "Vendas & Cliente", en: "Sales & Customer" },
              operations: { pt: "Loja & Operações", en: "Store & Operations" },
              knowledge: { pt: "Conhecimento", en: "Knowledge" },
              leadership: { pt: "Liderança", en: "Leadership" },
              certification: { pt: "Certificação", en: "Certification" },
            };

            const categories = ["product", "sales", "operations", "knowledge", "leadership", "certification"] as const;

            return categories.map((category) => {
              const modulesByCategory = regularModules.filter((m) => m.category === category);
              if (modulesByCategory.length === 0) return null;

              const categoryLabel = categoryLabels[category][language === "pt" ? "pt" : "en"];

              return (
                <div key={category} className="mb-12">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                    <h2 className="text-lg font-light text-foreground/90 tracking-wide">{categoryLabel}</h2>
                  </div>

                  {/* Module Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {modulesByCategory.map((m) => {
                      const done = isModuleCompleted(m.id);
                      const isNext = nextModule?.id === m.id;
                      const score = progress[m.id]?.quizScore;

                      return (
                        <motion.div key={m.id} variants={itemVariants}>
                          <Link to={m.path}>
                            <motion.div
                              className={`group relative bg-card border border-border/30 rounded-lg p-6 flex flex-col gap-4 transition-all duration-500 h-full hover:border-primary/40 ${
                                isNext ? "border-primary/35 bg-primary/4" : ""
                              }`}
                              whileHover={{ y: -2, boxShadow: "0 8px 16px rgba(50, 35, 20, 0.06)" }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Module Number Badge */}
                              <div className="flex items-start justify-between">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 border border-primary/25 flex-shrink-0">
                                  <span className="text-[10px] font-medium text-primary">{String(m.num).padStart(2, "0")}</span>
                                </div>
                                {done && (
                                  <div className="text-primary/60">
                                    <Check className="w-4 h-4" />
                                  </div>
                                )}
                              </div>

                              {/* Icon */}
                              <div className="flex justify-center py-2">
                                <m.icon className={`w-6 h-6 transition-colors duration-300 ${
                                  done ? "text-primary/70" : "text-muted-foreground/50 group-hover:text-primary"
                                }`} />
                              </div>

                              {/* Title */}
                              <div className="flex-1">
                                <h3 className={`text-sm font-light text-center leading-snug transition-colors duration-300 ${
                                  done ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
                                }`}>
                                  {m.title}
                                </h3>
                              </div>

                              {/* Status Indicator */}
                              <div className="text-center">
                                {done ? (
                                  score !== undefined ? (
                                    <span className={`text-[10px] font-medium tracking-[0.1em] ${getScoreColor(score)}`}>
                                      {score}%
                                    </span>
                                  ) : (
                                    <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-light">
                                      ✓ {t.academy.dashboard.completed.toLowerCase()}
                                    </span>
                                  )
                                ) : isNext ? (
                                  <span className="text-[9px] tracking-[0.15em] uppercase text-primary/60 font-light">
                                    {language === "pt" ? "Próximo" : "Next"}
                                  </span>
                                ) : (
                                  <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30">—</span>
                                )}
                              </div>
                            </motion.div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            });
          })()}

          {/* Certification Card - Always Last and Special */}
          {certificationModule && (
            <div className="mt-16 pt-8 border-t border-border/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-primary/60 to-primary/20 rounded-full" />
                <h2 className="text-lg font-light text-foreground/90 tracking-wide">
                  {language === "pt" ? "Certificação" : "Certification"}
                </h2>
              </div>

              <Link to={certificationModule.path}>
                <motion.div
                  className={`group relative bg-card border-2 border-primary/30 rounded-lg p-6 flex flex-col gap-4 transition-all duration-500 w-full sm:w-fit ${
                    pct === 100 ? "hover:border-primary/60" : "opacity-60 cursor-not-allowed"
                  }`}
                  whileHover={pct === 100 ? { y: -2, boxShadow: "0 8px 16px rgba(50, 35, 20, 0.08)" } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {/* Module Number Badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/15 border border-primary/30 flex-shrink-0">
                      <span className="text-[10px] font-medium text-primary">{String(certificationModule.num).padStart(2, "0")}</span>
                    </div>
                    {pct === 100 ? (
                      <div className="text-primary/70">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground/40" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center py-2">
                    <certificationModule.icon className={`w-6 h-6 transition-colors duration-300 ${
                      pct === 100 ? "text-primary/70" : "text-muted-foreground/30"
                    }`} />
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h3 className={`text-sm font-light text-center leading-snug transition-colors duration-300 ${
                      pct === 100 ? "text-foreground" : "text-foreground/50"
                    }`}>
                      {certificationModule.title}
                    </h3>
                  </div>

                  {/* Status Indicator */}
                  <div className="text-center">
                    {pct === 100 ? (
                      <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-light">
                        {language === "pt" ? "Desbloqueado" : "Unlocked"}
                      </span>
                    ) : (
                      <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30">{language === "pt" ? "Bloqueado" : "Locked"}</span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </div>
          )}
        </motion.section>

        {/* ── Evaluations Section ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="bg-card border border-border/30 rounded-lg p-8 shadow-sm">
            <h2 className="text-lg font-light text-foreground mb-8 flex items-center gap-3">
              <div className="w-1 h-6 bg-primary/60 rounded-full" />
              {t.academy.dashboard.evaluationsTitle}
            </h2>

            {modulesWithScores.length > 0 ? (
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-background/30 rounded-lg p-4">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                      {t.academy.dashboard.averageScore}
                    </p>
                    <p className="text-3xl font-light text-gold-gradient">{averageScore}%</p>
                  </div>
                  <div className="bg-background/30 rounded-lg p-4">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                      {t.academy.dashboard.modulesPassed}
                    </p>
                    <p className="text-3xl font-light text-foreground/70">{modulesPassed}/{modulesWithScores.length}</p>
                  </div>
                  <div className="bg-background/30 rounded-lg p-4">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60 mb-2">
                      {language === "pt" ? "Taxa de Aprovação" : "Pass Rate"}
                    </p>
                    <p className="text-3xl font-light text-foreground/70">
                      {modulesWithScores.length > 0 ? Math.round((modulesPassed / modulesWithScores.length) * 100) : 0}%
                    </p>
                  </div>
                </div>

                {/* Scores List */}
                <div className="space-y-3">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/50 mb-4">
                    {language === "pt" ? "Detalhes por módulo" : "Module details"}
                  </p>
                  {modulesWithScores.map((m) => {
                    const score = progress[m.id]?.quizScore || 0;
                    const isPassed = score >= 80;
                    return (
                      <div key={m.id} className={`flex items-center justify-between p-4 rounded-lg ${getScoreBgColor(score)} transition-colors duration-300`}>
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-[10px] font-medium text-muted-foreground/70 w-6 text-center">{m.num.toString().padStart(2, "0")}</span>
                          <span className="text-sm font-light text-foreground/80 flex-1">{m.title}</span>
                        </div>
                        <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                          {score}% {isPassed ? "✓" : ""}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-foreground/60 font-light">
                  {t.academy.dashboard.completionMessage}
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── Tools Section ── */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="mb-8">
            <h2 className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/50 text-center">
              {language === "pt" ? "ferramentas" : "tools"}
            </h2>
          </div>

          <div className="bg-card border border-border/30 rounded-lg overflow-hidden">
            {tools.map((tool, idx) => (
              <Link key={tool.id} to={tool.path}>
                <motion.div
                  className={`group flex items-center gap-4 px-6 py-5 hover:bg-primary/4 transition-all duration-300 ${
                    idx !== tools.length - 1 ? "border-b border-border/20" : ""
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                    <tool.icon className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-light text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300 flex-1">
                    {tool.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-primary/60 transition-all duration-300" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── Quote ── */}
        <motion.section variants={itemVariants} className="py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/20" />
            </div>
            <p className="text-lg md:text-xl font-light text-foreground/40 italic max-w-lg mx-auto leading-relaxed tracking-wide">
              {t.academy.dashboard.quote}
            </p>
            <p className="text-[8px] tracking-[0.5em] uppercase text-muted-foreground/25 mt-6">
              The 100's
            </p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
