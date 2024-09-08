import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { ArticleService } from './article.service';
import { CategoryService } from './category.service';
import { TagService } from './tag.service';

@Injectable()
export class DashboardService {
    constructor(
        private readonly userService:UserService,
        private readonly articleService:ArticleService,
        private readonly categoryService:CategoryService,
        private readonly tagService:TagService,
    ){

    }
    async getDashboardData(){
        const [
            userCount,articleCount,categoryCount,tagCount,
            latestUsers,latestArticles,latestCategories,latestTags,
            usersTrend,articlesTrend,categoriesTrend,tagsTrend,
        ] = await Promise.all([
            this.userService.count(),
            this.articleService.count(),
            this.categoryService.count(),
            this.tagService.count(),
            this.userService.findLatest(5),
            this.articleService.findLatest(5),
            this.categoryService.findLatest(5),
            this.tagService.findLatest(5),
            this.articleService.getTrend('article'),
            this.userService.getTrend('user'),
            this.categoryService.getTrend('category'),
            this.tagService.getTrend('tag')
        ]);
        return {
            userCount,articleCount,categoryCount,tagCount,
            latestUsers,latestArticles,latestCategories,latestTags,
            usersTrend,articlesTrend,categoriesTrend,tagsTrend,
        }
    }
}
