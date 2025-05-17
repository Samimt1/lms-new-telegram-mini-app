"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/user", icon: "🏠", label: "Home" },
    { href: "/user/my-courses", icon: "📚", label: "My Courses" },
    { href: "/user/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <aside className="w-64 bg-background border-r fixed h-full p-4 dark:bg-gray-900">
      <div className="mb-8 p-4 border-b">
        <h2 className="text-xl font-bold">LMS</h2>
        <p className="text-sm text-muted-foreground">Student Dashboard</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t space-y-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center p-3 rounded-lg hover:bg-accent hover:text-accent-foreground"
          >
            <span className="mr-3">{theme === "dark" ? "🌞" : "🌙"}</span>
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        )}

        <button
          onClick={() => signOut()}
          className="w-full flex items-center p-3 rounded-lg hover:bg-accent hover:text-accent-foreground text-destructive"
        >
          <span className="mr-3">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
