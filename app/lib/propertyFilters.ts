import type { Property } from "@/app/types/property";

const UNIT = { K: 1e3, M: 1e6, B: 1e9 } as const;

/** Every naira amount in a price string, e.g. "₦250M · ₦270M" → [250e6, 270e6]. */
function amounts(text: string) {
  return [...text.matchAll(/₦\s*([\d,.]+)\s*([KMB])?/gi)].map(([, n, u]) => {
    const unit = u ? UNIT[u.toUpperCase() as keyof typeof UNIT] : 1;
    return parseFloat(n.replace(/,/g, "")) * unit;
  });
}

/** Lowest price a listing shows, or null if it has none (price on request). */
export function priceOf(p: Property): number | null {
  const found = amounts(p.price ?? p.priceNote ?? "").filter((n) => Number.isFinite(n));
  return found.length ? Math.min(...found) : null;
}

export function bedroomsOf(p: Property): number | null {
  const value = p.facts?.find((f) => f.label === "Bedrooms")?.value;
  const n = value ? parseInt(value, 10) : NaN;
  return Number.isFinite(n) ? n : null;
}

export const priceBands = [
  { id: "any", label: "Any price", min: 0, max: Infinity },
  { id: "u100", label: "Under ₦100M", min: 0, max: 100e6 },
  { id: "100-250", label: "₦100M – ₦250M", min: 100e6, max: 250e6 },
  { id: "250-500", label: "₦250M – ₦500M", min: 250e6, max: 500e6 },
  { id: "o500", label: "Over ₦500M", min: 500e6, max: Infinity },
] as const;

export const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"] as const;

export const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
] as const;

export type Filters = {
  query: string;
  category: string;
  city: string;
  type: string;
  band: (typeof priceBands)[number]["id"];
  beds: (typeof bedroomOptions)[number];
  sort: (typeof sortOptions)[number]["id"];
};

export const emptyFilters: Filters = {
  query: "",
  category: "All",
  city: "All",
  type: "All",
  band: "any",
  beds: "Any",
  sort: "featured",
};

export function applyFilters(list: Property[], f: Filters) {
  const words = f.query.toLowerCase().split(/\s+/).filter(Boolean);
  const band = priceBands.find((b) => b.id === f.band) ?? priceBands[0];

  const out = list.filter((p) => {
    if (f.category !== "All" && p.category !== f.category) return false;
    if (f.city !== "All" && p.city !== f.city) return false;
    if (f.type !== "All" && p.type !== f.type) return false;

    if (f.band !== "any") {
      const price = priceOf(p);
      if (price === null || price < band.min || price >= band.max) return false;
    }

    if (f.beds !== "Any") {
      const beds = bedroomsOf(p);
      if (beds === null) return false;
      if (f.beds === "5+" ? beds < 5 : beds !== Number(f.beds)) return false;
    }

    if (words.length) {
      const hay = [p.title, p.location, p.city, p.type, p.category, p.summary, ...(p.features ?? [])]
        .join(" ")
        .toLowerCase();
      if (!words.every((w) => hay.includes(w))) return false;
    }
    return true;
  });

  if (f.sort === "featured") return out;
  // Listings without a price go last either way.
  return [...out].sort((a, b) => {
    const pa = priceOf(a);
    const pb = priceOf(b);
    if (pa === null) return 1;
    if (pb === null) return -1;
    return f.sort === "low" ? pa - pb : pb - pa;
  });
}

export function isFiltered(f: Filters) {
  return (Object.keys(emptyFilters) as (keyof Filters)[]).some(
    (k) => k !== "sort" && f[k] !== emptyFilters[k],
  );
}
