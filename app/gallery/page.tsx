
'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/ui/navigation'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { GalleryFilters } from '@/components/gallery/gallery-filters'
import { GalleryModal } from '@/components/gallery/gallery-modal'
import { useGalleryStore } from '@/stores/gallery-store'
import { useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

// Mock data generator for demonstration
const generateMockData = (page: number, limit: number) => {
  const styles = ['Realistic', 'Traditional', 'Geometric', 'Watercolor', 'Minimalist', 'Neo-Traditional'];
  const bodyParts = ['Arm', 'Leg', 'Back', 'Chest', 'Shoulder', 'Wrist'];
  const artists = ['Alex Chen', 'Sarah Kim', 'Mike Rodriguez', 'Emma Thompson', 'David Park', 'Lisa Wang'];
  const colors = ['Black', 'Red', 'Blue', 'Green', 'Purple', 'Orange'];

  return Array.from({ length: limit }, (_, i) => ({
    id: `${page}-${i}`,
    imageUrl: `/lovable-uploads/${['0054f817-2244-44d2-81b9-1611ad4bc89d', 'e23b9249-3729-4797-a77f-1f0eb59db256', '7ded6218-6d2c-4efe-923f-312633f0f2f3', '0b7ab356-de3b-4783-8746-d4938c6712f8', 'a2f0b7bd-6ea3-4229-a9ce-94dc279b6ca4', '4a11d10b-9c79-4d6d-88f9-b1212fa82a7d'][i % 6]}.png`,
    thumbnailUrl: `/lovable-uploads/${['0054f817-2244-44d2-81b9-1611ad4bc89d', 'e23b9249-3729-4797-a77f-1f0eb59db256', '7ded6218-6d2c-4efe-923f-312633f0f2f3', '0b7ab356-de3b-4783-8746-d4938c6712f8', 'a2f0b7bd-6ea3-4229-a9ce-94dc279b6ca4', '4a11d10b-9c79-4d6d-88f9-b1212fa82a7d'][i % 6]}.png`,
    title: `Design ${page * limit + i + 1}`,
    artist: artists[i % artists.length],
    style: styles[i % styles.length],
    bodyPart: bodyParts[i % bodyParts.length],
    colors: [colors[i % colors.length], colors[(i + 1) % colors.length]],
    isAiEnhanced: Math.random() > 0.5,
    processSteps: [],
    metadata: {
      aiInvolvement: Math.floor(Math.random() * 100),
      processingTime: Math.floor(Math.random() * 30000) + 5000,
    },
    likes: Math.floor(Math.random() * 500) + 10,
    views: Math.floor(Math.random() * 2000) + 50,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    rating: Math.random() * 5,
  }));
};

export default function GalleryPage() {
  const { setItems, selectedItem } = useGalleryStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['gallery-items'],
    queryFn: ({ pageParam = 1 }) => {
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(generateMockData(pageParam, 12));
        }, 500);
      });
    },
    getNextPageParam: (lastPage, pages) => {
      return pages.length < 10 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (data) {
      const allItems = data.pages.flat();
      setItems(allItems);
    }
  }, [data, setItems]);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-green">Gallery</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore thousands of AI-generated and artist-created tattoo designs
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80 flex-shrink-0">
              <GalleryFilters />
            </aside>
            
            <div className="flex-1">
              <GalleryGrid
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                onLoadMore={fetchNextPage}
              />
            </div>
          </div>
        </div>
      </main>
      
      {selectedItem && <GalleryModal />}
    </div>
  )
}
