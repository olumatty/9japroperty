import Link from "next/link";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export function SellCta() {
  return (
    <section
      id="sell"
      className="mx-auto w-full max-w-[1480px] scroll-mt-6 px-4 py-10 sm:px-5 lg:px-6"
    >
      <div className="reveal flex flex-col gap-8 rounded-[32px] border border-white/10 bg-surface p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">
        <div>
          <p className={labelClass}>Sell with The9jaPropertyChic</p>

          <h2 className="mt-6 max-w-[720px] text-5xl leading-[1.02] sm:text-6xl lg:text-[64px]">
            Have a property to sell?
          </h2>

          <p className="mt-6 max-w-[620px] text-[16px] font-medium leading-7">
            Share your property details and we’ll continue the conversation on
            WhatsApp. Land, homes, off-plan or commercial space.
          </p>
        </div>

        <Link
          href="/sell"
          className="arrow-nudge inline-flex h-[52px] w-fit shrink-0 items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
        >
          Sell your property
          <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
            <ArrowIcon className="size-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
