import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {I18n,I18nContext} from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@I18n() i18n:I18nContext) {
    //return this.appService.getHello();
    return await i18n.t('test.HELLO',{args:{username:'zhangsan'}});
  }
}
