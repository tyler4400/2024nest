//npm i --save class-validator class-transformer
//用于在ts中执行对象验证的库，它通常用于验证传入的请求数据，以确保数据格式和内容符合预期

import {IsInt,validate, IsString} from 'class-validator';
import {plainToInstance,instanceToPlain} from 'class-transformer';
class CreateUserDto{
    @IsString()
    name:string;
    @IsInt()
    age:number
}
const user = new CreateUserDto();
user.name = 'Nick';
(user as any).age = '18';
validate(user).then(errors=>{
    if(errors.length>0){
        console.log(`Validation failed. errors: `,errors)
    }else{
        console.log(`Validation successed`)
    }
})