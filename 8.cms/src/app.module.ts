import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AdminModule, ApiModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
