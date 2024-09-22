import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ArticleService } from 'src/shared/services/article.service';

@Controller('api/articles')
export class ArticleController {
    constructor(
        private readonly articleService:ArticleService
    ){

    }

    @Get()
    async getArticles(
        @Query('categoryId') categoryId:string='',
        @Query('tagId') tagId:string='',
        @Query('keyword') keyword:string=''
    ){
       const articles =  await this.articleService.findAllList(categoryId,tagId,keyword);
       return {
        articles,
        categoryId
       }
    }

    @Get(':id')
    async getArticleById(@Param('id') id:number){
        const article = await this.articleService.findOne({where:{id},relations:['categories', 'tags']});
        if(!article){
            throw new NotFoundException('文章不存在')
        }
        return article;
    }
}
