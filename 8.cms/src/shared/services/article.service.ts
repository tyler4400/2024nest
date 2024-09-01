import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "../entities/article.entity";
import { Repository, Like,In } from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";
import { CreateArticleDto } from "../dto/article.dto";
import { Category } from "../entities/category.entity";
import { Tag } from "../entities/tag.entity";

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
    const {categoryIds,tagIds,...articleDto} = createArticleDto;
    const article = this.repository.create(articleDto);
    article.categories = await this.categoryRepository.findBy({id:In(categoryIds)})
    article.tags = await this.tagRepository.findBy({id:In(tagIds)})
    return await this.repository.save(article);
  }
}
