
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/ui/navigation'
import { AnalyticsDashboard } from '@/components/analytics/analytics-dashboard'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnalyticsDashboard />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
