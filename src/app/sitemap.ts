import type { MetadataRoute } from 'next';

import { profile, projects } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: profile.siteUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${profile.siteUrl}/project/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
