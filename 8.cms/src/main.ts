import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from 'path';
import {engine} from 'express-handlebars';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { I18nValidationPipe,I18nValidationExceptionFilter } from 'nestjs-i18n';
import { useContainer } from 'class-validator';
import * as helpers from 'src/shared/helpers'
import RedisStore from 'connect-redis';
import { RedisService } from './shared/services/redis.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //作用就是可以让自定义校验器可以支持依赖注入
  useContainer(app.select(AppModule),{fallbackOnErrors:true});
  //配置静态文件根目录
  app.useStaticAssets(join(__dirname,'..','public'));
  app.useStaticAssets(join(__dirname,'..','front'));
  //app.useStaticAssets(join(__dirname,'..','uploads'));
  //配置模板文件的根目录
  app.setBaseViewsDir(join(__dirname,'..','views'));
  //配置handlebars模板引擎
  app.engine('hbs',engine({
    extname:'.hbs',
    helpers,
    runtimeOptions:{
      allowProtoMethodsByDefault:true,//允许访问原型上的方法
      allowProtoPropertiesByDefault:true//允许访问原型上的属性
    }
  }));
  //设置渲染模板的引擎为hbs
  app.set('view engine','hbs');
  app.use(cookieParser());
  const redisService = app.get(RedisService);
  const redisClient = redisService.getClient();
  app.use(session({
    store:new RedisStore({client:redisClient}),
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }));
  //app.useGlobalPipes(new ValidationPipe({transform:true}));
  app.useGlobalPipes(new I18nValidationPipe({transform:true}));
  app.useGlobalFilters(new I18nValidationExceptionFilter({detailedErrors:true}));
  //创建一个新的DocumentBuild实例，用于配置swagger文档
  const config = new DocumentBuilder()
  .setTitle('CMS API')
  .setDescription('CMS API 描述')
  .setVersion("1.0")
  .addTag('CMS')
  .addCookieAuth('connect.sid')//添加cookie认证方式，cookie的名称为connect.sid
  .addBearerAuth({//添加Bearer认证方式 在请求头里添加 Authorization: Bearer xxx
    type:'http',
    scheme:'bearer'
  })
  .build();
  //使用配置对象创建Swagger文档 
  const document = SwaggerModule.createDocument(app,config);
  //设置Swagger模块的路径和文档对象，将SwaggerUI绑定到api-doc路径
  SwaggerModule.setup('api-doc',app,document);
  await app.listen(3000);
}
bootstrap();
