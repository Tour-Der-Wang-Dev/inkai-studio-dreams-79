
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/ui/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Palette, Sparkles, Users, Zap } from 'lucide-react'

export default function StudioPage() {
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
              Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green">Perfect Design</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Welcome to the InkAI Studio - where artificial intelligence meets artistic mastery to create stunning tattoo designs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Palette,
                title: "AI Design Generator",
                description: "Create unique designs with advanced AI",
                href: "/create-design"
              },
              {
                icon: Users,
                title: "Artist Collaboration",
                description: "Work with professional tattoo artists",
                href: "/artists"
              },
              {
                icon: Sparkles,
                title: "Style Library",
                description: "Explore thousands of design styles",
                href: "/gallery"
              },
              {
                icon: Zap,
                title: "Quick Generator",
                description: "Generate designs in seconds",
                href: "/create-design"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 hover:border-electric-blue/50 transition-all duration-300 cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-neon-green rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Ready to Create?</CardTitle>
                <CardDescription className="text-gray-400">
                  Start your tattoo design journey with our AI-powered tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90"
                >
                  Start Creating Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
