import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Kafka } from 'kafkajs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  private kafka = new Kafka({ 
    brokers: [process.env.KAFKA_BROKER ?? 'kafka:9092'],
    retry: {
      retries: 5,
      initialRetryTime: 300,
    },
  });
  private producer = this.kafka.producer();

  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    @InjectModel('OrderLog') private logModel: Model<any>,
  ) {}

  async onModuleInit() {    
    await this.producer.connect();
    console.log('Kafka Producer connected');
  }

  async create(data: { itemId: string; quantity: number }) {
    const order = this.repo.create({
      itemId: data.itemId,
      quantity: data.quantity,
      status: 'on_process',
    });

    const saved = await this.repo.save(order);

    console.log('Sending order_created event to Kafka:', saved);
    await this.producer.send({
      topic: 'order_created',
      messages: [{ value: JSON.stringify(saved) }],
    });
    
    console.log('Order created and event sent to Kafka:', saved);

    // Log to MongoDB
    await this.logModel.create({
      event: 'CREATE_ORDER',
      orderId: saved.id,
      status: saved.status,
      timestamp: new Date(),
    });

    return saved;
  }
}
