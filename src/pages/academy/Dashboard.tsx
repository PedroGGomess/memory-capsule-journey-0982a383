import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";
import ScrollReveal from "@/components/ScrollReveal";
import {
  BookOpen, Compass, Wine, Gift, Store, MessageCircle,
  Users, Sparkles, FolderOpen, Award, ArrowRight, Check, Bot, Play, BarChart3
} from "lucide-react";

const Dashboard = () => {
  const { getCompletionPercentage, isModuleCompleted, completedModules, totalModules } = useProgress();
  const { t } = useLanguage();
  const pct = getCompletionPercentage();

  const modules = [
    { id: "story", num: 1, title: t.academy.nav.story, desc: t.academy.dashboard.subtitle, icon: BookOpen, path: "/academy/module/story" },
    { id: "philosophy", num: 2, title: t.academy.nav.philosophy, desc: t.academy.dashboard.subtitle, icon: Compass, path: "/academy/module/philosophy" },
    { id: "products", num: 3, title: t.academy.nav.products, desc: t.academy.dashboard.subtitle, icon: Wine, path: "/academy/module/products" },
    { id: "gift", num: 4, title: t.academy.nav.gift, desc: t.academy.dashboard.subtitle, icon: Gift, path: "/academy/module/gift" },
    { id: "store", num: 5, title: t.academy.nav.store, desc: t.academy.dashboard.subtitle, icon: Store, path: "/academy/module/store" },
    { id: "brand-voice", num: 6, title: t.academy.nav.brandVoice, desc: t.academy.dashboard.subtitle, icon: MessageCircle, path: "/academy/module/brand-voice" },
    { id: "customer-experience", num: 7, title: t.academy.nav.customerExperience, desc: t.academy.dashboard.subtitle, icon: Users, path: "/academy/module/customer-experience" },
    { id: "business-model", num: 8, title: t.academy.nav.businessModel, desc: t.academy.dashboard.subtitle, icon: BarChart3, path: "/academy/module/business-model" },
    { id: "certification", num: 9, title: t.academy.nav.certification, desc: t.academy.dashboard.subtitle, icon: Award, path: "/academy/module/certification" },
  ];

  // Tools — not counted as modules
  const tools = [
    { id: "ask-team", title: t.academy.nav.askTeam, icon: Sparkles, path: "/academy/module/ask-team" },
    { id: "resources", title: t.academy.nav.resources, icon: FolderOpen, path: "/academy/module/resources" },
    { id: "ai-assistant", title: t.academy.nav.aiAssistant, icon: Bot, path: "/academy/module/ai-assistant" },
  ];

  const nextModule = modules.find((m) => !isModuleCompleted(m.id));

  return (
    <div className="section-padding py-16 max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-4">{t.academy.dashboard.welcomeTo}</p>
          <h1 className="text-4xl md:text-6xl font-light text-gold-gradient mb-4">{t.academy.dashboard.title}</h1>
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
            {t.academy.dashboard.subtitle}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mb-12 border border-border/30 overflow-hidden">
          <div className="relative bg-secondary/20" style={{ paddingTop: "56.25%" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-background/60 to-background/90">
              <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors">
                <Play className="w-7 h-7 text-primary ml-1" />
              </div>
              <div className="text-center">
                <p className="text-sm font-light text-foreground/70 mb-1">{t.academy.dashboard.videoTitle}</p>
                <p className="text-xs text-muted-foreground/50 max-w-sm">
                  {t.academy.dashboard.videoCaption}
                </p>
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30 mt-2">
                {t.academy.dashboard.videoComingSoon}
              </p>
            </div>
          </div>
          <div className="px-8 py-6 border-t border-border/20">
            <h2 className="text-lg font-light text-foreground/80 mb-2">{t.academy.dashboard.videoTitle}</h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {t.academy.dashboard.videoDescription}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="border border-border/30 p-8 mb-8 bg-card/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground font-light">{t.academy.dashboard.progressLabel}</p>
              {nextModule && pct < 100 && (
                <p className="text-xs text-muted-foreground/50 mt-0.5">
                  {t.academy.dashboard.nextLabel} {nextModule.title}
                </p>
              )}
            </div>
            <p className="text-3xl font-light text-primary">{pct}%</p>
          </div>
          <Progress value={pct} className="h-1.5 bg-secondary" />
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground/60">
              {completedModules} {t.academy.dashboard.of} {totalModules} {t.academy.dashboard.modulesCompleted}
            </p>
            {pct === 100 && (
              <p className="text-xs text-primary/70 font-medium">{t.academy.dashboard.onboardingComplete}</p>
            )}
          </div>
        </div>
      </ScrollReveal>

      {nextModule && pct < 100 && (
        <ScrollReveal delay={0.25}>
          <Link to={nextModule.path} className="block mb-8">
            <motion.div
              className="border border-primary/20 bg-primary/5 p-6 flex items-center gap-5 hover:border-primary/40 transition-all duration-300"
              whileHover={{ x: 4 }}
            >
              <div className="p-3 bg-primary/10 rounded-sm">
                <nextModule.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-1">{t.academy.dashboard.continueLabel}</p>
                <h3 className="text-base font-light text-foreground/90">{t.academy.dashboard.moduleLabel} {nextModule.num}: {nextModule.title}</h3>
              </div>
              <ArrowRight className="w-5 h-5 text-primary/50 shrink-0" />
            </motion.div>
          </Link>
        </ScrollReveal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m, i) => {
          const done = isModuleCompleted(m.id);
          return (
            <ScrollReveal key={m.id} delay={0.1 + i * 0.05}>
              <Link to={m.path}>
                <motion.div
                  className={`group border p-6 flex items-start gap-5 transition-all duration-500 hover:border-primary/40 ${
                    done ? "border-primary/20 bg-primary/5" : "border-border/30 hover:bg-card"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className={`p-3 rounded-sm ${done ? "bg-primary/10" : "bg-secondary/50"}`}>
                    <m.icon className={`w-5 h-5 ${done ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
                        {t.academy.dashboard.moduleLabel} {m.num}
                      </span>
                      {done && <Check className="w-3.5 h-3.5 text-primary/60" />}
                    </div>
                    <h3 className="text-base font-light text-foreground/90 mb-1">{m.title}</h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors mt-1 shrink-0" />
                </motion.div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="text-center mt-20 py-12 border-t border-border/20">
          <p className="text-xl md:text-2xl font-light text-foreground/50 italic max-w-2xl mx-auto">
            {t.academy.dashboard.quote}
          </p>
          <p className="text-xs text-muted-foreground/40 mt-4 tracking-[0.2em] uppercase">The 100's</p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Dashboard;
