import { Controller,Get,Render } from '@nestjs/common';
import { UserService } from 'src/shared/services/user.service';

@Controller('admin/users')
export class UserController {
    constructor(private readonly userService:UserService){

    }
    @Get()
    async findAll(){
        const users = await this.userService.findAll();
        return {users};
    }
}
