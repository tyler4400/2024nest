import { Injectable } from "@nestjs/common";
//这是一个处理密码加盐HASH和验证密码的库
import * as bcrypt from 'bcrypt'
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class UtilityService{
    async hashPassword(password:string):Promise<string>{
        //生成一个盐值，用于增强哈希的案例性
        const salt = await bcrypt.genSalt();
        //使用生成的盐值对密码进行哈希，并返回哈希的结果
        return bcrypt.hash(password,salt);
    }
    async comparePassword(password:string,hash:string):Promise<boolean>{
        //比较密码和hash值，返回比较结果  true  or false
        return bcrypt.compare(password,hash)
    }
    generateCaptcha(options){
        return svgCaptcha.create(options);
    }
    generateVerificationCode(){
        return Math.floor(100000+Math.random()*900000).toString();
    }
}