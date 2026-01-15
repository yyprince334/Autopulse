import { Injectable } from '@nestjs/common';
import { and, eq, gte, lte, asc } from 'drizzle-orm';
import { db } from 'src/db';
import { heartbeats } from 'src/schema/heartbeats';
import { SystemStatus } from 'src/systems/system-status';

@Injectable()
export class HealthAggregatorService {
  async aggregate(systemId: string, windowStart: Date, windowEnd: Date) {
    // 1️⃣ Fetch heartbeats in window
    const rows = await db
      .select()
      .from(heartbeats)
      .where(
        and(
          eq(heartbeats.systemId, systemId),
          gte(heartbeats.recievedAt, windowStart),
          lte(heartbeats.recievedAt, windowEnd),
        ),
      )
      .orderBy(asc(heartbeats.recievedAt));

    let uptimeSeconds = 0;
    let downtimeSeconds = 0;
    let incidentCount = 0;

    let lastStatus: SystemStatus = SystemStatus.DOWN;
    let lastTimestamp = windowStart;

    // 2️⃣ Walk timeline
    for (const hb of rows) {
      const currentTime = hb.recievedAt ?? lastTimestamp;
      const diffSeconds =
        (currentTime.getTime() - lastTimestamp.getTime()) / 1000;

      if (lastStatus === SystemStatus.UP) {
        uptimeSeconds += diffSeconds;
      } else {
        downtimeSeconds += diffSeconds;
        incidentCount++;
      }

      lastStatus = SystemStatus.UP;
      lastTimestamp = currentTime;
    }

    // 3️⃣ Tail gap (last heartbeat → window end)
    const tailSeconds =
      (windowEnd.getTime() - lastTimestamp.getTime()) / 1000;

    if (lastStatus === SystemStatus.UP) {
      uptimeSeconds += tailSeconds;
    } else {
      downtimeSeconds += tailSeconds;
    }

    // 4️⃣ Final status
    const finalStatus =
      uptimeSeconds > 0 ? SystemStatus.UP : SystemStatus.DOWN;

    // 5️⃣ Return SNAPSHOT-SHAPED object
    return {
      systemId,
      windowStart,
      windowEnd,
      uptimeSeconds: Math.floor(uptimeSeconds),
      downtimeSeconds: Math.floor(downtimeSeconds),
      incidentCount,
      finalStatus,
    };
  }
}