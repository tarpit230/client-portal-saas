import mongoose, { Schema, model, models } from 'mongoose';

const TemplateSchema = new Schema(
  {
    name: { type: String, required: true },
    category: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // or null for global
    defaultContent: {
      description: String,
      deliverables: [String],
      timeline: String,
      pricing: {
        amount: Number,
        breakdown: [String],
      },
      terms: String,
    },
  },
  { timestamps: true }
);

export default models.Template || model('Template', TemplateSchema);
