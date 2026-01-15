// apps/api/scripts/backfill-alerts.ts
import { sql } from "drizzle-orm";
import { db } from "../src/db";

async function run() {
  await db.execute(sql`
    UPDATE alerts
    SET started_at = created_at
    WHERE started_at IS NULL
  `);

  console.log("Backfill complete");
  process.exit(0);
}

run();