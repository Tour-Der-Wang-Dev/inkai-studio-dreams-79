
'use client'

import React from 'react'
import { ArtistReview } from '@/types/artist'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

interface ArtistReviewsSectionProps {
  reviews: ArtistReview[]
  artistId: string
}

export const ArtistReviewsSection: React.FC<ArtistReviewsSectionProps> = ({
  reviews,
  artistId
}) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.client?.avatar_url} />
                <AvatarFallback>{review.client?.full_name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-white font-medium">
                    {review.client?.full_name || 'Anonymous'}
                  </h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{review.review_text}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
