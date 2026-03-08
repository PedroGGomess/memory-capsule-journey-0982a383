import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Progress } from "@/components/ui/progress";
import badgeImg from "@/assets/badge.png";
import { Link } from "react-router-dom";
import { Download, Sparkles } from "lucide-react";
import jsPDF from "jspdf";

const USERS_KEY = "gym-users";
const SESSION_KEY = "the100s-academy-session";

// Mark user's onboarding as complete in localStorage
function markOnboardingComplete() {
  try {
    const sessionCode = localStorage.getItem(SESSION_KEY);
    if (!sessionCode) return;
    const usersData = localStorage.getItem(USERS_KEY);
    if (!usersData) return;
    const users = JSON.parse(usersData);
    const updated = users.map((u: any) => {
      if (u.academyCode && u.academyCode === sessionCode) {
        return { ...u, onboardingComplete: true };
      }
      return u;
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to mark onboarding complete:", e);
  }
}

const ModuleCertification = () => {
  const { getCompletionPercentage, completedModules, totalModules, completeModule, isModuleCompleted } = useProgress();
  const { t, language } = useLanguage();
  const pct = getCompletionPercentage();
  const otherModulesComplete = completedModules >= totalModules - 1 || (completedModules >= totalModules - 1 && !isModuleCompleted("certification"));
  const certified = isModuleCompleted("certification");
  const [showCelebration, setShowCelebration] = useState(false);
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleClaim = () => {
    completeModule("certification");
    markOnboardingComplete();
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(12, 10, 9);
    doc.rect(0, 0, w, h, "F");

    // Gold border
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(1.5);
    doc.rect(12, 12, w - 24, h - 24);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, w - 30, h - 30);

    // Corner accents
    const cornerSize = 20;
    const corners = [
      [15, 15, 1, 1], [w - 15, 15, -1, 1],
      [15, h - 15, 1, -1], [w - 15, h - 15, -1, -1],
    ];
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.8);
    corners.forEach(([x, y, dx, dy]) => {
      doc.line(x, y, x + cornerSize * dx, y);
      doc.line(x, y, x, y + cornerSize * dy);
    });

    // Top ornament line
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.3);
    doc.line(w / 2 - 40, 35, w / 2 + 40, 35);
    doc.setFillColor(180, 140, 60);
    doc.circle(w / 2, 35, 1.5, "F");

    // Title
    doc.setTextColor(180, 140, 60);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("CERTIFICATE OF COMPLETION", w / 2, 48, { align: "center" });

    // Brand name
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.text("The 100's", w / 2, 68, { align: "center" });

    // Academy
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(160, 120, 50);
    doc.text("A C A D E M Y", w / 2, 78, { align: "center" });

    // Divider
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.3);
    doc.line(w / 2 - 50, 86, w / 2 + 50, 86);

    // "This certifies that"
    doc.setFontSize(10);
    doc.setTextColor(140, 130, 120);
    doc.setFont("helvetica", "normal");
    doc.text(language === "pt" ? "Certifica-se que" : "This certifies that", w / 2, 98, { align: "center" });

    // Name
    doc.setFontSize(28);
    doc.setTextColor(240, 230, 210);
    doc.setFont("helvetica", "bold");
    doc.text(userName || "—", w / 2, 115, { align: "center" });

    // Underline
    const nameWidth = doc.getTextWidth(userName || "—");
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.4);
    doc.line(w / 2 - nameWidth / 2 - 5, 119, w / 2 + nameWidth / 2 + 5, 119);

    // Description
    doc.setFontSize(10);
    doc.setTextColor(140, 130, 120);
    doc.setFont("helvetica", "normal");
    const desc = language === "pt"
      ? "completou com sucesso todos os módulos da Academia The 100's,"
      : "has successfully completed all modules of The 100's Academy,";
    const desc2 = language === "pt"
      ? "demonstrando domínio da história da marca, produtos, experiência da loja e serviço ao cliente."
      : "demonstrating mastery of brand story, products, store experience, and customer service.";
    doc.text(desc, w / 2, 130, { align: "center" });
    doc.text(desc2, w / 2, 137, { align: "center" });

    // Date
    const now = new Date();
    const dateStr = now.toLocaleDateString(language === "pt" ? "pt-PT" : "en-US", {
      day: "numeric", month: "long", year: "numeric",
    });
    doc.setFontSize(9);
    doc.setTextColor(120, 110, 100);
    doc.text(dateStr, w / 2, 152, { align: "center" });

    // Bottom quote
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.3);
    doc.line(w / 2 - 30, 165, w / 2 + 30, 165);
    doc.setFontSize(8);
    doc.setTextColor(140, 130, 60);
    doc.setFont("helvetica", "italic");
    doc.text(language === "pt" ? "\"O tempo revela o verdadeiro valor.\"" : "\"Time reveals true value.\"", w / 2, 173, { align: "center" });

    // Bottom ornament
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.3);
    doc.line(w / 2 - 40, h - 30, w / 2 + 40, h - 30);
    doc.setFillColor(180, 140, 60);
    doc.circle(w / 2, h - 30, 1.5, "F");

    doc.save(`The100s_Certificate_${userName.replace(/\s+/g, "_")}.pdf`);
  };

  // Particle positions for celebration
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 4 + Math.random() * 8,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center section-padding py-32 relative overflow-hidden bg-background">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-background to-background pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />

      {/* Celebration particles */}
      <AnimatePresence>
        {showCelebration && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, opacity: 0, scale: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5], rotate: [0, 180, 360] }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
            className="fixed top-0 pointer-events-none z-50"
            style={{ left: `${p.x}%` }}
          >
            <Sparkles className="text-primary" style={{ width: p.size, height: p.size }} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ambient glow for certified state */}
      {certified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px]" />
        </motion.div>
      )}

      <div className="max-w-3xl mx-auto text-center w-full relative z-10">
        <ScrollReveal>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 backdrop-blur-sm rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">{t.academy.certification.moduleLabel}</p>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extralight text-gold-gradient mb-12 tracking-wide">{t.academy.certification.title}</h1>
        </ScrollReveal>

        {certified ? (
          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Badge with glow animation */}
              <motion.div
                animate={{ filter: ["drop-shadow(0 0 20px rgba(180,140,60,0.3))", "drop-shadow(0 0 40px rgba(180,140,60,0.6))", "drop-shadow(0 0 20px rgba(180,140,60,0.3))"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative inline-block"
              >
                <motion.img
                  src={badgeImg}
                  alt="Certification Badge"
                  className="w-44 h-44 mx-auto"
                  initial={{ rotateY: -90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl md:text-4xl font-light text-gold-gradient"
              >
                {t.academy.certification.certified.welcome}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-foreground/60 font-light text-lg"
              >
                {t.academy.certification.certified.message}
              </motion.p>

              {/* Name input for PDF */}
              {!nameSubmitted ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="space-y-4 max-w-sm mx-auto"
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60">
                    {language === "pt" ? "Insere o teu nome para o certificado" : "Enter your name for the certificate"}
                  </p>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={language === "pt" ? "O teu nome completo" : "Your full name"}
                    className="w-full bg-secondary/30 border border-border/30 text-foreground p-4 text-sm font-light text-center focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
                  />
                  <button
                    onClick={() => userName.trim() && setNameSubmitted(true)}
                    disabled={!userName.trim()}
                    className="border border-primary/30 px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {language === "pt" ? "Confirmar" : "Confirm"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-10"
                >
                  {/* Premium Certificate preview card */}
                  <div className="relative bg-gradient-to-br from-[#1A1814] to-[#0A0908] p-1 max-w-xl mx-auto rounded-sm shadow-2xl shadow-primary/20">
                    {/* Gold Foil Border */}
                    <div className="absolute inset-0 border border-primary/40 rounded-sm pointer-events-none" />
                    
                    <div className="relative border border-primary/20 bg-[#0F0D0B] p-10 md:p-14 overflow-hidden">
                      {/* Subtle grain overlay */}
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
                      
                      {/* Corner Accents */}
                      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/50" />
                      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/50" />
                      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-primary/50" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/50" />

                      <div className="relative space-y-5 z-10">
                        <div className="flex items-center justify-center gap-4 mb-2">
                          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
                        </div>
                        
                        <p className="text-[10px] tracking-[0.4em] uppercase text-primary/70 font-medium">Certificate of Completion</p>
                        <h3 className="text-4xl font-serif font-light text-gold-gradient my-6">The 100's</h3>
                        <p className="text-[11px] tracking-[0.5em] uppercase text-primary/40">Academy</p>
                        
                        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent my-8" />
                        
                        <p className="text-sm text-foreground/50 font-light italic mb-2">This certifies that</p>
                        <p className="text-3xl font-light text-foreground/90 tracking-wide pb-2 border-b border-primary/20 inline-block px-8">{userName}</p>
                        
                        <p className="text-xs text-foreground/40 font-light mt-8 max-w-xs mx-auto leading-relaxed">
                          has successfully completed all modules, demonstrating mastery of brand story and experience.
                        </p>
                        
                        <div className="mt-8 flex justify-center items-center gap-2 text-primary/40">
                          <div className="w-1 h-1 rounded-full bg-primary/40" />
                          <p className="text-[10px] tracking-widest">
                            {new Date().toLocaleDateString(language === "pt" ? "pt-PT" : "en-US", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                          <div className="w-1 h-1 rounded-full bg-primary/40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={generatePDF}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(180,140,60,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 border border-primary/40 bg-primary/5 px-12 py-5 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:bg-primary/10 hover:border-primary relative overflow-hidden group rounded-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <Download className="w-4 h-4 relative z-10" />
                    <span className="relative z-10 font-medium">{language === "pt" ? "Descarregar Certificado (PDF)" : "Download PDF Certificate"}</span>
                  </motion.button>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <div className="h-px w-24 mx-auto bg-primary/30" />
                <p className="text-xs text-muted-foreground/50 tracking-[0.2em] uppercase mt-6">
                  {t.academy.certification.certified.tagline}
                </p>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div className="relative border border-primary/20 bg-primary/5 backdrop-blur-md p-10 max-w-lg mx-auto rounded-sm">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/40 blur-sm" />
                <p className="text-sm text-primary/80 font-light mb-6 tracking-widest uppercase">{t.academy.certification.progress}</p>
                <Progress value={pct} className="h-1.5 bg-secondary mb-4" />
                <p className="text-xs tracking-widest text-muted-foreground">
                  {completedModules} {t.academy.certification.of} {totalModules} ({pct}%)
                </p>
              </div>

              {otherModulesComplete ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <p className="text-foreground/70 font-light">
                    {t.academy.certification.congratulations}
                  </p>
                  <motion.button
                    onClick={handleClaim}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(180,140,60,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-primary/30 px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4" />
                      {t.academy.certification.claimButton}
                    </span>
                  </motion.button>
                </motion.div>
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
