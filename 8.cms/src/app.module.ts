import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';
import {AcceptLanguageResolver,QueryResolver,I18nModule,} from 'nestjs-i18n';
import * as  path from 'path';
import methodOverride from 'src/shared/middlewares/method-override'
import {ServeStaticModule} from '@nestjs/serve-static';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:path.join(__dirname,'..','uploads'),//根态文件根目录
      serveRoot:'/uploads'//访问此静态文件的时候添加的前缀
    }),
    I18nModule.forRoot({
      fallbackLanguage:'en',
      loaderOptions:{
        path:path.join(__dirname,'/i18n/'),
        watch:true
      },
      resolvers: [
        new QueryResolver(["lang", "l"]), 
        AcceptLanguageResolver,
      ]
    }),
    SharedModule,
    AdminModule, 
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(methodOverride).forRoutes('*');
  }
  
}
