import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { getModulesForRole } from "@/config/roles";
import { useAcademyAuth } from "./AcademyAuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ModuleProgress {
  completed: boolean;
  quizScore?: number;
}

interface ProgressState {
  [moduleId: string]: ModuleProgress;
}

interface StreakData {
  streakDays: number;
  lastActivityDate: string | null;
}

interface ProgressContextType {
  progress: ProgressState;
  streak: StreakData;
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

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAcademyAuth();
  const role = user?.role;
  const userId = user?.id;
  const allowedModules = getModulesForRole(role);

  const progressKey = useRef(user ? `the100s-progress-${user.accessCode}` : "the100s-progress").current;
  const streakKey = useRef(user ? `the100s-streak-${user.accessCode}` : "the100s-streak").current;

  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem(progressKey);
    return saved ? JSON.parse(saved) : {};
  });

  const [streak, setStreak] = useState<StreakData>(() => {
    const saved = localStorage.getItem(streakKey);
    return saved ? JSON.parse(saved) : { streakDays: 0, lastActivityDate: null };
  });

  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const loadFromSupabase = async () => {
      if (!userId) return;

      try {
        const { data, error } = await supabase
          .from("academy_employees")
          .select("progress, quiz_scores")
          .eq("id", userId)
          .single();

        if (!error && data) {
          const progressData = (data.progress as ProgressState) || {};
          setProgress(progressData);
          localStorage.setItem(progressKey, JSON.stringify(progressData));
        }
      } catch {
        const saved = localStorage.getItem(progressKey);
        if (saved) {
          setProgress(JSON.parse(saved));
        }
      }
    };

    loadFromSupabase();
  }, [userId, progressKey]);

  useEffect(() => {
    const saveToSupabase = async () => {
      if (!userId || isSyncing) return;

      setIsSyncing(true);
      try {
        await supabase
          .from("academy_employees")
          .update({ progress })
          .eq("id", userId);

        localStorage.setItem(progressKey, JSON.stringify(progress));
        localStorage.setItem(streakKey, JSON.stringify(streak));
      } catch {
        localStorage.setItem(progressKey, JSON.stringify(progress));
        localStorage.setItem(streakKey, JSON.stringify(streak));
      } finally {
        setIsSyncing(false);
      }
    };

    const timer = setTimeout(saveToSupabase, 1000);
    return () => clearTimeout(timer);
  }, [progress, streak, userId, progressKey, streakKey, isSyncing]);

  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0];
    setStreak(prev => {
      if (prev.lastActivityDate === today) {
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const isConsecutiveDay = prev.lastActivityDate === yesterdayStr;
      return {
        streakDays: isConsecutiveDay ? prev.streakDays + 1 : 1,
        lastActivityDate: today
      };
    });
  };

  const completeModule = (moduleId: string) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], completed: true }
    }));
    updateStreak();
  };

  const setQuizScore = (moduleId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], quizScore: score }
    }));
    updateStreak();
  };

  const completedModules = allowedModules.filter(m => progress[m]?.completed).length;

  const getCompletionPercentage = () => Math.round((completedModules / allowedModules.length) * 100);

  const isModuleCompleted = (moduleId: string) => !!progress[moduleId]?.completed;

  return (
    <ProgressContext.Provider value={{
      progress, streak, completeModule, setQuizScore,
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
