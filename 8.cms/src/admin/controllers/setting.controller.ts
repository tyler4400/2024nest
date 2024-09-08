import { Controller,Get,Render,Body,Post,Redirect } from '@nestjs/common';
import { UpdateSettingDto } from 'src/shared/dto/setting.dto';
import { SettingService } from 'src/shared/services/setting.service';

@Controller('admin/settings')
export class SettingController {
    constructor(private readonly settingService:SettingService){}
    
    @Get()
    @Render('settings')
    async getSettings(){
        //查找集合中的第一个数据
        let settings = await this.settingService.findFirst();
        //如果不存在则向数据库集合插入一条数据
        if(!settings){
            settings = await this.settingService.create({
                siteName:'默认网站',
                siteDescription:'默认网站描述',
                contactEmail:'联系人邮箱'
            });
        }
        return {settings}
    }
    @Post()
    @Redirect('/admin')
    async updateSettings(@Body() updateSettingDto:UpdateSettingDto){
        console.log(updateSettingDto);
       await this.settingService.update(updateSettingDto.id,updateSettingDto)
    }
}
