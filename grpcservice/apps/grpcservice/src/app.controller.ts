import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
interface HelloRequest {
  name: string;
}
interface HelloReply {
  message: string;
}
interface GreeterService {
  sayHello(data: HelloRequest): Observable<HelloReply>
}
@Controller()
export class AppController {
  private greeterService: GreeterService
  constructor(@Inject('USER_PACKAGE') private readonly userClient: ClientGrpc) { }
  onModuleInit() {//这是一个生命周期函数，会在模块初始化的执行
    this.greeterService = this.userClient.getService<GreeterService>('Greeter');
  }
  @Get('greet/:name')
  async greet(@Param('name') name: string) {
    const result = firstValueFrom(this.greeterService.sayHello({ name }));
    console.log('result', result);
    return result;
  }
}
