import { Schema } from 'mongoose';

export const OrderLogSchema = new Schema({
  type: String,
  status: String,
  orderId: Number,
  timestamp: { type: Date, default: Date.now },
});

