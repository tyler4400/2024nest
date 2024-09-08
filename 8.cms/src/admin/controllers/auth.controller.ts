import { Body, Controller,Get,Post,Render,Res, Session } from '@nestjs/common';
import {Response} from 'express';
import { UserService } from 'src/shared/services/user.service';
import { UtilityService } from 'src/shared/services/utility.service';
@Controller('admin')
export class AuthController {
    constructor(
        private readonly utilityService:UtilityService,
        private readonly userService:UserService
    ){}
    @Get('login')
    showLogin(@Res() res:Response){
       res.render('auth/login',{layout:false});
    }
    @Get('welcome')
    @Render('welcome')
    welcome(){
      return {}
    }

    @Get('captcha')
    getCaptcha(@Res() res:Response,@Session() session){
        const captcha = this.utilityService.generateCaptcha({size:1,ignoreChars:'0o1il'});
        session.captcha=captcha.text;
        res.type('svg');//响应类型为svg图片类型
        res.send(captcha.data);//返回二进制图片数据
    }

    @Post('login')
    async login(@Body() body,@Res() res:Response,@Session() session){
        const {username,password,captcha} = body;
        if(captcha?.toLowerCase() !== session.captcha?.toLowerCase()){
            res.render('auth/login',{message:'验证码错误',layout:false},);
        }
        const user = await this.userService.findOne({where:{username},relations:['roles','roles.accesses']});
        if(user && await this.utilityService.comparePassword(password,user.password)){
            session.user = user;
            return res.redirect('/admin/welcome');
        }else{
            res.render('auth/login',{message:'用户名或密码错误',layout:false},);
        }
    }
    @Get('logout')
    logout(@Res() res:Response,@Session() session){
        session.user = null;
        res.redirect('/admin/login');
    }
}
