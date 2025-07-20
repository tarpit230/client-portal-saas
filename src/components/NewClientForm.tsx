'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewClientForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/clients', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/clients');
    } else {
      alert('Error creating client');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Add New Client</h2>

      <input name="name" required placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="w-full p-2 border rounded" />

      <div className="flex gap-4">
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={() => router.back()} className="text-gray-600">Cancel</button>
      </div>
    </form>
  );
}
