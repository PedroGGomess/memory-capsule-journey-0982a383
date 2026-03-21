import { ReactNode, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, CheckCircle2, XCircle, Trophy, Sparkles, Bookmark, PenTool, Star, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import ScrollReveal from "./ScrollReveal";
import { getNextModule } from "@/config/moduleOrder";

/* ── Module Layout ── */
interface ModuleLayoutProps {
  moduleId: string;
  moduleNumber?: number;
  title: string;
  subtitle: string;
  heroImage: string;
  children: ReactNode;
  hideCompletion?: boolean;
  nextModuleId?: string;
  nextModuleTitle?: string;
}

export function ModuleLayout({ moduleId, moduleNumber, title, subtitle, heroImage, children, hideCompletion, nextModuleId, nextModuleTitle }: ModuleLayoutProps) {
  const { completeModule, isModuleCompleted, totalModules } = useProgress();
  const { t, language } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "adequate" | "hard" | null>(null);
  const completed = isModuleCompleted(moduleId);

  const bookmarksKey = "the100s-bookmarks";
  const notesKey = `the100s-notes-${moduleId}`;
  const difficultyKey = `the100s-difficulty-${moduleId}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(bookmarksKey) || "[]");
    setBookmarked(saved.includes(moduleId));
  }, [moduleId]);

  // Load notes and difficulty from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) setNotes(savedNotes);

    const savedDifficulty = localStorage.getItem(difficultyKey);
    if (savedDifficulty) setDifficulty(savedDifficulty as "easy" | "adequate" | "hard");
  }, [moduleId, notesKey, difficultyKey]);

  // Save last visited module on mount
  useEffect(() => {
    localStorage.setItem("the100s-last-module", JSON.stringify({ id: moduleId, title }));
  }, [moduleId, title]);

  // Auto-save notes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes) localStorage.setItem(notesKey, notes);
    }, 500);
    return () => clearTimeout(timer);
  }, [notes, notesKey]);

  // Save difficulty immediately
  useEffect(() => {
    if (difficulty) localStorage.setItem(difficultyKey, difficulty);
  }, [difficulty, difficultyKey]);

  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem(bookmarksKey) || "[]");
    const updated = bookmarked ? saved.filter((id: string) => id !== moduleId) : [...saved, moduleId];
    localStorage.setItem(bookmarksKey, JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  // Auto-determine next module if not provided
  const nextModule = useMemo(() => {
    if (nextModuleId && nextModuleTitle) {
      return { id: nextModuleId, title: nextModuleTitle };
    }
    const auto = getNextModule(moduleId);
    if (!auto) return null;
    // Get the translated title from the translations
    return { id: auto.id, title: t.academy.nav[auto.navKey as keyof typeof t.academy.nav] || auto.id };
  }, [moduleId, nextModuleId, nextModuleTitle, t]);

  const handleComplete = () => {
    completeModule(moduleId);
    setShowSuccess(true);
    // Hide success animation after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] flex items-end overflow-hidden border-b border-border">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <button
          onClick={toggleBookmark}
          className="absolute top-6 right-6 z-20 p-3 rounded-full border border-primary/30 text-primary/60 hover:text-primary hover:border-primary transition-all duration-200"
          title={language === "pt" ? (bookmarked ? "Remover marcador" : "Adicionar marcador") : (bookmarked ? "Remove bookmark" : "Add bookmark")}
        >
          {bookmarked ? (
            <Star className="w-5 h-5 fill-primary text-primary" />
          ) : (
            <Star className="w-5 h-5" />
          )}
        </button>
        <div className="relative z-10 section-padding pb-12 w-full max-w-5xl mx-auto">
          <ScrollReveal>
            {moduleNumber && (
              <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-2">
                {t.academy.module.moduleOf} {moduleNumber} {t.academy.module.of} {totalModules}
              </p>
            )}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-primary mb-3 tracking-tight">{title}</h1>
            <p className="text-lg text-foreground/70 font-light">{subtitle}</p>
          </ScrollReveal>
        </div>
      </div>

      <div className="section-padding py-16 max-w-4xl mx-auto space-y-16">
        {children}

        {/* Personal Notes Section */}
        <ScrollReveal>
          <div className="border border-border p-6">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex w-full items-center justify-between text-left hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-primary" />
                <p className="text-sm tracking-[0.2em] uppercase text-primary font-light">
                  {language === "pt" ? "Notas Pessoais" : "Personal Notes"}
                </p>
                {notes && <span className="text-[10px] text-foreground/50">({notes.length})</span>}
              </div>
              <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${showNotes ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showNotes && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={language === "pt" ? "Escreve aqui as tuas notas..." : "Write your notes here..."}
                    className="w-full mt-4 min-h-[120px] bg-background border border-border text-foreground/80 p-4 text-sm font-light resize-none focus:outline-none focus:border-primary transition-colors duration-200 placeholder:text-foreground/40"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Difficulty Rating Section */}
        <ScrollReveal>
          <div className="border border-border p-6">
            <p className="text-sm tracking-[0.2em] uppercase text-primary font-light mb-4">
              {language === "pt" ? "Dificuldade do Módulo" : "Module Difficulty"}
            </p>
            <div className="flex gap-3">
              {[
                { value: "easy" as const, labelPt: "Fácil", labelEn: "Easy" },
                { value: "adequate" as const, labelPt: "Adequado", labelEn: "Adequate" },
                { value: "hard" as const, labelPt: "Difícil", labelEn: "Difficult" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDifficulty(difficulty === option.value ? null : option.value)}
                  className={`px-6 py-2 border text-xs tracking-[0.15em] uppercase font-light transition-all duration-200 ${
                    difficulty === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground/70 hover:border-primary/50"
                  }`}
                >
                  {language === "pt" ? option.labelPt : option.labelEn}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {!hideCompletion && (
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 pt-8 border-t border-border">
              {completed ? (
                <>
                  <motion.div
                    initial={showSuccess ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex items-center gap-3 text-primary"
                  >
                    <Check className="w-5 h-5" />
                    <span className="text-xs tracking-[0.2em] uppercase">{t.academy.module.completed}</span>
                  </motion.div>

                  {nextModule && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <a
                        href={`/academy/module/${nextModule.id}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors border-b border-primary/30 hover:border-primary/60 pb-1"
                      >
                        <span className="tracking-[0.15em] uppercase">{language === "pt" ? "Próximo módulo" : "Next module"} →</span>
                      </a>
                    </motion.div>
                  )}
                </>
              ) : (
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-light">
                  {language === "pt" ? "Completa o quiz no final do módulo para concluir" : "Complete the quiz at the end to finish this module"}
                </p>
              )}

              {showSuccess && completed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 flex items-center justify-center pointer-events-none"
                >
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-16 h-16 border-2 border-primary/40 rounded-full flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}

