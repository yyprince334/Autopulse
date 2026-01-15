import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { SettingsService } from "./settings.service";

@Controller("systems/:id/settings")
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get()
  get(@Param("id") systemId: string) {
    return this.settings.getForSystem(systemId);
  }

  @Patch()
  update(
    @Param("id") systemId: string,
    @Body()
    body: {
      warningThresholdSec?: number;
      criticalThresholdSec?: number;
      alertCooldownSec?: number;
      heartbeatGraceMultiplier?: number;
      emailAlertsEnabled?: boolean;
    },
  ) {
    return this.settings.updateForSystem(systemId, body);
  }
}