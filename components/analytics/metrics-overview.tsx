
'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useAnalyticsStore } from '@/stores/analytics-store'
import { TrendingUp, TrendingDown, Users, Palette, Brain, DollarSign } from 'lucide-react'

export const MetricsOverview: React.FC = () => {
  const { businessMetrics, isLoadingMetrics } = useAnalyticsStore()

  if (isLoadingMetrics) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-6 bg-gray-700 rounded mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!businessMetrics) return null

  const metrics = [
    {
      title: 'Monthly Revenue',
      value: `$${businessMetrics.revenue.monthly.toLocaleString()}`,
      change: businessMetrics.revenue.growth,
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Active Users',
      value: businessMetrics.users.active.toLocaleString(),
      change: 12.5,
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'New Users',
      value: businessMetrics.users.new.toLocaleString(),
      change: 8.3,
      icon: Users,
      color: 'text-purple-400'
    },
    {
      title: 'Designs Created',
      value: businessMetrics.designs.created.toLocaleString(),
      change: 15.7,
      icon: Palette,
      color: 'text-electric-blue'
    },
    {
      title: 'AI Generated',
      value: businessMetrics.designs.aiGenerated.toLocaleString(),
      change: 22.1,
      icon: Brain,
      color: 'text-neon-green'
    },
    {
      title: 'Active Artists',
      value: businessMetrics.artists.active.toLocaleString(),
      change: 5.2,
      icon: Users,
      color: 'text-orange-400'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <div className={`flex items-center text-xs ${
                metric.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-gray-400">
              {metric.title}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
