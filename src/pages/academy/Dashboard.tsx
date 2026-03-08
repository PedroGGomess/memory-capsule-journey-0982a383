import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";
import logoImg from "@/assets/Logo.png";
import welcomeVideo from "@/assets/welcome-video.mp4";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, Sparkles, FolderOpen, Award, ArrowRight, Check, Bot, BarChart3,
  ChevronRight, Gem
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

const Dashboard = () => {
  const { getCompletionPercentage, isModuleCompleted, completedModules, totalModules } = useProgress();
  const { t } = useLanguage();
  const pct = getCompletionPercentage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

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
    { id: "ask-team", title: t.academy.nav.askTeam, icon: Sparkles, path: "/academy/module/ask-team" },
    { id: "resources", title: t.academy.nav.resources, icon: FolderOpen, path: "/academy/module/resources" },
    { id: "ai-assistant", title: t.academy.nav.aiAssistant, icon: Bot, path: "/academy/module/ai-assistant" },
  ];

  const nextModule = modules.find((m) => !isModuleCompleted(m.id));

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Cinematic Hero with Video ── */}
      <motion.section
        ref={heroRef}
        variants={itemVariants}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden"
      >
        {/* Video Background */}
        <div className="relative w-full" style={{ paddingTop: "45%" }}>
          <video
            src={welcomeVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
          
          {/* Hero content centered over video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
              className="mb-5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/15 rounded-full blur-2xl scale-150" />
                <img src={logoImg} alt="The 100's" className="w-20 h-20 object-contain relative z-10 drop-shadow-2xl" />
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
          </div>
        </div>
      </motion.section>

      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto pb-24">
        {/* ── Progress Section — Apple style minimal ── */}
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

          {/* Progress bar */}
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

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />

        {/* ── Module Grid — Apple product grid style ── */}
        <motion.section variants={itemVariants} className="py-12">
          <p className="text-[9px] tracking-[0.5em] uppercase text-muted-foreground/25 mb-8 text-center">
            {t.academy.dashboard.moduleLabel}s
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border/10">
            {modules.map((m) => {
              const done = isModuleCompleted(m.id);
              const isNext = nextModule?.id === m.id;
              return (
                <motion.div key={m.id} variants={itemVariants}>
                  <Link to={m.path}>
                    <motion.div
                      className={`group relative bg-background p-6 md:p-7 flex flex-col gap-4 transition-all duration-500 h-full ${
                        isNext ? "bg-primary/[0.02]" : ""
                      }`}
                      whileHover={{ backgroundColor: "hsl(43 72% 50% / 0.03)" }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          done
                            ? "bg-primary/10 ring-1 ring-primary/25 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]"
                            : "bg-muted/30 group-hover:bg-muted/50"
                        }`}>
                          {done ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <m.icon className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
                          )}
                        </div>
                        <span className="text-[9px] tracking-[0.1em] text-muted-foreground/20 font-light">
                          {String(m.num).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-sm font-light leading-snug transition-colors duration-300 ${
                          done ? "text-foreground/80" : "text-foreground/60 group-hover:text-foreground/80"
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

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />

        {/* ── Tools — Minimal row style ── */}
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

        {/* ── Quote — Apple-style minimal ── */}
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
