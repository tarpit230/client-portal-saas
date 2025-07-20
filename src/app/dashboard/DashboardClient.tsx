'use client';

import { useSession } from 'next-auth/react';

export default function DashboardClient() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Access denied. Please login.</p>;

  return <div>Welcome {session.user?.name}</div>;
}
