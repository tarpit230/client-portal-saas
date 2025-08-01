'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Loader from '@/components/Loader';

type Client = {
  _id: string;
  name: string;
  email?: string;
  company?: string;
  industry?: string;
  phone?: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (!res.ok) throw new Error('Failed to fetch clients');
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error(err);
        setError('Error loading clients.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  console.log('Loading clients:', loading);

  return (
    <div className="p-4">
      <div className="mb-2">
        <h1 className="text-2xl font-bold">My Clients</h1>
      </div>
      <div className='flex justify-end mb-6 w-[100%]'>
        <Link
          href="/clients/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add New Client
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center"><Loader /></div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded shadow border">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Company</th>
                <th className="text-left px-4 py-2">Industry</th>
                <th className="text-left px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-teal-700">
                      <Link
                        href={`/clients/${client._id}/edit`}
                        className="hover:underline"
                      >
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2">{client.email || '-'}</td>
                    <td className="px-4 py-2">{client.company || '-'}</td>
                    <td className="px-4 py-2">{client.industry || '-'}</td>
                    <td className="px-4 py-2">{client.phone || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center px-4 py-4 text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
