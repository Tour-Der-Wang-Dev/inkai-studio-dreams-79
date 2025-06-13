
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/ui/navigation'

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green">Artists</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect with professional tattoo artists and collaborate on your perfect design
            </p>
          </motion.div>
          
          <div className="text-center py-20">
            <p className="text-gray-400">Artists directory coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
