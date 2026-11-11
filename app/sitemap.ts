import type { MetadataRoute } from "next";
import { categories } from "@/app/data/categories";
import { citySlug, nigeriaCities, regions } from "@/app/data/regions";
import { properties } from "@/app/data/properties";
import { siteUrl } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/properties`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/sell`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/consultancy`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/shortlets`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/december`, changeFrequency: "monthly", priority: 0.7 },
    ...categories.map((c) => ({
      url: `${siteUrl}/categories/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...nigeriaCities.map((c) => ({
      url: `${siteUrl}/cities/${citySlug(c)}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...regions.map((r) => ({
      url: `${siteUrl}/regions/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: r.live ? 0.8 : 0.3,
    })),
    ...properties.map((p) => ({
      url: `${siteUrl}/properties/${p.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
