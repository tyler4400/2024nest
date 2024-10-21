import { Module } from '@nestjs/common';
import { MallApiController } from './mall-api.controller';
import { MallApiService } from './mall-api.service';
import { SharedModule } from '@app/shared';
@Module({
  imports: [SharedModule],
  controllers: [MallApiController],
  providers: [MallApiService],
})
export class MallApiModule { }
