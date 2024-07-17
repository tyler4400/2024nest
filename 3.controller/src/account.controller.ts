import { Get ,Controller, UseGuards } from "@nestjs/common";
import {AuthGuard} from './auth.guard';
import {Roles} from './roles.decorator';
@Controller('accounts')
export class AccountController{
    @Get()
    @UseGuards(AuthGuard)
    @Roles('admin','superadmin')//此装饰器的作用是给当前的index函数添加了角色数组的元数据
    async index(){
        return `this aciton return all accounts`
    }
}