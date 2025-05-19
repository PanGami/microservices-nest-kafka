import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderLogSchema } from '../schemas/order.schema';
import { GrpcClients } from 'src/grpc/grpc.clients';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OrderLog', schema: OrderLogSchema }]),
    ClientsModule.register(GrpcClients),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
