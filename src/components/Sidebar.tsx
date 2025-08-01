"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Users, PlusCircle, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Proposals", href: "/proposal", icon: FileText },
  { label: "Create Proposal", href: "/proposal/new", icon: PlusCircle },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 border-r bg-white p-4 shadow-sm fixed top-0 left-0">
      <div className="mb-6 text-2xl text-center font-bold text-yellow-600">
        Client Portal
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all ${
              pathname === href ? "bg-yellow-100 text-yellow-700 font-semibold" : ""
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
