'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProposalType } from '@/types'; // Define or import this type if needed

export default function EditProposalForm({ initialData }: { initialData: ProposalType }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...initialData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const items = e.target.value.split('\n').filter(Boolean);
    setForm((prev) => ({ ...prev, [field]: items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/proposals/${initialData._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push(`/proposals/${initialData._id}/preview`);
    } else {
      alert('Failed to update proposal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="Title" required />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="textarea"
        placeholder="Description"
      />

      <textarea
        name="deliverables"
        value={form.deliverables.join('\n')}
        onChange={(e) => handleArrayChange(e, 'deliverables')}
        className="textarea"
        placeholder="Deliverables (one per line)"
      />

      <input
        name="timeline"
        value={form.timeline}
        onChange={handleChange}
        className="input"
        placeholder="Timeline"
      />

      <textarea
        name="pricing.breakdown"
        value={form.pricing.breakdown.join('\n')}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            pricing: { ...prev.pricing, breakdown: e.target.value.split('\n').filter(Boolean) },
          }))
        }
        className="textarea"
        placeholder="Pricing Breakdown"
      />

      <input
        type="number"
        name="pricing.amount"
        value={form.pricing.amount}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            pricing: { ...prev.pricing, amount: Number(e.target.value) },
          }))
        }
        className="input"
        placeholder="Amount"
      />

      <textarea
        name="terms"
        value={form.terms}
        onChange={handleChange}
        className="textarea"
        placeholder="Terms"
      />

      <select name="status" value={form.status} onChange={handleChange} className="select">
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>

      <button type="submit" className="btn btn-primary">Update Proposal</button>
    </form>
  );
}
