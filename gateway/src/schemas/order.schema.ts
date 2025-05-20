import { Schema } from 'mongoose';

export const OrderLogSchema = new Schema({
  type: String,
  status: String,
  orderId: String,
  timestamp: { type: Date, default: Date.now },
});

