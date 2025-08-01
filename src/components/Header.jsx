'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { UserCircle, LogIn, LogOut } from 'lucide-react';
import Loader from '@/components/Loader';

export default function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4 w-[100%] flex justify-end items-center">

      <div className="flex items-center gap-4">
        {status === 'loading' ? (
          <span className="text-gray-500 text-sm"><Loader /></span>
        ) : user ? (
          <>
            <div className="flex items-center gap-2 text-gray-700">
              <UserCircle className="w-6 h-6 text-yellow-600" />
              <span className="font-medium">{user.name}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="cursor-pointer inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-md transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="cursor-pointer inline-flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 text-sm rounded-md transition"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
