
'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/ui/navigation'
import { ArtistProfile } from '@/components/artists/artist-profile'
import { useArtistStore } from '@/stores/artist-store'
import { ArtistProfile as ArtistProfileType } from '@/types/artist'

export default function ArtistProfilePage() {
  const params = useParams()
  const artistId = params.id as string
  const { setCurrentArtist, setPortfolio, setSkills, setReviews } = useArtistStore()

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockArtist: ArtistProfileType = {
      id: artistId,
      user_id: 'user-123',
      bio: 'Passionate tattoo artist specializing in realistic and traditional styles with 8 years of experience.',
      specializations: ['Realistic', 'Traditional', 'Portrait', 'Black & Gray'],
      hourly_rate: 150,
      is_verified: true,
      portfolio_images: [],
      social_links: {
        instagram: '@artist_ink',
        website: 'https://artistink.com'
      },
      availability_settings: {
        timezone: 'America/Los_Angeles',
        working_hours: { start: '10:00', end: '18:00' },
        working_days: [1, 2, 3, 4, 5]
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    setCurrentArtist(mockArtist)

    // Mock portfolio data
    setPortfolio([
      {
        id: '1',
        artist_id: artistId,
        title: 'Realistic Lion Portrait',
        description: 'A detailed realistic lion portrait on the shoulder',
        image_url: '/placeholder.svg',
        style: 'realistic',
        body_part: 'shoulder',
        collaboration_type: 'traditional',
        process_steps: [],
        metadata: { tags: ['lion', 'portrait', 'realistic'], difficulty: 8 },
        is_featured: true,
        display_order: 0,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        artist_id: artistId,
        title: 'AI-Enhanced Dragon',
        description: 'Modern dragon design created with AI assistance',
        image_url: '/placeholder.svg',
        style: 'modern',
        body_part: 'back',
        collaboration_type: 'ai',
        process_steps: [],
        metadata: { tags: ['dragon', 'ai', 'modern'], difficulty: 9 },
        is_featured: false,
        display_order: 1,
        created_at: new Date().toISOString()
      }
    ])

    // Mock skills data
    setSkills([
      {
        id: '1',
        artist_id: artistId,
        skill_name: 'Realistic Portraits',
        proficiency_level: 95,
        years_experience: 8,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        artist_id: artistId,
        skill_name: 'Traditional Style',
        proficiency_level: 90,
        years_experience: 6,
        created_at: new Date().toISOString()
      }
    ])

    // Mock reviews data
    setReviews([
      {
        id: '1',
        artist_id: artistId,
        client_id: 'client-1',
        rating: 5,
        review_text: 'Amazing work! The attention to detail is incredible.',
        review_images: [],
        is_verified: true,
        created_at: new Date().toISOString(),
        client: {
          full_name: 'John Doe',
          avatar_url: '/placeholder.svg'
        }
      }
    ])
  }, [artistId, setCurrentArtist, setPortfolio, setSkills, setReviews])

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-20">
        <ArtistProfile artistId={artistId} />
      </main>
    </div>
  )
}
