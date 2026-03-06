// Typed API client for the Gym Access backend
// Falls back gracefully when the server is unreachable.

const API_BASE = "/api";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  accessCode: string;
  active: boolean;
  notes: string;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface ApiAccessLog {
  id: string;
  userId: string | null;
  userName: string | null;
  accessCode: string;
  result: "allowed" | "denied";
  timestamp: string;
}

export interface VerifyResult {
  allowed: boolean;
  reason?: "inactive" | "not_found";
  user?: {
    id: string;
    name: string;
    email: string;
    onboardingComplete: boolean;
  };
}

// ── Internal helpers ────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem("gym-admin-jwt");
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((body as { error?: string }).error ?? res.statusText);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Auth ────────────────────────────────────────────────────────────────────

export const authApi = {
  async login(username: string, password: string): Promise<{ token: string; username: string }> {
    return apiFetch("/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiFetch("/admin/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// ── Users ───────────────────────────────────────────────────────────────────

export const usersApi = {
  list(): Promise<ApiUser[]> {
    return apiFetch("/admin/users");
  },

  get(id: string): Promise<ApiUser> {
    return apiFetch(`/admin/users/${id}`);
  },

  create(data: Omit<ApiUser, "id" | "createdAt">): Promise<ApiUser> {
    return apiFetch("/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: string, data: Partial<Omit<ApiUser, "id" | "createdAt">>): Promise<ApiUser> {
    return apiFetch(`/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  delete(id: string): Promise<void> {
    return apiFetch(`/admin/users/${id}`, { method: "DELETE" });
  },

  generateCode(): Promise<{ code: string }> {
    return apiFetch("/admin/users/generate-code");
  },
};

// ── Access ──────────────────────────────────────────────────────────────────

export const accessApi = {
  verify(code: string): Promise<VerifyResult> {
    return apiFetch("/verify", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  },

  getLogs(): Promise<ApiAccessLog[]> {
    return apiFetch("/admin/logs");
  },

  clearLogs(): Promise<void> {
    return apiFetch("/admin/logs", { method: "DELETE" });
  },
};

// ── Health ──────────────────────────────────────────────────────────────────

export async function isServerAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}
