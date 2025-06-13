
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePricingStore } from '@/stores/pricing-store'
import { Check, Star, Zap } from 'lucide-react'

export const SubscriptionTiers: React.FC = () => {
  const { subscriptionTiers, currentSubscription } = usePricingStore()

  const handleSubscribe = (tier: any) => {
    // Handle subscription logic here
    console.log('Subscribe to:', tier.name)
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {subscriptionTiers.map((tier, index) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
        >
          <Card className={`bg-gray-900 border-gray-800 h-full ${
            tier.popular ? 'border-electric-blue shadow-lg shadow-electric-blue/20' : ''
          } ${currentSubscription?.id === tier.id ? 'ring-2 ring-neon-green' : ''}`}>
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-electric-blue to-neon-green text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-white text-xl">{tier.name}</CardTitle>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green">
                ${tier.price}
                <span className="text-sm text-gray-400 font-normal">/{tier.interval}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-electric-blue to-neon-green rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>
                    {tier.features.aiGenerations === -1 
                      ? 'Unlimited AI Generations'
                      : `${tier.features.aiGenerations} AI Generations`
                    }
                  </span>
                </li>
                
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-electric-blue to-neon-green rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>
                    {tier.features.designRevisions === -1 
                      ? 'Unlimited Design Revisions'
                      : `${tier.features.designRevisions} Design Revisions`
                    }
                  </span>
                </li>

                {tier.features.premiumStyles && (
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-electric-blue to-neon-green rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Premium Style Library</span>
                  </li>
                )}

                {tier.features.prioritySupport && (
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-electric-blue to-neon-green rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span>Priority Support</span>
                  </li>
                )}

                {tier.features.collaborationTools && (
                  <li className="flex items-center gap-3 text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-electric-blue to-neon-green rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span>Collaboration Tools</span>
                  </li>
                )}

                <li className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-electric-blue to-neon-green rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Export: {tier.features.exportFormats.join(', ')}</span>
                </li>
              </ul>

              <Button
                className={`w-full ${
                  currentSubscription?.id === tier.id
                    ? 'bg-neon-green hover:bg-neon-green/90'
                    : tier.popular
                    ? 'bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
                onClick={() => handleSubscribe(tier)}
              >
                {currentSubscription?.id === tier.id ? 'Current Plan' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
