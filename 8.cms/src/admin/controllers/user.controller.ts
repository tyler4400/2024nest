import { Controller,Get,Render,Post, Redirect,Body, UseFilters, HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/shared/dtos/user.dto';
import { UserService } from 'src/shared/services/user.service';
import {AdminExceptionFilter} from '../filters/admin-exception-filter';
@UseFilters(AdminExceptionFilter)
@Controller('admin/users')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Get()
    @Render('user/user-list')
    async findAll(){
        const users = await this.userService.findAll();
        return {users};
    }

    @Get('create')
    @Render('user/user-form')
    createForm(){
        return {user:{}}
    }

    @Post()
    @Redirect('/admin/users')
    async create(@Body() createUserDto:CreateUserDto){
        console.log(createUserDto)
        return {success:true}
    }
}
