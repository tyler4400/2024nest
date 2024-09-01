import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ArticleService } from './article.service';
import { UserService } from './user.service';
import { MailService } from './mail.service';
@Injectable()
export class NotificationService {
    constructor(
        private readonly articleService: ArticleService,
        private readonly userService: UserService,
        private readonly mailService:MailService
    ) { }
    @OnEvent('article.submitted')
    async handleArticleSubmittedEvent(payload:{articleId:number}){
        const article = await this.articleService.findOne({where:{id:payload.articleId}});
        const admin = await this.userService.findOne({where:{is_super:true}});
        if(admin){
            const subject = `文章审核请求:${article.title}`;
            const text = `有一篇新的文章需要你的审核，点击链接查看详情: http://localhost:3000/admin/articles/${payload.articleId}`;
            const html = `有一篇新的文章需要你的审核，点击链接查看详情: <a href="http://localhost:3000/admin/articles/${payload.articleId}">${article.title}</a>`;
            this.mailService.sendEmail(admin.email,subject,text,html);
        }
    }
}
