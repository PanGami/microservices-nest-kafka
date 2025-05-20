import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;
export type OrderLogDocument = OrderLog & Document;

@Schema()
export class Order {
  @Prop()
  orderId: string;

  @Prop()
  itemId: string;

  @Prop()
  quantity: number;
}

@Schema()
export class OrderLog extends Document {
  @Prop()
  orderId: string;

  @Prop()
  step: string;

  @Prop()
  message: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export const OrderLogSchema = SchemaFactory.createForClass(OrderLog);