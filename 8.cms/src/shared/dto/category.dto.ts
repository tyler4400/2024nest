import { ApiProperty, PartialType as PartialTypeFromSwagger } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IdValidators, StatusValidators, SortValidators } from '../decorators/dto.decorator';

export class CreateCategoryDto {
    @IsString()
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;
    
    @ApiProperty({ description: '父权限ID', example: '1' })
    parentId?: number;

    @StatusValidators()
    @ApiProperty({ description: '状态', example: 1 })
    status: number;

    @SortValidators()
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;
}

export class UpdateCategoryDto extends PartialTypeFromSwagger(PartialType(CreateCategoryDto)) {
    @IdValidators()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '用户名', example: 'nick' })
    username: string;

    @ApiProperty({ description: '密码', example: '666666' })
    @IsOptional()
    password: string;
}
