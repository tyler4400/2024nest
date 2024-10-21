import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices'
async function bootstrap() {
  //创建一个TCP协议通信的微服务，监听 8877端口
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",//微服务监听的主机
      port: 8877//微服务监听的端口
    }
  });
  await app.listen();
}
bootstrap();
