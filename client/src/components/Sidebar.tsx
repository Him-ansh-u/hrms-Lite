"use client";

import { FiHome, FiUsers, FiCalendar, FiSettings } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { icon: FiHome, label: "Dashboard", href: "/" },
  { icon: FiUsers, label: "Employees", href: "/employees" },
  { icon: FiCalendar, label: "Attendance", href: "/attendance" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-16 h-screen bg-blue-900 text-white flex flex-col items-center py-6 z-50">
      
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-lg font-bold">
          H
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-4">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              title={label}
              className={`p-3 rounded-lg transition-colors ${
                isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`}
            >
              <Icon size={22} />
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <button title="Settings" className="p-3 rounded-lg hover:bg-blue-800">
        <FiSettings size={22} />
      </button>
    </aside>
  );
}
