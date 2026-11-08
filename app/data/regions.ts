export type Region = {
  slug: string;
  name: string;
  /** Nigeria is live; every other region is a coming-soon page for now. */
  live: boolean;
};

export const regions: Region[] = [
  { slug: "united-kingdom", name: "United Kingdom", live: false },
  { slug: "united-states", name: "United States", live: false },
  { slug: "canada", name: "Canada", live: false },
  { slug: "europe", name: "Europe", live: false },
  { slug: "nigeria", name: "Nigeria", live: true },
];

export function getRegion(slug: string) {
  return regions.find((r) => r.slug === slug);
}

/** Cities shown on the Nigeria page. */
export const nigeriaCities = ["Abuja", "Lagos", "Abeokuta"] as const;
export type NigeriaCity = (typeof nigeriaCities)[number];
