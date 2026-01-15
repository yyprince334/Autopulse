import Redis from 'ioredis';
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public client: Redis;

  constructor() {
    const host = process.env.REDIS_HOST || 'redis';
    const port = Number(process.env.REDIS_PORT || 6379);

    this.client = new Redis({
      host,
      port,
      maxRetriesPerRequest: 5, // 🔑 prevent crash loop
      enableReadyCheck: true,
      retryStrategy(times) {
        return Math.min(times * 200, 2000); // backoff
      },
    });

    this.client.on('connect', () => {
      this.logger.log(`Connected to Redis at ${host}:${port}`);
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis error', err);
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}