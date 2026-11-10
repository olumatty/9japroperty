import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/app/types/property";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";

const i = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  className: "size-[18px]",
  "aria-hidden": true,
} as const;

const factIcons: Record<string, React.ReactNode> = {
  Bedrooms: (
    <svg {...i}>
      <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="11" r="1.5" />
    </svg>
  ),
  "Property type": (
    <svg {...i}>
      <path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
    </svg>
  ),
  "Boys’ quarters": (
    <svg {...i}>
      <path d="M3 11.5 12 4l9 7.5M6 10v10h12V10M10 20v-5h4v5" />
    </svg>
  ),
  Title: (
    <svg {...i}>
      <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />
    </svg>
  ),
};

export function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const { id, title, location, type, price, priceNote, image, gallery, category, facts } =
    property;
  const photoCount = 1 + (gallery?.length ?? 0);
  const href = `/properties/${id}`;

  return (
    <article
      style={{ "--i": index } as React.CSSProperties}
      className="reveal card-hover flex h-full flex-col rounded-[28px] border border-white/10 bg-surface p-2"
    >
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <div className="img-zoom relative h-[320px] rounded-[20px] bg-[#16201a]">
          <div className="relative size-full">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 460px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-[#101612]/75 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur">
            {category}
          </span>
          {photoCount > 1 && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#101612]/75 px-3 py-1.5 text-[12px] font-semibold backdrop-blur">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <rect x="3" y="6" width="18" height="14" rx="2" />
                <path d="M8 6l1.5-2h5L16 6" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              {photoCount}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-6 sm:px-6">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-white/70">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
            <path d="M12 21s7-5.600 7-11a7 7 0 1 0-14 0c0 5.400 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.500" />
          </svg>
          {location}
        </p>

        <h3 className="mt-3 text-[28px] leading-[1.15]">
          <Link href={href} className="transition-colors hover:text-white/80">
            {title}
          </Link>
        </h3>

        {facts && facts.length > 0 ? (
          <dl className="mb-6 mt-6 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-white/10 pt-5">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.07]">
                  {factIcons[f.label] ?? factIcons["Property type"]}
                </span>
                <div className="min-w-0">
                  <dt className="font-display text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
                    {f.label}
                  </dt>
                  <dd className="mt-0.5 text-[13px] font-semibold leading-tight">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mb-6 mt-6 border-t border-white/10 pt-5 text-[13px] font-medium text-white/70">
            {type}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-5">
          <div className="min-w-0">
            <p className="font-display text-[9px] font-bold uppercase tracking-[0.14em] text-white/50">
              Price
            </p>
            {price && <p className="mt-1 font-serif text-[30px] leading-none">{price}</p>}
            {priceNote && (
              <p className="mt-1 text-[13px] font-semibold leading-snug">{priceNote}</p>
            )}
          </div>
          <Link
            href={href}
            className="arrow-nudge inline-flex h-12 shrink-0 items-center gap-3 rounded-full bg-white pl-5 pr-1.5 text-[14px] font-semibold text-[#101612] transition hover:bg-white/90"
          >
            View details
            <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
