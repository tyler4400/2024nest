import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices'
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  //监听模式为sum的消息
  //要想处理从其它服务发送的消息，我们使用MessagePattern装饰器来服务端的消息处理函数
  // @MessagePattern('sum')装饰器表示会监听sum事件，处理传入的数据，并返回处理后的结果
  @MessagePattern('sum')
  sum(data: number[]): number {
    return data.reduce((a, b) => a + b, 0)
  }

  //处理事件
  @EventPattern('user_created')
  handleUserCreated(data: any) {
    console.log(`User Created Event:`, data);
  }
}
