import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
export class UserVo{
    @ApiProperty({description:'用户ID',example:1})
    id:number

    @ApiProperty({description:'用户名',example:'nick'})
    username:string

    @ApiProperty({description:'手机号',example:'15788888888'})
    mobile:string

    @ApiProperty({description:'邮件',example:'nick@qq.com'})
    email:string

    @ApiProperty({description:'生效状态',example:1})
    status:number

    @ApiProperty({description:'是否超级管理员',example:true})
    is_super:boolean //是否是超级管理员

    @ApiProperty({description:'排序号',example:100})
    sort:number //排序编号

    @ApiProperty({description:'创建时间',example:'2024年8月11日16:49:22'})
    createdAt:Date

    @ApiProperty({description:'更新时间',example:'2024年8月11日16:49:22'})
    updatedAt:Date
}