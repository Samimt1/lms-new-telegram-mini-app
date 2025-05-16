"use client";

import { use, useState } from "react";
import Image from "next/image";
import { Mail, ShieldCheck, Ban, RotateCcw } from "lucide-react";
import { dummyUsers } from "@/utility/data";

export default function UserDetailPage(props) {
  const { userId } = use(props.params);
  const originalUser = dummyUsers.find((u) => u.id === userId);

  const [user, setUser] = useState(originalUser);

  if (!user)
    return <p className="text-red-500 font-semibold">User not found</p>;

  const handleBan = () => {
    setUser((prev) => ({
      ...prev,
      status: "Banned",
    }));
  };

  const handleUnban = () => {
    setUser((prev) => ({
      ...prev,
      status: "Active",
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-6">
        <Image
          src={user.avatar}
          alt="User avatar"
          width={80}
          height={80}
          className="rounded-full border object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Mail size={16} /> {user.email}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <ShieldCheck size={16} /> Role: {user.role}
          </p>
          <p className="text-sm text-gray-500">Joined on {user.joined}</p>
          <p
            className={`text-xs mt-1 font-medium ${
              user.status === "Active"
                ? "text-green-600"
                : user.status === "Banned"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            Status: {user.status}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {user.status === "Active" ? (
          <button
            onClick={handleBan}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 border border-red-400 rounded hover:bg-red-200"
          >
            <Ban size={16} /> Ban User
          </button>
        ) : (
          <button
            onClick={handleUnban}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 border border-green-400 rounded hover:bg-green-200"
          >
            <RotateCcw size={16} /> Unban User
          </button>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          <li>Submitted Quiz 3 in JavaScript Fundamentals</li>
          <li>Completed "Introduction to React"</li>
          <li>Viewed "Advanced CSS Grid Layout" lecture</li>
        </ul>
      </div>
    </div>
  );
}
