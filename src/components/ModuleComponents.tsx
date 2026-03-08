import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, CheckCircle2, XCircle, Trophy, Sparkles, Bookmark, PenTool } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "./ScrollReveal";

/* ── Module Layout ── */
interface ModuleLayoutProps {
  moduleId: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  heroImage: string;
  children: ReactNode;
  hideCompletion?: boolean;
}

export function ModuleLayout({ moduleId, moduleNumber, title, subtitle, heroImage, children, hideCompletion }: ModuleLayoutProps) {
  const { completeModule, isModuleCompleted, totalModules } = useProgress();
  const { t } = useLanguage();
  const completed = isModuleCompleted(moduleId);

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] flex items-end overflow-hidden">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-primary/60 mb-3">
              {t.academy.module.moduleOf} {moduleNumber} {t.academy.module.of} {totalModules}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gold-gradient mb-3">{title}</h1>
            <p className="text-lg text-muted-foreground font-light">{subtitle}</p>
          </ScrollReveal>
        </div>
      </div>

      <div className="section-padding py-16 max-w-4xl mx-auto space-y-16">
        {children}

        {!hideCompletion && (
          <ScrollReveal>
            <div className="flex justify-center pt-8 border-t border-border/30">
              {completed ? (
                <div className="flex items-center gap-3 text-primary">
                  <Check className="w-5 h-5" />
                  <span className="text-sm tracking-[0.2em] uppercase">{t.academy.module.completed}</span>
                </div>
              ) : (
                <button
                  onClick={() => completeModule(moduleId)}
                  className="border border-primary/30 px-10 py-4 text-sm tracking-[0.25em] uppercase text-primary transition-all duration-500 hover:border-primary hover:glow-gold"
                >
                  {t.academy.module.markComplete}
                </button>
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
        {title && <h3 className="text-2xl font-light text-primary tracking-wider">{title}</h3>}
        <div className="text-foreground/70 font-light leading-relaxed space-y-3">{children}</div>
      </div>
    </ScrollReveal>
  );
}

/* ── Key Takeaway ── */
export function KeyTakeaway({ items }: { items: string[] }) {
  const { t } = useLanguage();
  return (
    <ScrollReveal>
      <div className="relative border border-primary/20 bg-primary/[0.03] backdrop-blur-md p-8 md:p-10 my-12">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-5 h-5 text-primary" />
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium">{t.academy.module.keyTakeaways}</p>
        </div>
        <ul className="space-y-5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-foreground/80 font-light leading-relaxed">
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
              <span className="text-lg">{item}</span>
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
        <div className="relative overflow-hidden rounded-sm">
          <img src={src} alt={alt} className="w-full object-cover" />
          <div className="absolute inset-0 border border-primary/10 rounded-sm" />
        </div>
        {caption && (
          <figcaption className="text-xs text-muted-foreground text-center tracking-wider">{caption}</figcaption>
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
      <div className="border-b border-border/30">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left"
        >
          <span className="text-lg font-light text-foreground/90">{title}</span>
          <ChevronDown className={`w-5 h-5 text-primary/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pb-6 text-foreground/70 font-light leading-relaxed space-y-3">
                {children}
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
      <div className="relative border border-border/30 bg-secondary/5 backdrop-blur-xl p-8 md:p-12 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 space-y-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-xs tracking-[0.3em] uppercase text-primary">{t.academy.module.quiz}</p>
          </div>

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
                          className={`group relative text-left px-6 py-4 border text-sm font-light transition-all duration-500 overflow-hidden ${
                            selected 
                              ? "border-primary/50 bg-primary/10 text-primary" 
                              : "border-border/30 bg-background/40 text-foreground/70 hover:border-primary/30 hover:bg-background/80"
                          }`}
                        >
                          {selected && (
                            <motion.div 
                              layoutId={`quiz-selection-${qi}`}
                              className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                            />
                          )}
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                              selected ? "border-primary" : "border-border/50 group-hover:border-primary/30"
                            }`}>
                              {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
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
                  className="relative group border border-primary/30 px-12 py-4 text-sm tracking-[0.2em] uppercase text-primary transition-all duration-500 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10">{t.academy.module.checkAnswer}</span>
                  {!(!allAnswered) && (
                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  )}
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
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-primary/20 bg-primary/5 mb-4">
                  {percentage >= 80 ? (
                    <Trophy className="w-10 h-10 text-primary" />
                  ) : (
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  )}
                </div>
                <h3 className="text-3xl font-light text-primary">
                  {percentage}% {t.academy.module.completed}
                </h3>
                <p className="text-foreground/60 font-light">
                  {percentage >= 80 
                    ? "Excelente resultado! Dominaste este módulo." 
                    : "Bom esforço. Revê as respostas abaixo para consolidares o conhecimento."}
                </p>
              </div>

              <div className="space-y-6 border-t border-border/30 pt-8">
                {questions.map((q, qi) => {
                  const isCorrect = answers[qi] === q.correct;
                  return (
                    <div key={qi} className={`p-6 border ${isCorrect ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"}`}>
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
  const { t } = useLanguage();
  return (
    <ScrollReveal>
      <div className="border border-border/50 p-8 space-y-4">
        <p className="text-xs tracking-[0.3em] uppercase text-primary/60">{t.academy.module.reflection}</p>
        {questions.map((q, i) => (
          <div key={i} className="space-y-2">
            <p className="text-foreground/80 font-light italic">{q}</p>
            <textarea
              placeholder={t.academy.module.reflectionPlaceholder}
              className="w-full min-h-[80px] bg-secondary/30 border border-border/30 text-foreground/70 p-4 text-sm font-light resize-none focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/30"
            />
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
