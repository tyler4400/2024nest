import { Controller, Get,Post } from '@nestjs/common'
@Controller('app')
export class AppController {
    @Get('config')
    getConfig() {
        return `config`
    }
    @Get('abcde')
    abcde() {
        return `abcde`
    }
}