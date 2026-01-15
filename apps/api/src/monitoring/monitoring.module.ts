import { Module } from '@nestjs/common';
import { HealthCheckJob } from './health-check.job';
import { SystemsModule } from '../systems/systems.module';
import { AlertService } from './alert.service';
import { EmailService } from './email.service';

@Module({
  imports: [SystemsModule],
  providers: [HealthCheckJob, AlertService, EmailService],

})
export class MonitoringModule {}