import Link from "next/link";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";

type Props = { title: string; price?: string; href: string };

/** Sticky enquire bar for phones and tablets on the property page. */
export function MobileEnquireBar({ title, price, href }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#101612]/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">{title}</p>
          {price && (
            <p className="truncate font-display text-[15px] font-extrabold">{price}</p>
          )}
        </div>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 shrink-0 items-center gap-3 rounded-full bg-white pl-5 pr-1.5 text-[14px] font-semibold text-[#101612]"
        >
          Enquire
          <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
            <ArrowIcon className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
