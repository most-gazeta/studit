-- ============================================================
--  js://master — схема MySQL 8+
--  Применение:  mysql -u root -p < server/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS jsmaster
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE jsmaster;

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
) ENGINE=InnoDB;

-- ---------- прогресс (1 строка на пользователя) ----------
-- data — полный ProgressState фронтенда (JSON):
-- { xp, completed, quiz, tasks, editors, days, events }
-- xp / lessons_done / tasks_done денормализованы для быстрых
-- агрегаций в админ-панели; пересчитываются сервером на каждый PUT.
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
) ENGINE=InnoDB;

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
) ENGINE=InnoDB;
