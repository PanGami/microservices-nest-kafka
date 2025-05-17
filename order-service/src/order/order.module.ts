import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderLogSchema } from '../schemas/order.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    MongooseModule.forFeature([{ name: 'OrderLog', schema: OrderLogSchema }]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
