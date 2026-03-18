import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Award, Copy, Check, Download, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAcademyAuth } from "@/contexts/AcademyAuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { getRoleLabel } from "@/config/roles";
import { MODULE_ORDER } from "@/config/moduleOrder";
import ScrollReveal from "@/components/ScrollReveal";
import jsPDF from "jspdf";

const Profile = () => {
  const { t, language } = useLanguage();
  const { user } = useAcademyAuth();
  const { progress, getCompletionPercentage, allowedModules } = useProgress();
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to show skeletons
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [user]);

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-background section-padding py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header skeleton */}
          <div className="space-y-6 border-b border-border pb-8">
            <div className="w-48 h-10 skeleton" />
            <div className="w-32 h-6 skeleton" />
          </div>

          {/* Progress skeleton */}
          <div className="space-y-8">
            <div className="w-40 h-8 skeleton" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 skeleton" />
              <div className="space-y-4">
                <div className="h-20 skeleton" />
                <div className="h-20 skeleton" />
              </div>
              <div className="h-20 skeleton" />
            </div>
          </div>
        </div>
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

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    // Helper function
    const addText = (text: string, fontSize: number = 12, isBold: boolean = false, color: number[] = [0, 0, 0]) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(color[0], color[1], color[2]);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      doc.text(lines, margin, yPos);
      yPos += fontSize * lines.length * 0.5 + 2;
      return lines;
    };

    // Header
    addText("THE 100'S ACADEMY", 16, true, [44, 28, 11]);
    addText(language === "pt" ? "Relatório de Progresso" : "Progress Report", 14, true);
    yPos += 5;

    // Date
    addText(new Date().toLocaleDateString(language === "pt" ? "pt-PT" : "en-US"), 10, false, [100, 100, 100]);
    yPos += 8;

    // Employee Info
    doc.setDrawColor(44, 28, 11);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    addText(`${language === "pt" ? "Nome" : "Name"}: ${user.name}`, 11, true);
    addText(`${language === "pt" ? "Função" : "Role"}: ${roleLabel}`, 11);
    addText(`${language === "pt" ? "Email" : "Email"}: ${user.email || "—"}`, 11);
    yPos += 5;

    // Progress Summary
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    addText(language === "pt" ? "Progresso Geral" : "Overall Progress", 13, true, [44, 28, 11]);
    addText(
      `${completedModules} / ${totalAllowed} ${language === "pt" ? "módulos concluídos" : "modules completed"} (${completionPercentage}%)`,
      11
    );
    addText(`${language === "pt" ? "Classificação Média de Quiz" : "Average Quiz Score"}: ${avgQuizScore}%`, 11);
    yPos += 8;

    // Module Details
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    addText(language === "pt" ? "Detalhes dos Módulos" : "Module Details", 13, true, [44, 28, 11]);
    yPos += 5;

    // Table header
    doc.setFillColor(220, 210, 195);
    doc.rect(margin, yPos - 3, pageWidth - 2 * margin, 7, "F");
    addText(`${language === "pt" ? "Módulo" : "Module"}`, 9, true);
    const statusX = pageWidth - margin - 40;
    doc.text(`${language === "pt" ? "Status" : "Status"}`, statusX, yPos);
    const scoreX = pageWidth - margin - 15;
    doc.text(`${language === "pt" ? "Quiz" : "Quiz"}`, scoreX, yPos);
    yPos += 8;

    // Table rows
    doc.setFontSize(9);
    userModules.forEach((module) => {
      if (yPos > pageHeight - margin - 10) {
        doc.addPage();
        yPos = margin;
      }

      const moduleProgress = progress[module.id];
      const isCompleted = moduleProgress?.completed;
      const quizScore = moduleProgress?.quizScore;

      let statusText = language === "pt" ? "Não iniciado" : "Not started";
      if (isCompleted) {
        statusText = quizScore && quizScore >= 80 ? "✓ Aprovado" : "✓ Completo";
      } else if (quizScore && quizScore < 80) {
        statusText = language === "pt" ? "Necessita Melhoria" : "Needs Improvement";
      }

      doc.setTextColor(40, 40, 40);
      const moduleName = t.academy.nav[module.navKey as keyof typeof t.academy.nav] || module.id;
      const lines = doc.splitTextToSize(moduleName, 70);
      doc.text(lines, margin, yPos);

      doc.text(statusText, statusX, yPos);

      if (quizScore !== undefined) {
        doc.text(`${quizScore}%`, scoreX, yPos);
      }

      yPos += Math.max(5, lines.length * 4) + 2;
    });

    yPos += 5;

    // Achievements
    if (yPos > pageHeight - margin - 20) {
      doc.addPage();
      yPos = margin;
    }

    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    addText(language === "pt" ? "Conquistas" : "Achievements", 13, true, [44, 28, 11]);
    yPos += 5;

    const achievements = [
      {
        titlePt: "Primeiro Módulo",
        titleEn: "First Module",
        earned: completedModules > 0,
      },
      {
        titlePt: "Quiz Master",
        titleEn: "Quiz Master",
        earned: quizScores.some(s => s === 100),
      },
      {
        titlePt: "Meio Caminho",
        titleEn: "Halfway",
        earned: completionPercentage >= 50,
      },
      {
        titlePt: "Guardião do Tempo",
        titleEn: "Guardian of Time",
        earned: completionPercentage === 100,
      },
    ];

    achievements.forEach((achievement) => {
      const title = language === "pt" ? achievement.titlePt : achievement.titleEn;
      const status = achievement.earned ? "✓" : "○";
      const color = achievement.earned ? [44, 28, 11] : [150, 150, 150];
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(`${status} ${title}`, margin, yPos);
      yPos += 6;
    });

    yPos += 8;
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `${language === "pt" ? "Gerado por" : "Generated by"} The 100's Academy — ${new Date().toLocaleDateString()}`,
      margin,
      pageHeight - margin
    );

    // Save PDF
    const fileName = `The100s_Report_${user.name.replace(/\s+/g, "_")}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
  };

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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h2 className="text-3xl font-light text-primary tracking-tight">
                {language === "pt" ? "Progresso Geral" : "Overall Progress"}
              </h2>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={exportToPDF}
                className="flex items-center gap-2 border border-primary px-6 py-3 text-sm tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                {language === "pt" ? "Exportar Relatório" : "Export Report"}
              </motion.button>
            </div>

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

            {completedModules === 0 ? (
              <div className="border border-border/30 p-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-sm text-foreground/60 font-light">
                  {language === "pt"
                    ? "Começa o teu primeiro módulo"
                    : "Start your first module"}
                </p>
              </div>
            ) : (
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
            )}
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
