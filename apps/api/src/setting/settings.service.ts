import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "src/db";
import { systemSettings } from "src/schema/system-settings";

@Injectable()
export class SettingsService {
  async getForSystem(systemId: string) {
    const [settings] = await db
      .select()
      .from(systemSettings)
      .where(eq(systemSettings.systemId, systemId));

    // 🔑 Auto-create on first access
    if (!settings) {
      await db.insert(systemSettings).values({
        systemId,
      });

      return this.getForSystem(systemId);
    }

    return settings;
  }

  async updateForSystem(
    systemId: string,
    data: Partial<typeof systemSettings.$inferInsert>,
  ) {
    await db
      .update(systemSettings)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(systemSettings.systemId, systemId));

    return this.getForSystem(systemId);
  }
}