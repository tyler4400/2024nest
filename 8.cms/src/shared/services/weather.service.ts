import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import axios from 'axios';
import * as geoip from 'geoip-lite';
@Injectable()
export class WeatherService {
    constructor(
        private readonly configurationService:ConfigurationService
    ){

    }
    async getExternalIP(){//获取本机的外网的IP
        try{
            const ipApiUrl = this.configurationService.ipApiUrl;
            const response = await axios.get(ipApiUrl);
            return response.data.ip;
        }catch(error){
            console.log(`Error fetching external IP:`,error);
            return `N/A`;
        }
    }
    async getWeather(){
        const ip = await this.getExternalIP();
        const geo = geoip.lookup(ip);
        const location = geo?`${geo.city},${geo.country}`:'Unknown';
        let weather = '无法获取当地的天气信息';
        try{
            const weatherApiKey = this.configurationService.weatherApiKey;
            const weatherApiUrl = this.configurationService.weatherApiUrl;
            const response = await axios.get(`${weatherApiUrl}?lang=zh&key=${weatherApiKey}&q=${location}`);
            weather = `${response.data.current.temp_c}°C,${response.data.current.condition.text}`;
        }catch(error){
            console.log(`获取天气信息失败`,error.message);
            throw new InternalServerErrorException('获取天气信息失败')
        }
        return weather;

    }
}
