import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, CheckCircle2, XCircle, Trophy, Sparkles, Bookmark, PenTool } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "./ScrollReveal";

/* ── Module Layout ── */
interface ModuleLayoutProps {
  moduleId: string;
  moduleNumber?: number;
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
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] flex items-end overflow-hidden border-b border-border">
        <img src={heroImage} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
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

        {!hideCompletion && (
          <ScrollReveal>
            <div className="flex justify-center pt-8 border-t border-border">
              {completed ? (
                <div className="flex items-center gap-3 text-primary">
                  <Check className="w-5 h-5" />
                  <span className="text-xs tracking-[0.2em] uppercase">{t.academy.module.completed}</span>
                </div>
              ) : (
                <button
                  onClick={() => completeModule(moduleId)}
                  className="border border-primary px-10 py-3 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-background transition-all duration-200"
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
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-light">{t.academy.module.quiz}</p>
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
  const { t } = useLanguage();
  return (
    <ScrollReveal>
      <div className="relative border border-border bg-card p-8 md:p-12 my-12 overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <PenTool className="w-4 h-4 text-primary" />
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-light">{t.academy.module.reflection}</p>
          </div>
          <div className="space-y-10">
          {questions.map((q, i) => (
            <div key={i} className="space-y-3">
              <p className="text-foreground/90 font-light text-base leading-relaxed">
                <span className="text-primary/50 mr-3 text-sm">{i + 1}.</span>
                {q}
              </p>
              <textarea
                placeholder={t.academy.module.reflectionPlaceholder}
                className="w-full min-h-[120px] bg-background border border-border text-foreground/80 p-4 text-sm font-light resize-none focus:outline-none focus:border-primary transition-colors duration-200 placeholder:text-foreground/40"
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
