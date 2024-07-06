import {Injectable, NestMiddleware } from "@nestjs/common";
import {Reqeust,Response,NextFunction} from 'express';
import { AppService } from "./app.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    constructor(private appService:AppService){

    }
    use(req: Reqeust, res: Response, next: NextFunction) {
       console.log('LoggerMiddleware',this.appService.getConfig());
       next();
    } 
}