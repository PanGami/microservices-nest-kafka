import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderLogSchema } from './order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OrderLog', schema: OrderLogSchema }]),
    ClientsModule.register([grpcClientOptions]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
