import { GrpcOrderList } from '../interfaces/order.interface';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { getGrpcService } from '../grpc/grpc.clients';

@Injectable()
export class OrderService implements OnModuleInit {
  private orderServiceGrpc: GrpcOrderList;

  constructor(
    @InjectModel('OrderLog') private readonly logModel: Model<any>,
    @Inject('ORDER') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderServiceGrpc = getGrpcService<GrpcOrderList>(this.client, 'OrderService');
  }

  async create(data: { itemId: string; quantity: number }) {
    console.log("POST URI : ", process.env.ORDER_URI + 'orders');
    const response = await axios.post(process.env.ORDER_URI + 'orders', data);

    await this.logModel.create({
      type: 'CREATE_ORDER',
      status: response.data.status,
      orderId: response.data.id,
      timestamp: new Date(),
    });

    return response.data;
  }

  async getOrders(params: { page?: number; limit?: number; itemId?: string; status?: string}) {
    const { page = 1, limit = 10, itemId, status } = params;

    return lastValueFrom(
      this.orderServiceGrpc.GetOrders({ page, limit, itemId, status }),
    );
  }

  async getDetailOrder(id: string) {
    return await lastValueFrom(
      this.orderServiceGrpc.GetOrderDetail({ id }),
    );
  }
}