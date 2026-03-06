import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { usersApi, accessApi, ApiUser, ApiAccessLog } from "@/lib/api";

export type GymUser = ApiUser;
export type AccessLog = ApiAccessLog;

interface GymAccessContextType {
  users: GymUser[];
  logs: AccessLog[];
  loading: boolean;
  error: string | null;
  isOnline: boolean;
  refreshUsers: () => Promise<void>;
  refreshLogs: () => Promise<void>;
  addUser: (data: Omit<GymUser, "id" | "createdAt">) => Promise<GymUser>;
  updateUser: (id: string, data: Partial<Omit<GymUser, "id" | "createdAt">>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  toggleUserActive: (id: string) => Promise<void>;
  verifyAccessCode: (code: string) => Promise<{ allowed: boolean; user?: GymUser }>;
  generateAccessCode: () => Promise<string>;
  clearLogs: () => Promise<void>;
}

const GymAccessContext = createContext<GymAccessContextType | null>(null);

// ── localStorage keys (offline fallback) ─────────────────────────────────────
const LS_USERS = "gym-users";
const LS_LOGS = "gym-access-logs";

function generateCodeLocal(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${seg(3)}-${seg(4)}-${seg(4)}`;
}

function loadLocalUsers(): GymUser[] {
  try {
    const s = localStorage.getItem(LS_USERS);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function loadLocalLogs(): AccessLog[] {
  try {
    const s = localStorage.getItem(LS_LOGS);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

export function GymAccessProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<GymUser[]>(loadLocalUsers);
  const [logs, setLogs] = useState<AccessLog[]>(loadLocalLogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  // ── Sync to localStorage as offline backup ─────────────────────────────────
  useEffect(() => {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LS_LOGS, JSON.stringify(logs));
  }, [logs]);

  // ── Fetch users from backend ───────────────────────────────────────────────
  const refreshUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await usersApi.list();
      setUsers(data);
      setIsOnline(true);
      setError(null);
    } catch (e) {
      setIsOnline(false);
      // silently fall back to localStorage data
      console.warn("Backend unavailable, using local data:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch logs from backend ────────────────────────────────────────────────
  const refreshLogs = useCallback(async () => {
    try {
      const data = await accessApi.getLogs();
      setLogs(data);
    } catch {
      // keep local logs
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  // ── User operations ────────────────────────────────────────────────────────

  const addUser = async (data: Omit<GymUser, "id" | "createdAt">): Promise<GymUser> => {
    try {
      const newUser = await usersApi.create(data);
      setUsers((prev) => [newUser, ...prev]);
      return newUser;
    } catch {
      // Offline fallback
      const newUser: GymUser = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [newUser, ...prev]);
      return newUser;
    }
  };

  const updateUser = async (id: string, data: Partial<Omit<GymUser, "id" | "createdAt">>): Promise<boolean> => {
    try {
      const updated = await usersApi.update(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      return true;
    } catch {
      // Offline fallback
      let found = false;
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === id) { found = true; return { ...u, ...data }; }
          return u;
        })
      );
      return found;
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      await usersApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch {
      // Offline fallback
      let found = false;
      setUsers((prev) => prev.filter((u) => {
        if (u.id === id) { found = true; return false; }
        return true;
      }));
      return found;
    }
  };

  const toggleUserActive = async (id: string): Promise<void> => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    await updateUser(id, { active: !user.active });
  };

  const verifyAccessCode = async (code: string): Promise<{ allowed: boolean; user?: GymUser }> => {
    try {
      const result = await accessApi.verify(code);
      if (result.allowed && result.user) {
        // Sync the full user from local state
        const fullUser = users.find((u) => u.id === result.user!.id) ?? {
          ...result.user,
          accessCode: code.toUpperCase(),
          active: true,
          notes: "",
          createdAt: new Date().toISOString(),
        };
        // Refresh logs in background
        refreshLogs();
        return { allowed: true, user: fullUser };
      }
      refreshLogs();
      return { allowed: false };
    } catch {
      // Offline fallback
      const trimmed = code.trim().toUpperCase();
      const user = users.find((u) => u.accessCode.toUpperCase() === trimmed);
      const allowed = !!user && user.active;
      const log: AccessLog = {
        id: crypto.randomUUID(),
        userId: user?.id ?? null,
        userName: user?.name ?? null,
        accessCode: trimmed,
        result: allowed ? "allowed" : "denied",
        timestamp: new Date().toISOString(),
      };
      setLogs((prev) => [log, ...prev].slice(0, 500));
      return { allowed, user: allowed ? user : undefined };
    }
  };

  const generateAccessCode = async (): Promise<string> => {
    try {
      const { code } = await usersApi.generateCode();
      return code;
    } catch {
      // Offline fallback
      let code: string;
      const existing = users.map((u) => u.accessCode);
      do {
        code = generateCodeLocal();
      } while (existing.includes(code));
      return code;
    }
  };

  const clearLogs = async (): Promise<void> => {
    try {
      await accessApi.clearLogs();
      setLogs([]);
    } catch {
      setLogs([]);
    }
  };

  return (
    <GymAccessContext.Provider
      value={{
        users,
        logs,
        loading,
        error,
        isOnline,
        refreshUsers,
        refreshLogs,
        addUser,
        updateUser,
        deleteUser,
        toggleUserActive,
        verifyAccessCode,
        generateAccessCode,
        clearLogs,
      }}
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
