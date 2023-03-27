import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { BusinessModule } from './business.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BusinessModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
