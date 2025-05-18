import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GrpcModule } from './grpc/grpc.module';

@Module({
  imports: [
    GrpcModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'orders_db',
      entities: [Order],
      synchronize: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://mongodb:27017/order_logs'),
  ],
})
export class AppModule {}