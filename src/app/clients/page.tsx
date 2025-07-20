'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(setClients);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Clients</h1>
      <Link href="/clients/new" className="text-blue-500">+ Add New Client</Link>
      <ul className="mt-4 space-y-2">
        {clients.map((client: any) => (
          <li key={client._id}>
            <Link href={`/clients/${client._id}/edit`} className="text-lg text-teal-600 hover:underline">
              {client.name} ({client.company})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
