
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGalleryStore } from '@/stores/gallery-store'
import {
  X, Heart, Share2, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  Clock, Palette, Sparkles, User, Eye, ThumbsUp, Info, Image as ImageIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const GalleryModal: React.FC = () => {
  const { selectedItem, setSelectedItem, favorites, toggleFavorite, filteredItems } = useGalleryStore()
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showMetadata, setShowMetadata] = useState(false)
  
  const currentIndex = filteredItems.findIndex(item => item.id === selectedItem?.id)
  const canGoNext = currentIndex < filteredItems.length - 1
  const canGoPrev = currentIndex > 0

  const handleClose = () => {
    setSelectedItem(null)
    setZoomLevel(1)
  }

  const handleNext = () => {
    if (canGoNext) {
      setSelectedItem(filteredItems[currentIndex + 1])
      setZoomLevel(1)
    }
  }

  const handlePrev = () => {
    if (canGoPrev) {
      setSelectedItem(filteredItems[currentIndex - 1])
      setZoomLevel(1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'ArrowLeft') handlePrev()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  const handleFavorite = () => {
    if (selectedItem) {
      toggleFavorite(selectedItem.id)
    }
  }

  const handleShare = async () => {
    if (selectedItem && navigator.share) {
      try {
        await navigator.share({
          title: selectedItem.title,
          text: `Check out this amazing tattoo design by ${selectedItem.artist}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  const handleDownload = () => {
    if (selectedItem) {
      const link = document.createElement('a')
      link.href = selectedItem.imageUrl
      link.download = `${selectedItem.title}-${selectedItem.artist}.jpg`
      link.click()
    }
  }

  const isFavorited = selectedItem && favorites.includes(selectedItem.id)

  if (!selectedItem) return null

  return (
    <Dialog open={!!selectedItem} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black border-gray-800">
        <div className="flex h-full">
          {/* Image Section */}
          <div className="flex-1 relative bg-gray-900 overflow-hidden">
            {/* Navigation Arrows */}
            {canGoPrev && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}
            
            {canGoNext && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <span className="bg-black/50 text-white px-3 py-1 rounded-md text-sm">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
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
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-black/50 hover:bg-black/70 text-white"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center h-full p-8">
              <motion.img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="max-w-full max-h-full object-contain"
                style={{ transform: `scale(${zoomLevel})` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag={zoomLevel > 1}
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              />
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-96 bg-gray-900 border-l border-gray-800 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{selectedItem.artist}</span>
                  </div>
                  {selectedItem.isAiEnhanced && (
                    <Badge className="bg-gradient-to-r from-electric-blue to-neon-green text-black">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Enhanced
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {selectedItem.likes}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedItem.views}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {selectedItem.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    {selectedItem.style}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    {selectedItem.bodyPart}
                  </Badge>
                  {selectedItem.colors.map(color => (
                    <Badge key={color} variant="outline" className="border-gray-600 text-gray-400">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                  <TabsTrigger value="details" className="text-gray-400 data-[state=active]:text-white">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="process" className="text-gray-400 data-[state=active]:text-white">
                    Process
                  </TabsTrigger>
                  <TabsTrigger value="similar" className="text-gray-400 data-[state=active]:text-white">
                    Similar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  {/* AI Metadata */}
                  {selectedItem.isAiEnhanced && selectedItem.metadata && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-300 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI Information
                      </h4>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        {selectedItem.metadata.aiInvolvement && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">AI Involvement</span>
                            <span className="text-neon-green">{selectedItem.metadata.aiInvolvement}%</span>
                          </div>
                        )}
                        {selectedItem.metadata.processingTime && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Processing Time</span>
                            <span className="text-white">{(selectedItem.metadata.processingTime / 1000).toFixed(1)}s</span>
                          </div>
                        )}
                        {selectedItem.metadata.model && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">AI Model</span>
                            <span className="text-white">{selectedItem.metadata.model}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Color Palette */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300 flex items-center">
                      <Palette className="w-4 h-4 mr-2" />
                      Color Palette
                    </h4>
                    <div className="flex space-x-2">
                      {selectedItem.colors.map(color => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full border border-gray-600"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="process" className="space-y-4">
                  {selectedItem.processSteps.length > 0 ? (
                    <div className="space-y-4">
                      {selectedItem.processSteps.map(step => (
                        <div key={step.step} className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-electric-blue text-black rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                            <span className="text-gray-300 text-sm">{step.timestamp}</span>
                          </div>
                          <p className="text-white">{step.description}</p>
                          {step.imageUrl && (
                            <img
                              src={step.imageUrl}
                              alt={`Step ${step.step}`}
                              className="w-full h-32 object-cover rounded-md mt-2"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No process steps available</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="similar" className="space-y-4">
                  <div className="text-center text-gray-500 py-8">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Similar designs feature coming soon...</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
