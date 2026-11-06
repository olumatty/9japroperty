import Link from "next/link";
import type { Property } from "@/app/types/property";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";

export function PropertyCard({ property }: { property: Property }) {
  const { title, location, type, price, priceNote, image } = property;

  return (
    <article className="rounded-[28px] border border-white/5 bg-surface p-2 pb-8">
      <div
        role="img"
        aria-label={title}
        className="h-[340px] rounded-[20px] bg-[#16201a] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="flex flex-col gap-3 px-6 pt-6">
        <h3 className="text-[28px] leading-[1.15]">{title}</h3>

        <p className="text-[13px] font-medium text-white/60">
          {location} · {type}
        </p>

        {price && <p className="text-[14px] font-semibold">{price}</p>}
        {priceNote && (
          <p className="text-[14px] font-semibold leading-snug">{priceNote}</p>
        )}

        <Link
          href="#consultation"
          className="mt-1 inline-flex h-[52px] w-fit items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
        >
          Enquire
          <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
            <ArrowIcon className="size-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}
