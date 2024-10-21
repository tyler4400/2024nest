import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices'
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }
  //使用@GrpcMethod装饰器实现sayHello方法
  @GrpcMethod('Greeter', 'sayHello')
  sayHello(data: { name: string }) {
    return { message: `hello,${data.name}` }
  }
}
