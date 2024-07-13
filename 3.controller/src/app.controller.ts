import { 
   Controller, Get,Param,Query,Body,
   ParseIntPipe,
   ParseFloatPipe,
   ParseBoolPipe,
   ParseArrayPipe,
   ParseUUIDPipe,
   ParseEnumPipe,
   DefaultValuePipe
} from '@nestjs/common';
import { CustomPipe } from './custom.pipe';
enum Roles{
   Admin='Admin',
   VIP="VIP"
}
@Controller()
export class AppController {
   @Get("number/:id")
   getNumber(@Param('id',ParseIntPipe) id:number){
      return `The number is ${id}`
   }
   @Get("float/:value")
   getFloat(@Param('value',ParseFloatPipe) value:number){
      return `The float value is ${value}`
   }
   @Get("bool/:flag")
   getBool(@Param('flag',ParseBoolPipe) flag:boolean){
      return `The boolean value is ${flag}`
   }
   @Get("array/:values")
   getArray(@Param('values',new ParseArrayPipe({items:String,separator:'@'})) values:string[]){
      return `The arra values are ${values}`
   }
   @Get("uuid/:id")
   getUUID(@Param('id',ParseUUIDPipe) id:string){
      return `The UUID is  ${id}`
   }
   @Get("admin/:role")
   getRole(@Param('role',new ParseEnumPipe(Roles)) role:string){
      return `The role is  ${role}`
   }
   @Get("default")
   getDefault(@Query('username',new DefaultValuePipe("Guest")) username:string){
      return `The username is  ${username}`
   }
   @Get("custom/:value")
   getCustom(@Param('value',CustomPipe) value:string,age:number){
      return `value:  ${value}`
   }
}