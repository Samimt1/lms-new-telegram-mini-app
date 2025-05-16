"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LogOut,
  Users,
  BookOpen,
  FileText,
  BarChart2,
  Award,
  Bell,
  AwardIcon,
  HouseIcon,
  Settings,
} from "lucide-react";
import Modal from "./Modal";
import { cn } from "@/utility/utils";
import { role } from "@/utility/data";
const navItems = [
  {
    name: "Home",
    icon: HouseIcon,
    path: "/admin",
    visible: ["admin", "trainer"],
  },
  { name: "Users", icon: Users, path: "/admin/users", visible: ["admin"] },
  {
    name: "Courses",
    icon: BookOpen,
    path: "/admin/courses",
    visible: ["admin", "trainer"],
  },
  {
    name: "Assessments",
    icon: FileText,
    path: "/admin/assessments",
    visible: ["admin"],
  },
  {
    name: "Analytics",
    icon: BarChart2,
    path: "/admin/analytics",
    visible: ["admin"],
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
    visible: ["admin", "trainer"],
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
    visible: ["admin"],
  },
  {
    name: "Gamefication",
    icon: AwardIcon,
    path: "/admin/gamefication",
    visible: ["admin"],
  },
  // Trainer-specific links
  {
    name: "Students",
    icon: Users,
    path: "/trainer/students",
    visible: ["trainer"],
  },
  {
    name: "Assigned Courses",
    icon: BookOpen,
    path: "/trainer/courses",
    visible: ["trainer"],
  },
  {
    name: "Certifications",
    icon: Award,
    path: "/trainer/certifications",
    visible: ["trainer"],
  },
  {
    name: "Quize",
    icon: FileText,
    path: "/trainer/quizes",
    visible: ["trainer"],
  },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => setIsLogoutModalOpen(true);
  const confirmLogout = () => {
    // Perform logout logic here
    // Clear user session
    setIsLogoutModalOpen(false);
    setTimeout(() => router.push("/login"), 500);
  };

  return (
    <div className="flex flex-col w-64 border-r border-gray-200 bg-white ">
        {/* Profile Image */}
       
      <div className="mb-4 px-4 text-gray-400 ">Admin menu</div>
      <hr />
      <nav className="flex-1 px-2 space-y-1">
        {navItems
          .filter((item) => item.visible.includes(role))
          .map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex items-center px-2 py-3 text-sm font-medium rounded-md",
                pathname === item.path
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
      </nav>
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-sm text-red-600 hover:bg-gray-100 w-full"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </button>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="You will lose access to the admin panel after logout."
        confirmText="Logout"
        type="Logout"
      />
    </div>
  );
};
