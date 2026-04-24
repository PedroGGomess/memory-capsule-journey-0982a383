import { ReactNode, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Lock, Unlock, Check, X, 
  ArrowRight, RotateCcw, Trophy, Star, MessageSquare,
  Eye, Lightbulb, AlertTriangle, Bookmark, ChevronDown
} from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

/* ═══════════════════════════════════════════
   PHASE SYSTEM - Unlockable phases within a module
   ═══════════════════════════════════════════ */

export interface Phase {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  quiz?: QuizQuestion[];
  passingScore?: number;
}

interface PhaseSystemProps {
  moduleId: string;
  phases: Phase[];
  onAllComplete?: () => void;
}

export function PhaseSystem({ moduleId, phases, onAllComplete }: PhaseSystemProps) {
  const storageKey = `the100s-phases-${moduleId}`;
  const [completedPhases, setCompletedPhases] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; }
  });
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completedPhases));
    if (completedPhases.length === phases.length && onAllComplete) {
      onAllComplete();
    }
  }, [completedPhases, storageKey, phases.length, onAllComplete]);

  const isPhaseUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedPhases.includes(phases[index - 1].id);
  };

  const completePhase = (phaseId: string) => {
    if (!completedPhases.includes(phaseId)) {
      setCompletedPhases(prev => [...prev, phaseId]);
    }
  };

  const allComplete = completedPhases.length === phases.length;

  return (
    <div className="space-y-6">
      {/* Phase Progress Bar */}
      <div className="flex items-center gap-1 px-2">
        {phases.map((phase, i) => {
          const unlocked = isPhaseUnlocked(i);
          const completed = completedPhases.includes(phase.id);
          const active = i === activePhase;
          return (
            <button
              key={phase.id}
              onClick={() => unlocked && setActivePhase(i)}
              disabled={!unlocked}
              className={`
                flex-1 h-2 rounded-full transition-all duration-500 relative group
                ${completed ? "bg-primary" : active && unlocked ? "bg-primary/60" : unlocked ? "bg-primary/20" : "bg-muted"}
                ${unlocked ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed"}
              `}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded whitespace-nowrap border border-border shadow-sm z-10">
                {unlocked ? phase.title : "🔒 Completa a fase anterior"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Phase Navigation Pills */}
      <div className="flex flex-wrap gap-2">
        {phases.map((phase, i) => {
          const unlocked = isPhaseUnlocked(i);
          const completed = completedPhases.includes(phase.id);
          const active = i === activePhase;
          return (
            <button
              key={phase.id}
              onClick={() => unlocked && setActivePhase(i)}
              disabled={!unlocked}
              className={`
                flex items-center gap-2 px-3 py-2 text-xs font-medium transition-all duration-300 border
                ${active ? "border-primary bg-primary/10 text-primary" : 
                  completed ? "border-primary/30 bg-primary/5 text-primary/70" :
                  unlocked ? "border-border hover:border-primary/30 text-foreground/60" :
                  "border-border/30 text-foreground/20 cursor-not-allowed"}
              `}
            >
              {completed ? <Check className="w-3 h-3" /> : !unlocked ? <Lock className="w-3 h-3" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
              <span>{phase.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {isPhaseUnlocked(activePhase) ? (
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4">
                <p className="text-xs text-primary/60 font-medium tracking-widest uppercase">Fase {activePhase + 1} de {phases.length}</p>
                <h3 className="text-lg font-light text-foreground mt-1">{phases[activePhase].title}</h3>
                {phases[activePhase].subtitle && (
                  <p className="text-sm text-foreground/50 font-light mt-1">{phases[activePhase].subtitle}</p>
                )}
              </div>

              {phases[activePhase].content}

              {/* Phase Quiz Gate */}
              {phases[activePhase].quiz ? (
                <PhaseQuiz
                  questions={phases[activePhase].quiz!}
                  passingScore={phases[activePhase].passingScore || 0.6}
                  onPass={() => {
                    completePhase(phases[activePhase].id);
                    if (activePhase < phases.length - 1) {
                      setTimeout(() => setActivePhase(activePhase + 1), 800);
                    }
                  }}
                />
              ) : (
                <button
                  onClick={() => {
                    completePhase(phases[activePhase].id);
                    if (activePhase < phases.length - 1) {
                      setTimeout(() => setActivePhase(activePhase + 1), 400);
                    }
                  }}
                  className={`
                    w-full py-3 text-sm font-medium transition-all duration-300 border
                    ${completedPhases.includes(phases[activePhase].id)
                      ? "border-primary/30 bg-primary/5 text-primary"
                      : "border-primary bg-primary text-primary-foreground hover:bg-primary/90"}
                  `}
                >
                  {completedPhases.includes(phases[activePhase].id) 
                    ? "✓ Fase completa" 
                    : activePhase < phases.length - 1 ? "Completar e avançar →" : "Completar fase final"}
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Lock className="w-8 h-8 text-foreground/20 mb-3" />
              <p className="text-foreground/40 text-sm">Completa a fase anterior para desbloquear</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Completion Banner */}
      {allComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-primary/30 bg-primary/5 p-6 text-center"
        >
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-primary font-medium">Todas as fases completas!</p>
          <p className="text-foreground/50 text-xs mt-1">Podes avançar para o próximo módulo.</p>
        </motion.div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════
   SLIDE VIEWER - Interactive slide presentation
   ═══════════════════════════════════════════ */

export interface Slide {
  title: string;
  content: ReactNode;
  image?: string;
  note?: string;
}

interface SlideViewerProps {
  slides: Slide[];
  onComplete?: () => void;
}

export function SlideViewer({ slides, onComplete }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  const goTo = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrent(index);
      setVisited(prev => new Set(prev).add(index));
      if (index === slides.length - 1 && onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className="border border-border/30 overflow-hidden">
      {/* Slide Progress */}
      <div className="flex gap-0.5 p-2 bg-muted/30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`flex-1 h-1 rounded-full transition-all ${
              i === current ? "bg-primary" : visited.has(i) ? "bg-primary/30" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="p-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[10px] text-foreground/30 tracking-widest uppercase mb-3">
              {current + 1} / {slides.length}
            </p>
            <h4 className="text-base font-medium text-foreground mb-4">{slides[current].title}</h4>
            
            {slides[current].image && (
              <img src={slides[current].image} alt={slides[current].title} className="w-full max-h-64 object-cover mb-4 opacity-90" />
            )}
            
            <div className="text-sm text-foreground/70 font-light space-y-3">
              {slides[current].content}
            </div>

            {slides[current].note && (
              <div className="mt-4 p-3 border-l-2 border-primary/30 bg-primary/5">
                <p className="text-xs text-foreground/50 italic">{slides[current].note}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-3 border-t border-border/20 bg-muted/20">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground disabled:opacity-20 transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>
        <span className="text-[10px] text-foreground/30">{visited.size} de {slides.length} visitados</span>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === slides.length - 1}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 disabled:opacity-20 transition-all"
        >
          Próximo <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   QUIZ CHECKPOINT
   ═══════════════════════════════════════════ */

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface PhaseQuizProps {
  questions: QuizQuestion[];
  passingScore: number;
  onPass: () => void;
}

function PhaseQuiz({ questions, passingScore, onPass }: PhaseQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowResult(true);
        const correct = newAnswers.filter((a, i) => a === questions[i].correctIndex).length;
        if (correct / questions.length >= passingScore) {
          setTimeout(onPass, 500);
        }
      }
    }, 1500);
  };

  const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
  const passed = score / questions.length >= passingScore;

  const retry = () => {
    setCurrentQ(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 border text-center ${passed ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"}`}
      >
        <div className="text-3xl mb-2">{passed ? "✓" : "✗"}</div>
        <p className={`font-medium ${passed ? "text-primary" : "text-destructive"}`}>
          {score} de {questions.length} corretas
        </p>
        <p className="text-xs text-foreground/50 mt-1">
          {passed ? "Fase desbloqueada!" : `Precisas de ${Math.ceil(passingScore * 100)}% para avançar.`}
        </p>
        {!passed && (
          <button onClick={retry} className="mt-3 flex items-center gap-1 mx-auto text-xs text-foreground/60 hover:text-foreground">
            <RotateCcw className="w-3 h-3" /> Tentar novamente
          </button>
        )}
      </motion.div>
    );
  }

  const q = questions[currentQ];
  return (
    <div className="border border-border/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] tracking-widest uppercase text-foreground/30">Checkpoint</p>
        <p className="text-[10px] text-foreground/30">{currentQ + 1}/{questions.length}</p>
      </div>
      <p className="text-sm font-medium text-foreground mb-4">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = selectedOption === i;
          const isCorrect = i === q.correctIndex;
          let style = "border-border/30 hover:border-primary/30 text-foreground/70";
          if (showFeedback && isSelected) {
            style = isCorrect ? "border-primary bg-primary/10 text-primary" : "border-destructive bg-destructive/10 text-destructive";
          } else if (showFeedback && isCorrect) {
            style = "border-primary/30 bg-primary/5 text-primary/60";
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showFeedback}
              className={`w-full text-left p-3 text-sm border transition-all duration-300 ${style}`}
            >
              <span className="text-[10px] font-bold mr-2 opacity-40">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {showFeedback && q.explanation && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 text-xs text-foreground/50 italic border-l-2 border-primary/20 pl-3"
        >
          {q.explanation}
        </motion.p>
      )}
    </div>
  );
}

export { PhaseQuiz };


/* ═══════════════════════════════════════════
   SCENARIO SIMULATOR - Interactive role-play
   ═══════════════════════════════════════════ */

export interface ScenarioStep {
  situation: string;
  customerSays?: string;
  image?: string;
  options: {
    text: string;
    feedback: string;
    score: number; // 0-3 (0=bad, 1=ok, 2=good, 3=excellent)
    next?: string;
  }[];
}

export interface Scenario {
  title: string;
  description: string;
  customerProfile?: string;
  steps: ScenarioStep[];
}

interface ScenarioSimulatorProps {
  scenario: Scenario;
  onComplete?: (totalScore: number, maxScore: number) => void;
}

export function ScenarioSimulator({ scenario, onComplete }: ScenarioSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState<{step: number; option: number; score: number}[]>([]);

  const maxScore = scenario.steps.length * 3;

  const handleChoice = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    const score = scenario.steps[currentStep].options[optionIndex].score;
    setTotalScore(prev => prev + score);
    setHistory(prev => [...prev, { step: currentStep, option: optionIndex, score }]);
  };

  const advance = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setFinished(true);
      if (onComplete) onComplete(totalScore, maxScore);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setTotalScore(0);
    setFinished(false);
    setHistory([]);
  };

  const scoreLabel = (score: number) => {
    if (score === 3) return { text: "Excelente", color: "text-primary" };
    if (score === 2) return { text: "Bom", color: "text-blue-500" };
    if (score === 1) return { text: "Aceitável", color: "text-yellow-500" };
    return { text: "A melhorar", color: "text-destructive" };
  };

  if (finished) {
    const pct = Math.round((totalScore / maxScore) * 100);
    const grade = pct >= 80 ? "Excelente" : pct >= 60 ? "Bom" : pct >= 40 ? "Suficiente" : "Insuficiente";
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border/30 p-6 space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
          <p className="text-lg font-light text-foreground">{grade}</p>
          <p className="text-sm text-foreground/50">{totalScore} de {maxScore} pontos ({pct}%)</p>
        </div>
        <div className="space-y-2">
          {history.map((h, i) => {
            const label = scoreLabel(h.score);
            return (
              <div key={i} className="flex items-center justify-between text-xs p-2 border border-border/20">
                <span className="text-foreground/50">Passo {i + 1}</span>
                <span className={label.color}>{label.text}</span>
              </div>
            );
          })}
        </div>
        <button onClick={restart} className="w-full py-2 text-xs border border-border hover:border-primary/30 text-foreground/60 transition-all flex items-center justify-center gap-1">
          <RotateCcw className="w-3 h-3" /> Repetir simulação
        </button>
      </motion.div>
    );
  }

  const step = scenario.steps[currentStep];

  return (
    <div className="border border-border/30 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-muted/30 border-b border-border/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-primary/60">Simulador</p>
            <p className="text-sm font-medium text-foreground">{scenario.title}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-foreground/30">Passo {currentStep + 1}/{scenario.steps.length}</p>
            <div className="flex gap-0.5 mt-1">
              {scenario.steps.map((_, i) => (
                <div key={i} className={`w-4 h-1 rounded-full ${i < currentStep ? "bg-primary" : i === currentStep ? "bg-primary/50" : "bg-border"}`} />
              ))}
            </div>
          </div>
        </div>
        {scenario.customerProfile && currentStep === 0 && (
          <p className="text-xs text-foreground/40 mt-2 italic">👤 {scenario.customerProfile}</p>
        )}
      </div>

      {/* Situation */}
      <div className="p-5 space-y-4">
        <p className="text-sm text-foreground/70 font-light">{step.situation}</p>
        
        {step.customerSays && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs flex-shrink-0">👤</div>
            <div className="bg-muted/50 p-3 rounded-sm flex-1">
              <p className="text-sm text-foreground/80 italic">"{step.customerSays}"</p>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-2 pt-2">
          <p className="text-[10px] tracking-widest uppercase text-foreground/30">O que fazes?</p>
          {step.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const label = scoreLabel(opt.score);
            let style = "border-border/30 hover:border-primary/20";
            if (showFeedback && isSelected) {
              style = opt.score >= 2 ? "border-primary bg-primary/5" : opt.score === 1 ? "border-yellow-500 bg-yellow-500/5" : "border-destructive bg-destructive/5";
            }
            return (
              <button
                key={i}
                onClick={() => handleChoice(i)}
                disabled={showFeedback}
                className={`w-full text-left p-3 border transition-all duration-300 ${style}`}
              >
                <p className="text-sm text-foreground/80">{opt.text}</p>
                {showFeedback && isSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                    <p className={`text-xs font-medium ${label.color}`}>{label.text} (+{opt.score}pts)</p>
                    <p className="text-xs text-foreground/50 mt-1">{opt.feedback}</p>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={advance}
            className="w-full py-2 text-xs text-primary border border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-center gap-1"
          >
            {currentStep < scenario.steps.length - 1 ? "Próximo passo →" : "Ver resultado"}
          </motion.button>
        )}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   EXPANDABLE TIP - For "O que evitamos" sections
   ═══════════════════════════════════════════ */

interface TipBlockProps {
  type: "do" | "dont" | "tip" | "note";
  title?: string;
  items: string[];
}

export function TipBlock({ type, title, items }: TipBlockProps) {
  const [open, setOpen] = useState(false);
  const config = {
    do: { icon: <Check className="w-3.5 h-3.5" />, color: "text-primary border-primary/20 bg-primary/5", label: "O que fazemos" },
    dont: { icon: <X className="w-3.5 h-3.5" />, color: "text-destructive border-destructive/20 bg-destructive/5", label: "O que evitamos" },
    tip: { icon: <Lightbulb className="w-3.5 h-3.5" />, color: "text-yellow-600 border-yellow-500/20 bg-yellow-500/5", label: "Dica" },
    note: { icon: <AlertTriangle className="w-3.5 h-3.5" />, color: "text-blue-500 border-blue-500/20 bg-blue-500/5", label: "Nota" },
  };
  const c = config[type];

  return (
    <div className={`border p-4 ${c.color} transition-all`}>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {c.icon}
          <span className="text-xs font-medium">{title || c.label}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-1.5 overflow-hidden"
          >
            {items.map((item, i) => (
              <li key={i} className="text-xs font-light flex items-start gap-2">
                <span className="opacity-40 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}


/* ═══════════════════════════════════════════
   PREMIUM PHRASE CARD - PT/EN examples
   ═══════════════════════════════════════════ */

interface PhraseCardProps {
  pt: string;
  en: string;
  context?: string;
}

export function PhraseCard({ pt, en, context }: PhraseCardProps) {
  const [showEN, setShowEN] = useState(false);
  return (
    <div className="border border-border/20 p-4 space-y-2">
      {context && <p className="text-[10px] text-foreground/30 uppercase tracking-wider">{context}</p>}
      <p className="text-sm text-foreground/80 font-light">🇵🇹 "{pt}"</p>
      <button onClick={() => setShowEN(!showEN)} className="text-[10px] text-primary/60 hover:text-primary transition-all">
        {showEN ? "Esconder" : "Ver em"} inglês
      </button>
      {showEN && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-foreground/60 font-light">
          🇬🇧 "{en}"
        </motion.p>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════
   PRODUCT IMAGE GALLERY
   ═══════════════════════════════════════════ */

interface ProductGalleryItem {
  src: string;
  label: string;
  description?: string;
}

interface InteractiveGalleryProps {
  items: ProductGalleryItem[];
  columns?: 2 | 3;
}

export function InteractiveGallery({ items, columns = 3 }: InteractiveGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div>
      <div className={`grid gap-3 ${columns === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"}`}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`text-left border transition-all duration-300 overflow-hidden group ${
              selected === i ? "border-primary" : "border-border/20 hover:border-primary/30"
            }`}
          >
            <div className="aspect-square overflow-hidden bg-muted/30">
              <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-2">
              <p className="text-xs font-medium text-foreground/80">{item.label}</p>
              {item.description && selected === i && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-foreground/50 mt-1">{item.description}</motion.p>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected !== null && items[selected].description && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 border border-primary/20 bg-primary/5"
        >
          <p className="text-xs text-foreground/60">{items[selected].description}</p>
        </motion.div>
      )}
    </div>
  );
}
