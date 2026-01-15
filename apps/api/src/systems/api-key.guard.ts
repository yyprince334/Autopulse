import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { db } from '../db';
import { systems } from '../schema/systems';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
      throw new UnauthorizedException('API key missing');
    }

    const allSystems = await db.select().from(systems);

    for (const system of allSystems) {
      const match = await bcrypt.compare(apiKey, system.apiKeyHash);
      if (match) {
        req.system = system; // attach system context
        return true;
      }
    }

    throw new UnauthorizedException('Invalid API key');
  }
}