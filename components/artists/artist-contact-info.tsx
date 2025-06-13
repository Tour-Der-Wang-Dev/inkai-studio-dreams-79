
'use client'

import React from 'react'
import { ArtistProfile } from '@/types/artist'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Instagram, Globe, Mail, Phone } from 'lucide-react'

interface ArtistContactInfoProps {
  artist: ArtistProfile
}

export const ArtistContactInfo: React.FC<ArtistContactInfoProps> = ({ artist }) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Contact via InkAI Studio</span>
        </div>
        
        {artist.social_links.instagram && (
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-gray-400" />
            <a
              href={`https://instagram.com/${artist.social_links.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue hover:underline"
            >
              {artist.social_links.instagram}
            </a>
          </div>
        )}

        {artist.social_links.website && (
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <a
              href={artist.social_links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue hover:underline"
            >
              Visit Website
            </a>
          </div>
        )}

        <div className="pt-4">
          <Button className="w-full bg-gradient-to-r from-electric-blue to-neon-green hover:from-electric-blue/90 hover:to-neon-green/90">
            Book Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
