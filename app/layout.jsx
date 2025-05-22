import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Providers } from "./providers" // 👈 import it
import { Toaster } from "react-hot-toast"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata = {
  title: "Create Next App",
  description: "Learning management system telegram web app",
  keywords: "learning, management, system, telegram, web app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937", // Tailwind slate-800
              color: "#f9fafb", // Tailwind gray-50
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: {
                primary: "#10b981", // Tailwind emerald-500
                secondary: "#ecfdf5", // Tailwind emerald-50
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444", // Tailwind red-500
                secondary: "#fee2e2", // Tailwind red-50
              },
            },
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {/* 👈 wrap children with Redux Provider */}
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
