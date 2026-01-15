import { Injectable } from '@nestjs/common';
import { eq, desc, isNotNull, isNull, and, SQL } from 'drizzle-orm';
import { last } from 'rxjs';
import { db } from 'src/db';
import { alerts } from 'src/schema/alerts';
import { SystemStatus } from 'src/systems/system-status';


export enum AlertSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

@Injectable()
export class AlertService {
  async shouldAlert(systemId: string, status: SystemStatus) {
    const [lastAlert] = await db
      .select()
      .from(alerts)
      .where(eq(alerts.systemId, systemId))
      .orderBy(desc(alerts.createdAt))
      .limit(1);

    if (!lastAlert && status === SystemStatus.DOWN) {
      return true;
    }

    if (lastAlert && lastAlert.status !== status) {
      return true;
    }

    return false;
  }

  async recordAlert(
    systemId: string,
    status: SystemStatus,
    message: string,
    downtimeSeconds: number,
    heartbeatInterval: number,
  ) {
    if (status === SystemStatus.DOWN) {
      // 🔴 Create new incident
      await db.insert(alerts).values({
        systemId,
        status,
        message,
        severity: this.calculateSeverity(downtimeSeconds, heartbeatInterval),
        createdAt: new Date(),
      });
      return;
    }
  
    if (status === SystemStatus.UP) {
      // ✅ Resolve latest DOWN alert
      const [openAlert] = await db
        .select()
        .from(alerts)
        .where(
          and(
            eq(alerts.systemId, systemId),
            eq(alerts.status, SystemStatus.DOWN),
            isNull(alerts.resolvedAt),
          )
        )
        .orderBy(desc(alerts.createdAt))
        .limit(1);
  
      if (openAlert) {
        await db
          .update(alerts)
          .set({ resolvedAt: new Date() })
          .where(eq(alerts.id, openAlert.id));
      }
  
      // Optional: record recovery event (audit trail)
      await db.insert(alerts).values({
        systemId,
        status: SystemStatus.UP,
        message: "System recovered",
        severity: AlertSeverity.LOW,
        createdAt: new Date(),
      });
    }
  }

  // apps/api/src/alerts/alert.service.ts
  async getAlertsForSystem(systemId: string) {
    return db
      .select()
      .from(alerts)
      .where(eq(alerts.systemId, systemId))
      .orderBy(desc(alerts.createdAt));
  }

  // alert.service.ts

  async getAllAlerts(filters: {
    status?: string;
    ack?: string;
    severity?: string;
  }) {
    const conditions: SQL[] = []; // 🔑 IMPORTANT FIX
  
    if (filters.status) {
      conditions.push(eq(alerts.status, filters.status));
    }
  
    if (filters.severity) {
      conditions.push(eq(alerts.severity, filters.severity));
    }
  
    if (filters.ack === "true") {
      conditions.push(isNotNull(alerts.acknowledgedAt));
    }
  
    if (filters.ack === "false") {
      conditions.push(isNull(alerts.acknowledgedAt));
    }
  
    return db
      .select()
      .from(alerts)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(alerts.createdAt));
  }

  async acknowledgeAlert(id: string) {
    await db.update(alerts).set({acknowledgedAt: new Date()}).where(eq(alerts.id, id));
  }

  private calculateSeverity(
    downtimeSeconds: number,
    heartbeatInterval: number,
  ): AlertSeverity {
    const interval = heartbeatInterval;
  
    if (downtimeSeconds <= interval) {
      return AlertSeverity.LOW;
    }
  
    if (downtimeSeconds <= interval * 3) {
      return AlertSeverity.MEDIUM;
    }
  
    if (downtimeSeconds <= interval * 5) {
      return AlertSeverity.HIGH;
    }
  
    return AlertSeverity.CRITICAL;
  }

  async getAlertById(id: string) {
    const [alert] = await db
      .select({
        id: alerts.id,
        status: alerts.status,
        severity: alerts.severity,
        message: alerts.message,
        createdAt: alerts.createdAt,
        resolvedAt: alerts.resolvedAt,
        acknowledgedAt: alerts.acknowledgedAt,
        systemId: alerts.systemId,
      })
      .from(alerts)
      .where(eq(alerts.id, id));
  
    return alert;
  }

  async resolveLastAlert(systemId: string) {
    const [openAlert] = await db
      .select()
      .from(alerts)
      .where(
        and(
          eq(alerts.systemId, systemId),
          isNull(alerts.resolvedAt),
          eq(alerts.status, SystemStatus.DOWN)
        )
      )
      .orderBy(desc(alerts.createdAt))
      .limit(1);
  
    if (!openAlert) return;
  
    await db
      .update(alerts)
      .set({
        resolvedAt: new Date(),
        status: SystemStatus.UP,
      })
      .where(eq(alerts.id, openAlert.id));
  }
}
