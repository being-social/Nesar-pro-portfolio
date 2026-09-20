import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nesar.build';
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/work/entelligence`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/work/composio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/motion`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/motion/agent-insights`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/lab`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
