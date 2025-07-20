import Proposal from '@/models/Proposals';
import { connectDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Proposal.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }: { params: { id: string } }) {
  await connectDB();
  await Proposal.findByIdAndDelete(params.id);
  return new Response('Deleted', { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const data = await req.json();
    const updatedProposal = await Proposal.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedProposal) {
      return NextResponse.json({ message: 'Proposal not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ message: 'Update failed', error }, { status: 500 });
  }
}