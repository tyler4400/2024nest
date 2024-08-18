import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [
    SharedModule,
    AdminModule, 
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
