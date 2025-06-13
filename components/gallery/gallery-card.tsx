
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Eye, Share2, Sparkles, Zap } from 'lucide-react'
import { useGalleryStore, type GalleryItem } from '@/stores/gallery-store'
import { cn } from '@/lib/utils'

interface GalleryCardProps {
  item: GalleryItem
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item }) => {
  const { favorites, toggleFavorite, setSelectedItem } = useGalleryStore()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  
  const isFavorited = favorites.includes(item.id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(item.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this amazing tattoo design by ${item.artist}`,
        url: window.location.href,
      })
    }
  }

  const handleOpenModal = () => {
    setSelectedItem(item)
  }

  return (
    <Card
      className="bg-gray-900 border-gray-800 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-electric-blue/20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleOpenModal}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          <img
            src={item.imageUrl}
            alt={item.title}
            className={cn(
              "w-full h-auto object-cover transition-all duration-500",
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              "group-hover:scale-110"
            )}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* AI Enhancement Badge */}
          {item.isAiEnhanced && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-electric-blue to-neon-green text-black border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-3"
          >
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={handleFavorite}
            >
              <Heart
                className={cn(
                  "w-4 h-4",
                  isFavorited ? "fill-red-500 text-red-500" : "text-white"
                )}
              />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Eye className="w-4 h-4 text-white" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 text-white" />
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-3">by {item.artist}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                {item.style}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                {item.bodyPart}
              </Badge>
            </div>
            
            {item.metadata.aiInvolvement && item.metadata.aiInvolvement > 50 && (
              <div className="flex items-center text-neon-green text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {item.metadata.aiInvolvement}% AI
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {item.likes}
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {item.views}
            </span>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full mr-1",
                    i < Math.floor(item.rating) ? "bg-yellow-400" : "bg-gray-600"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
