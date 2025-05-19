import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private producer: Producer;

  async onModuleInit() {
    const kafka = new Kafka({
      brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
      retry: {
        retries: 5,
        initialRetryTime: 300,
      },
    });

    this.producer = kafka.producer();

    let retries = 5;
    while (retries > 0) {
      try {
        await this.producer.connect();
        console.log('Kafka Producer connected');
        break;
      } catch (err) {
        retries--;
        console.warn(`Kafka connect failed. Retrying... (${5 - retries}/5)`);
        await new Promise((res) => setTimeout(res, 2000));
      }
    }
  }

  async emit(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
