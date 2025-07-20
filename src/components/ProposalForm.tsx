'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ProposalFormData = {
  title?: string;
  description?: string;
  deliverables?: string[];
  pricing?: { amount: number };
  timeline?: string;
  terms?: string;
  status?: string;
};

interface ProposalFormProps {
  initialData?: ProposalFormData;
}

export default function ProposalForm({ initialData = {} }: ProposalFormProps) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    deliverables: initialData.deliverables?.join('\n') || '',
    pricing: initialData.pricing?.amount || '',
    timeline: initialData.timeline || '',
    terms: initialData.terms || '',
    status: initialData.status || 'draft',
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      deliverables: form.deliverables.split('\n'),
      pricing: { amount: Number(form.pricing) },
    };

    const res = await fetch('/api/proposals', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    router.push(`/proposals/${data._id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Proposal Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Deliverables (one per line)"
        value={form.deliverables}
        onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Pricing Amount"
        type="number"
        value={form.pricing}
        onChange={(e) => setForm({ ...form, pricing: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Timeline"
        value={form.timeline}
        onChange={(e) => setForm({ ...form, timeline: e.target.value })}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Terms"
        value={form.terms}
        onChange={(e) => setForm({ ...form, terms: e.target.value })}
      />
      <select
        className="border p-2 w-full"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Proposal
      </button>
    </form>
  );
}
