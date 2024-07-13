import {Inject} from '@nestjs/common';

export class AppService{
    constructor(
        @Inject('PREFIX') private readonly prefix:string
    ){

    }
    getPrefix(){
        return this.prefix
    }
}