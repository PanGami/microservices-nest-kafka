import { Module } from '@nestjs/common';
import { KafkaProducer } from '../kafka/kafka';

@Module({
  providers: [KafkaProducer],
  exports: [KafkaProducer],
})
export class KafkaModule {}
