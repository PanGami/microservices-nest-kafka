import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'order',
      protoPath: join(__dirname, '../proto/order.proto'),
      url: '0.0.0.0:50051',
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'order-client',
        brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
      },
      producerOnlyMode: true,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3001);

  console.log(`HTTP server listening on port ${process.env.PORT || 3001}`);
  console.log('Microservices (gRPC & Kafka) started');
}
bootstrap();
