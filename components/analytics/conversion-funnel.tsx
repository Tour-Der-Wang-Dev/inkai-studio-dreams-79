
'use client'

import React from 'react'
import { useAnalyticsStore } from '@/stores/analytics-store'

export const ConversionFunnel: React.FC = () => {
  const { conversionFunnel } = useAnalyticsStore()

  const defaultFunnelData = [
    { step: 'Visitors', users: 10000, rate: 100 },
    { step: 'Sign Ups', users: 2500, rate: 25 },
    { step: 'Design Created', users: 1750, rate: 70 },
    { step: 'AI Generated', users: 1225, rate: 70 },
    { step: 'Completed', users: 875, rate: 71.4 },
    { step: 'Paid', users: 350, rate: 40 }
  ]

  const data = conversionFunnel.length > 0 ? conversionFunnel : defaultFunnelData

  return (
    <div className="space-y-4">
      {data.map((step, index) => (
        <div key={step.step} className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm font-medium">{step.step}</span>
            <span className="text-gray-400 text-xs">{step.rate}%</span>
          </div>
          
          <div className="relative">
            <div className="w-full h-8 bg-gray-800 rounded-lg overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-electric-blue to-neon-green transition-all duration-300"
                style={{ width: `${step.rate}%` }}
              />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {step.users.toLocaleString()}
              </span>
            </div>
          </div>
          
          {index < data.length - 1 && (
            <div className="flex justify-center mt-2">
              <div className="w-0.5 h-4 bg-gray-600"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
