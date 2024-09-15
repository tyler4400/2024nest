import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/services/user.service';
import { UtilityService } from 'src/shared/services/utility.service';
import {Response,Request as ExpressRequest} from 'express';
import { HttpStatusCode } from 'axios';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from 'src/shared/services/configuration.service';
import { AuthGuard } from '../guards/auth.guard';
import { es } from 'tencentcloud-sdk-nodejs';
@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly userService:UserService,
        private readonly utilityService:UtilityService,
        private readonly jwtService:JwtService,
        private readonly configurationService:ConfigurationService
    ){

    }
    @Post('login')
    async login(@Body() body,@Res() res:Response){
        const {username,password} = body;
        const user = await this.validateUser(username,password);
        if(user){
            const tokens = this.createJwtTokens(user);
            return res.json({success:true,...tokens});
        }
        return res.status(HttpStatusCode.Unauthorized).json({success:false,message:'用户名或密码错误'})
    }
    private async validateUser(username:string,password:string){
        const existUser = await this.userService.findOne({where:{username},relations:['roles','roles.accesses']});
        if(existUser && await this.utilityService.comparePassword(password,existUser.password)){
            return existUser;
        }
        return null;
    }
    private createJwtTokens(user){
        const access_token = this.jwtService.sign({
            id:user.id,
            username:user.username
        },{
            secret:this.configurationService.jwtSecret,
            expiresIn:'30m'
        });
        return {access_token}
    }
    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req:ExpressRequest,@Res() res:Response){
        return res.json({user:req.user});
    }
}
