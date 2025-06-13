
'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useArtistStore } from '@/stores/artist-store'
import { ArtistHeroSection } from './artist-hero-section'
import { ArtistBioSection } from './artist-bio-section'
import { ArtistPortfolioGrid } from './artist-portfolio-grid'
import { ArtistSkillsVisualization } from './artist-skills-visualization'
import { ArtistReviewsSection } from './artist-reviews-section'
import { ArtistAvailabilityCalendar } from './artist-availability-calendar'
import { ArtistContactInfo } from './artist-contact-info'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ArtistProfileProps {
  artistId: string
  isOwnProfile?: boolean
}

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artistId, isOwnProfile = false }) => {
  const { currentArtist, portfolio, skills, reviews } = useArtistStore()

  // Mock data loading - replace with actual API calls
  useEffect(() => {
    // This would be replaced with actual API calls to load artist data
    console.log('Loading artist profile for:', artistId)
  }, [artistId])

  if (!currentArtist) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading artist profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Hero Section */}
        <ArtistHeroSection artist={currentArtist} isOwnProfile={isOwnProfile} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="portfolio" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-gray-900 border-gray-800">
              <TabsTrigger value="portfolio" className="text-gray-400 data-[state=active]:text-electric-blue">
                Portfolio
              </TabsTrigger>
              <TabsTrigger value="about" className="text-gray-400 data-[state=active]:text-electric-blue">
                About
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-gray-400 data-[state=active]:text-electric-blue">
                Skills
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-gray-400 data-[state=active]:text-electric-blue">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="booking" className="text-gray-400 data-[state=active]:text-electric-blue">
                Booking
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-gray-400 data-[state=active]:text-electric-blue">
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="mt-8">
              <ArtistPortfolioGrid portfolio={portfolio} isOwnProfile={isOwnProfile} />
            </TabsContent>

            <TabsContent value="about" className="mt-8">
              <ArtistBioSection artist={currentArtist} isOwnProfile={isOwnProfile} />
            </TabsContent>

            <TabsContent value="skills" className="mt-8">
              <ArtistSkillsVisualization skills={skills} isOwnProfile={isOwnProfile} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <ArtistReviewsSection reviews={reviews} artistId={artistId} />
            </TabsContent>

            <TabsContent value="booking" className="mt-8">
              <ArtistAvailabilityCalendar artistId={artistId} isOwnProfile={isOwnProfile} />
            </TabsContent>

            <TabsContent value="contact" className="mt-8">
              <ArtistContactInfo artist={currentArtist} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}
