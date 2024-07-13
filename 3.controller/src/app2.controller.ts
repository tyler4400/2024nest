import { Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
@Controller('app2')
export class App2Controller {
   constructor(private appService:AppService){

   }
   @Get()
   index(){
      return this.appService.getPrefix()+':app2';
   }
   
}