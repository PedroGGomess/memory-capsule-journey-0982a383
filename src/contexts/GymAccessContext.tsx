import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface GymUser {
  id: string;
  name: string;
  email: string;
  accessCode: string;
  academyCode?: string;
  active: boolean;
  createdAt: string;
  notes?: string;
  onboardingComplete?: boolean;
}

export interface AccessLog {
  id: string;
  userId?: string;
  userName?: string;
  accessCode: string;
  timestamp: string;
  result: "allowed" | "denied";
}

export interface EmployeeQuestion {
  id: string;
  employeeName: string;
  question: string;
  module?: string;
  createdAt: string;
  resolved: boolean;
  reply?: string;
}

interface GymAccessContextType {
  users: GymUser[];
  logs: AccessLog[];
  questions: EmployeeQuestion[];
  addUser: (data: Omit<GymUser, "id" | "createdAt">) => GymUser;
  updateUser: (id: string, data: Partial<Omit<GymUser, "id" | "createdAt">>) => boolean;
  deleteUser: (id: string) => boolean;
  toggleUserActive: (id: string) => void;
  verifyAccessCode: (code: string) => { allowed: boolean; user?: GymUser };
  generateAccessCode: () => string;
  generateUserAcademyCode: () => string;
  clearLogs: () => void;
  submitQuestion: (data: Omit<EmployeeQuestion, "id" | "createdAt" | "resolved">) => void;
  replyToQuestion: (id: string, reply: string) => void;
  resolveQuestion: (id: string) => void;
}

const GymAccessContext = createContext<GymAccessContextType | null>(null);

const USERS_KEY = "gym-users";
const LOGS_KEY = "gym-access-logs";
const QUESTIONS_KEY = "the100s-questions";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${segment(3)}-${segment(4)}-${segment(4)}`;
}

export function GymAccessProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<GymUser[]>(() => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState<AccessLog[]>(() => {
    const saved = localStorage.getItem(LOGS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [questions, setQuestions] = useState<EmployeeQuestion[]>(() => {
    const saved = localStorage.getItem(QUESTIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  }, [questions]);

  const generateAccessCode = (): string => {
    let code: string;
    const existingCodes = users.map((u) => u.accessCode);
    do {
      code = generateCode();
    } while (existingCodes.includes(code));
    return code;
  };

  const generateUserAcademyCode = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const existingCodes = new Set(users.map((u) => u.academyCode).filter(Boolean) as string[]);
    let code: string;
    const randomValues = new Uint32Array(8);
    do {
      crypto.getRandomValues(randomValues);
      code = Array.from(randomValues, (v) => chars[v % chars.length]).join("");
    } while (existingCodes.has(code));
    return code;
  };

  const addUser = (data: Omit<GymUser, "id" | "createdAt">): GymUser => {
    const newUser: GymUser = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id: string, data: Partial<Omit<GymUser, "id" | "createdAt">>): boolean => {
    let found = false;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          found = true;
          return { ...u, ...data };
        }
        return u;
      })
    );
    return found;
  };

  const deleteUser = (id: string): boolean => {
    let found = false;
    setUsers((prev) => prev.filter((u) => {
      if (u.id === id) { found = true; return false; }
      return true;
    }));
    return found;
  };

  const toggleUserActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  const verifyAccessCode = (code: string): { allowed: boolean; user?: GymUser } => {
    const trimmedCode = code.trim().toUpperCase();
    const user = users.find((u) => u.accessCode.toUpperCase() === trimmedCode);
    const allowed = !!user && user.active;

    const log: AccessLog = {
      id: crypto.randomUUID(),
      userId: user?.id,
      userName: user?.name,
      accessCode: trimmedCode,
      timestamp: new Date().toISOString(),
      result: allowed ? "allowed" : "denied",
    };
    setLogs((prev) => [log, ...prev].slice(0, 500));

    return { allowed, user: allowed ? user : undefined };
  };

  const clearLogs = () => setLogs([]);

  const submitQuestion = (data: Omit<EmployeeQuestion, "id" | "createdAt" | "resolved">) => {
    const question: EmployeeQuestion = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      resolved: false,
    };
    setQuestions((prev) => [question, ...prev]);
  };

  const replyToQuestion = (id: string, reply: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, reply } : q))
    );
  };

  const resolveQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, resolved: true } : q))
    );
  };

  return (
    <GymAccessContext.Provider
      value={{ users, logs, questions, addUser, updateUser, deleteUser, toggleUserActive, verifyAccessCode, generateAccessCode, generateUserAcademyCode, clearLogs, submitQuestion, replyToQuestion, resolveQuestion }}
    >
      {children}
    </GymAccessContext.Provider>
  );
}

export const useGymAccess = () => {
  const ctx = useContext(GymAccessContext);
  if (!ctx) throw new Error("useGymAccess must be within GymAccessProvider");
  return ctx;
};
