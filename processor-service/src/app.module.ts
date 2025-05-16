import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order/order.schema';
import { OrderService } from './order/order.service';
import { KafkaConsumerController } from './kafka/kafka.consumer';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/orders'),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [KafkaConsumerController],
  providers: [OrderService],
})
export class AppModule {}
