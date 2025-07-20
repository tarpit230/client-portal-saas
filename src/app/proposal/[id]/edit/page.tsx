// app/proposals/[id]/edit/page.tsx
import { getProposalById } from '@/lib/getProposalById';
import EditProposalForm from '@/components/proposals/EditProposalForm';

interface Props {
  params: { id: string };
}

export default async function EditProposalPage({ params }: Props) {
  const proposal = await getProposalById(params.id);

  if (!proposal) return <div className="p-6 text-red-600">Proposal not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Proposal</h1>
      <EditProposalForm initialData={proposal} />
    </div>
  );
}
