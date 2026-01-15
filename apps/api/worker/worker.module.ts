import { Module } from '@nestjs/common';
import { RedisModule } from '../src/redis/redis.module';
import { HeartbeatWorker } from '../src/workers/heartbeat.worker';

@Module({
  imports: [RedisModule],
  providers: [HeartbeatWorker],
})
export class WorkerModule {}