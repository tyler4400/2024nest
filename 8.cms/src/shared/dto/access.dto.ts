import { ApiProperty, PartialType as PartialTypeFromSwagger } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IdValidators, StatusValidators, SortValidators } from '../decorators/dto.decorator';
export enum AccessType{
    MODULE='module',//模块 父菜单
    MENU='menu',//  菜单 子菜单
    FEATURE='feature'//功能 按钮 操作
}
export class CreateAccessDto {
    @IsString()
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @ApiProperty({ description: '类型', example: '菜单' })
    type: AccessType;

    @ApiProperty({ description: 'url地址', example: '/admin/accesses' })
    url: string;

    @ApiProperty({ description: '父权限ID', example: '1' })
    parentId: number;

    @ApiProperty({ description: '描述', example: '描述' })
    description: string;

    @StatusValidators()
    @ApiProperty({ description: '状态', example: 1 })
    status: number;

    @SortValidators()
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;
}

export class UpdateAccessDto extends PartialTypeFromSwagger(PartialType(CreateAccessDto)) {
    @IdValidators()
    id: number;
}

