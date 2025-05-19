import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { KafkaConsumer } from './kafka/kafka.consumer';
import { OrderLog, OrderLogSchema } from './schemas/order.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'orders_db',
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongodb:27017/processor_logs'),
    MongooseModule.forFeature([{ name: OrderLog.name, schema: OrderLogSchema }]),
  ],
  providers: [OrderService, KafkaConsumer],
})
export class AppModule {}
