import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { ClientsModule } from '@nestjs/microservices';
import { grpcOrderList } from '../grpc/order.grpc';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderLogSchema } from '../schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OrderLog', schema: OrderLogSchema }]),
    ClientsModule.register([grpcOrderList]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
