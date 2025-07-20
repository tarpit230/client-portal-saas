// app/clients/[id]/edit/page.tsx
'use client';
import EditClientForm from '@/components/EditClientForm';
import { useParams } from 'next/navigation';

export default function EditClientPage() {
  const params = useParams();
  const clientId = params.id as string;

  return (
    <div className="p-6">
      <EditClientForm clientId={clientId} />
    </div>
  );
}
