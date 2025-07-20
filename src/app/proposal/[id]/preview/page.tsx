// app/proposals/[id]/preview/page.tsx
import { getProposalById } from '@/lib/getProposalById';
import ProposalPreview from '@/components/proposals/ProposalPreview';

interface Props {
  params: { id: string };
}

export default async function ProposalPreviewPage({ params }: Props) {
  const proposal = await getProposalById(params.id);

  if (!proposal) return <div className="p-6 text-red-600">Proposal not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProposalPreview proposal={proposal} />
    </div>
  );
}
