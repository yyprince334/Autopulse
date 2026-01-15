import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SystemsService } from './systems.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { AlertService } from 'src/monitoring/alert.service';

@Controller('systems')
export class SystemsController {
  constructor(
    private readonly systemsService: SystemsService,
    private readonly alertService: AlertService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateSystemDto) {
    return this.systemsService.createSystem(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.systemsService.getAllsystems();
  }

  @Post('heartbeat')
  record(@Req() req: Request) {
    const apiKey = req.headers['x-api-key'] as string;
    return this.systemsService.recordHeartbeatByApiKey(apiKey);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/status')
  getStatus(@Param('id') id: string) {
    return this.systemsService.getSystemStatus(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/heartbeats')
  getHearbeats(@Param('id') id: string) {
    return this.systemsService.getHearbeats(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getSystem(@Param('id') id: string) {
    return this.systemsService.getSystemById(id);
  }

  @Patch(':id')
  async updateSystem(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
      heartbeatInterval?: number;
    },
  ) {
    return this.systemsService.updateSystem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.systemsService.deleteSystem(id);
  }

  @Get(':systemId/alerts')
  async getAlerts(@Param('systemId') systemId: string) {
    return this.alertService.getAlertById(systemId);
  }
}
