import { SystemsService } from 'src/systems/systems.service';
import { AlertService, AlertSeverity } from './alert.service';
import { EmailService } from './email.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SystemStatus } from 'src/systems/system-status';
import { db } from 'src/db';
import { heartbeats } from 'src/schema/heartbeats';
import { desc, eq } from 'drizzle-orm';
import { calculateSeverity } from './severity-utils';

@Injectable()
export class HealthCheckJob {
  private readonly logger = new Logger(HealthCheckJob.name);

  constructor(
    private readonly systemsService: SystemsService,
    private readonly alertService: AlertService,
    private readonly emailService: EmailService,
  ) {}

  // Runs every minute
  @Cron('* * * * *')
  async checkSystems() {
    this.logger.log('Health Check Job Running...');

    const systems = await this.systemsService.getAllsystems();

    for (const system of systems) {
      const { status } = await this.systemsService.getSystemStatus(system.id);
      let downtimeSeconds = 0;

      if (status === SystemStatus.DOWN) {
        const [lastHeartbeat] = await db
          .select()
          .from(heartbeats)
          .where(eq(heartbeats.systemId, system.id))
          .orderBy(desc(heartbeats.recievedAt))
          .limit(1);

        if (lastHeartbeat?.recievedAt) {
          const now = Date.now();
          const last = new Date(lastHeartbeat.recievedAt).getTime();
          downtimeSeconds = Math.floor((now - last) / 1000);
        }
      }

      this.logger.log(`System: ${system.name}, Status: ${status}`);

      const shouldAlert = await this.alertService.shouldAlert(
        system.id,
        status,
      );

      if (!shouldAlert) continue;

      let message =
        status === SystemStatus.DOWN ? SystemStatus.DOWN : SystemStatus.UP;

      await this.alertService.recordAlert(
        system.id,
        status,
        'System is DOWN',
        downtimeSeconds,
        system.heartbeatInterval, // 🔑 IMPORTANT
      );

      if (status === SystemStatus.UP) {
        await this.alertService.resolveLastAlert(system.id);
      }

      this.logger.log(`Alert recorded: ${system.name} → ${status}`);

      if (calculateSeverity(downtimeSeconds) === AlertSeverity.CRITICAL) {
        await this.emailService.sendAlert(
          process.env.ALERT_EMAIL!,
          '🚨 AutoPulse Alert',
          message,
        );
      }

      await this.emailService.sendAlert(
        process.env.ALERT_EMAIL!,
        '🚨 AutoPulse Alert',
        message,
      );

      this.logger.log(`Alert email sent for system: ${system.name}`);
    }
  }
}
