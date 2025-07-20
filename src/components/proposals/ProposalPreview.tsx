import { ProposalType } from '@/types';

export default function ProposalPreview({ proposal }: { proposal: ProposalType }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{proposal.title}</h1>
      <p><strong>Status:</strong> {proposal.status}</p>
      <p><strong>Description:</strong> {proposal.description}</p>
      <p><strong>Timeline:</strong> {proposal.timeline}</p>

      <div>
        <strong>Deliverables:</strong>
        <ul className="list-disc ml-6">
          {proposal.deliverables?.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div>
        <strong>Pricing:</strong>
        <p>Amount: {proposal.pricing.amount} {proposal.pricing.currency}</p>
        <ul className="list-disc ml-6">
          {proposal.pricing.breakdown?.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      </div>

      <div>
        <strong>Terms:</strong>
        <p>{proposal.terms}</p>
      </div>
    </div>
  );
}
