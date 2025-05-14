"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(data.role === "trainer" ? "/trainer" : "/user");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background image with blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login.jpg"
          alt="Login background"
          layout="fill"
          objectFit="cover"
          className="blur-[6px] brightness-45"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          <Image
            src="/google-icon.svg"
            alt="Google icon"
            width={20}
            height={20}
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-2 text-center">
          <p className="text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/Signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
