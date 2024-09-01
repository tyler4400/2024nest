import { Injectable } from '@nestjs/common';
import * as COS from 'cos-nodejs-sdk-v5';
import { ConfigurationService } from './configuration.service';
@Injectable()
export class CosService {
    //定义一个变量，用于存储COS实例
    private cos:COS
    constructor(private readonly configurationService:ConfigurationService){
        //初始化COS实例，使用配置服务中的SecretId和SecretKey
        this.cos = new COS({
            SecretId:this.configurationService.cosSecretId,
            SecretKey:this.configurationService.cosSecretKey
        })
    }
    //获取签名认证信息的方法，默认过期时间为60秒
    getAuth(key,expires=60){
        const bucket = this.configurationService.cosBucket;
        const region = this.configurationService.cosRegion;
        const sign = this.cos.getAuth({
            Method:'put',//请求方法为put
            Key:key,//文件的对象键(路径)
            Expires:expires,//签名的有效期
            Bucket:bucket,//存储的桶的名称
            Region:region//存储桶的地区
        })
        return {
            sign,
            key,
            bucket,
            region
        }
    }

}
