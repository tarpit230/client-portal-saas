// app/api/clients/route.ts
import { connectDB } from '@/lib/db';
import { getClientModel } from '@/models/Client';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const Client = getClientModel();
  const client = await Client.create(body);
  return Response.json(client);
}

export async function GET() {
  await connectDB();
  const Client = getClientModel();
  const clients = await Client.find().lean();
  return Response.json(clients);
}
