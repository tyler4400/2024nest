import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigurationService } from './configuration.service';
@Injectable()
export class MailService {
    private transporter
    constructor(private readonly configurationService:ConfigurationService){
        this.transporter = nodemailer.createTransport({
            host:this.configurationService.smtpHost,
            port:this.configurationService.smtpPort,
            secure:true,
            auth:{
                user:this.configurationService.smtpUser,
                pass:this.configurationService.smtpPass
            }
        })
    }

    async sendEmail(to:string,subject,text,html){
        // 设置邮件选项
        let mailOptions = {
            from: this.configurationService.smtpUser, // 发件人地址
            to,  // 收件人地址
            subject,           // 邮件主题
            text,          // 纯文本内容
            html    // HTML 内容
        };
        // 发送邮件
        const info = await this.transporter.sendMail(mailOptions);
        console.log(`邮件已经发送成功:${info.messageId}`)
    }

}
