import { Schema } from 'mongoose';

export const OrderLogSchema = new Schema({
  event: String,
  orderId: Number,
  status: String,
  timestamp: { type: Date, default: Date.now },
});
