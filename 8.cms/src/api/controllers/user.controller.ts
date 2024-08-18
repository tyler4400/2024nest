import { applyDecorators, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Inject, LoggerService, Param, ParseIntPipe, Post, Put, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/user.dto';
import { User } from 'src/shared/entities/user.entity';
import { UserService } from 'src/shared/services/user.service';
import { Result } from 'src/shared/vo/result';
import {Logger} from '@nestjs/common';
@Controller('api/users')
@SerializeOptions({
    strategy:'exposeAll'
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('api/users')
export class UserController {
    private readonly logger = new Logger(UserController.name);//ConsoleLogger
    
    constructor(
        private readonly userService: UserService,
    ) { }
    @Get()
    @ApiFindAll()
    async findAll() {
        //[Nest] 13888  - 2024/08/18 10:42:31   ERROR [UserController] 这是Nest内置的日志记录器
        //[Nest] 进程号  - 时间戳               日志级别 Context Message
        this.logger.error('ConsoleLogger 日志');
        return this.userService.findAll();
    }
    @Get(":id")
    @ApiFindOne()
    async findOne(@Param("id", ParseIntPipe) id: number) {
        const result = await this.userService.findOne({ where: { id } });
        console.log('findOne',result)
        if (result) {
            return result;
        } else {
            throw new HttpException('用户未找到', HttpStatus.NOT_FOUND)
        }
    }
    @Post()
    @ApiCreate()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @Put(":id")
    @ApiUpdate()
    async update(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const result = await this.userService.update(id, updateUserDto);
        if (result.affected) {
            return Result.success('更新用户成功');
        } else {
            throw new HttpException('用户未找到', HttpStatus.NOT_FOUND)
        }
    }
    @Delete(":id")
     @ApiDelete()
    async delete(@Param("id", ParseIntPipe) id: number) {
        const result = await this.userService.delete(id);
        if (result.affected) {
            return Result.success('删除用户成功');
        } else {
            throw new HttpException('用户未找到', HttpStatus.NOT_FOUND)
        }
    }
}
function ApiFindAll() {
    return applyDecorators(
        ApiOperation({ summary: '获取所有的用户列表' }),
        ApiResponse({ status: 200, description: '成功返回用户列表', type: [User] })
    );
}
function ApiFindOne() {
    return applyDecorators(ApiOperation({ summary: '根据ID获取某个用户信息' }),
    ApiParam({ name: 'id', description: '用户ID', type: Number }),
    ApiResponse({ status: 200, description: '成功返回用户信息', type: User }),
    ApiResponse({ status: 404, description: '用户未找到' }))
}
function ApiCreate() {
    return applyDecorators(
        ApiOperation({ summary: '创建新用户' }),
        ApiBearerAuth(),
        ApiBody({ type: CreateUserDto }),
        ApiResponse({ status: 201, description: '用户创建成功', type: User }),
        ApiResponse({ status: 400, description: '请求参数错误' })
    );
}
function ApiUpdate() {
    return applyDecorators(
        ApiOperation({ summary: '更新用户信息' }),
        ApiBody({ type: UpdateUserDto }),
        ApiResponse({ status: 200, description: '用户信息更新成功', type: Result }),
        ApiResponse({ status: 400, description: '请求参数错误' }),
        ApiResponse({ status: 404, description: '用户未找到' })
    );
}
function ApiDelete() {
    return applyDecorators(
        ApiOperation({ summary: '根据ID删除用户' }),
        ApiParam({ name: 'id', description: '用户ID', type: Number }),
        ApiResponse({ status: 200, description: '用户删除成功', type: Result }),
        ApiResponse({ status: 404, description: '用户未找到' })
    );
}