import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Order } from '../entities/order.entity';

@Controller()
export class GrpcOrderController {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  @GrpcMethod('OrderService', 'GetOrders')
  async getOrders(data: any) {
    const { page = 1, limit = 10, itemId, status } = data;

    const where: any = {};
    if (itemId) where.itemId = Like(`%${itemId}%`);
    if (status) where.status = status;

    const [orders, total] = await this.orderRepo.findAndCount({
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
