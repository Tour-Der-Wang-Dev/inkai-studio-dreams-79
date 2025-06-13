'use client'

import React from 'react'

interface StructuredDataProps {
  type: 'organization' | 'service' | 'person' | 'product' | 'review' | 'article'
  data: any
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
    }

    switch (type) {
      case 'organization':
        return {
          ...baseSchema,
          '@type': 'Organization',
          name: data.name || 'InkAI Studio',
          description: data.description || 'AI-Powered Tattoo Design Platform',
          url: data.url || 'https://inkaistudio.com',
          logo: data.logo || 'https://inkaistudio.com/logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data.phone,
            contactType: 'customer service',
            availableLanguage: 'English'
          },
          sameAs: data.socialMedia || [
            'https://facebook.com/inkaistudio',
            'https://instagram.com/inkaistudio',
            'https://twitter.com/inkaistudio'
          ]
        }

      case 'service':
        return {
          ...baseSchema,
          '@type': 'Service',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'InkAI Studio'
          },
          areaServed: 'Worldwide',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Tattoo Design Services',
            itemListElement: data.services
          }
        }

      case 'person':
        return {
          ...baseSchema,
          '@type': 'Person',
          name: data.name,
          jobTitle: data.jobTitle || 'Tattoo Artist',
          description: data.bio,
          image: data.image,
          url: data.profileUrl,
          knowsAbout: data.specializations || [],
          workLocation: {
            '@type': 'Place',
            name: data.location
          },
          aggregateRating: data.rating && {
            '@type': 'AggregateRating',
            ratingValue: data.rating.average,
            reviewCount: data.rating.count,
            bestRating: 5,
            worstRating: 1
          }
        }

      case 'product':
        return {
          ...baseSchema,
          '@type': 'Product',
          name: data.name,
          description: data.description,
          image: data.image,
          category: 'Tattoo Design',
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'InkAI Studio'
            }
          }
        }

      case 'review':
        return {
          ...baseSchema,
          '@type': 'Review',
          reviewBody: data.reviewText,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: data.rating,
            bestRating: 5,
            worstRating: 1
          },
          author: {
            '@type': 'Person',
            name: data.authorName
          },
          itemReviewed: {
            '@type': 'Service',
            name: data.serviceName
          },
          datePublished: data.datePublished
        }

      case 'article':
        return {
          ...baseSchema,
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          image: data.image,
          author: {
            '@type': 'Organization',
            name: 'InkAI Studio'
          },
          publisher: {
            '@type': 'Organization',
            name: 'InkAI Studio',
            logo: {
              '@type': 'ImageObject',
              url: 'https://inkaistudio.com/logo.png'
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished
        }

      default:
        return baseSchema
    }
  }

  const schema = generateSchema()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Predefined schemas for common pages
export const OrganizationSchema = () => (
  <StructuredData
    type="organization"
    data={{
      name: 'InkAI Studio',
      description: 'AI-Powered Tattoo Design Platform - Create stunning tattoo designs with cutting-edge AI technology and collaborate with master artists.',
      url: 'https://inkaistudio.com',
      logo: 'https://inkaistudio.com/logo.png',
      socialMedia: [
        'https://facebook.com/inkaistudio',
        'https://instagram.com/inkaistudio',
        'https://twitter.com/inkaistudio'
      ]
    }}
  />
)

export const AIDesignServiceSchema = () => (
  <StructuredData
    type="service"
    data={{
      name: 'AI Tattoo Design Generation',
      description: 'Custom tattoo designs created using advanced artificial intelligence technology',
      services: [
        {
          '@type': 'Offer',
          name: 'Basic AI Design',
          price: '49',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          name: 'Premium AI Design',
          price: '99',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          name: 'Artist Collaboration',
          price: '199',
          priceCurrency: 'USD'
        }
      ]
    }}
  />
)