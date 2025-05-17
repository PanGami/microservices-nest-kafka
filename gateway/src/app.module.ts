import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    OrderModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/gateway_logs'),
  ],
})
export class AppModule {}
