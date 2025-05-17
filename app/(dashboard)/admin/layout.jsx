"use client";

import Link from "next/link";
import Image from "next/image";
import { AdminSidebar } from "@/app/Components/Admin/AdminSidebar";
import { AdminNavbar } from "@/app/Components/Admin/AdminNavbar";
import adminLogo from "@/public/Admin_image/logo.png";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[14%] md:w-[14%] lg:w-[16%] flex flex-col h-screen overflow-y-auto no-scrollbar">
        <Link
          href="/"
          className="flex mx-left ml-5 items-center justify-center lg:justify-start sticky top-0 bg-white z-10 pt-3 pb-2"
        >
          <Image
            width={64}
            height={64}
            className="w-24 h-28 p-1 bg-transparent rounded-full object-contain "
            src={adminLogo}
            alt="university logo"
          />
        </Link>
        <div className="flex-1">
          <AdminSidebar />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] flex flex-col h-screen overflow-hidden">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto p-6 scrollbar-custom">
          {children}
        </div>
      </div>
    </div>
  );
}
