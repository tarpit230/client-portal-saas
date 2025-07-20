// app/api/test-db/route.ts

import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: 'success', message: 'Connected to MongoDB' });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'MongoDB connection failed' }, { status: 500 });
  }
}
