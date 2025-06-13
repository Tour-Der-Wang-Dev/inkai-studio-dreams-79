
'use client'

import React from 'react'
import { ArtistProfile } from '@/types/artist'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

interface ArtistBioSectionProps {
  artist: ArtistProfile
  isOwnProfile?: boolean
}

export const ArtistBioSection: React.FC<ArtistBioSectionProps> = ({
  artist,
  isOwnProfile = false
}) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">About</CardTitle>
          {isOwnProfile && (
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Bio
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 leading-relaxed">
          {artist.bio || 'No bio available.'}
        </p>
      </CardContent>
    </Card>
  )
}
