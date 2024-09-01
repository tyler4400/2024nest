import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { UserController } from './controllers/user.controller';
import { RoleController } from "./controllers/role.controller";
import { AccessController } from "./controllers/access.controller";
import { TagController } from "./controllers/tag.controller";
import { ArticleController } from "./controllers/article.controller";
import { CategoryController } from "./controllers/category.controller";
import {UploadController} from './controllers/upload.controller';
@Module({
    controllers: [
        DashboardController, UserController, RoleController, AccessController, TagController, 
        ArticleController, CategoryController,
        UploadController]
})
export class AdminModule {
}
