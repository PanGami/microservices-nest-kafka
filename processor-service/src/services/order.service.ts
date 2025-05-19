import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderLog } from '../schemas/order.schema';

@Injectable()
export class OrderService {
  // Lets say that processor-service gonna have complex business logic
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectModel(OrderLog.name)
    private readonly logModel: Model<OrderLog>,
  ) {}

  async updateOrderStatusToDone(orderId: number): Promise<void> {
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) {
      await this.log(orderId, 'error', 'Order not found');
      return;
    }

    order.status = 'done';
    await this.orderRepo.save(order);
    await this.log(orderId, 'update', 'Order status updated to done');
  }

  async log(orderId: number, step: string, message: string): Promise<void> {
    await this.logModel.create({ orderId, step, message });
  }
}
