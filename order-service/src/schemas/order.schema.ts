import { Schema } from 'mongoose';

export const OrderLogSchema = new Schema({
  event: String,
  name: String,
  quantity: Number,
  status: String,
  timestamp: { type: Date, default: Date.now },
});
