
'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useAnalyticsStore } from '@/stores/analytics-store'

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#00d4ff",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "#39ff14",
  },
}

export const RevenueChart: React.FC = () => {
  const { revenueData } = useAnalyticsStore()

  // Mock data for demonstration
  const data = revenueData?.datasets?.[0]?.data || [
    { month: 'Jan', revenue: 45000, subscriptions: 1200 },
    { month: 'Feb', revenue: 52000, subscriptions: 1350 },
    { month: 'Mar', revenue: 48000, subscriptions: 1280 },
    { month: 'Apr', revenue: 61000, subscriptions: 1450 },
    { month: 'May', revenue: 55000, subscriptions: 1380 },
    { month: 'Jun', revenue: 67000, subscriptions: 1520 },
  ]

  return (
    <div className="h-80">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
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
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "var(--color-revenue)" }}
            />
            <Line
              type="monotone"
              dataKey="subscriptions"
              stroke="var(--color-subscriptions)"
              strokeWidth={2}
              dot={{ fill: "var(--color-subscriptions)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "var(--color-subscriptions)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
