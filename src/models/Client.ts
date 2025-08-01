
import mongoose, { Schema, model, models } from 'mongoose';

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: String,
    company: String,
    industry: String,
    phone: String,
    notes: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // owner
  },
  { timestamps: true }
);

export const getClientModel = () => {
  return models.Client || model('Client', ClientSchema);
};
