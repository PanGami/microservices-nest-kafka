import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: { name: string; quantity: number }) {
    return this.orderService.create(body);
  }

  @GrpcMethod('OrderService', 'GetOrders')
  async getOrders(data: any) {
    return this.orderService.list(data);
  }

  @GrpcMethod('OrderService', 'GetOrderDetail')
  async getOrderDetail(data: { id: string }) {
    return this.orderService.detail(data.id);
  }
}
