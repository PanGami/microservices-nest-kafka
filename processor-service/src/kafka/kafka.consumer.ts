import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderService } from '../order/order.service';

@Controller()
export class KafkaConsumerController {
  private readonly logger = new Logger(KafkaConsumerController.name);

  constructor(private readonly orderService: OrderService) {}

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() message: any) {
    const order = message.value;
    this.logger.log(`Order Received from Kafka: ${JSON.stringify(order)}`);

    // Simpan ke MongoDB (opsional)
    await this.orderService.saveOrder(order);
  }
}
