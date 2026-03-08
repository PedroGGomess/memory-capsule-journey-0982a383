import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";
import logoImg from "@/assets/Logo.png";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, Sparkles, FolderOpen, Award, ArrowRight, Check, Bot, Play, BarChart3,
  ChevronRight, Gem
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Dashboard = () => {
  const { getCompletionPercentage, isModuleCompleted, completedModules, totalModules } = useProgress();
  const { t } = useLanguage();
  const pct = getCompletionPercentage();

  const modules = [
    { id: "story", num: 1, title: t.academy.nav.story, icon: BookOpen, path: "/academy/module/story" },
    { id: "philosophy", num: 2, title: t.academy.nav.philosophy, icon: Compass, path: "/academy/module/philosophy" },
    { id: "products", num: 3, title: t.academy.nav.products, icon: Wine, path: "/academy/module/products" },
    { id: "gift", num: 4, title: t.academy.nav.gift, icon: Gift, path: "/academy/module/gift" },
    { id: "store", num: 5, title: t.academy.nav.store, icon: Store, path: "/academy/module/store" },
    { id: "brand-voice", num: 6, title: t.academy.nav.brandVoice, icon: MessageCircle, path: "/academy/module/brand-voice" },
    { id: "customer-experience", num: 7, title: t.academy.nav.customerExperience, icon: Users, path: "/academy/module/customer-experience" },
    { id: "business-model", num: 8, title: t.academy.nav.businessModel, icon: BarChart3, path: "/academy/module/business-model" },
    { id: "certification", num: 9, title: t.academy.nav.certification, icon: Award, path: "/academy/module/certification" },
  ];

  const tools = [
    { id: "ask-team", title: t.academy.nav.askTeam, desc: t.academy.dashboard.subtitle, icon: Sparkles, path: "/academy/module/ask-team" },
    { id: "resources", title: t.academy.nav.resources, desc: t.academy.dashboard.subtitle, icon: FolderOpen, path: "/academy/module/resources" },
    { id: "ai-assistant", title: t.academy.nav.aiAssistant, desc: t.academy.dashboard.subtitle, icon: Bot, path: "/academy/module/ai-assistant" },
  ];

  const nextModule = modules.find((m) => !isModuleCompleted(m.id));

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Hero Section ── */}
      <motion.section variants={itemVariants} className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative px-6 md:px-12 lg:px-16 pt-12 pb-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 120 }}
              className="mb-6"
            >
              <img src={logoImg} alt="The 100's" className="w-16 h-16 object-contain opacity-60" />
            </motion.div>

            <p className="text-[9px] tracking-[0.5em] uppercase text-primary/50 mb-3">
              {t.academy.dashboard.welcomeTo}
            </p>
            <h1 className="text-3xl md:text-5xl font-light text-gold-gradient mb-4 leading-tight">
              {t.academy.dashboard.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground/60 font-light max-w-lg leading-relaxed">
              {t.academy.dashboard.subtitle}
            </p>
          </div>
        </div>
      </motion.section>

      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto pb-20">
        {/* ── Progress Card ── */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="relative border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden">
            {/* Subtle gold line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <div className="space-y-1">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40">
                    {t.academy.dashboard.progressLabel}
                  </p>
                  {nextModule && pct < 100 && (
                    <p className="text-xs text-muted-foreground/50">
                      {t.academy.dashboard.nextLabel} <span className="text-foreground/60">{nextModule.title}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-light text-gold-gradient">{pct}%</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 mt-0.5">
                    {completedModules} {t.academy.dashboard.of} {totalModules}
                  </p>
                </div>
              </div>

              <div className="relative">
                <Progress value={pct} className="h-1 bg-secondary/50" />
                {/* Glow on progress */}
                {pct > 0 && (
                  <div
                    className="absolute top-0 h-1 bg-primary/20 blur-sm"
                    style={{ width: `${pct}%` }}
                  />
                )}
              </div>

              {pct === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-4 text-primary/70"
                >
                  <Gem className="w-3.5 h-3.5" />
                  <p className="text-xs font-light">{t.academy.dashboard.onboardingComplete}</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* ── Continue CTA ── */}
        {nextModule && pct < 100 && (
          <motion.section variants={itemVariants} className="mb-10">
            <Link to={nextModule.path}>
              <motion.div
                className="group relative border border-primary/15 bg-primary/[0.03] p-5 md:p-6 flex items-center gap-5 overflow-hidden"
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.2 }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-11 h-11 rounded-full bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center shrink-0">
                  <nextModule.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-primary/50 mb-1">
                    {t.academy.dashboard.continueLabel}
                  </p>
                  <h3 className="text-sm md:text-base font-light text-foreground/90 truncate">
                    {t.academy.dashboard.moduleLabel} {nextModule.num} — {nextModule.title}
                  </h3>
                </div>
                <ArrowRight className="relative w-4 h-4 text-primary/30 group-hover:text-primary/70 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
              </motion.div>
            </Link>
          </motion.section>
        )}

        {/* ── Video Section ── */}
        <motion.section variants={itemVariants} className="mb-12">
          <div className="border border-border/15 bg-card/20 overflow-hidden">
            <div className="relative" style={{ paddingTop: "50%" }}>
              <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-background/60 to-background/90 flex flex-col items-center justify-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 cursor-pointer"
                  whileHover={{ scale: 1.1, borderColor: "hsl(43 72% 50% / 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5 text-primary/60 ml-0.5" />
                </motion.div>
                <div className="text-center px-4">
                  <p className="text-xs font-light text-foreground/50 mb-1">{t.academy.dashboard.videoTitle}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/25">
                    {t.academy.dashboard.videoComingSoon}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-5 border-t border-border/10">
              <p className="text-xs text-muted-foreground/50 font-light leading-relaxed line-clamp-2">
                {t.academy.dashboard.videoDescription}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Module Grid ── */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border/15" />
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/30 shrink-0">
              {t.academy.dashboard.moduleLabel}s
            </p>
            <div className="h-px flex-1 bg-border/15" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {modules.map((m, i) => {
              const done = isModuleCompleted(m.id);
              const isNext = nextModule?.id === m.id;
              return (
                <motion.div
                  key={m.id}
                  variants={itemVariants}
                >
                  <Link to={m.path}>
                    <motion.div
                      className={`group relative h-full border p-5 transition-all duration-500 ${
                        done
                          ? "border-primary/20 bg-primary/[0.03]"
                          : isNext
                          ? "border-primary/15 bg-card/30"
                          : "border-border/15 bg-card/10 hover:bg-card/30"
                      } hover:border-primary/30`}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Top accent for completed */}
                      {done && (
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
                      )}

                      <div className="flex items-start gap-3.5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          done ? "bg-primary/10 ring-1 ring-primary/20" : "bg-secondary/40"
                        }`}>
                          {done ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <m.icon className="w-4 h-4 text-muted-foreground/50" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30 mb-1">
                            {String(m.num).padStart(2, "0")}
                          </p>
                          <h3 className={`text-sm font-light leading-snug ${
                            done ? "text-foreground/80" : "text-foreground/70"
                          }`}>
                            {m.title}
                          </h3>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/15 group-hover:text-primary/40 transition-colors mt-0.5 shrink-0" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── Tools ── */}
        <motion.section variants={itemVariants} className="mt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border/15" />
            <p className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/30 shrink-0">
              Ferramentas
            </p>
            <div className="h-px flex-1 bg-border/15" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {tools.map((tool) => (
              <Link key={tool.id} to={tool.path}>
                <motion.div
                  className="group border border-border/15 bg-card/10 p-4 flex items-center gap-3.5 hover:border-primary/20 hover:bg-card/25 transition-all duration-500"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                    <tool.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xs font-light text-foreground/60 flex-1">{tool.title}</h3>
                  <ChevronRight className="w-3 h-3 text-muted-foreground/15 group-hover:text-primary/30 transition-colors shrink-0" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── Quote ── */}
        <motion.section variants={itemVariants} className="mt-20">
          <div className="text-center py-10 border-t border-border/10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/15" />
              <div className="w-1 h-1 rounded-full bg-primary/20" />
              <div className="h-px w-10 bg-primary/15" />
            </div>
            <p className="text-lg md:text-xl font-light text-foreground/30 italic max-w-md mx-auto leading-relaxed">
              {t.academy.dashboard.quote}
            </p>
            <p className="text-[8px] tracking-[0.4em] uppercase text-muted-foreground/20 mt-4">
              The 100's
            </p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
