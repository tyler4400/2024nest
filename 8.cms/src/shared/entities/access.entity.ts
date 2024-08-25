import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
    Tree,TreeChildren,TreeParent } from 'typeorm';
import{AccessType} from '../dto/access.dto';
@Entity()
@Tree('materialized-path')
export class Access {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID', example: 1 })
    id: number;

    @Column({ length: 50, unique: true })
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @Column({type:'enum',enum: AccessType})
    @ApiProperty({ description: '类型', example: '菜单' })
    type:AccessType

    @Column({ length:200,nullable:true })
    @ApiProperty({ description: 'url地址', example: '/admin/users' })
    url: string;

    @Column({  length:200,nullable:true })
    @ApiProperty({ description: '描述', example: '描述' })
    description: string;

    @TreeChildren()
    children: Access[];//当前权限的子权限

    @TreeParent()
    parent: Access;//当前权限的父权限

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
