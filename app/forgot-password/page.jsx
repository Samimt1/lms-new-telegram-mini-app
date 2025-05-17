"use client";
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/forgot-password", { email });
      setSent(true);
    } catch (error) {
      alert("Failed: " + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-4">Reset your password</h2>
        {sent ? (
          <p className="text-green-600">Email sent! Check your inbox.</p>
        ) : (
          <>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send Reset Link
            </button>
          </>
        )}
      </form>
    </div>
  );
}
