import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { db } from 'src/db';
import { eq, sql, desc } from 'drizzle-orm';
import { systems } from 'src/schema/systems';
import { heartbeats } from 'src/schema/heartbeats';
import { SystemStatus } from './system-status';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SystemsService {

  constructor(
  private readonly redis: RedisService,
) {}
  async createSystem(data: {
    name: string;
    description?: string;
    heartbeatInterval: number;
  }) {
    const apiKey = crypto.randomBytes(32).toString('hex');
    const apiKeyHash = await bcrypt.hash(apiKey, 10);
    const [system] = await db
      .insert(systems)
      .values({
        name: data.name,
        description: data.description ?? null,
        heartbeatInterval: data.heartbeatInterval,
        apiKeyHash,
      })
      .returning();

    return { ...system, apiKey };
  }

  async getAllsystems() {
    const allSystems = await db.select().from(systems);

    const result: Array<{
      id: string;
      name: string;
      description: string | null;
      heartbeatInterval: number;
      status: SystemStatus;
    }> = [];

    for (const system of allSystems) {
      const { status } = await this.getSystemStatus(system.id);

      result.push({
        id: system.id,
        name: system.name,
        description: system.description,
        heartbeatInterval: system.heartbeatInterval,
        status, // ← COMPUTED, not stored
      });
    }

    return result;
  }

  async recordHeartbeatByApiKey(apiKey: string) {
    if (!apiKey) {
      throw new UnauthorizedException('API key missing');
    }

    const system = await this.findSystemByApiKey(apiKey);
    if (!system) {
      throw new UnauthorizedException('Invalid API key');
    }

    // 🔥 PUSH TO REDIS (instead of DB)
    await this.redis.client.lpush(
      'heartbeat_queue',
      JSON.stringify({
        systemId: system.id,
        retryCount: 0
      }),
    );

    return {
      message: 'Heartbeat queued',
      systemId: system.id,
    };
  }

  async getSystemStatus(systemId: string) {
    const [system] = await db
      .select()
      .from(systems)
      .where(eq(systems.id, systemId));

    if (!system) {
      throw new NotFoundException('System not found');
    }

    const [lastHeartbeat] = await db
      .select()
      .from(heartbeats)
      .where(eq(heartbeats.systemId, systemId))
      .orderBy(desc(heartbeats.recievedAt))
      .limit(1);

    if (!lastHeartbeat || !lastHeartbeat.recievedAt) {
      return { status: SystemStatus.UNKNOWN };
    }

    const now = Date.now();
    const last = new Date(lastHeartbeat.recievedAt).getTime();
    const intervalMs = system.heartbeatInterval * 1000;

    if (now <= last + intervalMs) {
      return { status: SystemStatus.UP };
    }

    if (now <= last + intervalMs * 2) {
      return { status: SystemStatus.DEGRADED };
    }

    return { status: SystemStatus.DOWN };
  }

  async getHearbeats(systemId: string) {
    return await db
      .select()
      .from(heartbeats)
      .where(eq(heartbeats.systemId, systemId))
      .orderBy(desc(heartbeats.recievedAt))
      .limit(20);
  }

  async getSystemById(systemId: string) {
    const [system] = await db
      .select()
      .from(systems)
      .where(eq(systems.id, systemId));

    if (!system) {
      throw new NotFoundException('System not found');
    }

    return system;
  }

  async updateSystem(
    systemId: string,
    data: {
      name?: string;
      description?: string;
      heartbeatInterval?: number;
    },
  ) {
    const [existing] = await db
      .select()
      .from(systems)
      .where(eq(systems.id, systemId));

    if (!existing) {
      throw new NotFoundException('System not found');
    }

    const [updated] = await db
      .update(systems)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.heartbeatInterval !== undefined && {
          heartbeatInterval: data.heartbeatInterval,
        }),
      })
      .where(eq(systems.id, systemId))
      .returning();

    return updated;
  }

  async deleteSystem(id: string) {
    const result = await db
      .delete(systems)
      .where(eq(systems.id, id))
      .returning();
    if (!result.length) throw new NotFoundException('System not found');
    return { success: true };
  }

  async findSystemByApiKey(apiKey: string) {
    const allSystems = await db.select().from(systems);

    for (const system of allSystems) {
      const match = await bcrypt.compare(apiKey, system.apiKeyHash);
      if (match) return system;
    }

    return null;
  }

  async getDowntimeSeconds(systemId: string): Promise<number> {
    const [lastHeartbeat] = await db
      .select()
      .from(heartbeats)
      .where(eq(heartbeats.systemId, systemId))
      .orderBy(desc(heartbeats.recievedAt))
      .limit(1);
  
    if (!lastHeartbeat) return 0;
  
    const now = Date.now();
    const last = new Date(lastHeartbeat.recievedAt!).getTime();
  
    return Math.floor((now - last) / 1000);
  }
}
