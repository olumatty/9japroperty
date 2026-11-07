import type { MetadataRoute } from "next";
import { properties } from "@/app/data/properties";
import { siteUrl } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/sell`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    ...properties.map((p) => ({
      url: `${siteUrl}/properties/${p.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
