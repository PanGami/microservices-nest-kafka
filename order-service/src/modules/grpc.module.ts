import { Module } from '@nestjs/common';
import { GrpcOrderController } from '../controllers/grpc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [GrpcOrderController],
})
export class GrpcModule {}
