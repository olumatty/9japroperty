import type { CategoryName } from "@/app/data/categories";

export type Property = {
  id: string;
  title: string;
  location: string;
  /** City used to group properties on the Nigeria page */
  city: "Abuja" | "Lagos" | "Abeokuta";
  type: string;
  /** Luxury, Dilapidated or Off-plan: decides which home page section it appears in */
  category: CategoryName;
  /** Single price, e.g. "₦550M" */
  price?: string;
  /** Multi-option pricing text, used instead of `price` */
  priceNote?: string;
  /** Card / main detail image */
  image: string;
  /** Extra detail-page images (interior, exterior, etc.) */
  gallery?: string[];
  /** Key facts shown as tiles under the photos */
  facts?: { label: string; value: string }[];
  /** Short description shown on the detail page */
  summary?: string;
  /** Feature list shown on the detail page */
  features?: string[];
};
