// app/dashboard/layout.tsx
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64 overflow-auto">
        <Header />
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
}
