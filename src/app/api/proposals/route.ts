import Client from '@/models/Client';
import Proposal from '@/models/Proposals';
import { connectDB } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options'; // Adjust the path if your authOptions is elsewhere
import { NextResponse } from 'next/server';
import User from '@/models/User';

export async function GET() {
  await connectDB();
  const proposals = await Proposal.find().populate('client');
  return Response.json(proposals);
}


export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const body = await req.json();

    // ✅ Clean up status
    const validStatuses = ['draft', 'sent', 'accepted', 'rejected'];
    if (!validStatuses.includes(body.status)) {
      body.status = 'draft';
    }

    const proposal = await Proposal.create({
      ...body,
      user: user._id,
    });

    return NextResponse.json(proposal);
  } catch (err: any) {
    console.error('Error creating proposal:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
