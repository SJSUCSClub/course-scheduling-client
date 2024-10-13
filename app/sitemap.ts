import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date().toISOString(),
      // changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses`,
      lastModified: new Date().toISOString(),
      // changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/professors`,
      lastModified: new Date().toISOString(),
      // changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
