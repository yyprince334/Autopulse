import { Module } from '@nestjs/common';
import { SystemsController } from './systems.controller';
import { SystemsService } from './systems.service';
import { HeartbeatWorker } from 'src/workers/heartbeat.worker';
import { RedisService } from 'src/redis/redis.service';
import { AlertService } from 'src/monitoring/alert.service';
import { SettingsService } from 'src/setting/settings.service';

@Module({
  controllers: [SystemsController],
  providers: [SystemsService, RedisService, AlertService, SettingsService],
  exports: [SystemsService],
})
export class SystemsModule {}