import {Injectable} from '@nestjs/common';
@Injectable()
export class CommonService {
    log(message){
        console.log('CommonService',message)
    }
}