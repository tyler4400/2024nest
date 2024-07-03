import {Injectable} from '@nestjs/common';
import {CommonService} from './common.service';
@Injectable()
export class OtherService {
    constructor(private commonService:CommonService){

    }
    log(message){
        this.commonService.log(message);
        console.log('OtherService',message)
    }
}