import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/agent-form', '/parabens'],
      },
    ],
    sitemap: 'https://visioncompany.ai/sitemap.xml',
  }
}
