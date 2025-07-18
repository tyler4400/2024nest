import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn 
    ,ManyToMany,JoinTable
} from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { ArticleStateEnum } from '../enums/article.enum';
@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID', example: 1 })
    id: number;

    @Column({ length: 50 })
    @ApiProperty({ description: '标题', example: '标题' })
    title: string;


    @Column('text')
    @ApiProperty({ description: '内容', example: '文章内容' })
    content: string;

    @ManyToMany(()=>Category)
    @JoinTable()
    categories:Category[]

    @ManyToMany(()=>Tag)
    @JoinTable()
    tags:Tag[]

    @Column({ type:'enum',enum:ArticleStateEnum,default:'draft' })
    @ApiProperty({ description: '审核状态', example: '草稿' })
    state: ArticleStateEnum;

    @Column({ type:'text',nullable:true })
    @ApiProperty({ description: '审核不通过原因', example: '内容不合要求' })
    rejectionReason: string;

    @Column({ default: 1 })
    @ApiProperty({ description: '生效状态', example: 1 })
    status: number;

    @Column({ default: 100 })
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;

    @CreateDateColumn()
    @ApiProperty({ description: '创建时间', example: '2024年8月11日16:49:22' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '更新时间', example: '2024年8月11日16:49:22' })
    updatedAt: Date;
}
