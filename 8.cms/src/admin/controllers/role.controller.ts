import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from 'src/shared/dto/role.dto';
import { RoleService } from 'src/shared/services/role.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe';

@UseFilters(AdminExceptionFilter)
@Controller('admin/roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Get()
    @Render('role/role-list')
    async findAll(@Query('keyword') keyword: string = '',
        @Query('page', new ParseOptionalIntPipe(1)) page: number,
        @Query('limit', new ParseOptionalIntPipe(10)) limit: number) {
        const { roles, total } = await this.roleService.findAllWithPagination(page, limit, keyword);
        const pageCount = Math.ceil(total / limit);
        return { roles, keyword, page, limit, pageCount };
    }

    @Get('create')
    @Render('role/role-form')
    createForm() {
        return { role: {} }
    }

    @Post()
    @Redirect('/admin/roles')
    async create(@Body() createRoleDto: CreateRoleDto) {
        await this.roleService.create(createRoleDto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('role/role-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const role = await this.roleService.findOne({ where: { id } });
        if (!role) throw new HttpException('Role not Found', 404);
        return { role };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        await this.roleService.update(id, updateRoleDto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/roles`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.roleService.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('role/role-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const role = await this.roleService.findOne({ where: { id } });
        if (!role) throw new HttpException('Role not Found', 404);
        return { role };
    }
}
