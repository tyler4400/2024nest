import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  I18nModule,
} from 'nestjs-i18n';
import * as  path from 'path';
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage:'en',//默认语言
      loaderOptions:{
        path:path.join(__dirname,'/i18n/'),
        watch:true
      },
      resolvers: [
        new QueryResolver(["lang", "l"]),//url传递查询 字符串  /app?lang=zh  /app?l=zh 
        AcceptLanguageResolver,//headers:{"accept-language":'zh'},
       
        new HeaderResolver(["x-custom-lang"]),// headers:{"x-custom-lang":'zh'}
        new CookieResolver(),//cookie: x-custom-lang=zh
        
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
