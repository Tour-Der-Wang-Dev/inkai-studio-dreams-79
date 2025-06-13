
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InkAI Studio - AI-Powered Tattoo Design Platform',
  description: 'Create stunning tattoo designs with cutting-edge AI technology. Collaborate with master artists and bring your vision to life with precision and creativity.',
  keywords: 'tattoo design, AI art, tattoo studio, artificial intelligence, custom tattoos, digital art',
  authors: [{ name: 'InkAI Studio' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>
              <main className="min-h-screen bg-black">
                {children}
              </main>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
