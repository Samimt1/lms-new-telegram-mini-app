"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/stateManager/stores/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/enatlogo.ico" />
        <title>EnatAcademy</title>
        <meta
          name="description"
          content="Learning management system telegram web app"
        />
        <meta
          name="keywords"
          content="learning, management, system, telegram, web app"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
