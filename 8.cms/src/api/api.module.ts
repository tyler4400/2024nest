import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CategoryController } from './controllers/category.controller';
import { ArticleController } from './controllers/article.controller';
import { TagController } from './controllers/tag.controller';
@Module({
  imports:[
    JwtModule.register({
      global:true,
      signOptions:{expiresIn:'7d'}
    })
  ],
  controllers: [UserController, AuthController, CategoryController, ArticleController, TagController]
})
export class ApiModule {}
