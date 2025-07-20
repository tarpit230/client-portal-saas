import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String, // optional if using OAuth
    image: String, // for social login
    role: { type: String, default: 'user' }, // e.g., user, admin
    plan: { type: String, default: 'free' }, // free / pro
    proposals: [{ type: Schema.Types.ObjectId, ref: 'Proposal' }],
  },
  { timestamps: true }
);

export default models.User || model('User', UserSchema);
