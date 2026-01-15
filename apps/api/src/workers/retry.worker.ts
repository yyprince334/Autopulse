import { Injectable, OnModuleInit } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class RetryWorker implements OnModuleInit {
  constructor(private readonly redis: RedisService) {}

  onModuleInit() {
    this.retryLoop();
  }

  async retryLoop() {
  while (this.retryLoop) {
    const now = Date.now();

    const jobs = await this.redis.client.zrangebyscore(
      'heartbeat_retry_zset',
      0,
      now,
      'LIMIT',
      0,
      1,
    );

    if (!jobs.length) {
      await new Promise(r => setTimeout(r, 500));
      continue;
    }

    const job = jobs[0];
    await this.redis.client.zrem('heartbeat_retry_zset', job);
    await this.redis.client.lpush('heartbeat_queue', job);
  }
}
}