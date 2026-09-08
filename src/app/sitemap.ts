import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { ALL_FRAMES_QUERY, ALL_ARTICLES_QUERY } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lcomlunette.com';

  // Fetch dynamic routes
  const frames = await client.fetch(ALL_FRAMES_QUERY);
  const articles = await client.fetch(ALL_ARTICLES_QUERY);

  const frameUrls = frames.map((frame: any) => ({
    url: `${baseUrl}/catalogue/${frame.slug?.current || frame._id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/conseils/${article.slug?.current || article._id}`,
    lastModified: new Date(article.publishedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/conseils`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/avis`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...frameUrls,
    ...articleUrls,
  ];
}
