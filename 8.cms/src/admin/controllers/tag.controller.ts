import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from 'src/shared/dto/tag.dto';
import { TagService } from 'src/shared/services/tag.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe';

@UseFilters(AdminExceptionFilter)
@Controller('admin/tags')
export class TagController {
    constructor(
        private readonly tagService: TagService
    ) { }

    @Get()
    @Render('tag/tag-list')
    async findAll(@Query('keyword') keyword: string = '',
        @Query('page', new ParseOptionalIntPipe(1)) page: number,
        @Query('limit', new ParseOptionalIntPipe(10)) limit: number) {
        const { tags, total } = await this.tagService.findAllWithPagination(page, limit, keyword);
        const pageCount = Math.ceil(total / limit);
        return { tags, keyword, page, limit, pageCount };
    }

    @Get('create')
    @Render('tag/tag-form')
    createForm() {
        return { tag: {} }
    }

    @Post()
    @Redirect('/admin/tags')
    async create(@Body() createTagDto: CreateTagDto) {
        await this.tagService.create(createTagDto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('tag/tag-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const tag = await this.tagService.findOne({ where: { id } });
        if (!tag) throw new HttpException('Tag not Found', 404);
        return { tag };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: UpdateTagDto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        await this.tagService.update(id, updateTagDto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/tags`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.tagService.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('tag/tag-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const tag = await this.tagService.findOne({ where: { id } });
        if (!tag) throw new HttpException('Tag not Found', 404);
        return { tag };
    }
}
