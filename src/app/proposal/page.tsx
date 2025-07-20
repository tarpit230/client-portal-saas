'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Proposal = {
  _id: string;
  title: string;
  status: string;
};

export default function MyProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    fetch('/api/proposals')
      .then((res) => res.json())
      .then(setProposals);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">My Proposals</h1>
      <ul className="space-y-2 mt-4">
        {proposals.map((p) => (
          <li key={p._id}>
            <Link href={`/proposal/${p._id}`} className="text-blue-500 underline">
              {p.title} ({p.status})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
