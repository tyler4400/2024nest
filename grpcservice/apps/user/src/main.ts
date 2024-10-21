import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { join } from 'path'
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,// 通信方式为gRPC
    options: {
      package: 'hello',//包名是hello
      protoPath: join(__dirname, 'hello.proto'),//proto文件的路径
      url: '0.0.0.0:50051'//监听的端口号
    }
  });
  await app.listen();
  console.log('微服务已经启动在50051端口');
}
bootstrap();
