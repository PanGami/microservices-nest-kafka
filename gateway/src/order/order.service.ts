import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel('OrderLog') private logModel: Model<any>) {}

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
}
