export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Client in London" */
  detail?: string;
};

/**
 * Add real client testimonials here, with their permission.
 * The testimonials section on the home page only appears once this
 * list has at least one entry.
 */
export const testimonials: Testimonial[] = [];
