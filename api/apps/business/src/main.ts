import { NestFactory } from '@nestjs/core';
import { BusinessModule } from './business.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BusinessModule);
  await app.listen();
}
bootstrap();
