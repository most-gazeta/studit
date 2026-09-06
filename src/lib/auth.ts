import { flatLessons, levels } from "../data/course";
import {
  readProgress,
  writeProgress,
  clearProgress,
  type ProgressState,
  EMPTY,
} from "../hooks/useProgress";

/**
 * ДЕМО-АУТЕНТИФИКАЦИЯ: всё хранится в localStorage браузера.
 * Пароли хешируются (FNV-1a с солью) — для учебного проекта достаточно,
 * в продакшене нужен настоящий бэкенд с bcrypt/argon2 и сессиями.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  salt: string;
  hash: string;
  role: "user" | "admin";
  demo?: boolean;
  createdAt: number;
  lastLoginAt: number;
}

const USERS_KEY = "jsmaster-users-v1";
const SESSION_KEY = "jsmaster-session-v1";

/* ---------- хеш (демо) ---------- */
function fnv1a(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

export function hashPassword(salt: string, password: string): string {
  return fnv1a(`${salt}::${fnv1a(password)}::jsmaster`);
}

function makeSalt(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

/* ---------- хранилище пользователей ---------- */
export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore */
  }
}

export function getUserById(id: string): User | null {
  return getUsers().find((u) => u.id === id) ?? null;
}

export function findByEmail(email: string): User | null {
  const e = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === e) ?? null;
}

