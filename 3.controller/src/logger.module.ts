import { Module } from '@nestjs/common';
import { LoggerClassService, LoggerService, UseValueService, UseFactory } from './logger.service';
@Module({
    providers: [
        {
            provide: 'SUFFIX',//后缀
            useValue: 'suffix'
        },
        LoggerClassService,//这样定义provider的话，token值就是这个类本身，这种写法最多 90%以上用这个就可以了
        {
            provide: LoggerService,//Token
            useClass: LoggerService//说明提供的是一个类
        },
        {//也个也是一种定义provider的方法
            provide: 'StringToken',//这是一个token，也称为标志 ，或者说令牌，也就是provider的名字
            useValue: new UseValueService('prefix')//可以直接提供一个值 
        },
        {
            provide: 'FactoryToken',
            useFactory: () => new UseFactory()
        }
    ],
    exports: [
        'SUFFIX',
        LoggerClassService,
        LoggerService,
        'StringToken',
        'FactoryToken',
    ]
})
export class LoggerModule {

}