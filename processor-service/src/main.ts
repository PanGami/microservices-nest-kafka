import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'processor-client',
        brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
      },
      consumer: {
        groupId: 'processor-consumer',
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  });

  await app.listen();
  console.log('Processor service is listening for Kafka messages...');
}
bootstrap();