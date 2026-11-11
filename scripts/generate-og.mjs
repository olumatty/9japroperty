// Builds a 1200x630 share image for every property: public/og/<id>.jpg
// Run after adding or changing a listing:  pnpm og
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { properties } from "../app/data/properties.ts";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "public/og");
mkdirSync(out, { recursive: true });

const W = 1200;
const H = 630;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max, lines) {
  const words = text.split(" ");
  const rows = [""];
  for (const w of words) {
    const row = rows[rows.length - 1];
    if ((row + " " + w).trim().length <= max) rows[rows.length - 1] = (row + " " + w).trim();
    else rows.push(w);
  }
  if (rows.length > lines) {
    rows.length = lines;
    rows[lines - 1] = rows[lines - 1].replace(/\s*\S*$/, "") + "…";
  }
  return rows;
}

function priceLabel(p) {
  if (p.price) return p.price;
  if (p.priceNote) {
    const first = p.priceNote.match(/₦[\d.,]+\s*[KMB]?/i);
    return first ? `From ${first[0].trim()}` : "";
  }
  return "";
}

const logo = await sharp(join(root, "public/brand/logo-full.png")).resize({ height: 86 }).toBuffer();

for (const p of properties) {
  const photo = await sharp(join(root, "public", p.image)).resize(W, H, { fit: "cover" }).toBuffer();
  const title = wrap(p.title, 30, 2);
  const price = priceLabel(p);
  const titleY = 470 - (title.length - 1) * 0;
  const rows = title
    .map((t, i) => `<text x="52" y="${titleY + i * 62}" font-size="54" font-weight="700" fill="#fff">${esc(t)}</text>`)
    .join("");
  const locY = titleY + (title.length - 1) * 62 + 52;

  const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <defs>
      <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101612" stop-opacity="0"/><stop offset="0.4" stop-color="#101612" stop-opacity="0.7"/><stop offset="1" stop-color="#101612" stop-opacity="0.97"/></linearGradient>
      <linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101612" stop-opacity="0.75"/><stop offset="1" stop-color="#101612" stop-opacity="0"/></linearGradient>
    </defs>
    <rect y="0" width="${W}" height="190" fill="url(#t)"/>
    <rect y="220" width="${W}" height="410" fill="url(#b)"/>
    <rect x="52" y="${titleY - 100}" width="${p.category.length * 15 + 40}" height="40" rx="20" fill="#fff"/>
    <text x="72" y="${titleY - 73}" font-size="19" font-weight="700" letter-spacing="2" fill="#101612">${esc(p.category.toUpperCase())}</text>
    ${rows}
    <text x="52" y="${locY}" font-size="30" font-weight="500" fill="#fff" fill-opacity="0.8">${esc(p.location)}</text>
    ${price ? `<text x="${W - 52}" y="${locY}" font-size="58" font-weight="700" text-anchor="end" fill="#fff">${esc(price)}</text>` : ""}
  </svg>`;

  await sharp(photo)
    .composite([
      { input: Buffer.from(overlay) },
      { input: logo, left: 48, top: 36 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(out, `${p.id}.jpg`));
  console.log("og:", p.id);
}
