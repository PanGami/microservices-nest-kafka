import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderService } from '../services/order.service';
import { OrderController } from '../controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderLogSchema } from '../schemas/order.schema';
import { KafkaModule } from './kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    MongooseModule.forFeature([{ name: 'OrderLog', schema: OrderLogSchema }]),
    KafkaModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
