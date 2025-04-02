import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { PostHogProvider } from "@/components/PostHogProvider"
import { Analytics } from "@vercel/analytics/react"
import { cn } from "@/lib/utils"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export { metadata } from "./metadata"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/carousel.css" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
          <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}


import './globals.css'
