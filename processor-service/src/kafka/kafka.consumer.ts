import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { OrderService } from '../services/order.service';
import { OrderLog } from '../schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../helper/global.helper'
import { Model } from 'mongoose';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(private readonly orderService: OrderService, @InjectModel(OrderLog.name) private readonly logModel: Model<OrderLog>) {}

  async onModuleInit() {
    console.log('KafkaConsumer ready and listening...');
  }

  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('[Kafka] Received:', message);

    const orderId = message.id;

    await Log(this.logModel, orderId, 'receive', 'Order message received');
    await this.orderService.updateOrderStatusToDone(orderId);

    const originalKafkaMsg = context.getMessage();
    console.log(`Processed message at offset ${originalKafkaMsg.offset}`);
  }
}