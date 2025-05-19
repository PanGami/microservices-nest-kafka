import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: { itemId: string; quantity: number }) {
    return this.orderService.create(body);
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('itemId') itemId?: string,
    @Query('status') status?: string,
  ) {
    return this.orderService.getOrders({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      itemId,
      status,
    });
  }
}
