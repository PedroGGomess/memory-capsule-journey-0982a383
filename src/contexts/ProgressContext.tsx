import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  "brand-voice", "customer-experience", "ask-team", "resources", "certification"
];

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem("the100s-progress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("the100s-progress", JSON.stringify(progress));
  }, [progress]);

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
