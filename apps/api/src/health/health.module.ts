import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthAggregatorService } from './health-aggregator.service';
import { SystemsModule } from '../systems/systems.module';
import { HealthSnapshotJob } from './health-aggregation.job';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(), // cron engine
    SystemsModule,
  ],
  controllers: [HealthController],
  providers: [
    HealthAggregatorService,
    HealthSnapshotJob,
    HealthService
  ],
})
export class HealthModule {}