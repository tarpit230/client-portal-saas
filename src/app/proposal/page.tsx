"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Proposal = {
  _id: string;
  title: string;
  status: string;
};

export default function MyProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    fetch("/api/proposals")
      .then((res) => res.json())
      .then((data) => {
        setProposals(data);
      })
      .catch((err) => {
        console.error("Failed to fetch proposals:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold">My Proposals</h1>
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-3 py-1 border rounded-md w-64 focus:outline-none"
            />
          </div>
          <select className="py-2 px-3 border rounded-md focus:outline-none">
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <ul className="space-y-2 mt-4 flex flex-wrap gap-4">
        {proposals.map((p) => (
          <Link href={`/proposal/${p._id}`} className="p-4 flex flex-col justify-start 
              h-42 w-48 bg-gray-100 text-teal-500 border rounded-md shadow-sm" key={p._id}>
            <li key={p._id}>
              <div
                className="font-semibold text-lg"
              >
                {p.title} 
              </div>
            </li>
            <span className="text-sm text-gray-500">Status: {p.status}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
