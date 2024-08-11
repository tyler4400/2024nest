import { Controller,Get,Render } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/shared/services/user.service';

@Controller('admin/users')
@ApiTags('admin/users')
export class UserController {
    constructor(private readonly userService:UserService){

    }
    @Get()
    @ApiCookieAuth()
    @ApiOperation({ summary: '获取所有的用户列表' })
    async findAll(){
        const users = await this.userService.findAll();
        return {users};
    }
}
