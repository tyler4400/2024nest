import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import {IsString, IsOptional, IsBoolean, IsNumber, IsEmail, MinLength, MaxLength,} from 'class-validator';
import {StartsWith,IsUsernameUnique} from 'src/shared/validators/user-validator';
export class CreateUserDto {
    //规定所有的用户名必须以某个前缀开头 user_
    //@IsString()
    //@Validate(StartsWithConstraint)
    @StartsWith('user_')
    @IsUsernameUnique()
    username: string;

    @PasswordValidators()
    password: string;

    @MobileValidators()
    mobile: string;

    @EmailValidators()

    email: string;

    @StatusValidators()
    status: number;

    @IsSuperValidators()
    is_super: boolean;

    @SortValidators()
    sort: number;
}
export class UpdateUserDto extends CreateUserDto {
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
