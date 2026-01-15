import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from 'src/monitoring/alert.service';

@Module({
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
