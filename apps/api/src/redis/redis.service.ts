import Redis from 'ioredis';
import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  public client: Redis;

  constructor() {
    const host = process.env.REDIS_HOST || 'redis';
    const port = Number(process.env.REDIS_PORT || 6379);

    this.client = new Redis(process.env.REDIS_URL!, {
      maxRetriesPerRequest: 5,
      enableReadyCheck: true,
      tls: {}, // REQUIRED for rediss://
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
