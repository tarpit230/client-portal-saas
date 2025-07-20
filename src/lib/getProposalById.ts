import { connectDB } from "./db";
import Proposal from "@/models/Proposals";

export async function getProposalById(id: string) {
  try {
    await connectDB();
    const proposal = await Proposal.findById(id).lean();
    return proposal;
  } catch (error) {
    console.error("Error fetching proposal by ID:", error);
    return null;
  }
}
