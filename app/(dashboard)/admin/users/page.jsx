"use client";

import { useState } from "react";
import Link from "next/link";
import { dummyUsers } from "@/utility/data"; // Make sure this file exports full user data

export default function UsersPage() {
  const [users, setUsers] = useState(dummyUsers);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <div className="flex gap-5 justify-around items-center">
        <h2 className="text-2xl font-bold mb-8">📊 Users Overview</h2>
        <h3 className="text-2xl font-bold mb-8"> Total: x</h3>

      </div>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-2 cursor-pointer">
                {" "}
                <Link href={`/admin/users/${user.id}`} className="contents">
                  {user.name}
                </Link>
              </td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.status}</td>

              <td className="p-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
