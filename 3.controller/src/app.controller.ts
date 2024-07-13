import { 
   Controller, Get,Param,
   ParseIntPipe
} from '@nestjs/common';
@Controller()
export class AppController {
   @Get("number/:id")
   getNumber(@Param('id',ParseIntPipe) id:number){
      return `The number is ${id}`
   }
}