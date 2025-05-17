"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrainerNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            LMS
          </Link>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              type="button"
              className="relative text-gray-600 hover:text-blue-600 transition"
            >
              <span className="sr-only">Notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.03 2.03 0 0118 14.159V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.389 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                />
              </svg>
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                3
              </span>
            </button>

            {/* User Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
              >
                <img
                  className="h-8 w-8 rounded-full border"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border">
                  <Link
                    href="/trainer-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/trainer-dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      router.push("/login");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