/* ---------- сессия ---------- */
export function getSessionUserId(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function setSession(userId: string | null) {
  try {
    if (userId) localStorage.setItem(SESSION_KEY, userId);
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/* ---------- операции ---------- */
export type AuthResult = { ok: true; user: User } | { ok: false; error: string };

/* ============================================================
 * СЕРВЕРНЫЙ РЕЖИМ (Express + MySQL): включается VITE_API_URL.
 * Без неё remoteMode === false — всё работает на localStorage.
 * ============================================================ */
import {
  remoteMode as apiRemoteMode,
  apiLogin, apiRegister, apiMe, apiGetProgress, apiSaveProgress,
  apiLogoutLocal, getToken, type ApiUser,
} from "./api";

export const remoteMode = apiRemoteMode;
export const hasRemoteSession = () => remoteMode && Boolean(getToken());

const REMOTE_USER_KEY = "jsmaster-remote-user";

function cacheRemoteUser(u: User | null) {
  try {
    if (u) localStorage.setItem(REMOTE_USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(REMOTE_USER_KEY);
  } catch { /* ignore */ }
}

export function getRemoteCachedUser(): User | null {
  try {
    const raw = localStorage.getItem(REMOTE_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function apiUserToLocal(u: ApiUser): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    salt: "",
    hash: "",
    role: u.role,
    demo: u.demo,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt ?? Date.now(),
  };
}

async function adoptRemoteUser(apiUser: ApiUser): Promise<User> {
  const user = apiUserToLocal(apiUser);
  const serverProgress = await apiGetProgress();
  const guest = readProgress("guest");
  const guestHasData = guest.xp > 0 || Object.keys(guest.completed).length > 0;
  const serverEmpty =
    !serverProgress ||
    (serverProgress.xp === 0 && Object.keys(serverProgress.completed).length === 0);

  if (serverEmpty && guestHasData) {
    // переносим гостевой прогресс на сервер
    writeProgress(user.id, guest);
    clearProgress("guest");
    await apiSaveProgress(guest).catch(() => {});
  } else if (serverProgress) {
    writeProgress(user.id, serverProgress);
  }
  setSession(user.id);
  cacheRemoteUser(user);
  return user;
}

export async function loginRemote(email: string, password: string): Promise<AuthResult> {
  try {
    const user = await adoptRemoteUser(await apiLogin(email, password));
    return { ok: true, user };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Ошибка входа" };
  }
}

export async function registerRemote(name: string, email: string, password: string): Promise<AuthResult> {
  try {
    const user = await adoptRemoteUser(await apiRegister(name, email, password));
    return { ok: true, user };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Ошибка регистрации" };
  }
}

/** Проверка сессии при загрузке страницы + подтягивание свежего прогресса */
export async function bootRemote(): Promise<User | null> {
  const apiUser = await apiMe();
  if (!apiUser) {
    cacheRemoteUser(null);
    return null;
  }
  return adoptRemoteUser(apiUser);
}

export function logoutRemote() {
  apiLogoutLocal();
  cacheRemoteUser(null);
  setSession(null);
}

export function register(name: string, email: string, password: string): AuthResult {
  const trimmed = name.trim();
  const e = email.trim().toLowerCase();
  if (trimmed.length < 2) return { ok: false, error: "Имя — минимум 2 символа" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) return { ok: false, error: "Похоже, в email опечатка" };
  if (password.length < 6) return { ok: false, error: "Пароль — минимум 6 символов" };
  if (findByEmail(e)) return { ok: false, error: "Пользователь с таким email уже зарегистрирован" };

  const salt = makeSalt();
  const user: User = {
    id: "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: trimmed,
    email: e,
    salt,
    hash: hashPassword(salt, password),
    role: "user",
    createdAt: Date.now(),
    lastLoginAt: Date.now(),
  };
  saveUsers([...getUsers(), user]);
  setSession(user.id);
  return { ok: true, user };
}

export function login(email: string, password: string): AuthResult {
  const user = findByEmail(email);
  if (!user) return { ok: false, error: "Аккаунт с таким email не найден" };
  if (user.hash !== hashPassword(user.salt, password))
    return { ok: false, error: "Неверный пароль" };
  const updated = { ...user, lastLoginAt: Date.now() };
  saveUsers(getUsers().map((u) => (u.id === user.id ? updated : u)));
  setSession(user.id);
  return { ok: true, user: updated };
}

export function logout() {
  setSession(null);
}

export function touchLogin(userId: string) {
  saveUsers(getUsers().map((u) => (u.id === userId ? { ...u, lastLoginAt: Date.now() } : u)));
}

export function updateUser(userId: string, patch: Partial<User>): User | null {
  let result: User | null = null;
  saveUsers(
    getUsers().map((u) => {
      if (u.id !== userId) return u;
      result = { ...u, ...patch };
      return result;
    })
  );
  return result;
}

export function deleteUser(userId: string) {
  saveUsers(getUsers().filter((u) => u.id !== userId));
  clearProgress(userId);
}

export function resetUserProgress(userId: string) {
  clearProgress(userId);
}

/* ---------- посев демо-данных ---------- */
function seedProgress(doneIds: string[], opts: { partialLesson?: string; partialTasks?: number } = {}): ProgressState {
  const s: ProgressState = JSON.parse(JSON.stringify(EMPTY)) as ProgressState;
  const day = 24 * 60 * 60 * 1000;
  const totalDays = Math.max(4, Math.min(24, doneIds.length * 2));
  const start = Date.now() - totalDays * day;

  doneIds.forEach((id, idx) => {
    const lesson = flatLessons.find((l) => l.id === id);
    if (!lesson) return;
    const ts = start + Math.round(((idx + 0.5) / doneIds.length) * totalDays * day);
    s.completed[id] = ts;
    s.quiz[id] = lesson.quiz.map((q) => q.answer);
    s.tasks[id] = Object.fromEntries(lesson.tasks.map((t) => [t.id, true]));
    s.xp += 30 + lesson.quiz.length * 5 + lesson.tasks.length * 20;
    const d = new Date(ts).toISOString().slice(0, 10);
    s.days[d] = (s.days[d] ?? 0) + 30 + lesson.quiz.length * 5 + lesson.tasks.length * 20;
    s.events.push({ ts, text: `Урок пройден: ${lesson.title}`, xp: 30 });
  });

  if (opts.partialLesson) {
    const lesson = flatLessons.find((l) => l.id === opts.partialLesson);
    if (lesson) {
      const ts = Date.now() - 2 * 60 * 60 * 1000;
      s.quiz[lesson.id] = lesson.quiz.map((q, i) => (i === 0 ? q.answer : null));
      const nTasks = opts.partialTasks ?? 1;
      s.tasks[lesson.id] = Object.fromEntries(
        lesson.tasks.slice(0, nTasks).map((t) => [t.id, true])
      );
      const gained = 5 * 1 + nTasks * 20;
      s.xp += gained;
      const d = new Date(ts).toISOString().slice(0, 10);
      s.days[d] = (s.days[d] ?? 0) + gained;
      s.events.push({ ts, text: `Задача пройдена: ${lesson.tasks[0]?.title ?? ""}`, xp: 20 });
    }
  }

  s.events.sort((a, b) => b.ts - a.ts);
  return s;
}

function seedDemoUser(
  id: string,
  name: string,
  email: string,
  password: string,
  daysAgo: number,
  lastLoginHrsAgo: number,
  progress: ProgressState
): User {
  const salt = makeSalt();
  const user: User = {
    id,
    name,
    email,
    salt,
    hash: hashPassword(salt, password),
    role: "user",
    demo: true,
    createdAt: Date.now() - daysAgo * 24 * 60 * 60 * 1000,
    lastLoginAt: Date.now() - lastLoginHrsAgo * 60 * 60 * 1000,
  };
  writeProgress(id, progress);
  return user;
}

const SEED_VERSION = 3;
const SEED_KEY = "jsmaster-seed-version";

export function seedIfNeeded() {
  // при обновлении демо-данных очищаем старые сид-аккаунты и создаём заново
  let storedSeed: string | null = null;
  try {
    storedSeed = localStorage.getItem(SEED_KEY);
  } catch { /* ignore */ }
  if (storedSeed !== String(SEED_VERSION)) {
    try {
      const keep = getUsers().filter((u) => !u.demo && u.email !== "admin@jsmaster.ru");
      getUsers().forEach((u) => {
        if (u.demo || u.email === "admin@jsmaster.ru") clearProgress(u.id);
      });
      saveUsers(keep);
      localStorage.setItem(SEED_KEY, String(SEED_VERSION));
    } catch { /* ignore */ }
  }

  const users = getUsers();
  if (users.some((u) => u.email === "admin@jsmaster.ru")) return;

  const adminSalt = makeSalt();
  const admin: User = {
    id: "u_admin",
    name: "Дмитрий Соколов",
    email: "admin@jsmaster.ru",
    salt: adminSalt,
    hash: hashPassword(adminSalt, "admin123"),
    role: "admin",
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
    lastLoginAt: Date.now() - 3 * 60 * 60 * 1000,
  };

  const juniorIds = levels[0].lessons.map((l) => l.id);
  const middleIds = levels[1].lessons.map((l) => l.id);
  const browserIds = levels[2].lessons.map((l) => l.id);

  const maria = seedDemoUser(
    "u_demo_maria",
    "Мария Орлова",
    "maria@demo.ru",
    "demo123",
    21,
    5,
    seedProgress([...juniorIds, middleIds[0], middleIds[1]], { partialLesson: middleIds[2], partialTasks: 1 })
  );

  const ilya = seedDemoUser(
    "u_demo_ilya",
    "Илья Волков",
    "ilya@demo.ru",
    "demo123",
    9,
    50,
    seedProgress(juniorIds.slice(0, 5), { partialLesson: juniorIds[5], partialTasks: 1 })
  );

  const anya = seedDemoUser(
    "u_demo_anya",
    "Аня Кузнецова",
    "anya@demo.ru",
    "demo123",
    34,
    1,
    seedProgress([...juniorIds, ...middleIds, browserIds[0], browserIds[1]])
  );

  saveUsers([admin, maria, ilya, anya]);
}

export function reseedDemo() {
  const kept = getUsers().filter((u) => !u.demo);
  getUsers()
    .filter((u) => u.demo)
    .forEach((u) => clearProgress(u.id));

  const juniorIds = levels[0].lessons.map((l) => l.id);
  const middleIds = levels[1].lessons.map((l) => l.id);
  const browserIds = levels[2].lessons.map((l) => l.id);

  const maria = seedDemoUser(
    "u_demo_maria",
    "Мария Орлова",
    "maria@demo.ru",
    "demo123",
    21,
    5,
    seedProgress([...juniorIds, middleIds[0], middleIds[1]], { partialLesson: middleIds[2], partialTasks: 1 })
  );
  const ilya = seedDemoUser(
    "u_demo_ilya",
    "Илья Волков",
    "ilya@demo.ru",
    "demo123",
    9,
    50,
    seedProgress(juniorIds.slice(0, 5), { partialLesson: juniorIds[5], partialTasks: 1 })
  );
  const anya = seedDemoUser(
    "u_demo_anya",
    "Аня Кузнецова",
    "anya@demo.ru",
    "demo123",
    34,
    1,
    seedProgress([...juniorIds, ...middleIds, browserIds[0], browserIds[1]])
  );

  saveUsers([...kept, maria, ilya, anya]);
}

/* ---------- агрегаты для админки ---------- */
export interface UserStats {
  user: User;
  progress: ProgressState;
  lessonsDone: number;
  tasksDone: number;
  tasksTotal: number;
  percent: number;
  lastActivity: number;
}

export function computeUserStats(user: User): UserStats {
  const progress = readProgress(user.id);
  const lessonsDone = Object.keys(progress.completed).length;
  let tasksDone = 0;
  for (const l of Object.values(progress.tasks)) {
    for (const v of Object.values(l)) if (v) tasksDone++;
  }
  const tasksTotal = flatLessons.reduce((s, l) => s + l.tasks.length, 0);
  const lastEvent = progress.events[0]?.ts ?? 0;
  const lastCompleted = Math.max(0, ...Object.values(progress.completed));
  return {
    user,
    progress,
    lessonsDone,
    tasksDone,
    tasksTotal,
    percent: flatLessons.length ? Math.round((lessonsDone / flatLessons.length) * 100) : 0,
    lastActivity: Math.max(user.lastLoginAt, lastEvent, lastCompleted),
  };
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "только что";
  if (m < 60) return `${m} мин назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ч назад`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} дн назад`;
  return new Date(ts).toLocaleDateString("ru-RU");
}
