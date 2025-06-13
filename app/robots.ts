import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/analytics/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/analytics/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/analytics/', '/auth/'],
      },
    ],
    sitemap: 'https://inkaistudio.com/sitemap.xml',
  }
}