'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomeComp() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 md:px-12
        bg-gradient-to-br from-white to-yellow-600 text-white relative overflow-hidden text-center">
      {/* Logo */}
      <div className="absolute top-6 left-6 text-2xl font-bold text-yellow-600 font-serif">
        ClientPortal
      </div>

      {/* Hero Content */}
      <div className="max-w-3xl mt-42 min-h-[300px] flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-serif">
          Simplify Client Collaboration All in One Portal
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage projects, share files, send invoices, and keep your clients in the loop - all from one branded dashboard.
        </p>
        <button
          onClick={() => router.push('/register')}
          className="font-mono cursor-pointer px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Try It Free
        </button>
      </div>

      {/* Optional Visual */}
      <div className="mt-12">
        <Image
          src="/hero-dashboard-preview.png"
          alt="Client Portal Preview"
          width={800}
          height={500}
          className="rounded-lg shadow-xl"
        />
      </div>

      {/* Feature Highlights */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-700">
        <div>✅ Real-time Updates</div>
        <div>✅ File Sharing</div>
        <div>✅ Branded Dashboards</div>
        <div>✅ Secure Communication</div>
      </div>

      {/* Testimonial */}
      <div className="mt-12 text-gray-500 italic max-w-xl">
        ⭐️⭐️⭐️⭐️⭐️ “It saved me hours each week and made my clients love working with me.” — Alex, Web Designer
      </div>
    </div>
  );
}
