
'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { GalleryCard } from './gallery-card'
import { useGalleryStore } from '@/stores/gallery-store'
import { Loader2 } from 'lucide-react'

interface GalleryGridProps {
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean | undefined
  onLoadMore: () => void
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
}) => {
  const { filteredItems } = useGalleryStore()
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          onLoadMore()
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [isFetchingNextPage, hasNextPage, onLoadMore]
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-electric-blue" />
      </div>
    )
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg mb-4">No designs found matching your criteria</p>
        <p className="text-gray-500">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            ref={index === filteredItems.length - 1 ? lastElementRef : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="break-inside-avoid mb-6"
          >
            <GalleryCard item={item} />
          </motion.div>
        ))}
      </div>

      {/* Loading More Indicator */}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-electric-blue mr-2" />
          <span className="text-gray-400">Loading more designs...</span>
        </div>
      )}

      {/* End of Results */}
      {!hasNextPage && filteredItems.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end of the gallery</p>
        </div>
      )}
    </div>
  )
}
