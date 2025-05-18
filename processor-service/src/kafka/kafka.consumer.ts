import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { OrderService } from '../order/order.service';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(private readonly orderService: OrderService) {}

  async onModuleInit() {
    console.log('KafkaConsumer ready and listening...');
  }

  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('[Kafka] Received:', message);

    const orderId = message.id; // ⬅️ langsung pakai message.id, BUKAN message.value.orderId

    await this.orderService.log(orderId, 'receive', 'Order message received');
    await this.orderService.updateOrderStatusToDone(orderId);

    const originalKafkaMsg = context.getMessage();
    console.log(`Processed message at offset ${originalKafkaMsg.offset}`);
  }
}