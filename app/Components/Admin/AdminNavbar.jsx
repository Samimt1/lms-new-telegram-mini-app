"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, Search, User, Image as ImageIcon } from "lucide-react";
import AdminProfile from "@/public/Admin_image/abrsh.jpg";

const mockUser = {
  id: 1,
  name: "Abraham Shiferaw",
  email: "abraham@example.com",
  role: "Admin",
  avatar: AdminProfile,
  lastLogin: "2023-06-15T10:30:00Z",
};

export const AdminNavbar = () => {
  const fileInputRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState(mockUser);

  const handleProfileClick = () => {
    router.push("/admin/profile");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUser({
            ...user,
            avatar: event.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center px-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative rounded-lg hidden sm:flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400/30 bg-transparent py-2 px-16 text-sm"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="ml-auto flex items-center space-x-4 gap-6 sm:gap-6 justify-end">
          {/* Notification Bell */}
          <button className="relative rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute rounded-full w-5 h-5 text-center text-xs flex items-center justify-center bg-violet-500 text-white -top-1 -right-1">
              1
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex gap-3 items-center hover:bg-gray-100 rounded-full p-1 transition-colors">
              <div className="flex flex-col items-end">
                <span className="text-sm leading-4 font-medium">
                  {user.name}
                </span>
                <span className="text-xs leading-3 text-gray-500">
                  {user.role}
                </span>
              </div>

              <Image
                src={user.avatar}
                alt="Profile"
                width={36}
                height={36}
                className="object-cover rounded-full w-8 h-8 ring-2 ring-gray-400 object-conain "
              />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-36 origin-top-right bg-gray-50 rounded-md shadow-lg focus:outline-none z-50 hidden group-hover:block">
              <div className="py-1">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </button>

                  <button
                    onClick={triggerFileInput}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Change Photo
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminNavbar;
