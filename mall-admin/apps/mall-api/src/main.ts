import { NestFactory } from '@nestjs/core';
import { MallApiModule } from './mall-api.module';

async function bootstrap() {
  const app = await NestFactory.create(MallApiModule);
  await app.listen(5000);
}
bootstrap();
