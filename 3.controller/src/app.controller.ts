import { Controller, Get, Inject } from '@nestjs/common'
import { OtherService } from './other.service';

@Controller()
export class AppController {
    constructor(
        private otherService: OtherService
    ) {

    }
    @Get()
    index() {
        return 'index';
    }
    @Get('other')
    other() {
        this.otherService.log('hello');
        return 'other';
    }
}