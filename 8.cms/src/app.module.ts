import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
//import chalk from 'chalk';
//const chalk= require('chalk')
//await import('chalk')
const {combine,timestamp,printf} = winston.format;
@Module({
  imports: [
    WinstonModule.forRoot({
      transports:[
        //[Nest] 14188  - 2024/08/18 11:05:16   ERROR [UserController] 这是Nest内置的日志记录器
        new winston.transports.Console({
          format:combine(
            timestamp({format:'YYYY-MM-DD hh:mm:ss'}),
            printf(({level,message,timestamp,context})=>{
              return `[Nest] ${(process as any).id}  - ${timestamp}   ${level} [${context}] ${message}`
           })
          )
        }),
        new winston.transports.File({
          filename:'error.log',
          level:'error'
        })
      ]
    }),
    LoggerModule,
    SharedModule,
    AdminModule, 
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
