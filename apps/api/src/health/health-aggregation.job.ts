import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { db } from 'src/db';
import { systemHealthSnapshots } from 'src/schema/system-health-snapshots';
import { SystemsService } from 'src/systems/systems.service';
import { HealthAggregatorService } from './health-aggregator.service';

@Injectable()
export class HealthSnapshotJob {
  private readonly logger = new Logger(HealthSnapshotJob.name);

  constructor(
    private readonly systemsService: SystemsService,
    private readonly aggregator: HealthAggregatorService,
  ) {}

  /**
   * Runs every minute
   */
  @Cron('* * * * *')
  async run() {
    const windowEnd = new Date();
    const windowStart = new Date(windowEnd.getTime() - 60_000);

    this.logger.log(
      `Snapshot window: ${windowStart.toISOString()} → ${windowEnd.toISOString()}`,
    );

    const systems = await this.systemsService.getAllsystems();

    for (const system of systems) {
      const snapshot = await this.aggregator.aggregate(
        system.id,
        windowStart,
        windowEnd,
      );

      await db.insert(systemHealthSnapshots).values(snapshot);
    }
  }
}