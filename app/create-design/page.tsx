
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/ui/navigation'
import { DesignCanvas } from '@/components/studio/design-canvas'
import { ToolPalette } from '@/components/studio/tool-palette'
import { AIIntegrationPanel } from '@/components/studio/ai-integration-panel'

export default function CreateDesignPage() {
  // Generate a unique design ID for this session
  const designId = React.useMemo(() => `design-${Date.now()}`, [])

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-20 h-screen flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex"
        >
          {/* Tool Palette */}
          <ToolPalette />
          
          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col">
            <DesignCanvas 
              designId={designId} 
              collaborative={true}
            />
          </div>
          
          {/* AI Integration Panel */}
          <AIIntegrationPanel />
        </motion.div>
      </main>
    </div>
  )
}
