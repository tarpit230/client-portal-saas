// app/api/clients/[id]/route.ts
import { connectDB } from '@/lib/db';
import Client from '@/models/Client';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Client.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Client.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
