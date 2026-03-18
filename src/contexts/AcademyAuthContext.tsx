import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export interface AcademyUser {
  id: string;
  name: string;
  email?: string;
  role: string;
  accessCode: string;
}

interface AcademyAuthContextType {
  user: AcademyUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => void;
  getUserRole: () => string | undefined;
}

const AcademyAuthContext = createContext<AcademyAuthContextType | null>(null);

const SESSION_KEY = "the100s-academy-session";
const USER_CACHE_KEY = "the100s-user-cache";

function getCachedUser(): AcademyUser | null {
  try {
    const cached = localStorage.getItem(USER_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

function setCachedUser(user: AcademyUser | null) {
  if (user) {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_KEY, user.accessCode);
  } else {
    localStorage.removeItem(USER_CACHE_KEY);
    localStorage.removeItem(SESSION_KEY);
  }
}

export function AcademyAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AcademyUser | null>(getCachedUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const cached = getCachedUser();
      if (cached) {
        setUser(cached);
        setIsLoading(false);
        return;
      }

      const sessionCode = localStorage.getItem(SESSION_KEY);
      if (sessionCode) {
        try {
          const { data, error } = await supabase
            .from("academy_employees")
            .select("*")
            .eq("access_code", sessionCode)
            .single();

          if (!error && data) {
            const academyUser: AcademyUser = {
              id: data.id,
              name: data.name,
              email: data.email || undefined,
              role: data.role,
              accessCode: data.access_code,
            };
            setUser(academyUser);
            setCachedUser(academyUser);
          } else {
            localStorage.removeItem(SESSION_KEY);
            setCachedUser(null);
          }
        } catch {
          const cached = getCachedUser();
          if (cached) {
            setUser(cached);
          }
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (code: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("academy_employees")
        .select("*")
        .eq("access_code", code)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        return false;
      }

      const academyUser: AcademyUser = {
        id: data.id,
        name: data.name,
        email: data.email || undefined,
        role: data.role,
        accessCode: data.access_code,
      };

      await supabase
        .from("academy_employees")
        .update({ last_login: new Date().toISOString() })
        .eq("id", data.id);

      setUser(academyUser);
      setCachedUser(academyUser);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCachedUser(null);
  };

  const getUserRole = (): string | undefined => {
    return user?.role;
  };

  return (
    <AcademyAuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout, getUserRole }}
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
