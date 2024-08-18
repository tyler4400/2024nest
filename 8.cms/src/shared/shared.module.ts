import { Module,Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {ConfigurationService} from './services/configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import { UserService } from './services/user.service';
import {IsUsernameUniqueConstraint} from './validators/user-validator'
@Global()
@Module({
    providers:[
        IsUsernameUniqueConstraint,
        ConfigurationService,
        UserService
    ],
    exports:[IsUsernameUniqueConstraint,ConfigurationService,UserService],
    imports:[
        ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRootAsync({
            inject:[ConfigurationService],
            useFactory:(configurationService:ConfigurationService)=>({
                type:'mysql',//连接数据库的类型
                ...configurationService.mysqlConfig,
                autoLoadEntities:true,//自动加载所有的实体
                synchronize:true,//保持代码和数据库的一致
                logging:false,//打印内部真正SQL语句
            })
        }),
        TypeOrmModule.forFeature([User])
    ],
})
export class SharedModule {}
