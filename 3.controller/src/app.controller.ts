import { Controller, Get, Inject } from '@nestjs/common'
import { CommonService } from './common.service';

@Controller()
export class AppController {
    constructor(
        private commonService: CommonService
    ) {

    }
    @Get()
    index() {
        return 'index';
    }
    @Get('common')
    common() {
        this.commonService.log('hello');
        return 'common';
    }
}