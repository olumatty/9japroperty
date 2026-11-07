export type Property = {
  id: string;
  title: string;
  location: string;
  type: string;
  /** Single price, e.g. "₦550M" */
  price?: string;
  /** Multi-option pricing text, used instead of `price` */
  priceNote?: string;
  /** Card / main detail image */
  image: string;
  /** Extra detail-page images (interior, exterior, etc.) */
  gallery?: string[];
  /** Short description shown on the detail page */
  summary?: string;
  /** Feature list shown on the detail page */
  features?: string[];
};
