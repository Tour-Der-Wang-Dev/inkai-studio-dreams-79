
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

interface DateRangeSelectorProps {
  value: {
    start: Date
    end: Date
  }
  onChange: (dateRange: { start: Date; end: Date }) => void
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ value, onChange }) => {
  const presets = [
    {
      label: 'Last 7 days',
      getValue: () => ({
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date()
      })
    },
    {
      label: 'Last 30 days',
      getValue: () => ({
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date()
      })
    },
    {
      label: 'Last 90 days',
      getValue: () => ({
        start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        end: new Date()
      })
    }
  ]

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-4 h-4 text-gray-400" />
      <select
        value="custom"
        onChange={(e) => {
          const preset = presets.find(p => p.label === e.target.value)
          if (preset) {
            onChange(preset.getValue())
          }
        }}
        className="bg-gray-800 border border-gray-700 rounded text-white text-sm px-3 py-1"
      >
        <option value="custom">Custom Range</option>
        {presets.map(preset => (
          <option key={preset.label} value={preset.label}>
            {preset.label}
          </option>
        ))}
      </select>
    </div>
  )
}
