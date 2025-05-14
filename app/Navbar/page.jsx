"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#", label: "Home" },
    { href: "#courses", label: "Courses" },
    { href: "#features", label: "Features" },
    { href: "#blogs", label: "Blogs" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed w-full px-2 sm:px-10 py-4 flex justify-between items-center bg-transparent z-20">
      {/* Logo */}
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 drop-shadow-lg mr-12">
        EnatAcademy
        {/* <Image
          src={Enatlogo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full shadow-lg transition-transform duration-300"
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          style={{ objectFit: "cover" }}
        /> */}
      </h1>

      {/* Theme switcher always visible */}
      <div className="sm:hidden flex items-center ml-5">
        <ThemeSwitcher />
      </div>

      {/* Hamburger Icon */}
      <button
        className="sm:hidden text-black text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex items-center space-x-6 ml-10">
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-gray-100  font-semibold hover:underline"
          >
            {label}
          </a>
        ))}

        <ThemeSwitcher />

        <Link
          href="/login"
          className="px-4 py-2 text-gray-100 font-semibold hover:underline"
        >
          Login
        </Link>
        <Link
          href="/Signup"
          className="px-6 py-2 text-gray-100 font-semibold bg-yellow-500 dark:bg-gray-800 hover:bg-yellow-600 dark:hover:bg-gray-600 text-black dark:text-white font-semibold  rounded-md shadow-md transition duration-300"

        >
          SignUp
        </Link>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`sm:hidden absolute top-16 left-0 w-full bg-white shadow-md transition-all ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-black font-semibold hover:underline"
            >
              {label}
            </a>
          ))}

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-black font-semibold hover:underline"
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

          {/* Theme switcher in mobile nav too */}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
