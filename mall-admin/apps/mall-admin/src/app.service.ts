import { Injectable } from '@nestjs/common';
import { SharedService } from '@app/shared'
@Injectable()
export class AppService {
  constructor(private readonly sharedService: SharedService) {

  }
  getHello(): string {
    return 'mall-admin' + this.sharedService.getSharedMessage();
  }
}
