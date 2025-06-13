
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { OrganizationSchema } from '@/components/seo/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InkAI Studio - AI-Powered Tattoo Design Platform',
  description: 'Create stunning tattoo designs with cutting-edge AI technology. Collaborate with master artists and bring your vision to life with precision and creativity.',
  keywords: 'tattoo design, AI art, tattoo studio, artificial intelligence, custom tattoos, digital art, tattoo generator, AI tattoo creator',
  authors: [{ name: 'InkAI Studio' }],
  generator: 'InkAI Studio',
  applicationName: 'InkAI Studio',
  referrer: 'origin-when-cross-origin',
  creator: 'InkAI Studio',
  publisher: 'InkAI Studio',
  metadataBase: new URL('https://inkaistudio.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://inkaistudio.com',
    title: 'InkAI Studio - AI-Powered Tattoo Design Platform',
    description: 'Create stunning tattoo designs with cutting-edge AI technology. Collaborate with master artists and bring your vision to life.',
    siteName: 'InkAI Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InkAI Studio - AI-Powered Tattoo Design Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@inkaistudio',
    creator: '@inkaistudio',
    title: 'InkAI Studio - AI-Powered Tattoo Design Platform',
    description: 'Create stunning tattoo designs with cutting-edge AI technology. Collaborate with master artists and bring your vision to life.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <OrganizationSchema />
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
