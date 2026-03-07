import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Progress } from "@/components/ui/progress";
import badgeImg from "@/assets/badge.png";
import { Link } from "react-router-dom";

const ModuleCertification = () => {
  const { getCompletionPercentage, completedModules, totalModules, completeModule, isModuleCompleted } = useProgress();
  const { t } = useLanguage();
  const pct = getCompletionPercentage();
  const otherModulesComplete = completedModules >= totalModules - 1 || (completedModules >= totalModules - 1 && !isModuleCompleted("certification"));
  const certified = isModuleCompleted("certification");

  return (
    <div className="min-h-screen flex items-center justify-center section-padding py-32">
      <div className="max-w-2xl mx-auto text-center w-full">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-4">{t.academy.certification.moduleLabel}</p>
          <h1 className="text-4xl md:text-6xl font-light text-gold-gradient mb-8">{t.academy.certification.title}</h1>
        </ScrollReveal>

        {certified ? (
          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <img src={badgeImg} alt="Certification Badge" className="w-40 h-40 mx-auto" />
              <h2 className="text-3xl md:text-4xl font-light text-gold-gradient">
                {t.academy.certification.certified.welcome}
              </h2>
              <p className="text-foreground/60 font-light text-lg">
                {t.academy.certification.certified.message}
              </p>
              <div className="h-px w-24 mx-auto bg-primary/30" />
              <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase">
                {t.academy.certification.certified.tagline}
              </p>
            </motion.div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div className="border border-border/30 p-8">
                <p className="text-sm text-muted-foreground font-light mb-4">{t.academy.certification.progress}</p>
                <Progress value={pct} className="h-1 bg-secondary mb-3" />
                <p className="text-xs text-muted-foreground/60">
                  {completedModules} {t.academy.certification.of} {totalModules} ({pct}%)
                </p>
              </div>

              {otherModulesComplete ? (
                <div className="space-y-6">
                  <p className="text-foreground/70 font-light">
                    {t.academy.certification.congratulations}
                  </p>
                  <button
                    onClick={() => completeModule("certification")}
                    className="border border-primary/30 px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold"
                  >
                    {t.academy.certification.claimButton}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-foreground/70 font-light">
                    {t.academy.certification.unlockNote}
                  </p>
                  <Link
                    to="/academy"
                    className="inline-block border border-primary/30 px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary transition-all duration-500 hover:border-primary"
                  >
                    {t.academy.certification.returnDashboard}
                  </Link>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};

export default ModuleCertification;
