import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional,PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsString, IsOptional, IsBoolean, IsNumber, IsEmail, MinLength, MaxLength, Validate,} from 'class-validator';
import {StartsWith,IsUsernameUnique, StartsWithConstraint} from 'src/shared/validators/user-validator';
export class CreateUserDto {
    //规定所有的用户名必须以某个前缀开头 user_
    //@IsString()
    //@Validate(StartsWithConstraint)
    @StartsWith('user_')
    @IsUsernameUnique()
    @ApiProperty({description:'用户名',example:'nick'})
    username: string;

    @PasswordValidators()
    @ApiProperty({description:'密码',example:'666666'})
    password: string;

    @MobileValidators()
    @ApiProperty({description:'手机号',example:'15788888888'})
    @ApiPropertyOptional()
    mobile: string;

    @EmailValidators()
    @ApiProperty({description:'邮件',example:'nick@qq.com'})
    email: string;

    @StatusValidators()
    @ApiProperty({description:'状态',example:1})
    status: number;

    @IsSuperValidators()
    @ApiProperty({description:'是否超级管理员',example:true})
    is_super: boolean;

    @SortValidators()
    @ApiProperty({description:'排序号',example:100})
    sort: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({description:'用户ID',example:1})
    @IsOptional()
    @IsNumber()
    id: number;
}

function PasswordValidators() {
    return applyDecorators(IsString(), MinLength(6), MaxLength(8))
}
function EmailValidators() {
    return applyDecorators(IsEmail(), IsOptional())
}
function MobileValidators() {
    return applyDecorators(IsString(), IsOptional())
}
function StatusValidators() {
    return applyDecorators(IsNumber(), IsOptional(), Type(() => Number))
}
function IsSuperValidators() {
    return applyDecorators(IsBoolean(), IsOptional(), Type(() => Boolean))
}
function SortValidators() {
    return applyDecorators(IsNumber(), IsOptional(), Type(() => Number))
}
//这是一个同步的自定义校验类
