import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Kafka } from 'kafkajs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  private kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER ?? 'kafka:9092'] });
  private producer = this.kafka.producer();

  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    @InjectModel('OrderLog') private logModel: Model<any>,
  ) {
    this.connectKafka();
  }

  async connectKafka() {
    await this.producer.connect();
  }

  async create(data: { itemId: string; quantity: number }) {
    const order = this.repo.create({
      itemId: data.itemId,
      quantity: data.quantity,
      status: 'on_process',
    });

    const saved = await this.repo.save(order);

    // Send event to Kafka
    await this.producer.send({
      topic: 'order_created',
      messages: [{ value: JSON.stringify(saved) }],
    });

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