/* ── Content Block ── */
export function ContentBlock({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <ScrollReveal>
      <div className="space-y-4">
        {title && <h3 className="text-3xl font-light text-primary tracking-tight mb-6">{title}</h3>}
        <div className="text-foreground/70 font-light leading-relaxed space-y-4 text-base">{children}</div>
      </div>
    </ScrollReveal>
  );
}

/* ── Key Takeaway ── */
export function KeyTakeaway({ items }: { items: string[] }) {
  const { t } = useLanguage();
  return (
    <ScrollReveal>
      <div className="relative border-l-2 border-l-primary bg-transparent p-8 md:p-10 my-12 ml-0">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-4 h-4 text-primary" />
          <p className="text-xs tracking-[0.2em] uppercase text-primary font-light">{t.academy.module.keyTakeaways}</p>
        </div>
        <ul className="space-y-5 pl-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-foreground/80 font-light leading-relaxed">
              <div className="mt-1.5 w-1 h-1 bg-primary/60 shrink-0 mt-1.5" />
              <span className="text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

/* ── Image Block ── */
export function ImageBlock({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <ScrollReveal>
      <figure className="space-y-3">
        <div className="relative overflow-hidden">
          <img src={src} alt={alt} className="w-full object-cover border border-border" />
        </div>
        {caption && (
          <figcaption className="text-xs text-foreground/60 text-center tracking-wider font-light">{caption}</figcaption>
        )}
      </figure>
    </ScrollReveal>
  );
}

/* ── Expandable Section ── */
export function ExpandableSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ScrollReveal>
      <div className={`border border-border transition-all duration-300 overflow-hidden ${open ? 'my-6' : 'my-4'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-background/50 transition-colors duration-200"
        >
          <span className={`text-lg font-light transition-colors duration-200 ${open ? 'text-primary' : 'text-foreground/90 hover:text-primary'}`}>{title}</span>
          <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-6 pb-6 pt-2 border-t border-border">
                <div className="text-foreground/70 font-light leading-relaxed space-y-4">
                  {children}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

/* ── Quiz ── */
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export function QuizBlock({ moduleId, questions }: { moduleId: string; questions: QuizQuestion[] }) {
  const { setQuizScore } = useProgress();
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qi: number, oi: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qi] = oi;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
    setQuizScore(moduleId, Math.round((score / questions.length) * 100));
    setSubmitted(true);
  };

  const allAnswered = answers.every(a => a !== null);
  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <ScrollReveal>
      <div className="relative border border-border bg-card p-8 md:p-12 overflow-hidden">
        <div className="relative z-10 space-y-10">
          {!submitted ? (
            <div className="space-y-12">
              {questions.map((q, qi) => (
                <div key={qi} className="space-y-5">
                  <p className="text-xl text-foreground/90 font-light leading-relaxed">
                    <span className="text-primary/50 mr-3 text-sm">{qi + 1}.</span>
                    {q.question}
                  </p>
                  <div className="grid gap-3">
                    {q.options.map((opt, oi) => {
                      const selected = answers[qi] === oi;
                      return (
                        <button
                          key={oi}
                          onClick={() => handleSelect(qi, oi)}
                          className={`group relative text-left px-6 py-4 border text-sm font-light transition-all duration-200 ${
                            selected
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-background text-foreground/70 hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 border flex items-center justify-center transition-colors duration-200 ${
                              selected ? "border-primary" : "border-border/50 group-hover:border-primary/30"
                            }`}>
                              {selected && <div className="w-2.5 h-2.5 bg-primary" />}
                            </div>
                            <span>{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              <div className="pt-6 flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="border border-primary px-12 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.academy.module.checkAnswer}
                </button>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8"
            >
              <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-primary mb-4">
                  {percentage >= 80 ? (
                    <Trophy className="w-8 h-8 text-primary" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  )}
                </div>
                <h3 className="text-3xl font-light text-primary">
                  {percentage}%
                </h3>
                <p className="text-foreground/60 font-light text-sm">
                  {percentage >= 80
                    ? "Excelente resultado! Dominaste este módulo."
                    : "Bom esforço. Revê as respostas abaixo para consolidares o conhecimento."}
                </p>
              </div>

              <div className="space-y-6 border-t border-border pt-8">
                {questions.map((q, qi) => {
                  const isCorrect = answers[qi] === q.correct;
                  return (
                    <div key={qi} className={`p-6 border ${isCorrect ? "border-primary/30" : "border-destructive/30"}`}>
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="space-y-3 flex-1">
                          <p className="text-foreground/90 font-light">{q.question}</p>
                          <div className="space-y-2">
                            {q.options.map((opt, oi) => {
                              const selected = answers[qi] === oi;
                              const isThisCorrect = oi === q.correct;
                              
                              if (!selected && !isThisCorrect) return null;
                              
                              return (
                                <div key={oi} className={`flex items-center gap-3 text-sm px-4 py-2 ${
                                  isThisCorrect ? "text-primary/90" : "text-destructive/90"
                                }`}>
                                  {isThisCorrect ? <Check className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                  <span className="font-light">{opt}</span>
                                  {selected && isThisCorrect && <span className="text-xs ml-auto opacity-60">(Tua resposta)</span>}
                                  {selected && !isThisCorrect && <span className="text-xs ml-auto opacity-60">(Tua resposta incorreta)</span>}
                                  {!selected && isThisCorrect && <span className="text-xs ml-auto opacity-60">(Resposta correta)</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Reflection ── */
export function ReflectionBlock({ questions }: { questions: string[] }) {
  const { language } = useLanguage();
  return (
    <ScrollReveal>
      <div className="border-l-2 border-primary/30 pl-6 my-8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-primary/50 font-light mb-3">
          {language === "pt" ? "Reflete" : "Reflect"}
        </p>
        <div className="space-y-2">
          {questions.map((q, i) => (
            <p key={i} className="text-sm text-foreground/60 font-light leading-relaxed">
              {q}
            </p>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Video Block ── */
interface VideoBlockProps {
  src?: string;
  youtubeId?: string;
  vimeoId?: string;
  title?: string;
  description?: string;
  duration?: string;
  poster?: string;
}

export function VideoBlock({ src, youtubeId, vimeoId, title, description, duration, poster }: VideoBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { language } = useLanguage();

  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1`
    : null;

  return (
    <ScrollReveal>
      <div className="my-8">
        {title && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-primary/40" />
            <p className="text-xs tracking-[0.2em] uppercase text-primary/70 font-light">
              {language === "pt" ? "Vídeo do Módulo" : "Module Video"}
            </p>
          </div>
        )}

        <div className="relative overflow-hidden border border-border bg-card group">
          {!isPlaying ? (
            <div
              className="relative aspect-video cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              {/* Poster/Thumbnail */}
              {poster ? (
                <img src={poster} alt={title || "Video"} className="w-full h-full object-cover opacity-40" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-background via-card to-background" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {/* Play Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="w-20 h-20 border border-primary/40 flex items-center justify-center group-hover:border-primary/70 transition-all duration-500">
                    <div className="w-0 h-0 border-l-[14px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1 group-hover:border-l-primary/90 transition-colors duration-300" />
                  </div>
                  <div className="absolute -inset-3 border border-primary/10 group-hover:border-primary/20 transition-all duration-700" />
                </div>
              </motion.div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div className="space-y-1">
                  {title && (
                    <h4 className="text-lg font-light text-foreground/90 tracking-tight">{title}</h4>
                  )}
                  {description && (
                    <p className="text-xs text-foreground/50 font-light max-w-md">{description}</p>
                  )}
                </div>
                {duration && (
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary/60 border border-primary/20 px-3 py-1 font-light">
                    {duration}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="relative aspect-video">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={title || "Video"}
                />
              ) : src ? (
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-card">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/50">
                    {language === "pt" ? "Vídeo em breve" : "Video coming soon"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ── Module Quiz Gate ── */
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ModuleQuizGateProps {
  moduleId: string;
  questions: QuizQuestion[];
  passingScore?: number; // default 0.5 (50%)
  onPass?: () => void;
}

export function ModuleQuizGate({ moduleId, questions, passingScore = 0.5, onPass }: ModuleQuizGateProps) {
  const { completeModule } = useProgress();
  const { language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    if (showFeedback) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowFeedback(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
  };

  const score = calculateScore();
  const percentage = score / questions.length;
  const passed = percentage >= passingScore;

  const handlePassQuiz = () => {
    completeModule(moduleId);
    if (onPass) onPass();
  };

  if (quizComplete) {
    return (
      <ScrollReveal>
        <div className="border border-border bg-card p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* Score Display */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 border border-primary mb-4">
                {passed ? (
                  <Trophy className="w-10 h-10 text-primary" />
                ) : (
                  <div className="w-10 h-10 text-3xl text-primary flex items-center justify-center">!</div>
                )}
              </div>

              <div>
                <p className="text-5xl font-light text-primary mb-2">
                  {score}/{questions.length}
                </p>
                <p className="text-xl text-foreground/70 font-light">
                  {Math.round(percentage * 100)}%
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-border h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full ${passed ? "bg-primary" : "bg-destructive"}`}
                />
              </div>

              <p className="text-sm text-foreground/60 font-light">
                {language === "pt" ? "Pontuação mínima necessária" : "Minimum required score"}: {Math.round(passingScore * 100)}%
              </p>
            </div>

            {/* Result Message */}
            <div className="border-t border-border pt-10">
              {passed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-3">
                    <p className="text-2xl font-light text-primary">
                      {language === "pt" ? "Parabéns! Módulo concluído." : "Congratulations! Module completed."}
                    </p>
                    <p className="text-sm text-foreground/60 font-light">
                      {language === "pt"
                        ? "Superaste com sucesso este módulo. Podes continuar para o próximo."
                        : "You've successfully completed this module. You can now proceed to the next one."}
                    </p>
                  </div>

                  {/* Confetti-like animation */}
                  <div className="flex justify-center gap-2 flex-wrap">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -50 }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handlePassQuiz}
                      className="border border-primary px-10 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200"
                    >
                      {language === "pt" ? "Continuar" : "Continue"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center"
                >
                  <div className="space-y-2">
                    <p className="text-lg font-light text-destructive">
                      {language === "pt"
                        ? "Não atingiste o mínimo de 50%."
                        : "You didn't reach the minimum of 50%."}
                    </p>
                    <p className="text-sm text-foreground/60 font-light">
                      {language === "pt"
                        ? "Precisa acertar em pelo menos 3 de 5 perguntas. Tenta novamente."
                        : "You need to answer at least 3 out of 5 questions correctly. Try again."}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleRetakeQuiz}
                      className="border border-primary px-10 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200"
                    >
                      {language === "pt" ? "Repetir Quiz" : "Retake Quiz"}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedOption = answers[currentQuestion];
  const isCorrect = selectedOption === currentQ.correctIndex;

  return (
    <ScrollReveal>
      <div className="border border-border bg-card p-12 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60 font-light">
                {language === "pt" ? "Pergunta" : "Question"} {currentQuestion + 1} {language === "pt" ? "de" : "of"} {questions.length}
              </p>
              <p className="text-xs text-primary/60 font-light tracking-wide">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </p>
            </div>
            <div className="w-full bg-border h-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          {/* Question */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl font-light text-foreground/90 leading-relaxed">
              {currentQ.question}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, optionIndex) => {
                const isSelected = selectedOption === optionIndex;
                const showResult = showFeedback && selectedOption !== null;
                const thisIsCorrect = optionIndex === currentQ.correctIndex;

                return (
                  <motion.button
                    key={optionIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: optionIndex * 0.1 }}
                    onClick={() => handleSelectOption(optionIndex)}
                    disabled={showFeedback}
                    className={`w-full text-left p-6 border transition-all duration-200 ${
                      isSelected
                        ? showResult
                          ? thisIsCorrect
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : "border-primary bg-primary/10 text-primary"
                        : showResult && thisIsCorrect
                        ? "border-primary bg-primary/5 text-primary opacity-100"
                        : showFeedback
                        ? "border-border text-foreground/40"
                        : "border-border text-foreground/70 hover:border-primary/50 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? showResult
                            ? thisIsCorrect
                              ? "border-primary"
                              : "border-destructive"
                            : "border-primary"
                          : showResult && thisIsCorrect
                          ? "border-primary"
                          : "border-border/50"
                      }`}>
                        {isSelected && showResult && (
                          thisIsCorrect ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )
                        )}
                        {!showResult && isSelected && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <span className="font-light">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {showFeedback && selectedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border ${isCorrect ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"}`}
              >
                <p className={`text-sm font-light ${isCorrect ? "text-primary/90" : "text-destructive/90"}`}>
                  {isCorrect
                    ? language === "pt"
                      ? "Resposta correta!"
                      : "Correct answer!"
                    : language === "pt"
                    ? "Resposta incorreta. Tenta novamente."
                    : "Incorrect answer. Try again."}
                </p>
              </motion.div>
            )}

            {/* Button */}
            <div className="flex justify-center pt-4">
              {!showFeedback ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="border border-primary px-10 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === "pt" ? "Responder" : "Answer"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="border border-primary px-10 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200"
                >
                  {currentQuestion < questions.length - 1
                    ? language === "pt"
                      ? "Próxima"
                      : "Next"
                    : language === "pt"
                    ? "Ver Resultados"
                    : "See Results"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}
