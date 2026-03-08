import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminUserInfo {
  id: string;
  email: string;
  name: string;
  must_change_password: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  adminUser: AdminUserInfo | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; mustChangePassword?: boolean }>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<boolean>;
  finishPasswordChange: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "gym-admin-session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { isAuthenticated: true, adminUser: parsed };
      } catch {
        return { isAuthenticated: false, adminUser: null };
      }
    }
    return { isAuthenticated: false, adminUser: null };
  });

  useEffect(() => {
    if (state.isAuthenticated && state.adminUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  const login = async (email: string, password: string): Promise<{ success: boolean; mustChangePassword?: boolean }> => {
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, email, name, password_hash, must_change_password, is_active")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error || !data) return { success: false };
    if (!data.is_active) return { success: false };
    if (data.password_hash !== password) return { success: false };

    // Update last_login
    await supabase
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", data.id);

    const adminUser: AdminUserInfo = {
      id: data.id,
      email: data.email,
      name: data.name,
      must_change_password: data.must_change_password,
    };

    setState({ isAuthenticated: true, adminUser });
    return { success: true, mustChangePassword: data.must_change_password };
  };

  const logout = () => {
    setState({ isAuthenticated: false, adminUser: null });
  };

  const changePassword = async (newPassword: string): Promise<boolean> => {
    if (!state.adminUser) return false;
    
    const { error } = await supabase
      .from("admin_users")
      .update({ password_hash: newPassword, must_change_password: false })
      .eq("id", state.adminUser.id);

    if (error) return false;

    setState(prev => ({
      ...prev,
      adminUser: prev.adminUser ? { ...prev.adminUser, must_change_password: false } : null,
    }));
    return true;
  };

  const finishPasswordChange = () => {
    setState(prev => ({
      ...prev,
      adminUser: prev.adminUser ? { ...prev.adminUser, must_change_password: false } : null,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, changePassword, finishPasswordChange }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};
