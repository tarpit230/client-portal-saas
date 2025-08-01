import mongoose, { Schema, model, models } from 'mongoose';
import Client from './Client';

const ProposalSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    title: { type: String, required: true },
    description: String,
    deliverables: [String],
    pricing: {
      amount: Number,
      currency: { type: String, default: 'USD' },
      breakdown: [String],
    },
    timeline: String,
    terms: String,
    status: { type: String, enum: ['draft', 'sent', 'accepted', 'rejected'], default: 'draft' },
    sharedUrl: String,
  },
  { timestamps: true }
);

export default models.Proposal || mongoose.model('Proposal', ProposalSchema);
