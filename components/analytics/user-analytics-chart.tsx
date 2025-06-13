
'use client'

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartConfig = {
  activeUsers: {
    label: "Active Users",
    color: "#00d4ff",
  },
  newUsers: {
    label: "New Users",
    color: "#39ff14",
  },
}

export const UserAnalyticsChart: React.FC = () => {
  const data = [
    { date: '2024-01-01', activeUsers: 2400, newUsers: 240 },
    { date: '2024-01-08', activeUsers: 2210, newUsers: 198 },
    { date: '2024-01-15', activeUsers: 2290, newUsers: 289 },
    { date: '2024-01-22', activeUsers: 2000, newUsers: 189 },
    { date: '2024-01-29', activeUsers: 2181, newUsers: 239 },
    { date: '2024-02-05', activeUsers: 2500, newUsers: 349 },
    { date: '2024-02-12', activeUsers: 2100, newUsers: 200 },
  ]

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Area
              type="monotone"
              dataKey="activeUsers"
              stackId="1"
              stroke="var(--color-activeUsers)"
              fill="var(--color-activeUsers)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="newUsers"
              stackId="1"
              stroke="var(--color-newUsers)"
              fill="var(--color-newUsers)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
