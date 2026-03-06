import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "gym-admin-token";
const CREDENTIALS_KEY = "gym-admin-credentials";

const DEFAULT_CREDENTIALS = { username: "admin", password: "admin123" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    return { isAuthenticated: !!token, token };
  });

  useEffect(() => {
    if (state.token) {
      localStorage.setItem(STORAGE_KEY, state.token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state.token]);

  const getCredentials = () => {
    const saved = localStorage.getItem(CREDENTIALS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CREDENTIALS;
  };

  const login = (username: string, password: string): boolean => {
    const creds = getCredentials();
    if (username === creds.username && password === creds.password) {
      const token = crypto.randomUUID();
      setState({ isAuthenticated: true, token });
      return true;
    }
    return false;
  };

  const logout = () => {
    setState({ isAuthenticated: false, token: null });
  };

  const changePassword = (currentPassword: string, newPassword: string): boolean => {
    const creds = getCredentials();
    if (currentPassword !== creds.password) return false;
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ ...creds, password: newPassword }));
    return true;
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
