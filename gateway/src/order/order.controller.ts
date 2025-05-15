import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: any) {
    return this.orderService.createOrder(body);
  }

  @Get('/stock/:itemId')
  async checkStock(@Param('itemId') itemId: string) {
    return this.orderService.checkStock({ itemId });
  }
}
