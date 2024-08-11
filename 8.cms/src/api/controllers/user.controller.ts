import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {CreateUserDto,UpdateUserDto} from 'src/shared/dtos/user.dto';
import { UserService } from 'src/shared/services/user.service';
@Controller('api/users')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Get(":id")
    async findOne(@Param("id",ParseIntPipe) id:number){
       return this.userService.findOne({where:{id}});
    }
    @Post()
    async create(@Body() createUserDto:CreateUserDto){
        console.log('createUserDto',createUserDto)
        return this.userService.create(createUserDto);
    }
    @Put(":id")
    async update(@Param("id",ParseIntPipe) id:number,@Body() updateUserDto:UpdateUserDto){
       const result = await  this.userService.update(id,updateUserDto);
       if(result.affected){
        return {success:true,message:'更新用户成功'}
       }else{
        throw new HttpException('用户未找到',HttpStatus.NOT_FOUND)
       }
    }
    @Delete(":id")
    async delete(@Param("id",ParseIntPipe) id:number){
        const result = await  this.userService.delete(id);
        if(result.affected){
         return {success:true,message:'删除用户成功'}
        }else{
         throw new HttpException('用户未找到',HttpStatus.NOT_FOUND)
        }
    }
}
