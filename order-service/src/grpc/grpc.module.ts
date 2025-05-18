import { Module } from '@nestjs/common';
import { GrpcOrderController } from './grpc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [GrpcOrderController],
})
export class GrpcModule {}
