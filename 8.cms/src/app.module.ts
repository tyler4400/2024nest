import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';
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
export class AppModule {}
