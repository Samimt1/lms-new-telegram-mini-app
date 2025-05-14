import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EnatAcademy",
  description: "Learning managment system telegram web app",
 
  keywords: "learning, management, system, telegram, web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en " suppressHydrationWarning>
       <head>
    <link rel="icon" href="/public/enatlogo.ico" />
  </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
