import { Controller,Get,Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
    @Get()
    @Render('dashboard')
    dashboard(){
        return {title:'dashboard'};
    }
}
