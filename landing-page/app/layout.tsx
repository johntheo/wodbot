"use client"

import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { PostHogProvider } from "@/components/PostHogProvider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    // Any client-side logic that depends on the DOM or window
  }, []);

  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="/carousel.css" />
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}


import './globals.css'
