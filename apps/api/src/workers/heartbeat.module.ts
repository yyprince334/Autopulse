import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { HeartbeatWorker } from './heartbeat.worker';
import { RetryWorker } from './retry.worker';

@Module({
  imports: [RedisModule],
  providers: [HeartbeatWorker, RetryWorker],
})
export class HeartbeatModule {}