import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";

interface ModuleProgress {
  completed: boolean;
  quizScore?: number;
}

interface ProgressState {
  [moduleId: string]: ModuleProgress;
}

interface ProgressContextType {
  progress: ProgressState;
  completeModule: (moduleId: string) => void;
  setQuizScore: (moduleId: string, score: number) => void;
  getCompletionPercentage: () => number;
  isModuleCompleted: (moduleId: string) => boolean;
  totalModules: number;
  completedModules: number;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const MODULES = [
  "story", "philosophy", "products", "gift", "store",
  "brand-voice", "customer-experience", "business-model", "ask-team", "resources", "certification"
];

const SESSION_KEY = "the100s-academy-session";

function getProgressKey(): string {
  const sessionCode = localStorage.getItem(SESSION_KEY);
  return sessionCode ? `the100s-progress-${sessionCode}` : "the100s-progress";
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progressKey = useRef(getProgressKey()).current;

  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem(progressKey);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(progressKey, JSON.stringify(progress));
  }, [progress, progressKey]);

  const completeModule = (moduleId: string) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], completed: true }
    }));
  };

  const setQuizScore = (moduleId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], quizScore: score }
    }));
  };

  const completedModules = MODULES.filter(m => progress[m]?.completed).length;

  const getCompletionPercentage = () => Math.round((completedModules / MODULES.length) * 100);

  const isModuleCompleted = (moduleId: string) => !!progress[moduleId]?.completed;

  return (
    <ProgressContext.Provider value={{
      progress, completeModule, setQuizScore,
      getCompletionPercentage, isModuleCompleted,
      totalModules: MODULES.length, completedModules
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be within ProgressProvider");
  return ctx;
};
