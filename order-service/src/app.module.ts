import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/order.entity';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { GrpcInventoryController } from './grpc/grpc.controller';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'orders_db',
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController, GrpcInventoryController],
  providers: [OrderService, KafkaService],
})
export class AppModule {}
