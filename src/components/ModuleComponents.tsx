import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
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
      <div className="border border-border/50 p-8 space-y-4">
        <p className="text-xs tracking-[0.3em] uppercase text-primary/60">{t.academy.module.keyTakeaways}</p>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/70 font-light">
              <span className="text-primary mt-1 text-xs">◆</span>
              <span>{item}</span>
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

  return (
    <ScrollReveal>
      <div className="border border-border/50 p-8 space-y-8">
        <p className="text-xs tracking-[0.3em] uppercase text-primary/60">{t.academy.module.quiz}</p>
        {questions.map((q, qi) => (
          <div key={qi} className="space-y-3">
            <p className="text-foreground/90 font-light">{q.question}</p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = submitted && oi === q.correct;
                const isWrong = submitted && selected && oi !== q.correct;
                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(qi, oi)}
                    className={`text-left px-4 py-3 border text-sm font-light transition-all duration-300 ${
                      isCorrect ? "border-primary/60 bg-primary/10 text-primary" :
                      isWrong ? "border-destructive/40 bg-destructive/5 text-destructive" :
                      selected ? "border-primary/40 bg-primary/5 text-foreground" :
                      "border-border/30 text-foreground/60 hover:border-border"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="border border-primary/30 px-8 py-3 text-sm tracking-[0.2em] uppercase text-primary transition-all duration-500 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t.academy.module.checkAnswer}
          </button>
        )}
        {submitted && (
          <p className="text-primary text-sm">
            Score: {questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)}/{questions.length}
          </p>
        )}
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
