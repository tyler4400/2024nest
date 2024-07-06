import {Inject} from '@nestjs/common';
import {Config} from './dynamicConfig.module';

export class AppService{
    constructor(
        @Inject('PREFIX') private readonly prefix:string,
        @Inject('CONFIG') private readonly config:Config
    ){

    }
    getConfig(){
        return this.prefix+this.config.apiKey;

    }
}