import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    private kafkaService: KafkaService
  ) {}

  async create(orderData: Partial<Order>) {
    const order = this.orderRepo.create(orderData);
    const saved = await this.orderRepo.save(order);

    // Kirim event ke Kafka
    await this.kafkaService.emit('order_created', {
      orderId: saved.id,
      itemId: saved.itemId,
      quantity: saved.quantity,
    });

    return saved;
  }
}
