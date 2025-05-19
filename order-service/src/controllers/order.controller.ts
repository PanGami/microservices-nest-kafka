import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: { itemId: string; quantity: number }) {
    return this.orderService.create(body);
  }

  @GrpcMethod('OrderService', 'GetOrders')
  async getOrders(data: any) {
    return this.orderService.list(data);
  }
}
