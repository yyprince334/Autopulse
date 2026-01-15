import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SystemsModule } from './systems/systems.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MonitoringModule } from './monitoring/monitoring.module';
import { RedisModule } from './redis/redis.module';
import { HeartbeatModule } from './workers/heartbeat.module';
import { HealthModule } from './health/health.module';
import { AlertModule } from './alerts/alert.module';
import { SettingsModule } from './setting/settings.module';



@Module({
  imports: [AuthModule, SystemsModule, ScheduleModule.forRoot(), MonitoringModule, RedisModule, HeartbeatModule, HealthModule, AlertModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
