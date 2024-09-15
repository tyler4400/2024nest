import { Injectable } from '@nestjs/common';
import {RedisService } from './redis.service';
import { ConfigurationService } from './configuration.service';
import { UtilityService } from './utility.service';
const tencentcloud = require('tencentcloud-sdk-nodejs')
@Injectable()
export class PhoneService {
    private smsClient;
    constructor(
        private readonly redisService:RedisService,
        private readonly configurationService:ConfigurationService,
        private readonly utilityService :UtilityService
    ){
        this.smsClient = new tencentcloud.sms.v20210111.Client({
            credential:{
                secretId:this.configurationService.tencentCloudSecretId,
                secretKey:this.configurationService.tencentCloudSecretKey,
            },
            region:this.configurationService.tencentCloudSmsRegion,
        })
    }
    async sendVerificationCode(phone:string){
        const code = this.utilityService.generateVerificationCode();
        await this.redisService.set(phone,code,300);
        const params = {
            SmsSdkAppId:this.configurationService.tencentCloudSmsSdkAppId,//配置应用的IP
            SignName:this.configurationService.tencentCloudSmsSignName,//签名
            TemplateId:this.configurationService.tencentCloudSmsTemplateId,//短信的模板ID
            TemplateParamSet:[code,'5'],//给短信模板传递的参数
            PhoneNumberSet:[`+86${phone}`]//发送的手机号的集合
        }
        console.log(params)
        try{
            const result = await this.smsClient.SendSms(params);
            result.SendStatusSet.forEach((status)=>{
                console.log(status);
                if(status.Code !== 'Ok'){
                    throw new Error(`短信发送失败:${status.message}`);
                }
            });
            console.log(`短信发送成功`,result)
        }catch(error){
            console.log(`短信发送失败`,error)
            throw new Error(`短信发送失败:${error.message}`);
        }
        return code;
    }
    async verifyCode(phone:string,phoneCode:string){
        const storedCode = await this.redisService.get(phone);
        return storedCode === phoneCode;
    }

}
