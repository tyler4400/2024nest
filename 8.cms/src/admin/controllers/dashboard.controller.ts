import { Controller,Get,Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from 'src/shared/services/dashboard.service';

@Controller('admin')
@ApiTags('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService:DashboardService){

    }
    @Get()
    @Render('dashboard')
    async dashboard(){
       return await this.dashboardService.getDashboardData();
    }
}
