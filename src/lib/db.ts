
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) {
  throw new Error('⚠️ MONGO_URL is not defined in .env.local');
}

let isConnected: boolean = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URL, {
        dbName: 'client-portal',
        bufferCommands: false,
      });
      isConnected = true;
      console.log('✅ MongoDB connected successfully');
    }

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('Could not connect to MongoDB');
  }
};
