import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { CreateAccessDto, UpdateAccessDto } from 'src/shared/dto/access.dto';
import { AccessService } from 'src/shared/services/access.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
@UseFilters(AdminExceptionFilter)
@Controller('admin/accesses')
export class AccessController {
    constructor(
        private readonly accessService: AccessService
    ) { }

    @Get()
    @Render('access/access-list')
    async findAll() {
       const accessTree = await this.accessService.findAll();
       return {accessTree};
    }

    @Get('create')
    @Render('access/access-form')
    async createForm() {
        const accessTree = await this.accessService.findAll();
        return { access: {} ,accessTree}
    }

    @Post()
    @Redirect('/admin/accesses')
    async create(@Body() createAccessDto: CreateAccessDto) {
        await this.accessService.create(createAccessDto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('access/access-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const access = await this.accessService.findOne({ where: { id },relations:['parent','children'] });
        if (!access) throw new HttpException('Access not Found', 404);
        const accessTree = await this.accessService.findAll();
        return { access,accessTree };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateAccessDto: UpdateAccessDto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        await this.accessService.update(id, updateAccessDto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/accesses`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.accessService.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('access/access-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const access = await this.accessService.findOne({ where: { id } });
        if (!access) throw new HttpException('Access not Found', 404);
        return { access };
    }
}
