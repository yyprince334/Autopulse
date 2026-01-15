import { uniqueIndex } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";

export const systemStatusEnum = pgEnum('system_status', [
  'UP',
  'DOWN',
]);

export const systemHealthSnapshots = pgTable(
  'system_health_snapshots',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    systemId: uuid('system_id').notNull(),

    windowStart: timestamp('window_start').notNull(),
    windowEnd: timestamp('window_end').notNull(),

    uptimeSeconds: integer('uptime_seconds').notNull(),
    downtimeSeconds: integer('downtime_seconds').notNull(),
    incidentCount: integer('incident_count').notNull(),

    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => ({
    uniqWindow: uniqueIndex('uniq_system_window').on(
      t.systemId,
      t.windowStart,
      t.windowEnd,
    ),
  }),
);