import type { ProgressState } from "../hooks/useProgress";
import type { UserStats } from "./auth";

/**
 * Клиент REST API (server/index.js).
 * Режим включается переменной окружения VITE_API_URL.
 * Без неё — remoteMode === false и платформа работает на localStorage.
 */

const API_URL = ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_URL ?? "").replace(/\/$/, "");

export const remoteMode = API_URL.length > 0;

const TOKEN_KEY = "jsmaster-token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  // На shared-хостинге (cPanel/Apache) методы PUT/PATCH/DELETE часто запрещены.
  // Поэтому «на проводе» всегда POST, а настоящий метод передаётся заголовком
  // X-HTTP-Method-Override — его понимают и Node-сервер, и PHP-API.
  const realMethod = (opts.method ?? "GET").toUpperCase();
  const override = ["PUT", "PATCH", "DELETE"].includes(realMethod);
  let res: Response;
  try {
    res = await fetch(API_URL + path, {
      ...opts,
      method: override ? "POST" : realMethod,
      headers: {
        "Content-Type": "application/json",
        ...(override ? { "X-HTTP-Method-Override": realMethod } : {}),
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        ...(opts.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError("Сервер недоступен — проверьте VITE_API_URL", 0);
  }
  const body = (await res.json().catch(() => ({}))) as { error?: string } & T;
  if (!res.ok) throw new ApiError(body.error || `Ошибка ${res.status}`, res.status);
  return body as T;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  demo?: boolean;
  createdAt: number;
  lastLoginAt: number | null;
}

/* ---------- auth ---------- */

export async function apiRegister(name: string, email: string, password: string) {
  const r = await request<{ token: string; user: ApiUser }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  setToken(r.token);
  return r.user;
}

export async function apiLogin(email: string, password: string) {
  const r = await request<{ token: string; user: ApiUser }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(r.token);
  return r.user;
}

export async function apiMe(): Promise<ApiUser | null> {
  if (!getToken()) return null;
  try {
    const r = await request<{ user: ApiUser }>("/api/auth/me");
    return r.user;
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) setToken(null);
    return null;
  }
}

export function apiLogoutLocal() {
  setToken(null);
}

/* ---------- progress ---------- */

export async function apiGetProgress(): Promise<ProgressState | null> {
  try {
    const r = await request<{ progress: ProgressState }>("/api/progress");
    return r.progress;
  } catch {
    return null;
  }
}

export async function apiSaveProgress(progress: ProgressState): Promise<void> {
  await request("/api/progress", {
    method: "PUT",
    body: JSON.stringify({ progress }),
  });
}

/* ---------- admin ---------- */

export async function apiAdminStats(): Promise<UserStats[]> {
  const r = await request<{ stats: UserStats[] }>("/api/admin/stats");
  return r.stats;
}

export async function apiAdminSetRole(userId: string, role: "user" | "admin"): Promise<void> {
  await request(`/api/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });
}

export async function apiAdminReset(userId: string): Promise<void> {
  await request(`/api/admin/users/${userId}/reset`, { method: "POST" });
}

export async function apiAdminDelete(userId: string): Promise<void> {
  await request(`/api/admin/users/${userId}`, { method: "DELETE" });
}
