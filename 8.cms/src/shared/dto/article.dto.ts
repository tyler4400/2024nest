import { ApiProperty, PartialType as PartialTypeFromSwagger } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength,IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IdValidators, StatusValidators, SortValidators } from '../decorators/dto.decorator';
import { Transform } from 'class-transformer';
import { ArticleStateEnum } from '../enums/article.enum';

export class CreateArticleDto {
    @IsString()
    @ApiProperty({ description: '标题', example: '文章标题' })
    @MaxLength(50,{message:'标题最多不能超过50个字'})
    title: string;

    @IsString()
    @ApiProperty({ description: '内容', example: '文章内容' })
    content: string;

    @Transform(({value})=>Array.isArray(value)?value.map(Number):value?[Number(value)]:[])
    @IsInt({each:true})
    @IsOptional()
    @ApiProperty({ description: '分类ID数组', example: '[1,2]' })
    categoryIds: number[];

    @IsOptional()
    @Transform(({value})=>Array.isArray(value)?value.map(Number):value?[Number(value)]:[])
    @IsInt({each:true})
    @ApiProperty({ description: '标签ID数组', example: '[3,4]' })
    tagIds: number[];

    @StatusValidators()
    @ApiProperty({ description: '状态', example: 1 })
    status: number;

    @ApiProperty({ description: '审核状态', example: 'draft' })
    @Transform(({value})=>ArticleStateEnum[value])
    @IsOptional()
    state?: ArticleStateEnum;

    
    @ApiProperty({ description: '审核不通过原因', example: '内容不合要求' })
    @IsOptional()
    @IsString()
    rejectionReason?: string;

    @SortValidators()
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;
}

export class UpdateArticleDto extends PartialTypeFromSwagger(PartialType(CreateArticleDto)) {
    @IdValidators()
    id?: number;
}
