import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { db } from 'src/db';
import { RedisService } from 'src/redis/redis.service';
import { heartbeats } from 'src/schema/heartbeats';

@Injectable()
export class HeartbeatWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HeartbeatWorker.name);
  private running = true;

  private readonly MAX_RETRIES = 5;

  constructor(private readonly redis: RedisService) {}

  onModuleInit() {
    this.logger.log('Heartbeat worker started');
    this.loop();
  }

  async loop() {
    while (this.running) {
      try {
        const result = await this.redis.client.brpop(
          'heartbeat_queue',
          0,
        );

        if (!result) continue;

        const job: {
          systemId: string;
          retryCount: number;
        } = JSON.parse(result[1]);

        try {
          await db.insert(heartbeats).values({
            systemId: job.systemId,
          });

          this.logger.log(`Heartbeat persisted → ${job.systemId}`);
        } catch (err) {
          await this.handleFailure(job, err);
        }
      } catch (err) {
        this.logger.error('Worker crash', err);
      }
    }
  }

  private async handleFailure(job: any, err: any) {
    job.retryCount = (job.retryCount ?? 0) + 1;

    if (job.retryCount <= this.MAX_RETRIES) {
      const delay = Math.pow(2, job.retryCount) * 1000;

      this.logger.warn(
        `Retry ${job.retryCount} for ${job.systemId} in ${delay}ms`,
      );

      // delayed retry
      await this.redis.client.zadd(
        'heartbeat_retry_zset',
        Date.now() + delay,
        JSON.stringify(job),
      );
    } else {
      this.logger.error(`Heartbeat permanently failed → ${job.systemId}`);

      await this.redis.client.lpush(
        'heartbeat_dead_queue',
        JSON.stringify({
          ...job,
          failedAt: Date.now(),
          error: err.message,
        }),
      );
    }
  }

  async onModuleDestroy() {
    this.running = false;
  }
}
