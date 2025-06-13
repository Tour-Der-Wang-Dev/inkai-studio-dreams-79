
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/ui/navigation'
import { DynamicPricingCalculator } from '@/components/pricing/dynamic-pricing-calculator'
import { SubscriptionTiers } from '@/components/pricing/subscription-tiers'
import { PaymentHistory } from '@/components/pricing/payment-history'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, Users, CreditCard } from 'lucide-react'

// Mock analytics data
const revenueData = [
  { month: 'Jan', revenue: 12400, subscriptions: 45 },
  { month: 'Feb', revenue: 15600, subscriptions: 52 },
  { month: 'Mar', revenue: 18200, subscriptions: 58 },
  { month: 'Apr', revenue: 21800, subscriptions: 64 },
  { month: 'May', revenue: 25400, subscriptions: 71 },
  { month: 'Jun', revenue: 28900, subscriptions: 78 }
]

export default function PricingPage() {
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
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green">Plan</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Flexible pricing options for every creative need. From individual designs to enterprise solutions.
            </p>
          </motion.div>

          {/* Subscription Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Subscription Plans</h2>
            <SubscriptionTiers />
          </motion.div>

          {/* Dynamic Pricing Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Custom Design Pricing</h2>
                <p className="text-gray-400 mb-6">
                  Get an instant quote for your custom tattoo design. Adjust the parameters to see how different factors affect the price.
                </p>
                <DynamicPricingCalculator />
              </div>
              
              <div className="space-y-6">
                {/* Financial Analytics Dashboard */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Revenue Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Monthly revenue and subscription growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="month" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="revenue" fill="url(#gradient)" />
                          <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00d4ff" />
                              <stop offset="100%" stopColor="#39ff14" />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-electric-blue/20 rounded-lg">
                          <DollarSign className="w-5 h-5 text-electric-blue" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Monthly Revenue</p>
                          <p className="text-white font-bold text-xl">$28,900</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-neon-green/20 rounded-lg">
                          <Users className="w-5 h-5 text-neon-green" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Active Subscribers</p>
                          <p className="text-white font-bold text-xl">78</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Payment History</h2>
            <PaymentHistory />
          </motion.div>
        </div>
      </main>
    </div>
  )
}
