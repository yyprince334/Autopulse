import {
  pgTable,
  uuid,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const systemSettings = pgTable("system_settings", {
  systemId: uuid("system_id")
    .primaryKey()
    .notNull(),

  // alert thresholds
  warningThresholdSec: integer("warning_threshold_sec").default(300),   // 5 min
  criticalThresholdSec: integer("critical_threshold_sec").default(900), // 15 min

  // alert behaviour
  alertCooldownSec: integer("alert_cooldown_sec").default(600), // 10 min
  heartbeatGraceMultiplier: integer("heartbeat_grace_multiplier").default(2),

  emailAlertsEnabled: boolean("email_alerts_enabled").default(true),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});