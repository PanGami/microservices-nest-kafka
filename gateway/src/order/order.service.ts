import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

interface OrderServiceGrpc {
  GetOrders(data: {
    page?: number;
    limit?: number;
    itemId?: string;
    status?: string;
  }): any;
}

@Injectable()
export class OrderService implements OnModuleInit {
  private orderServiceGrpc: OrderServiceGrpc;

  constructor(
    @InjectModel('OrderLog') private logModel: Model<any>,
    @Inject('ORDER_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderServiceGrpc = this.client.getService<OrderServiceGrpc>('OrderService');
  }

  async create(data: { itemId: string; quantity: number }) {
    const response = await axios.post('http://order-service:3001/orders', data);

    await this.logModel.create({
      type: 'CREATE_ORDER',
      status: response.data.status,
      orderId: response.data.id,
      timestamp: new Date(),
    });

    return response.data;
  }

  async getOrders(params: {
    page?: number;
    limit?: number;
    itemId?: string;
    status?: string;
  }) {
    const { page = 1, limit = 10, itemId, status } = params;

    return await lastValueFrom(
      this.orderServiceGrpc.GetOrders({ page, limit, itemId, status }),
    );
  }
}
