-- ============================================================
--  js://master — таблицы MySQL для shared-хостинга (cPanel)
--  База mostnews_studit уже создана — в phpMyAdmin выберите её
--  и выполните этот файл (вкладка «Импорт» или «SQL»).
-- ============================================================

-- ---------- пользователи ----------
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  password_hash CHAR(60)      NOT NULL COMMENT 'bcrypt',
  role          ENUM('user','admin') NOT NULL DEFAULT 'user',
  demo          TINYINT(1)    NOT NULL DEFAULT 0,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME      NULL,
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- прогресс (1 строка на пользователя) ----------
-- data — полный ProgressState фронтенда (JSON).
-- xp / lessons_done / tasks_done денормализованы для быстрых
-- агрегаций в админ-панели; пересчитываются на каждый PUT.
CREATE TABLE IF NOT EXISTS progress (
  user_id      INT UNSIGNED PRIMARY KEY,
  xp           INT          NOT NULL DEFAULT 0,
  lessons_done INT          NOT NULL DEFAULT 0,
  tasks_done   INT          NOT NULL DEFAULT 0,
  data         JSON         NOT NULL,
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                              ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_progress_user
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- журнал начислений XP ----------
CREATE TABLE IF NOT EXISTS xp_events (
  id      BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  ts      BIGINT       NOT NULL COMMENT 'unix ms',
  text    VARCHAR(255) NOT NULL,
  xp      INT          NOT NULL,
  KEY ix_xp_events_user_ts (user_id, ts),
  CONSTRAINT fk_xp_events_user
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
