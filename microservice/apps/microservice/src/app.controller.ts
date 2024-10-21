import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
@Controller()
export class AppController {
  private client: ClientProxy
  constructor(private readonly appService: AppService) {
    //创建一个TCP的微服务客户端，连接到微服务器上
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",//微服务监听的主机
        port: 8877//微服务监听的端口
      }
    });
  }

  @Get('sum')
  async accumulate() {
    const result = await firstValueFrom(this.client.send('sum', [1, 2, 3]));
    console.log('result', result);
    //向服务器发送一个事件，事件名字叫user_created.参数是{ id: 1, name: 'zhangsan' }
    this.client.emit('user_created', { id: 1, name: 'zhangsan' });
    return result;
  }
}
