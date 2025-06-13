
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArtistPortfolioItem } from '@/types/artist'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, Eye, Plus, Filter, Grid, List } from 'lucide-react'
import { PortfolioModal } from './portfolio-modal'

interface ArtistPortfolioGridProps {
  portfolio: ArtistPortfolioItem[]
  isOwnProfile?: boolean
}

export const ArtistPortfolioGrid: React.FC<ArtistPortfolioGridProps> = ({
  portfolio,
  isOwnProfile = false
}) => {
  const [selectedItem, setSelectedItem] = useState<ArtistPortfolioItem | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterStyle, setFilterStyle] = useState<string>('all')
  const [filterCollaboration, setFilterCollaboration] = useState<string>('all')

  // Filter portfolio items
  const filteredPortfolio = portfolio.filter(item => {
    const styleMatch = filterStyle === 'all' || item.style === filterStyle
    const collabMatch = filterCollaboration === 'all' || item.collaboration_type === filterCollaboration
    return styleMatch && collabMatch
  })

  const handleAddPortfolioItem = () => {
    // Open add portfolio item modal
    console.log('Add portfolio item clicked')
  }

  const handleItemClick = (item: ArtistPortfolioItem) => {
    setSelectedItem(item)
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by:</span>
          </div>
          
          <Select value={filterStyle} onValueChange={setFilterStyle}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Styles</SelectItem>
              <SelectItem value="traditional">Traditional</SelectItem>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
              <SelectItem value="tribal">Tribal</SelectItem>
              <SelectItem value="geometric">Geometric</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCollaboration} onValueChange={setFilterCollaboration}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="ai">AI Generated</SelectItem>
              <SelectItem value="traditional">Traditional</SelectItem>
              <SelectItem value="hybrid">AI + Human</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {isOwnProfile && (
            <Button
              onClick={handleAddPortfolioItem}
              className="bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          )}
          
          <div className="flex bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <motion.div
        layout
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }
      >
        <AnimatePresence mode="popLayout">
          {filteredPortfolio.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer"
            >
              <Card className="bg-gray-900 border-gray-800 hover:border-electric-blue/50 transition-all duration-300 overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Collaboration Type Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge
                      variant={item.collaboration_type === 'ai' ? 'default' : 'secondary'}
                      className={
                        item.collaboration_type === 'ai'
                          ? 'bg-electric-blue text-white'
                          : item.collaboration_type === 'hybrid'
                          ? 'bg-neon-green text-black'
                          : 'bg-gray-600 text-white'
                      }
                    >
                      {item.collaboration_type === 'ai' ? 'AI' : 
                       item.collaboration_type === 'hybrid' ? 'AI+' : 'Traditional'}
                    </Badge>
                  </div>

                  {item.is_featured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gold text-black">Featured</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="text-white font-semibold truncate">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline" className="text-xs">
                      {item.style}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Eye className="w-3 h-3" />
                      <span>124</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPortfolio.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">No portfolio items found</div>
          {isOwnProfile && (
            <Button
              onClick={handleAddPortfolioItem}
              className="bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          )}
        </div>
      )}

      {/* Portfolio Modal */}
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
