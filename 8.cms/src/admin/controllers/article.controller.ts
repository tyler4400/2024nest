import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query, NotFoundException, StreamableFile, Header } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from 'src/shared/dto/article.dto';
import { ArticleService } from 'src/shared/services/article.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe';
import { CategoryService } from 'src/shared/services/category.service';
import { TagService } from 'src/shared/services/tag.service';
import { ArticleStateEnum } from 'src/shared/enums/article.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WordExportService } from 'src/shared/services/word-export.service';
import { PptExportService } from 'src/shared/services/ppt-export.service';
import { ExcelExportService } from 'src/shared/services/excel-export.service';
@UseFilters(AdminExceptionFilter)
@Controller('admin/articles')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly categoryService: CategoryService,
        private readonly tagService: TagService,
        private readonly eventEmitter:EventEmitter2,
        private readonly wordExportService:WordExportService,
        private readonly pptExportService:PptExportService,
        private readonly excelExportService:ExcelExportService
    ) { }
    @Get('export-excel')//导出PPT
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    async exportExcel(@Query('search') search:string='',@Query('page',new ParseOptionalIntPipe(1)) page:number
    ,@Query('limit',new ParseOptionalIntPipe(10)) limit:number,@Res({passthrough:true}) res:Response ){
        const { articles } = await this.articleService.findAllWithPagination(page, limit, search);
        const data = articles.map(article=>( {
            title:article.title,
            content:article.content,
            categories:article.categories.map(item=>item.name).join(','),
            tags:article.tags.map(item=>item.name).join(','),
            state:article.state,
            createdAt:article.createdAt,
        }));
        const columns = [
            {header:'标题',key:'title',width:30},
            {header:'内容',key:'content',width:30},
            {header:'分类',key:'categories',width:30},
            {header:'标签',key:'tags',width:30},
            {header:'审核状态',key:'state',width:30},
            {header:'创建时间',key:'createdAt',width:30},
        ]
        const buffer = await this.excelExportService.exportAsExcel(data,columns);
        res.setHeader('Content-Disposition', `attachment; filename="articles-${page}.xlsx"`);
        return new StreamableFile(new Uint8Array(buffer));
    }
    @Get('export-ppt')//导出PPT
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    async exportPpt(@Query('search') search:string='',@Query('page',new ParseOptionalIntPipe(1)) page:number
    ,@Query('limit',new ParseOptionalIntPipe(10)) limit:number,@Res({passthrough:true}) res:Response ){
        const { articles } = await this.articleService.findAllWithPagination(page, limit, search);
        const buffer = await this.pptExportService.exportToPpt(articles);
        res.setHeader('Content-Disposition', `attachment; filename="articles-${page}.pptx"`);
        return new StreamableFile(buffer);
    }
    @Get(':id/export-word')//导出Word
    @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    async exportWord(@Param('id',ParseIntPipe) id:number,@Res({passthrough:true}) res:Response){
        const article = await this.articleService.findOne({ where: { id } ,relations:['categories','tags']});
        if (!article) throw new NotFoundException('Article not Found');
        const htmlContent = `
            <h1>${article.title}</h1>
            <p><strong>状态</strong> ${article.state}</p>
            <p><strong>分类</strong> ${article.categories.map(item=>item.name).join(',')}</p>
            <p><strong>标题</strong> ${article.tags.map(item=>item.name).join(',')}</p>
            <div>${article.content}</div>
        `;
        const buffer = await this.wordExportService.exportToWord(htmlContent);
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(article.title)}.docx"`);
        return new StreamableFile(buffer);
    }
    @Put(':id/submit')//提交审核
    async submitForReview(@Param('id',ParseIntPipe) id:number){
        await this.articleService.update(id,{state:ArticleStateEnum.PENDING});
        this.eventEmitter.emit('article.submitted',{articleId:id});
        return {success:true}
    }
    @Put(':id/approve')//审核通过
    async approveArtice(@Param('id',ParseIntPipe) id:number){
        await this.articleService.update(id,{state:ArticleStateEnum.PUBLISHED,rejectionReason:null});
        return {success:true}
    }
    @Put(':id/reject')//审核不通过
    async rejectArticle(@Param('id',ParseIntPipe) id:number,@Body('rejectionReason') rejectionReason:string){
        await this.articleService.update(id,{state:ArticleStateEnum.REJECTED,rejectionReason});
        return {success:true}
    }
    @Put(':id/withdraw')//撤回已经发布的文章
    async withdrawArticle(@Param('id',ParseIntPipe) id:number){
        await this.articleService.update(id,{state:ArticleStateEnum.WITHDRAWN});
        return {success:true}
    }
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
    async createForm() {
        const categoryTree = await this.categoryService.findAll();
        const tags = await this.tagService.findAll();
        return { article: {tags:[],categories:[]},categoryTree,tags }
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
        const article = await this.articleService.findOne({ where: { id } ,relations:['categories','tags']});
        if (!article) throw new HttpException('Article not Found', 404);
        const categoryTree = await this.categoryService.findAll();
        const tags = await this.tagService.findAll();
        return { article,categoryTree,tags };
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
        const article = await this.articleService.findOne({ where: { id },relations:['categories','tags'] });
        if (!article) throw new HttpException('Article not Found', 404);
        return { article };
    }
}
