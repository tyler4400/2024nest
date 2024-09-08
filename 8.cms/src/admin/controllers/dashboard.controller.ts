import { Controller,Get,Render, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { interval, mergeMap,map } from 'rxjs';
import { DashboardService } from 'src/shared/services/dashboard.service';
import { SystemService } from 'src/shared/services/system.service';
import { WeatherService } from 'src/shared/services/weather.service';

@Controller('admin')
@ApiTags('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService:DashboardService,
        private readonly weatherService:WeatherService,
        private readonly systemService:SystemService,
    ){

    }
    @Get()
    @Render('dashboard')
    async dashboard(){
       return await this.dashboardService.getDashboardData();
    }
    @Get('weather')
    async getWeather(){
        const weather = await this.weatherService.getWeather();
        return {weather}
    }
    @Sse('systemInfo')
    async getSystemInfo(){
        return interval(3000).pipe(
            mergeMap(()=>this.systemService.getSystemInfo()),
            map((systemInfo)=>({data:systemInfo}))
        )
    }
}
