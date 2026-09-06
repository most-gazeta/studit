import { useState } from "react";
import type { AuthResult } from "../lib/auth";
import { totalLessons, totalTasks } from "../data/course";
import {
  IconCheck, IconKey, IconLock, IconMail, IconUser, IconLogo, IconArrowRight,
} from "./icons";

function passwordStrength(p: string): { score: number; label: string; color: string } {
  let score = 0;
  if (p.length >= 6) score++;
  if (p.length >= 10) score++;
  if (/[A-ZА-Я]/.test(p) && /[a-zа-я]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-zА-Яа-я0-9]/.test(p)) score++;
  if (score <= 1) return { score, label: "слабый", color: "#ff7a8f" };
  if (score <= 3) return { score, label: "средний", color: "#ffb454" };
  return { score, label: "надёжный", color: "#3ddc97" };
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-dim mb-1.5">
        {icon}
        {label}
      </span>
      {children}
      {error && <span className="block text-[12px] text-coral mt-1.5">{error}</span>}
    </label>
  );
}

const inputCls = (hasError?: string) =>
  `w-full bg-panel2/60 border rounded-lg px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-dim ${
    hasError ? "border-coral/50 focus:border-coral" : "border-line focus:border-js/60 hover:border-line2"
  }`;

export function AuthView({
  onAuthed,
  onGuest,
  guestXp,
  doLogin,
  doRegister,
}: {
  onAuthed: () => void;
  onGuest: () => void;
  guestXp: number;
  doLogin: (email: string, pass: string) => AuthResult | Promise<AuthResult>;
  doRegister: (name: string, email: string, pass: string) => AuthResult | Promise<AuthResult>;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topError, setTopError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setTopError(null);
    const errs: Record<string, string> = {};
    if (mode === "register" && name.trim().length < 2) errs.name = "Минимум 2 символа";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errs.email = "Некорректный email";
    if (pass.length < 6) errs.pass = "Минимум 6 символов";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    try {
      const res = await (mode === "login" ? doLogin(email, pass) : doRegister(name, email, pass));
      if (res.ok) onAuthed();
      else setTopError(res.error);
    } finally {
      setBusy(false);
    }
  };

  const strength = passwordStrength(pass);

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 lg:py-14">
      <div className="panel overflow-hidden grid lg:grid-cols-[1fr_1.05fr] rise">
        {/* ---- левая колонка: зачем аккаунт ---- */}
        <div className="p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-line relative overflow-hidden bg-gradient-to-b from-panel to-panel2/40">
          <div className="absolute -right-10 -bottom-14 opacity-[0.06] select-none pointer-events-none">
            <IconLogo className="w-64 h-64 text-js" />
          </div>
          <span className="text-js">
            <IconLogo className="w-9 h-9" />
          </span>
          <h1 className="font-display font-extrabold text-[1.7rem] leading-tight text-ink mt-5">
            Учиться проще
            <br />с <span className="text-js">аккаунтом</span>
          </h1>
          <p className="text-mute text-[14px] mt-3 max-w-sm leading-relaxed">
            Личный кабинет с дашбордом, очки опыта, серия учебных дней и место в
            общем зачёте платформы.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Прогресс привязан к вам, а не к браузеру",
              `Вся программа: ${totalLessons} уроков и ${totalTasks} заданий`,
              "Дашборд: проценты, XP, достижения, активность",
              "Гостевой прогресс перенесём при входе автоматически",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#c3d2ec]">
                <span className="shrink-0 w-5 h-5 rounded-md bg-mint/10 border border-mint/30 text-mint flex items-center justify-center mt-0.5">
                  <IconCheck className="w-3 h-3" strokeWidth={2.6} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-lg border border-line bg-[#0a1120] p-4 font-mono text-[12px] leading-relaxed">
            <div className="text-dim uppercase tracking-widest text-[10px] mb-2">демо-доступы</div>
            <div className="text-[#c3d2ec]">
              <span className="text-js">админ:</span> admin@jsmaster.ru / admin123
            </div>
            <div className="text-[#c3d2ec]">
              <span className="text-sky">студент:</span> maria@demo.ru / demo123
            </div>
            <div className="text-dim mt-1.5 text-[11px]">данные хранятся локально в вашем браузере</div>
          </div>
        </div>

        {/* ---- правая колонка: форма ---- */}
        <div className="p-7 sm:p-9">
          <div className="flex rounded-lg border border-line overflow-hidden font-mono text-[13px]">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setErrors({});
                  setTopError(null);
                }}
                className={`flex-1 py-2.5 transition-colors ${
                  mode === m ? "bg-js/10 text-js" : "text-mute hover:text-ink hover:bg-panel2"
                }`}
              >
                {m === "login" ? "Вход" : "Регистрация"}
              </button>
            ))}
          </div>

          <h2 className="font-display font-bold text-xl text-ink mt-6">
            {mode === "login" ? "С возвращением" : "Создать аккаунт"}
          </h2>
          <p className="text-[13px] text-mute mt-1">
            {mode === "login"
              ? "Введите email и пароль от личного кабинета."
              : "30 секунд — и ваш прогресс под защитой аккаунта."}
          </p>

          {guestXp > 0 && (
            <div className="mt-4 rounded-lg border border-js/30 bg-js/5 px-4 py-3 text-[12.5px] text-[#efe9b8] pop-in">
              У вас есть гостевой прогресс — <strong className="text-js">{guestXp} XP</strong>.
              После входа он будет привязан к аккаунту.
            </div>
          )}

          {topError && (
            <div className="mt-4 rounded-lg border border-coral/40 bg-coral/10 px-4 py-3 text-[13px] text-coral pop-in">
              {topError}
            </div>
          )}

          <form onSubmit={submit} className="mt-5 space-y-4">
            {mode === "register" && (
              <Field label="Имя" icon={<IconUser className="w-3.5 h-3.5" />} error={errors.name}>
                <input
                  className={inputCls(errors.name)}
                  placeholder="Ада Лавлейс"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </Field>
            )}

            <Field label="Email" icon={<IconMail className="w-3.5 h-3.5" />} error={errors.email}>
              <input
                className={inputCls(errors.email)}
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Field>

            <Field label="Пароль" icon={<IconLock className="w-3.5 h-3.5" />} error={errors.pass}>
              <input
                className={inputCls(errors.pass)}
                placeholder={mode === "register" ? "Минимум 6 символов" : "Ваш пароль"}
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
              {mode === "register" && pass.length > 0 && (
                <span className="flex items-center gap-2 mt-2">
                  <span className="flex gap-1 flex-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="h-1 flex-1 rounded-full transition-colors duration-300"
                        style={{ background: i < strength.score ? strength.color : "#1d2c4d" }}
                      />
                    ))}
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </span>
              )}
            </Field>

            <button type="submit" disabled={busy} className="btn-primary w-full justify-center py-3 text-[14.5px]">
              {busy ? (
                <span className="w-4 h-4 border-2 border-[#1a1600]/25 border-t-[#1a1600] rounded-full spin-slow" />
              ) : (
                <IconKey className="w-4 h-4" />
              )}
              {busy ? "Подключение…" : mode === "login" ? "Войти в кабинет" : "Зарегистрироваться"}
            </button>
          </form>

          <button
            onClick={onGuest}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-mono text-mute hover:text-ink border border-transparent hover:border-line hover:bg-panel2 transition-colors"
          >
            продолжить как гость — без аккаунта
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
