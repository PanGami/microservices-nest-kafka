import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like} from 'typeorm';
import { Order } from '../entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KafkaProducer } from '../kafka/kafka';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,
    @InjectModel('OrderLog') private logModel: Model<any>,
    private KafkaProducer: KafkaProducer,
  ) {}

  async create(data: { itemId: string; quantity: number }) {
    const order = this.repo.create({
      itemId: data.itemId,
      quantity: data.quantity,
      status: 'on_process',
    });

    const saved = await this.repo.save(order);

    console.log('Sending order_created event to Kafka:', saved);
    await this.KafkaProducer.emit('order_created', saved);

    // Log to MongoDB
    await this.logModel.create({
      event: 'CREATE_ORDER',
      orderId: saved.id,
      status: saved.status,
      timestamp: new Date(),
    });

    return saved;
  }

  async list(data: any) {
    const { page = 1, limit = 10, itemId, status } = data;

    const where: any = {};
    if (itemId) where.itemId = Like(`%${itemId}%`);
    if (status) where.status = status;

    const [orders, total] = await this.repo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      orders,
      total,
      page,
      limit,
    };
  }
}
