import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from 'src/shared/dto/article.dto';
import { ArticleService } from 'src/shared/services/article.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe';

@UseFilters(AdminExceptionFilter)
@Controller('admin/articles')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ) { }

    @Get()
    @Render('article/article-list')
    async findAll(@Query('keyword') keyword: string = '',
        @Query('page', new ParseOptionalIntPipe(1)) page: number,
        @Query('limit', new ParseOptionalIntPipe(10)) limit: number) {
        const { articles, total } = await this.articleService.findAllWithPagination(page, limit, keyword);
        const pageCount = Math.ceil(total / limit);
        return { articles, keyword, page, limit, pageCount };
    }

    @Get('create')
    @Render('article/article-form')
    createForm() {
        return { article: {} }
    }

    @Post()
    @Redirect('/admin/articles')
    async create(@Body() createArticleDto: CreateArticleDto) {
        await this.articleService.create(createArticleDto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('article/article-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const article = await this.articleService.findOne({ where: { id } });
        if (!article) throw new HttpException('Article not Found', 404);
        return { article };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        await this.articleService.update(id, updateArticleDto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/articles`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.articleService.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('article/article-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const article = await this.articleService.findOne({ where: { id } });
        if (!article) throw new HttpException('Article not Found', 404);
        return { article };
    }
}
