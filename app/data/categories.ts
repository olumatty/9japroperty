export const categories = [
  {
    slug: "luxury",
    name: "Luxury",
    title: "Luxury properties",
    blurb: "Premium homes in prime locations.",
  },
  {
    slug: "dilapidated",
    name: "Dilapidated",
    title: "Dilapidated properties",
    blurb: "Properties that need renovation, for buyers who can see the potential.",
  },
  {
    slug: "land",
    name: "Land",
    title: "Land properties",
    blurb: "Plots and land for sale, for building or investment.",
  },
  {
    slug: "off-plan",
    name: "Off-plan",
    title: "Off-plan properties",
    blurb: "Properties sold before completion and built to plan.",
  },
] as const;

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** How many properties each category shows on the home page before "See more". */
export const HOME_LIMIT = 3;

export type CategoryName = (typeof categories)[number]["name"];
