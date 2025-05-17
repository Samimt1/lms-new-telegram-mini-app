"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "", label: "Home" },
    { href: "#courses", label: "Courses" },
    { href: "#features", label: "Features" },
    { href: "#blogs", label: "Blogs" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed w-full px-2 sm:px-10 py-4 flex justify-between items-center bg-transparent z-20">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 drop-shadow-lg mr-12">
          LMS
        </h1>

        {/* Hamburger Icon */}
        <button
          className="sm:hidden text-black dark:text-white text-2xl"
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
              className="text-gray-100 dark:text-gray-300 font-semibold hover:underline"
            >
              {label}
            </a>
          ))}

          <Link
            href="/login"
            className="px-4 py-2 text-gray-100 dark:text-gray-300 font-semibold hover:underline"
          >
            Login
          </Link>
          <Link
            href="/Signup"
            className="px-6 py-2 font-semibold bg-yellow-500 dark:bg-gray-800 hover:bg-yellow-600 dark:hover:bg-gray-600 text-black dark:text-white rounded-md shadow-md transition duration-300"
          >
            SignUp
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div
          className={`sm:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-black dark:text-white font-semibold hover:underline"
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-black dark:text-white font-semibold p-2"
            >
              {mounted ? (
                <>
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </>
              ) : (
                <div className="h-5 w-5" />
              )}
            </button>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-black dark:text-white font-semibold hover:underline"
            >
              Login
            </Link>
            <Link
              href="/Signup"
              onClick={() => setMenuOpen(false)}
              className="bg-yellow-500 hover:bg-yellow-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ✅ Fixed Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md hover:scale-105 transition-transform"
        aria-label="Toggle Theme"
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
    </>
  );
};

export default Header;
