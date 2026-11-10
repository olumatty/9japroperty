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
    slug: "off-plan",
    name: "Off-plan",
    title: "Off-plan properties",
    blurb: "Properties sold before completion and built to plan.",
  },
] as const;

export type CategoryName = (typeof categories)[number]["name"];
