import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { getModulesForRole } from "@/config/roles";

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
  userRole: string | undefined;
  allowedModules: string[];
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const SESSION_KEY = "the100s-academy-session";
const USERS_KEY = "gym-users";

function getProgressKey(): string {
  const sessionCode = localStorage.getItem(SESSION_KEY);
  return sessionCode ? `the100s-progress-${sessionCode}` : "the100s-progress";
}

function getUserRole(): string | undefined {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return undefined;
    const usersData = localStorage.getItem(USERS_KEY);
    if (!usersData) return undefined;
    const users: Array<{ academyCode?: string; role?: string }> = JSON.parse(usersData);
    const user = users.find((u) => u.academyCode && u.academyCode === session);
    return user?.role;
  } catch {
    return undefined;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progressKey = useRef(getProgressKey()).current;
  const role = getUserRole();
  const allowedModules = getModulesForRole(role);

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

  const completedModules = allowedModules.filter(m => progress[m]?.completed).length;

  const getCompletionPercentage = () => Math.round((completedModules / allowedModules.length) * 100);

  const isModuleCompleted = (moduleId: string) => !!progress[moduleId]?.completed;

  return (
    <ProgressContext.Provider value={{
      progress, completeModule, setQuizScore,
      getCompletionPercentage, isModuleCompleted,
      totalModules: allowedModules.length, completedModules,
      userRole: role, allowedModules
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
