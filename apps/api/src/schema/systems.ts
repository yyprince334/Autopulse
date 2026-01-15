import { timestamp } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import { boolean } from 'drizzle-orm/pg-core';

export const systems = pgTable('systems', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255}).notNull(),
    description: varchar('description', { length: 500}),
    heartbeatInterval: integer('heartbeat_Interval').notNull(),


    apiKeyHash: varchar('api_key_hash', { length: 255 }).notNull(),
    apiKeyLastUsedAt: timestamp('api_key_last_used_at'),

    createdAt: timestamp('created_at').defaultNow(),
})