import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';

@Module({
  controllers: [DashboardController]
})
export class AdminModule {}
