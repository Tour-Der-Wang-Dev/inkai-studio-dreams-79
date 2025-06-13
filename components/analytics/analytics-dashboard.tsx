
'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAnalyticsStore } from '@/stores/analytics-store'
import { MetricsOverview } from './metrics-overview'
import { RevenueChart } from './revenue-chart'
import { UserAnalyticsChart } from './user-analytics-chart'
import { AIPerformanceChart } from './ai-performance-chart'
import { ConversionFunnel } from './conversion-funnel'
import { DateRangeSelector } from './date-range-selector'
import { ExportOptions } from './export-options'
import {
  BarChart3,
  TrendingUp,
  Users,
  Brain,
  RefreshCw,
  Download,
  AlertTriangle
} from 'lucide-react'

export const AnalyticsDashboard: React.FC = () => {
  const {
    businessMetrics,
    isLoadingMetrics,
    selectedMetric,
    currentFilter,
    setFilter,
    refreshDashboard,
    selectMetric,
    loadReports,
    loadAlerts
  } = useAnalyticsStore()

  useEffect(() => {
    refreshDashboard()
    loadReports()
    loadAlerts()
  }, [refreshDashboard, loadReports, loadAlerts])

  const handleRefresh = () => {
    refreshDashboard()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Monitor your business performance and user insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <DateRangeSelector
            value={currentFilter.dateRange}
            onChange={(dateRange) => setFilter({ ...currentFilter, dateRange })}
          />
          
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoadingMetrics}
            className="border-gray-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingMetrics ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <ExportOptions />
        </div>
      </div>

      {/* Quick Metrics Overview */}
      <MetricsOverview />

      {/* Main Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Analytics */}
        <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Revenue Analytics
            </CardTitle>
            <Button
              size="sm"
              variant={selectedMetric === 'revenue' ? 'default' : 'ghost'}
              onClick={() => selectMetric(selectedMetric === 'revenue' ? null : 'revenue')}
              className="text-electric-blue"
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ConversionFunnel />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Analytics */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserAnalyticsChart />
          </CardContent>
        </Card>

        {/* AI Performance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AIPerformanceChart />
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Top Performing Styles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Realistic', 'Traditional', 'Geometric', 'Watercolor'].map((style, index) => (
                <div key={style} className="flex items-center justify-between">
                  <span className="text-gray-300">{style}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-electric-blue to-neon-green"
                        style={{ width: `${85 - index * 15}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{85 - index * 15}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-yellow-400">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">High churn rate detected</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Revenue goal exceeded</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">New user milestone reached</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="ghost">
              <Download className="w-4 h-4 mr-2" />
              Export Monthly Report
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <BarChart3 className="w-4 h-4 mr-2" />
              Create Custom Report
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Set Up Alert
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
