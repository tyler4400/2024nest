import { Get ,Controller, UseGuards } from "@nestjs/common";
import {AuthGuard} from './auth.guard';
import {Auth2Guard} from './auth2.guard';
import {Roles} from './roles.decorator';
import {Roles2} from './roles2.decorator';
@Controller('accounts')
//@UseGuards(AuthGuard)
export class AccountController{
    @Get()
    //@UseGuards(AuthGuard)
    //@UseGuards(Auth2Guard)
    @Roles('admin','super')   //roles ['admin','super']
    //@Roles2(['admin','super'])// Roles2 ['admin','super']
    async index(){
        return `this aciton return all accounts`
    }
}