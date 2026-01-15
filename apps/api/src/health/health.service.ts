import { Injectable } from '@nestjs/common';
import { and, eq, gte } from 'drizzle-orm';
import { db } from 'src/db';
import { systemHealthSnapshots } from 'src/schema/system-health-snapshots';

@Injectable()
export class HealthService {
  async getSummary(systemId: string, from: Date, to: Date) {
    const rows = await db
      .select()
      .from(systemHealthSnapshots)
      .where(
        and(
          eq(systemHealthSnapshots.systemId, systemId),
          gte(systemHealthSnapshots.windowStart, from),
        ),
      );

    let uptime = 0;
    let downtime = 0;
    let incidents = 0;

    for (const r of rows) {
      uptime += r.uptimeSeconds;
      downtime += r.downtimeSeconds;
      incidents += r.incidentCount;
    }

    const total = uptime + downtime;
    const uptimePercentage = total === 0 ? 0 : (uptime / total) * 100;

    const availabilityPct = total === 0 ? 100 : (uptime / total) * 100;

    const sloTarget = 99.9;
    const sloBreached = availabilityPct < sloTarget;
    const healthStatus =
  uptimePercentage >= sloTarget ? "HEALTHY" : "UNHEALTHY"

    return {
      availabilityPct: Number(uptimePercentage.toFixed(2)), // ✅ renamed
      uptimeSeconds: uptime,
      downtimeSeconds: downtime,
      incidentCount: incidents,
      sloTarget,
      sloBreached,
      healthStatus,
      from,
      to,
    };
  }

  async getTimeline(systemId: string, from: Date) {
    const rows = await db
      .select({
        timestamp: systemHealthSnapshots.windowStart,
        uptimeSeconds: systemHealthSnapshots.uptimeSeconds,
        downtimeSeconds: systemHealthSnapshots.downtimeSeconds,
      })
      .from(systemHealthSnapshots)
      .where(
        and(
          eq(systemHealthSnapshots.systemId, systemId),
          gte(systemHealthSnapshots.windowStart, from),
        ),
      )
      .orderBy(systemHealthSnapshots.windowStart);

    return rows.map((r) => {
      const total = r.uptimeSeconds + r.downtimeSeconds;

      return {
        timestamp: r.timestamp.toISOString(), // 🔑 REQUIRED
        availability:
          total === 0
            ? 0
            : Number(((r.uptimeSeconds / total) * 100).toFixed(2)),
      };
    });
  }
}
