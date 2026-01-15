import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const alerts = pgTable("alerts", {
  id: uuid("id").defaultRandom().primaryKey(),

  systemId: uuid("system_id").notNull(),

  status: varchar("status", { length: 20 }).notNull(),
  severity: varchar("severity", { length: 20 }).notNull(),

  message: varchar("message", { length: 500 }).notNull(),
  resolvedAt: timestamp("resolved_at"),

  acknowledgedAt: timestamp("acknowledged_at"),
  acknowledgedBy: uuid("acknowledged_by"),

  createdAt: timestamp("created_at").defaultNow(),
});