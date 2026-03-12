import { createContext, useContext, useState, ReactNode } from "react";

interface AcademyAuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => boolean;
  logout: () => void;
  getAccessCode: () => string | null;
  generateAccessCode: () => string;
  deleteAccessCode: () => void;
  getUserRole: () => string | undefined;
}

const AcademyAuthContext = createContext<AcademyAuthContextType | null>(null);

const CODE_KEY = "the100s-academy-code";
const SESSION_KEY = "the100s-academy-session";
const USERS_KEY = "gym-users";

const generateCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomValues = new Uint32Array(8);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues, (v) => chars[v % chars.length]).join("");
};

function findUserByCode(code: string): { academyCode?: string; role?: string } | undefined {
  try {
    const usersData = localStorage.getItem(USERS_KEY);
    if (!usersData) return undefined;
    const users: Array<{ academyCode?: string; role?: string }> = JSON.parse(usersData);
    return users.find((u) => u.academyCode && u.academyCode === code);
  } catch {
    return undefined;
  }
}

function isValidPerUserAcademyCode(code: string): boolean {
  return !!findUserByCode(code);
}

const checkSession = (): boolean => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;
  if (isValidPerUserAcademyCode(session)) return true;
  const code = localStorage.getItem(CODE_KEY);
  return !!code && session === code;
};

export function AcademyAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkSession());

  const login = (code: string): boolean => {
    if (isValidPerUserAcademyCode(code)) {
      localStorage.setItem(SESSION_KEY, code);
      setIsAuthenticated(true);
      return true;
    }
    const storedCode = localStorage.getItem(CODE_KEY);
    if (!storedCode || code !== storedCode) return false;
    localStorage.setItem(SESSION_KEY, code);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  const getAccessCode = (): string | null => localStorage.getItem(CODE_KEY);

  const generateAccessCode = (): string => {
    const newCode = generateCode();
    localStorage.setItem(CODE_KEY, newCode);
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    return newCode;
  };

  const deleteAccessCode = () => {
    localStorage.removeItem(CODE_KEY);
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  const getUserRole = (): string | undefined => {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return undefined;
    const user = findUserByCode(session);
    return user?.role;
  };

  return (
    <AcademyAuthContext.Provider
      value={{ isAuthenticated, login, logout, getAccessCode, generateAccessCode, deleteAccessCode, getUserRole }}
    >
      {children}
    </AcademyAuthContext.Provider>
  );
}

export const useAcademyAuth = () => {
  const ctx = useContext(AcademyAuthContext);
  if (!ctx) throw new Error("useAcademyAuth must be used within AcademyAuthProvider");
  return ctx;
};
