export type Property = {
  id: string;
  title: string;
  location: string;
  type: string;
  /** Single price, e.g. "₦550M" */
  price?: string;
  /** Multi-option pricing text, used instead of `price` */
  priceNote?: string;
  image: string;
};
