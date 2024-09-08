import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from "./controllers/role.controller";
import { AccessController } from "./controllers/access.controller";
import { TagController } from "./controllers/tag.controller";
import { ArticleController } from "./controllers/article.controller";
import { CategoryController } from "./controllers/category.controller";
import {UploadController} from './controllers/upload.controller';
import { SettingController } from './controllers/setting.controller';
import { AuthController } from './controllers/auth.controller';
import {AuthMiddleware} from './middlewares/auth.middleware'
@Module({
    controllers: [
        DashboardController, UserController, RoleController, AccessController, TagController, 
        ArticleController, CategoryController,
        UploadController,
        SettingController,
        AuthController]
})
export class AdminModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
       consumer
       .apply(AuthMiddleware)
       .exclude('/admin/login','/admin/captcha','/admin/logout')//排除掉登录\验证码和退出的这三个路径
       .forRoutes('/admin/*')//针对/admin开头的路径使用此中间件
    }
}
