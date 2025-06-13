
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/ui/navigation'
import { HeroSection } from '@/components/studio/hero-section'
import { FeaturesGrid } from '@/components/studio/features-grid'
import { GalleryPreview } from '@/components/studio/gallery-preview'
import { AIShowcase } from '@/components/studio/ai-showcase'
import { Footer } from '@/components/studio/footer'

export default function HomePage() {
  return (
    <motion.div 
      className="min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <AIShowcase />
        <GalleryPreview />
      </main>
      <Footer />
    </motion.div>
  )
}
