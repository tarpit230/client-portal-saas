import { getProposalById } from '@/lib/getProposalById';

interface ProposalPreviewPageProps {
  params: { id: string };
}

export default async function ProposalPreviewPage({ params }: ProposalPreviewPageProps) {
  const resolvedParams = await params;
  const proposalData = await getProposalById(resolvedParams?.id);
  const proposal = Array.isArray(proposalData) ? proposalData[0] : proposalData;
  
  if (!proposal) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Proposal not found</h1>
        <p className="mt-2 text-gray-600">The requested proposal does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{proposal.title}</h1>
      <p className="mt-2 text-gray-600">{proposal.description}</p>
      <h2 className="mt-4 font-semibold">Deliverables:</h2>
      <ul className="list-disc list-inside">
        {proposal.deliverables.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
      <p className="mt-4">Timeline: {proposal.timeline}</p>
      <p>Pricing: {proposal.pricing?.amount} {proposal.pricing?.currency}</p>
      <p className="mt-4">{proposal.terms}</p>
    </div>
  );
}
