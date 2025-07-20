// app/api/clients/route.ts
import { connectDB } from '@/lib/db';
import Client from '@/models/Client';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const client = await Client.create(body);
  return Response.json(client);
}

export async function GET() {
  await connectDB();
  const clients = await Client.find().lean();
  return Response.json(clients);
}
