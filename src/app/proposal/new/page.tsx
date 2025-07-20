"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateProposalPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    client: "",
    scope: "",
    tone: "Professional",
    industry: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState("");
  const [clients, setClients] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get('/api/clients').then((res) => setClients(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProposal("");

    try {
      // Generate the proposal
      const res = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: form.scope,
          tone: form.tone,
          industry: form.industry,
        }),
      });

      const data = await res.json();
      const generatedProposal = data.proposal;
      setProposal(generatedProposal);

      // Save to DB
      const saveRes = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, proposal: generatedProposal }),
      });

      const saved = await saveRes.json();
      if (saved.success) {
        router.push("/proposal"); // Redirect to list page
      } else {
        alert("Failed to save proposal.");
      }
    } catch (err) {
      setProposal("Failed to generate or save proposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">🆕 Create New Proposal</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <input
          name="title"
          type="text"
          required
          onChange={handleChange}
          value={form.title}
          placeholder="Proposal title"
          className="w-full border rounded px-3 py-2"
        />

        <select
        name="client"
        value={form.client}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">-- Select Client --</option>
        {clients.map((client: any) => (
          <option key={client._id} value={client._id}>
            {client.name} ({client.company})
          </option>
        ))}
      </select>

        <textarea
          name="scope"
          rows={4}
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          required
          value={form.scope}
          placeholder="Project scope"
        />

        <select
          name="tone"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.tone}
        >
          <option>Professional</option>
          <option>Casual</option>
          <option>Persuasive</option>
          <option>Concise</option>
        </select>

        <input
          name="industry"
          type="text"
          className="w-full border rounded px-3 py-2"
          onChange={handleChange}
          value={form.industry}
          placeholder="Industry (e.g. Retail)"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold"
        >
          {loading ? "Generating..." : "Generate & Save Proposal"}
        </button>
      </form>

      {proposal && (
        <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-2">Generated Proposal</h2>
          <pre className="whitespace-pre-wrap">{proposal}</pre>
        </div>
      )}
    </main>
  );
}
