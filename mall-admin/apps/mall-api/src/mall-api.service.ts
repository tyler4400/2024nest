import { Injectable } from '@nestjs/common';
import { SharedService } from '@app/shared'
@Injectable()
export class MallApiService {
  constructor(private readonly sharedService: SharedService) {

  }
  getHello(): string {
    return 'mall-api' + this.sharedService.getSharedMessage();
  }
}
