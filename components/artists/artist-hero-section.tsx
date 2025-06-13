
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArtistProfile } from '@/types/artist'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit, MessageCircle, Star, MapPin, Calendar, Verified } from 'lucide-react'

interface ArtistHeroSectionProps {
  artist: ArtistProfile
  isOwnProfile?: boolean
}

export const ArtistHeroSection: React.FC<ArtistHeroSectionProps> = ({ 
  artist, 
  isOwnProfile = false 
}) => {
  const handleEditProfile = () => {
    // Open edit profile modal
    console.log('Edit profile clicked')
  }

  const handleMessageArtist = () => {
    // Open chat/booking modal
    console.log('Message artist clicked')
  }

  const handleBookConsultation = () => {
    // Open booking modal
    console.log('Book consultation clicked')
  }

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-8"
        >
          {/* Artist Avatar */}
          <div className="relative">
            <Avatar className="w-32 h-32 lg:w-48 lg:h-48 border-4 border-electric-blue">
              <AvatarImage src="/placeholder.svg" alt={`Artist avatar`} />
              <AvatarFallback className="bg-gray-800 text-white text-2xl">
                AR
              </AvatarFallback>
            </Avatar>
            {artist.is_verified && (
              <div className="absolute -bottom-2 -right-2 bg-electric-blue rounded-full p-2">
                <Verified className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Artist Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  Master Artist
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Los Angeles, CA</span>
                  <div className="flex items-center ml-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1">4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {isOwnProfile ? (
                  <Button
                    onClick={handleEditProfile}
                    className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleMessageArtist}
                      variant="outline"
                      className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      onClick={handleBookConsultation}
                      className="bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              {artist.specializations.map((specialization, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
                >
                  {specialization}
                </Badge>
              ))}
            </div>

            {/* Hourly Rate */}
            {artist.hourly_rate && (
              <div className="text-lg text-gray-300">
                Starting at <span className="text-neon-green font-bold">${artist.hourly_rate}/hour</span>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 lg:w-1/2">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-sm text-gray-400">Designs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
