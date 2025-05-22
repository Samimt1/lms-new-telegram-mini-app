"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  BookOpen,
  User,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  GraduationCap,
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/user", icon: <Home size={20} />, label: "Home" },
    {
      href: "/user/my-courses",
      icon: <BookOpen size={20} />,
      label: "My Courses",
    },
    { href: "/user/profile", icon: <User size={20} />, label: "Profile" },
  ]

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  const itemHoverVariants = {
    hover: { x: 5 },
  }

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      className="w-64 bg-background border-r border-gray-300 fixed h-full p-4 dark:bg-gray-900 flex flex-col"
    >
      <motion.div
        variants={sidebarVariants}
        className="mb-8 p-4 border-b border-gray-200 flex items-center space-x-3"
      >
        <GraduationCap size={40} className="text-primary" />
        <div>
          <h2 className="text-xl font-bold">LMS</h2>
          <p className="text-sm text-muted-foreground">Student Dashboard</p>
        </div>
      </motion.div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <motion.div
            key={item.href}
            variants={sidebarVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredItem(item.href)}
            onHoverEnd={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className={`flex items-center p-3  transition-all ${
                pathname === item.href
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              <AnimatePresence>
                {hoveredItem === item.href && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-muted-foreground"
                  >
                    <ChevronRight size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        variants={sidebarVariants}
        className="mt-auto p-4 border-t border-gray-200 space-y-2"
      >
        {mounted && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center p-3 rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <span className="mr-3">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </span>
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => signOut()}
          className="w-full flex items-center p-3 rounded-lg hover:bg-accent hover:text-accent-foreground text-destructive"
        >
          <span className="mr-3">
            <LogOut size={20} />
          </span>
          <span>Logout</span>
        </motion.button>
      </motion.div>
    </motion.aside>
  )
}
