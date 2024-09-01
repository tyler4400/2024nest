import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "../entities/article.entity";
import { Repository, Like,In ,UpdateResult} from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";
import { CreateArticleDto, UpdateArticleDto } from "../dto/article.dto";
import { Category } from "../entities/category.entity";
import { Tag } from "../entities/tag.entity";
import { ArticleStateEnum } from "../enums/article.enum";

@Injectable()
export class ArticleService extends MySQLBaseService<Article> {
  constructor(
    @InjectRepository(Article) protected repository: Repository<Article>,
    @InjectRepository(Category) protected categoryRepository: Repository<Category>,
    @InjectRepository(Tag) protected tagRepository: Repository<Tag>,
  ) {
    super(repository);
  }

  async findAll(keyword?: string) {
    const where = keyword ? [
      { title: Like(`%${keyword}%`) },
      { content: Like(`%${keyword}%`) }
    ] : {};
    return this.repository.find({ where,relations:['categories','tags'], });
  }

  async findAllWithPagination(page: number, limit: number, keyword?: string) {
    const where = keyword ? [
      { title: Like(`%${keyword}%`) },
      { content: Like(`%${keyword}%`) }
    ] : {};
    const [articles, total] = await this.repository.findAndCount({
      where,
      relations:['categories','tags'],
      skip: (page - 1) * limit,
      take: limit
    });
    return { articles, total };
  }
  async create(createArticleDto:CreateArticleDto){
    createArticleDto.state = ArticleStateEnum.DRAFT;
    const {categoryIds,tagIds,...articleDto} = createArticleDto;
    const article = this.repository.create(articleDto);
    if(categoryIds){
      article.categories = await this.categoryRepository.findBy({id:In(categoryIds)})
    }
    if(tagIds){
      article.tags = await this.tagRepository.findBy({id:In(tagIds)})
    }
    return await this.repository.save(article);
  }
  async update(id:number,updateArticleDto:UpdateArticleDto){
    const {categoryIds,tagIds,...articleDto} = updateArticleDto;
    const article = await this.repository.findOne({where:{id}, relations:['categories','tags']});
    if(article.state === ArticleStateEnum.REJECTED||article.state === ArticleStateEnum.WITHDRAWN){
      article.state = ArticleStateEnum.DRAFT;
    }
    if (!article) throw new NotFoundException('Article not Found');
    Object.assign(article,articleDto);
    if(categoryIds){
      article.categories = await this.categoryRepository.findBy({id:In(categoryIds)})
    }
    if(tagIds){
      article.tags = await this.tagRepository.findBy({id:In(tagIds)})
    }
    await this.repository.save(article);
    return UpdateResult.from({affected:1,records:[],raw:[]});
  }
}
