"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/api/register", formData);
      console.log("User registered:", res.data);

      alert("Signup successful! Redirecting to login...");
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data.message);
      alert("Signup failed: " + (error.response?.data?.message || 'Try again'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800/80 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-600">
          Create Your Account
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="Enter a strong password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="Re-type your password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          >
            <option value="trainer">Trainer</option>
            <option value="user">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold p-3 rounded-md transition duration-300 ease-in-out"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              className="text-yellow-600 font-medium hover:underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
