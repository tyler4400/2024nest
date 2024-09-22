import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
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
import { QrCodeStatusEnum } from 'src/shared/enums/qrcode-status.enum';
import * as qrcode from 'qrcode';
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
        await this.redisService.set(email, code, 300);//把邮件和验证码保存到redis中
        await this.mailService.sendEmail(email, `邮件登录验证码`, `你的邮件登录验证码为${code}`, `你的邮件登录验证码为${code}`);
        return res.json({ success: true, message: `邮件验证码已经发送给${email}` });
    }
    @Post('login-email-code')
    async loginEmailCode(@Body() body, @Res() res: Response) {
        const { email, code } = body;
        const storedCode = await this.redisService.get(email);
        if (code === storedCode) {
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
        try {
            await this.phoneService.sendVerificationCode(phone);
            return res.json({ success: true, message: '手机验证码发送成功' });
        } catch (error) {
            return res.status(HttpStatusCode.InternalServerError).json({ success: false, message: '手机验证码发送失败' })
        }

    }
    @Post('login-phone-code')
    async loginPhoneCode(@Body() body, @Res() res: Response) {
        const { phone, phoneCode } = body;
        const isCodeValid = await this.phoneService.verifyCode(phone, phoneCode);
        if (isCodeValid) {
            const existUser = await this.userService.findOne({ where: { phone }, relations: ['roles', 'roles.accesses'] });
            if (existUser) {
                const tokens = this.createJwtTokens(existUser);
                return res.json({ success: true, ...tokens });
            }
            return res.status(HttpStatusCode.Unauthorized).json({ success: false, message: '手机号或验证码不正确' })
        }
    }

    @Get('qrcode')
    async generateQrCode(@Req() req: ExpressRequest,@Res() res: Response) {
        //先为此二维码生成一个随机的Token字符串，作为二维码的ID或者说主键或者说唯一标志
        const token = this.utilityService.generateRandomString();
        //放置到Redis数据中保存,5分钟后过期
        await this.redisService.set(`qrcode_login:${token}`, QrCodeStatusEnum.PENDING, 300);
        const host = req.hostname;
        const protocol = req.protocol;
        const port = req.socket.localPort;
        const qrCodeUrl = `${protocol}://${host}:${port}/api/auth/qrcode-scan?token=${token}`;
        console.log('qrCodeUrl', qrCodeUrl);
        const qrCode = await qrcode.toDataURL(qrCodeUrl);
        res.json({ token, qrCode });
    }

    @Get('qrcode-scan')
    async handleQrCodeScan(@Query('token') token: string, @Res() res: Response) {
        //当用户扫码的时候把二维码Token的状态必为已描述
        await this.redisService.set(`qrcode_login:${token}`, QrCodeStatusEnum.SCANNED, 300);
        return res.redirect(`/app_authorize.html?token=${token}`);
    }
    @Post('qrcode-deny')
    async denyQrCode(@Query('token') token: string, @Res() res: Response) {
        await this.redisService.set(`qrcode_login:${token}`, QrCodeStatusEnum.DENIED, 300);
        return res.json({ success: true, message: '已拒绝授权' })
    }
    @Post('qrcode-authorize')
    async authorizeQrCode(@Query('token') token: string, @Res() res: Response, @Body('appAccessToken') appAccessToken: string) {
        //先获取到老的二维码的状态
        const currentStatus = await this.redisService.get(`qrcode_login:${token}`);
        if (currentStatus !== QrCodeStatusEnum.SCANNED) {
            return res.status(400).json({ success: false, message: '二维码未扫描或者已过期' })
        }
        if (!appAccessToken) {//如果没有提供用户登录的Token，服务器无法知道是哪个用户要授权登录
            return res.status(400).json({ success: false, message: '用户信息未提供' })
        }
        try {
            const decodedUser = this.jwtService.verify(appAccessToken, { secret: this.configurationService.jwtSecret });
            await this.redisService.set(`qrcode_login:${token}`, QrCodeStatusEnum.AUTHORIZED, 300);
            //保存此二维授权登录的用户ID
            await this.redisService.set(`qrcode_login_user:${token}`, decodedUser.id, 300);
            return res.json({ success: true, message: "授权成功" });
        } catch (error) {
            return res.status(400).json({ success: false, message: 'Unauthorized' })
        }
    }
    @Get('check-qrcode-status')
    async checkQrcodeStatus(@Query('token') token:string, @Res() res: Response){
        const status = await this.redisService.get(`qrcode_login:${token}`);
        if(!status){
            return res.json({success:true,status:QrCodeStatusEnum.EXPIRED});
        }
        if(status === QrCodeStatusEnum.AUTHORIZED ){
            //还要让网页端也登录成功
            const  userId = await this.redisService.get(`qrcode_login_user:${token}`);
            const user = await this.userService.findOne({where:{id:Number(userId)}});
            if(!user){
                return res.status(404).json({status:QrCodeStatusEnum.ERROR,message:'用户不存在'});
            }
            const tokens = this.createJwtTokens(user);
            return res.json({success:true,status,...tokens})
        }
        return res.json({success:true,status})
    }
}
