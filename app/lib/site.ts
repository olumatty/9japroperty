/** Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
