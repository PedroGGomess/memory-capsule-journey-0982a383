import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/lib/api";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const JWT_KEY = "gym-admin-jwt";
// Legacy localStorage key for offline fallback
const LEGACY_TOKEN_KEY = "gym-admin-token";
const LEGACY_CREDS_KEY = "gym-admin-credentials";
const DEFAULT_CREDENTIALS = { username: "admin", password: "admin123" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem(JWT_KEY) ?? localStorage.getItem(LEGACY_TOKEN_KEY);
    return { isAuthenticated: !!token, token: token };
  });

  useEffect(() => {
    if (state.token) {
      localStorage.setItem(JWT_KEY, state.token);
    } else {
      localStorage.removeItem(JWT_KEY);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
    }
  }, [state.token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Try backend first
    try {
      const { token } = await authApi.login(username, password);
      setState({ isAuthenticated: true, token });
      return true;
    } catch {
      // Fall back to localStorage-based credentials when backend is offline
      const saved = localStorage.getItem(LEGACY_CREDS_KEY);
      const creds = saved ? JSON.parse(saved) : DEFAULT_CREDENTIALS;
      if (username === creds.username && password === creds.password) {
        const fallbackToken = crypto.randomUUID();
        setState({ isAuthenticated: true, token: fallbackToken });
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setState({ isAuthenticated: false, token: null });
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      await authApi.changePassword(currentPassword, newPassword);
      return true;
    } catch {
      // Offline fallback
      const saved = localStorage.getItem(LEGACY_CREDS_KEY);
      const creds = saved ? JSON.parse(saved) : DEFAULT_CREDENTIALS;
      if (currentPassword !== creds.password) return false;
      localStorage.setItem(LEGACY_CREDS_KEY, JSON.stringify({ ...creds, password: newPassword }));
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};
