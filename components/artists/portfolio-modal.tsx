
'use client'

import React from 'react'
import { ArtistPortfolioItem } from '@/types/artist'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Share, Download, X } from 'lucide-react'

interface PortfolioModalProps {
  item: ArtistPortfolioItem
  isOpen: boolean
  onClose: () => void
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{item.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Before/After if available */}
            {item.before_image_url && (
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={item.before_image_url}
                  alt={`${item.title} - Before`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{item.style}</Badge>
              <Badge variant="outline">{item.body_part}</Badge>
              <Badge
                className={
                  item.collaboration_type === 'ai'
                    ? 'bg-electric-blue text-white'
                    : item.collaboration_type === 'hybrid'
                    ? 'bg-neon-green text-black'
                    : 'bg-gray-600 text-white'
                }
              >
                {item.collaboration_type === 'ai' ? 'AI Generated' : 
                 item.collaboration_type === 'hybrid' ? 'AI + Human' : 'Traditional'}
              </Badge>
            </div>

            {item.metadata.tags && item.metadata.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {item.metadata.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {item.metadata.time_taken && (
              <div>
                <h4 className="text-sm font-medium">Time Taken</h4>
                <p className="text-gray-300">{item.metadata.time_taken}</p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
