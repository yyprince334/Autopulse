import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const heartbeats = pgTable('heartbeats', {
    id: uuid('id').defaultRandom().primaryKey(),
    systemId: uuid('system_id').notNull(),
    recievedAt: timestamp('recieved_at').defaultNow()
})