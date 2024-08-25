import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/shared/dto/category.dto';
import { CategoryService } from 'src/shared/services/category.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
@UseFilters(AdminExceptionFilter)
@Controller('admin/categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    @Get()
    @Render('category/category-list')
    async findAll(){
        const categoryTree = await this.categoryService.findAll();
        return { categoryTree };
    }

    @Get('create')
    @Render('category/category-form')
    async createForm() {
        const categoryTree = await this.categoryService.findAll();
        return { category: {}, categoryTree };
    }

    @Post()
    @Redirect('/admin/categories')
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        await this.categoryService.create(createCategoryDto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('category/category-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const category = await this.categoryService.findOne({ where: { id }, relations: ['children', 'parent'] });
        if (!category) throw new HttpException('Category not Found', 404);
        const categoryTree = await this.categoryService.findAll();
        return { category ,categoryTree};
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        await this.categoryService.update(id, updateCategoryDto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/categories`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.categoryService.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('category/category-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const category = await this.categoryService.findOne({ where: { id } });
        if (!category) throw new HttpException('Category not Found', 404);
        return { category };
    }
}
