import { Controller, Get, Post, Put, Delete, Body, Param, Query, Res, Render, Redirect, UseFilters, Headers, ParseIntPipe } from '@nestjs/common';
import { RoleService } from 'src/shared/services/role.service';
import { CreateRoleDto, UpdateRoleDto } from 'src/shared/dto/role.dto';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe';

@UseFilters(AdminExceptionFilter)
@Controller('admin/roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    @Render('role/role-list')
    async findAll(@Query('search') search: string = '', @Query('page', new ParseOptionalIntPipe(1)) page: number, @Query('limit', new ParseOptionalIntPipe(10)) limit: number) {
        const { roles, total } = await this.roleService.findAllWithPagination(page, limit, search);
        const pageCount = Math.ceil(total / limit);
        return { roles, search, page, limit, pageCount };
    }

    @Get('create')
    @Render('role/role-form')
    createForm() {
        return { role: {} };
    }

    @Post()
    @Redirect('/admin/roles')
    async create(@Body() createRoleDto: CreateRoleDto) {
        await this.roleService.create(createRoleDto);
        return { success: true };
    }

    @Get(':id/edit')
    @Render('role/role-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const role = await this.roleService.findOne({ where: { id } });
        if (!role) throw new Error('Role not found');
        return { role };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto, @Res() res: Response, @Headers('accept') accept: string) {
        await this.roleService.update(id, updateRoleDto);
        if (accept === 'application/json') {
            return res.json({ success: true });
        } else {
            return res.redirect('/admin/roles');
        }
    }

    @Get(':id')
    @Render('role/role-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const role = await this.roleService.findOne({ where: { id } });
        if (!role) throw new Error('Role not found');
        return { role };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.roleService.delete(id);
        return { success: true };
    }
}
