import { Controller, Get, Param, Query } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('systems/:id/health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get('summary')
  async summary(
    @Param('id') systemId: string,
    @Query('range') range = '1h',
  ) {
    const to = new Date();
    const from = new Date(to.getTime() - this.parseRange(range));
    return this.health.getSummary(systemId, from, to);
  }

  @Get('timeline')
  async timeline(
    @Param('id') systemId: string,
    @Query('range') range = '24h',
  ) {
    const from = new Date(Date.now() - this.parseRange(range));
    return this.health.getTimeline(systemId, from);
  }

  private parseRange(range: string) {
  const value = Number(range.slice(0, -1));
  const unit = range.slice(-1);

  if (Number.isNaN(value)) {
    throw new Error(`Invalid range: ${range}`);
  }

  if (unit === 'h') return value * 3600_000;
  if (unit === 'd') return value * 86400_000;

  throw new Error(`Unsupported range unit: ${range}`);
}
}