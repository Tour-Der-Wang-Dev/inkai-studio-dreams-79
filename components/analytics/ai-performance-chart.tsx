
'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useAnalyticsStore } from '@/stores/analytics-store'

const chartConfig = {
  successRate: {
    label: "Success Rate",
    color: "#39ff14",
  },
  qualityScore: {
    label: "Quality Score",
    color: "#00d4ff",
  },
}

export const AIPerformanceChart: React.FC = () => {
  const { aiPerformanceMetrics } = useAnalyticsStore()

  const data = aiPerformanceMetrics.length > 0 ? aiPerformanceMetrics.map(metric => ({
    model: metric.modelName,
    successRate: metric.successRate,
    qualityScore: metric.qualityScore,
  })) : [
    { model: 'Neural Style', successRate: 92, qualityScore: 87 },
    { model: 'CycleGAN', successRate: 88, qualityScore: 91 },
    { model: 'Stable Diffusion', successRate: 95, qualityScore: 89 },
    { model: 'Custom Model', successRate: 87, qualityScore: 85 },
  ]

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="model" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="successRate"
              fill="var(--color-successRate)"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="qualityScore"
              fill="var(--color-qualityScore)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
