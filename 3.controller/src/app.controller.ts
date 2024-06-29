import { Controller, Get, Inject } from '@nestjs/common'
import {
    LoggerClassService,
    LoggerService,
    UseFactory,
    UseValueService
} from './logger.service'

@Controller()
export class AppController {
    constructor(
        private loggerClassService: LoggerClassService,
        private loggerService: LoggerService,
        @Inject('StringToken') private useValueService: UseValueService,
        @Inject('FactoryToken') private useFactory: UseFactory,
    ) {

    }
    @Get()
    index() {
        this.loggerClassService.log('index');
        this.loggerService.log('index');
        this.useValueService.log('index');
        this.useFactory.log('index');
        return 'index';
    }
}