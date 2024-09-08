import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto,UpdateUserRolesDto } from 'src/shared/dto/user.dto';
import { UserService } from 'src/shared/services/user.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { UtilityService } from 'src/shared/services/utility.service';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe'
import {RoleService} from 'src/shared/services/role.service'
@UseFilters(AdminExceptionFilter)
@Controller('admin/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly utilityService: UtilityService,
        private readonly roleService:RoleService,
    ) { }

    @Get()
    @Render('user/user-list')
    async findAll(@Query('keyword') keyword: string = '',
        @Query('page', new ParseOptionalIntPipe(1)) page: number,
        @Query('limit', new ParseOptionalIntPipe(10)) limit: number) {
        const { users, total } = await this.userService.findAllWithPagination(page, limit, keyword);
        const pageCount = Math.ceil(total / limit);
        const roles = await this.roleService.findAll();
        return { users, keyword, page, limit, pageCount,roles };
    }

    @Get('create')
    @Render('user/user-form')
    createForm() {
        return { user: {} }
    }

    @Post()
    @Redirect('/admin/users')
    async create(@Body() createUserDto: CreateUserDto) {
        if (createUserDto.password) {
            createUserDto.password = await this.utilityService.hashPassword(createUserDto.password);
        }
        await this.userService.create(createUserDto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('user/user-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findOne({ where: { id } });
        if (!user) throw new HttpException('User not Found', 404)
        return { user }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        if (updateUserDto.password) {
            updateUserDto.password = await this.utilityService.hashPassword(updateUserDto.password);
        } else {
            delete updateUserDto.password;
        }
        await this.userService.update(id, updateUserDto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect('/admin/users');
        }
    }


    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.userService.delete(id);
        return { success: true }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response, @Headers('accept') accept: string) {
        const user = await this.userService.findOne({ where: { id } ,relations:['roles']});
        if (!user) throw new HttpException('User not Found', 404);
        if(accept === 'application/json'){
            res.json({user});
        }else{
            res.render('user/user-detail',{user});
        }
    }

    @Put(':id/roles')
    async assignRoles(@Param('id', ParseIntPipe) id: number, @Body() updateUserRolesDto: UpdateUserRolesDto) {
        await this.userService.updateRoles(id, updateUserRolesDto);
        return { success: true };
    }
}
