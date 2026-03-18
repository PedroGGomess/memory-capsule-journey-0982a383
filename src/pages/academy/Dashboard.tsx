import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRoleLabel } from "@/config/roles";
import { useRef } from "react";
import logoImg from "@/assets/Logo.png";
import welcomeVideo from "@/assets/welcome-video.mp4";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, Sparkles, FolderOpen, Award, ArrowRight, Check, Bot, BarChart3,
  ChevronRight, Gem, BookMarked, Target, Image
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
  { id: "story", num: 1, icon: BookOpen, navKey: "story" as const },
  { id: "philosophy", num: 2, icon: Compass, navKey: "philosophy" as const },
  { id: "products", num: 3, icon: Wine, navKey: "products" as const },
  { id: "gift", num: 4, icon: Gift, navKey: "gift" as const },
  { id: "store", num: 5, icon: Store, navKey: "store" as const },
  { id: "brand-voice", num: 6, icon: MessageCircle, navKey: "brandVoice" as const },
  { id: "customer-experience", num: 7, icon: Users, navKey: "customerExperience" as const },
  { id: "business-model", num: 8, icon: BarChart3, navKey: "businessModel" as const },
  { id: "tasting-guide", num: 9, icon: Wine, navKey: "tastingGuide" as const },
  { id: "glossary", num: 10, icon: BookMarked, navKey: "glossary" as const },
  { id: "cross-selling", num: 11, icon: Target, navKey: "crossSelling" as const },
  { id: "visual-merchandising", num: 12, icon: Image, navKey: "visualMerchandising" as const },
  { id: "certification", num: 13, icon: Award, navKey: "certification" as const },
];

const Dashboard = () => {
  const { getCompletionPercentage, isModuleCompleted, completedModules, totalModules, allowedModules, userRole } = useProgress();
  const { t, language } = useLanguage();
  const pct = getCompletionPercentage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  const modules = ALL_MODULES
    .filter((m) => allowedModules.includes(m.id))
    .map((m, i) => ({
      ...m,
      num: i + 1,
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

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Elegant Hero with Video ── */}
      <motion.section
        ref={heroRef}
        variants={itemVariants}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden"
      >
        <div className="relative w-full" style={{ paddingTop: "45%" }}>
          <video
            src={welcomeVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/15 via-transparent to-background/15" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-5"
            >
              <div className="relative">
                <img src={logoImg} alt="The 100's" className="w-20 h-20 object-contain" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              className="text-[10px] tracking-[0.6em] uppercase text-primary/70 mb-3"
            >
              {t.academy.dashboard.welcomeTo}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease }}
              className="text-4xl md:text-6xl font-light text-gold-gradient mb-3 leading-tight text-center"
            >
              {t.academy.dashboard.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-sm md:text-base text-foreground/50 font-light max-w-md leading-relaxed text-center"
            >
              {t.academy.dashboard.subtitle}
            </motion.p>
            {userRole && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-primary/70">{roleLabel}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto pb-24">
        {/* ── Progress Section ── */}
        <motion.section variants={itemVariants} className="py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/35">
                {t.academy.dashboard.progressLabel}
              </p>
              {nextModule && pct < 100 ? (
                <p className="text-sm text-muted-foreground/50 font-light">
                  {t.academy.dashboard.nextLabel}{" "}
                  <span className="text-foreground/70">{nextModule.title}</span>
                </p>
              ) : pct === 100 ? (
                <div className="flex items-center gap-2 text-primary/70">
                  <Gem className="w-4 h-4" />
                  <p className="text-sm font-light">{t.academy.dashboard.onboardingComplete}</p>
                </div>
              ) : null}
            </div>
            <div className="flex items-end gap-1.5">
              <span className="text-5xl md:text-6xl font-extralight text-gold-gradient leading-none">{pct}</span>
              <span className="text-lg text-muted-foreground/30 font-light mb-1">%</span>
            </div>
          </div>

          <div className="mt-6 relative">
            <div className="h-[2px] w-full bg-border/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.5, duration: 1.2, ease }}
              />
            </div>
            {pct > 0 && (
              <motion.div
                className="absolute top-0 h-[2px] bg-primary/30 blur-sm rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.5, duration: 1.2, ease }}
              />
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/25">
              {completedModules} / {totalModules} {t.academy.dashboard.moduleLabel}s
            </p>
            {nextModule && pct < 100 && (
              <Link to={nextModule.path}>
                <motion.span
                  className="group inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-primary/50 hover:text-primary transition-colors duration-300"
                  whileHover={{ x: 2 }}
                >
                  {t.academy.dashboard.continueLabel}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                </motion.span>
              </Link>
            )}
          </div>
        </motion.section>

        <div className="h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />

        {/* ── Module Grid ── */}
        <motion.section variants={itemVariants} className="py-12">
          <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/25 mb-8 text-center">
            {t.academy.dashboard.moduleLabel}s
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modules.map((m) => {
              const done = isModuleCompleted(m.id);
              const isNext = nextModule?.id === m.id;
              return (
                <motion.div key={m.id} variants={itemVariants}>
                  <Link to={m.path}>
                    <motion.div
                      className={`group relative bg-card border border-border/30 p-6 md:p-7 flex flex-col gap-4 transition-all duration-500 h-full ${
                        isNext ? "border-primary/35 bg-primary/4" : ""
                      }`}
                      whileHover={{ borderColor: "hsl(32 35% 56% / 0.35)", boxShadow: "0 4px 12px rgba(50, 35, 20, 0.04)" }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          done
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-muted border border-border/40 group-hover:bg-primary/8 group-hover:border-primary/20"
                        }`}>
                          {done ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <m.icon className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                          )}
                        </div>
                        <span className="text-[9px] tracking-[0.1em] text-muted-foreground/20 font-light">
                          {String(m.num).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-sm font-light leading-snug transition-colors duration-300 ${
                          done ? "text-foreground" : "text-foreground/70 group-hover:text-foreground/85"
                        }`}>
                          {m.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        {done ? (
                          <span className="text-[9px] tracking-[0.15em] uppercase text-primary/40">Concluído</span>
                        ) : isNext ? (
                          <span className="text-[9px] tracking-[0.15em] uppercase text-primary/50">Próximo</span>
                        ) : (
                          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/20">—</span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/10 group-hover:text-primary/40 group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <div className="h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />

        {/* ── Tools ── */}
        <motion.section variants={itemVariants} className="py-12">
          <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/25 mb-6 text-center">
            Ferramentas
          </p>

          <div className="space-y-[1px]">
            {tools.map((tool) => (
              <Link key={tool.id} to={tool.path}>
                <motion.div
                  className="group flex items-center gap-4 py-4 px-2 hover:bg-primary/[0.02] transition-all duration-500"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className="w-9 h-9 rounded-full bg-muted/20 flex items-center justify-center group-hover:bg-muted/40 transition-colors duration-300">
                    <tool.icon className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
                  </div>
                  <span className="text-sm font-light text-foreground/50 group-hover:text-foreground/70 transition-colors duration-300 flex-1">
                    {tool.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/10 group-hover:text-primary/40 transition-all duration-300" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── Quote ── */}
        <motion.section variants={itemVariants} className="pt-12 pb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/15" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/15" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/15" />
            </div>
            <p className="text-xl md:text-2xl font-extralight text-foreground/20 italic max-w-lg mx-auto leading-relaxed tracking-wide">
              {t.academy.dashboard.quote}
            </p>
            <p className="text-[8px] tracking-[0.5em] uppercase text-muted-foreground/15 mt-6">
              The 100's
            </p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
