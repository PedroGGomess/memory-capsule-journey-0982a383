import { createContext, useContext, useState, ReactNode } from "react";

interface AcademyAuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => boolean;
  logout: () => void;
  getAccessCode: () => string | null;
  generateAccessCode: () => string;
  deleteAccessCode: () => void;
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

function isValidPerUserAcademyCode(code: string): boolean {
  try {
    const usersData = localStorage.getItem(USERS_KEY);
    if (!usersData) return false;
    const users: Array<{ academyCode?: string }> = JSON.parse(usersData);
    return users.some((u) => u.academyCode && u.academyCode === code);
  } catch {
    return false;
  }
}

const checkSession = (): boolean => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return false;
  // Check per-user academy codes first
  if (isValidPerUserAcademyCode(session)) return true;
  // Fallback: check global code
  const code = localStorage.getItem(CODE_KEY);
  return !!code && session === code;
};

export function AcademyAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkSession());

  const login = (code: string): boolean => {
    // Check per-user academy codes first
    if (isValidPerUserAcademyCode(code)) {
      localStorage.setItem(SESSION_KEY, code);
      setIsAuthenticated(true);
      return true;
    }
    // Fallback to global code
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

  const getAccessCode = (): string | null => {
    return localStorage.getItem(CODE_KEY);
  };

  const generateAccessCode = (): string => {
    const newCode = generateCode();
    localStorage.setItem(CODE_KEY, newCode);
    // Invalidate any existing session since code changed
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    return newCode;
  };

  const deleteAccessCode = () => {
    localStorage.removeItem(CODE_KEY);
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AcademyAuthContext.Provider
      value={{ isAuthenticated, login, logout, getAccessCode, generateAccessCode, deleteAccessCode }}
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
