"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, User } from "lucide-react";
import { NotificationBell } from "./NotificationBell";

export const AdminNavbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return null;

  const handleProfileClick = () => router.push("/admin/profile");

  return (
    <div className="border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center px-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative rounded-lg hidden sm:flex">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent py-2 px-16 text-sm transition"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-6 justify-end">
          <NotificationBell />

          {/* Profile Section */}
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-3 rounded-full p-1 hover:bg-gray-100 transition cursor-pointer"
            aria-label="Go to profile"
          >
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{user.name}</span>
              <span className="text-xs text-gray-500 truncate max-w-[120px]">
                {user.email}
              </span>
            </div>

            <Image
              src={user.avatar}
              alt={`${user.name} avatar`}
              width={36}
              height={36}
              className="object-cover rounded-full w-8 h-8 ring-2 ring-indigo-500"
              priority
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
