"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#", label: "Home" },
    { href: "#courses", label: "Courses" },
    { href: "#features", label: "Features" },
    { href: "#blogs", label: "Blogs" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact Us" },
  ];

  return (
    <div className="fixed absolute w-full px-8 py-4 flex justify-between items-center bg-transparent z-20">
      <h1 className="text-3xl font-bold text-yellow-400 drop-shadow-lg">
        LMS Platform
      </h1>

      <button
        className="sm:hidden text-black text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Desktop Nav */}
      <div className="hidden sm:flex space-x-6">
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-black font-semibold hover:underline"
          >
            {label}
          </a>
        ))}
        <Link
          href="/login"
          className="px-4 py-2 text-black font-semibold hover:underline"
        >
          Login
        </Link>
        <Link
          href="/Signup"
          className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile Nav */}
      <div
        className={`sm:hidden absolute top-16 left-0 w-full bg-black bg-opacity-80 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold hover:underline"
            >
              {label}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-white font-semibold hover:underline"
          >
            Login
          </Link>
          <Link
            href="/Signup"
            onClick={() => setMenuOpen(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
