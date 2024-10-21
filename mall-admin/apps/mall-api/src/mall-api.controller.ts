import { Controller, Get } from '@nestjs/common';
import { MallApiService } from './mall-api.service';

@Controller()
export class MallApiController {
  constructor(private readonly mallApiService: MallApiService) {}

  @Get()
  getHello(): string {
    return this.mallApiService.getHello();
  }
}
