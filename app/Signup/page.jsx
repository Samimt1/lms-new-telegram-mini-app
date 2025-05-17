"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const Signup = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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
      console.error(
        "Signup error:",
        error.response?.data?.message || error.message || "Something went wrong"
      );
      alert(
        "Signup failed: " +
          (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-20 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {mounted ? (
          theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )
        ) : (
          <div className="h-5 w-5" />
        )}
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-gray-900/50 w-full max-w-md border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-600 dark:text-yellow-500">
          Create Your Account
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition dark:bg-gray-700 dark:text-white"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition dark:bg-gray-700 dark:text-white"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition dark:bg-gray-700 dark:text-white"
            placeholder="Enter a strong password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none transition dark:bg-gray-700 dark:text-white"
            placeholder="Re-type your password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition dark:text-white"
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
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              className="text-yellow-600 dark:text-yellow-500 font-medium hover:underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
