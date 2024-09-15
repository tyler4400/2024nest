import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/services/user.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { Response, Request as ExpressRequest } from 'express';
import { HttpStatusCode } from 'axios';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from 'src/shared/services/configuration.service';
import { AuthGuard } from '../guards/auth.guard';
import { RedisService } from 'src/shared/services/redis.service';
import { MailService } from 'src/shared/services/mail.service';
import { PhoneService } from 'src/shared/services/phone.service';
import { rmSync } from 'fs';
@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly utilityService: UtilityService,
        private readonly jwtService: JwtService,
        private readonly configurationService: ConfigurationService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
        private readonly phoneService: PhoneService,
    ) {

    }
    @Post('login')
    async login(@Body() body, @Res() res: Response) {
        const { username, password } = body;
        const user = await this.validateUser(username, password);
        if (user) {
            const tokens = this.createJwtTokens(user);
            return res.json({ success: true, ...tokens });
        }
        return res.status(HttpStatusCode.Unauthorized).json({ success: false, message: '用户名或密码错误' })
    }
    private async validateUser(username: string, password: string) {
        const existUser = await this.userService.findOne({ where: { username }, relations: ['roles', 'roles.accesses'] });
        if (existUser && await this.utilityService.comparePassword(password, existUser.password)) {
            return existUser;
        }
        return null;
    }
    private createJwtTokens(user) {
        const access_token = this.jwtService.sign({
            id: user.id,
            username: user.username
        }, {
            secret: this.configurationService.jwtSecret,
            expiresIn: '30m'
        });
        const refresh_token = this.jwtService.sign({
            id: user.id,
            username: user.username
        }, {
            secret: this.configurationService.jwtSecret,
            expiresIn: '7d'
        });
        return { access_token, refresh_token }
    }
    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() req: ExpressRequest, @Res() res: Response) {
        return res.json({ user: req.user });
    }
    @Get('profile2')
    @UseGuards(AuthGuard)
    getProfile2(@Req() req: ExpressRequest, @Res() res: Response) {
        return res.json({ user: req.user });
    }
    @Post('refresh-token')
    async refreshToken(@Body() body, @Res() res: Response) {
        const { refreshToken } = body;
        try {
            const user = this.jwtService.verify(refreshToken, { secret: this.configurationService.jwtSecret })
            const tokens = this.createJwtTokens(user);
            return res.json({ success: true, ...tokens });
        } catch (error) {
            return res.status(HttpStatusCode.Unauthorized).json({ success: false, message: '刷新token无效或过期' })
        }
    }
    @Post('send-email-code')
    async sendEmailCode(@Body() body, @Res() res: Response) {
        const { email } = body;
        const code = this.utilityService.generateVerificationCode();
        await this.redisService.set(email,code,300);//把邮件和验证码保存到redis中
        await this.mailService.sendEmail(email,`邮件登录验证码`,`你的邮件登录验证码为${code}`,`你的邮件登录验证码为${code}`);
        return res.json({success:true,message:`邮件验证码已经发送给${email}`});
    }
    @Post('login-email-code')
    async loginEmailCode(@Body() body, @Res() res: Response) {
        const { email,code } = body;
        const storedCode = await this.redisService.get(email);
        if(code === storedCode){
            const existUser = await this.userService.findOne({ where: { email }, relations: ['roles', 'roles.accesses'] });
            if (existUser) {
                const tokens = this.createJwtTokens(existUser);
                return res.json({ success: true, ...tokens });
            }
            return res.status(HttpStatusCode.Unauthorized).json({ success: false, message: '邮件或验证码不正确' })
        }
    }
    @Post('send-phone-code')
    async sendPhoneCode(@Body() body, @Res() res: Response) {
        const { phone } = body;
        try{
            await this.phoneService.sendVerificationCode(phone);
            return res.json({success:true,message:'手机验证码发送成功'});
        }catch(error){
            return res.status(HttpStatusCode.InternalServerError).json({ success: false, message: '手机验证码发送失败' })
        }
      
    }
    @Post('login-phone-code')
    async loginPhoneCode(@Body() body, @Res() res: Response) {
        const { phone,phoneCode } = body;
        const isCodeValid = await this.phoneService.verifyCode(phone,phoneCode);
        if(isCodeValid){
            const existUser = await this.userService.findOne({ where: { phone }, relations: ['roles', 'roles.accesses'] });
            if (existUser) {
                const tokens = this.createJwtTokens(existUser);
                return res.json({ success: true, ...tokens });
            }
            return res.status(HttpStatusCode.Unauthorized).json({ success: false, message: '手机号或验证码不正确' })
        }
    }

}
