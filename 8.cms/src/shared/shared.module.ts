import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './services/configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { IsUsernameUniqueConstraint } from './validators/user-validator';
import { UtilityService } from './services/utility.service';
import { Role } from "./entities/role.entity";
import { RoleService } from "./services/role.service";
import { Access } from "./entities/access.entity";
import { AccessService } from "./services/access.service";
import { Tag } from "./entities/tag.entity";
import { TagService } from "./services/tag.service";
import { Article } from "./entities/article.entity";
import { ArticleService } from "./services/article.service";
import { Category } from "./entities/category.entity";
import { CategoryService } from "./services/category.service";
import { CosService } from './services/cos.service';
import { NotificationService } from './services/notification.service';
import { MailService } from './services/mail.service';
import { WordExportService } from './services/word-export.service';
import {PptExportService} from './services/ppt-export.service';
import { ExcelExportService } from './services/excel-export.service';
import { SettingService } from './services/setting.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Setting,SettingSchema} from './schemas/setting.schema';
import { DashboardService } from './services/dashboard.service';
import { WeatherService } from './services/weather.service';
import { SystemService } from './services/system.service';
import { RedisService } from './services/redis.service';
import { PhoneService } from './services/phone.service';
@Global()
@Module({
    providers: [
        IsUsernameUniqueConstraint, ConfigurationService, UtilityService, 
        UserService, RoleService, AccessService, TagService, ArticleService, 
        CategoryService, CosService, NotificationService, MailService, 
        WordExportService,PptExportService,ExcelExportService, SettingService, 
        DashboardService, WeatherService, SystemService, RedisService, PhoneService],
    exports: [IsUsernameUniqueConstraint, ConfigurationService, UtilityService, 
        UserService, RoleService, AccessService, TagService, ArticleService, 
        CategoryService,CosService, NotificationService, MailService,
        WordExportService,PptExportService,ExcelExportService,SettingService,DashboardService,
        WeatherService,SystemService,RedisService,PhoneService],
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            inject:[ConfigurationService],
            useFactory:(configurationService:ConfigurationService)=>({
                uri:configurationService.mongodbConfig.uri
            })
        }),
        MongooseModule.forFeature([
            {name:Setting.name,schema:SettingSchema}//注册操作数据库模型的名称和对应的schema
        ]),
        TypeOrmModule.forRootAsync({
            inject: [ConfigurationService],
            useFactory: (configurationService: ConfigurationService) => ({
                type: 'mysql', //连接数据库的类型
                ...configurationService.mysqlConfig,
                autoLoadEntities: true, //自动加载所有的实体
                synchronize: true, //保持代码和数据库的一致
                logging: false, //打印内部真正SQL语句
            })
        }),
        TypeOrmModule.forFeature([User, Role, Access, Tag, Article, Category])
    ],
})
export class SharedModule {
}
