import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Award, Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { getRoleLabel } from "@/config/roles";
import { MODULE_ORDER } from "@/config/moduleOrder";
import ScrollReveal from "@/components/ScrollReveal";

const Profile = () => {
  const { t, language } = useLanguage();
  const { user } = useAcademyAuth();
  const { progress, getCompletionPercentage, allowedModules } = useProgress();
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{language === "pt" ? "A carregar..." : "Loading..."}</p>
      </div>
    );
  }

  // Get allowed modules with their progress
  const userModules = MODULE_ORDER.filter(m => allowedModules.includes(m.id));
  const completedModules = userModules.filter(m => progress[m.id]?.completed).length;
  const totalAllowed = userModules.length;
  const completionPercentage = getCompletionPercentage();

  // Calculate average quiz score
  const quizScores = userModules
    .map(m => progress[m.id]?.quizScore)
    .filter((score): score is number => score !== undefined);
  const avgQuizScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  // Get achievements
  const achievements = [
    {
      id: "first-module",
      titlePt: "Primeiro Módulo",
      titleEn: "First Module",
      descPt: "Completou o seu primeiro módulo",
      descEn: "Completed your first module",
      icon: Award,
      earned: completedModules > 0,
    },
    {
      id: "quiz-master",
      titlePt: "Quiz Master",
      titleEn: "Quiz Master",
      descPt: "Obteve 100% num quiz",
      descEn: "Scored 100% on any quiz",
      icon: Award,
      earned: quizScores.some(s => s === 100),
    },
    {
      id: "halfway",
      titlePt: "Meio Caminho",
      titleEn: "Halfway",
      descPt: "Completou 50% dos módulos",
      descEn: "Completed 50% of modules",
      icon: Award,
      earned: completionPercentage >= 50,
    },
    {
      id: "guardian",
      titlePt: "Guardião do Tempo",
      titleEn: "Guardian of Time",
      descPt: "Completou todos os módulos",
      descEn: "Completed all modules",
      icon: Award,
      earned: completionPercentage === 100,
    },
  ];

  const copyAccessCode = () => {
    navigator.clipboard.writeText(user.accessCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const roleLabel = getRoleLabel(user.role, language as "pt" | "en");

  return (
    <div className="min-h-screen bg-background section-padding py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <ScrollReveal>
          <div className="space-y-6 border-b border-border pb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-light text-primary mb-2 tracking-tight">
                {user.name}
              </h1>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/60 border border-border px-3 py-1 w-fit">
                  {roleLabel}
                </span>
              </div>
            </div>

            {/* Access Code */}
            <div className="space-y-2">
              <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/40">
                {language === "pt" ? "Código de Acesso" : "Access Code"}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 border border-border px-4 py-3">
                  <code className="font-mono text-sm text-primary">
                    {showAccessCode ? user.accessCode : "••••••••"}
                  </code>
                  <button
                    onClick={() => setShowAccessCode(!showAccessCode)}
                    className="text-foreground/40 hover:text-foreground/60 transition-colors"
                    title={showAccessCode ? "Hide" : "Show"}
                  >
                    {showAccessCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={copyAccessCode}
                  className="border border-border px-4 py-3 text-foreground/40 hover:text-foreground/60 transition-colors"
                  title={language === "pt" ? "Copiar" : "Copy"}
                >
                  {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Progress Overview */}
        <ScrollReveal>
          <div className="space-y-8">
            <h2 className="text-3xl font-light text-primary tracking-tight">
              {language === "pt" ? "Progresso Geral" : "Overall Progress"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Completion Circle */}
              <div className="flex flex-col items-center justify-center space-y-4 border border-border p-8">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-border"
                    />
                    {/* Progress circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                      animate={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - completionPercentage / 100)}` }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-light text-primary">{completionPercentage}%</p>
                      <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40">
                        {language === "pt" ? "Completo" : "Complete"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="border border-border p-6 space-y-2">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/40">
                    {language === "pt" ? "Módulos" : "Modules"}
                  </p>
                  <p className="text-2xl font-light text-primary">
                    {completedModules} <span className="text-foreground/40">/ {totalAllowed}</span>
                  </p>
                </div>
                <div className="border border-border p-6 space-y-2">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/40">
                    {language === "pt" ? "Classificação Média de Quiz" : "Avg Quiz Score"}
                  </p>
                  <p className="text-2xl font-light text-primary">{avgQuizScore}%</p>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div className="border border-border p-6 space-y-2">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/40">
                    {language === "pt" ? "Email" : "Email"}
                  </p>
                  <p className="text-sm font-light text-foreground/70 break-all">
                    {user.email || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Modules Breakdown */}
        <ScrollReveal>
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-primary tracking-tight">
              {language === "pt" ? "Detalhes dos Módulos" : "Module Details"}
            </h2>

            <div className="space-y-3">
              {userModules.map((module) => {
                const moduleProgress = progress[module.id];
                const isCompleted = moduleProgress?.completed;
                const quizScore = moduleProgress?.quizScore;

                let statusColor = "border-border";
                let statusText = language === "pt" ? "Não iniciado" : "Not started";
                let statusBg = "bg-transparent";

                if (isCompleted) {
                  statusColor = "border-primary";
                  statusBg = "bg-primary/5";
                  if (quizScore && quizScore >= 80) {
                    statusText = "✓ Aprovado";
                  } else {
                    statusText = "✓ Completo";
                  }
                } else if (quizScore) {
                  if (quizScore < 80) {
                    statusColor = "border-yellow-500/50";
                    statusBg = "bg-yellow-500/5";
                    statusText = language === "pt" ? "Necessita Melhoria" : "Needs Improvement";
                  }
                }

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border ${statusColor} ${statusBg} p-6 transition-all duration-200`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-light text-foreground/90">
                          {t.academy.nav[module.navKey as keyof typeof t.academy.nav] || module.id}
                        </h3>
                        <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40 mt-1">
                          {statusText}
                        </p>
                      </div>
                      {quizScore !== undefined && (
                        <div className="text-right">
                          <p className="text-2xl font-light text-primary">{quizScore}%</p>
                          <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40">
                            {language === "pt" ? "Quiz" : "Quiz"}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Achievements */}
        <ScrollReveal>
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-primary tracking-tight">
              {language === "pt" ? "Conquistas" : "Achievements"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`border p-6 transition-all duration-200 ${
                      achievement.earned
                        ? "border-primary bg-primary/5"
                        : "border-border/50 bg-transparent opacity-40"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Icon className={`w-6 h-6 shrink-0 ${achievement.earned ? "text-primary" : "text-foreground/30"}`} />
                      <div>
                        <h3 className="font-light text-foreground/90">
                          {language === "pt" ? achievement.titlePt : achievement.titleEn}
                        </h3>
                        <p className="text-[9px] tracking-[0.15em] uppercase text-foreground/40 mt-1">
                          {language === "pt" ? achievement.descPt : achievement.descEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Profile;
