import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AlertService } from 'src/monitoring/alert.service';

@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  // 🔹 Global alerts
  @Get()
  async getAllAlerts(
    @Query('status') status?: string,
    @Query('ack') ack?: string,
    @Query('severity') severity?: string,
  ) {
    return this.alertService.getAllAlerts({
      status,
      ack,
      severity,
    });
  }

  // 🔹 Acknowledge alert
  @Post(':id/acknowledge')
  async acknowledge(@Param('id') id: string) {
    await this.alertService.acknowledgeAlert(id);
    return { success: true };
  }

  @Get(':id')
  async getAlert(@Param('id') id: string) {
    return this.alertService.getAlertById(id);
  }
}
