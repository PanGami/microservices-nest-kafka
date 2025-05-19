import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: { itemId: string; quantity: number }) {
    return this.orderService.create(body);
  }
}
