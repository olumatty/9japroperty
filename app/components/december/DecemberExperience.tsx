import Link from "next/link";
import { shortletEnquiryHref } from "@/app/data/contact";
import { decemberSteps } from "@/app/data/december-steps";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export function DecemberExperience() {
  return (
    <section
      id="december"
      className="mx-auto w-full max-w-[1480px] scroll-mt-6 px-4 pb-20 pt-16 sm:px-5 lg:px-6"
    >
      <p className={`${labelClass} reveal`}>The December experience</p>

      <h2 className="reveal mt-5 text-5xl leading-none sm:text-6xl lg:text-[64px]">
        Find your December home.
      </h2>

      <p className="reveal mt-7 max-w-[1100px] text-[16px] font-medium leading-7">
        Premium Airbnb, ready for the season. December apartments are being
        confirmed. Message us for current options, rates and availability.
      </p>

      <p className={`${labelClass} reveal mt-6`}>
        Airbnb · Airport pickup · Arrival support
      </p>

      <h3 className="reveal mt-8 font-display text-2xl font-extrabold leading-tight sm:text-[26px]">
        Coming home for December? We’ve got your landing covered.
      </h3>

      <p className="reveal mt-6 max-w-[1100px] text-[16px] font-medium leading-7">
        Returning to Nigeria from the UK or anywhere in the diaspora? Book your
        Airbnb and let our team help make your arrival smoother, from airport
        pickup to settling into your apartment.
      </p>

      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {decemberSteps.map((step, i) => (
          <li
            key={step.title}
            style={{ "--i": i } as React.CSSProperties}
            className="wave-card flex min-h-[166px] flex-col gap-3 rounded-[20px] border border-white/10 bg-surface p-6"
          >
            <span className="font-display text-[11px] font-bold tracking-widest text-white/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[17px] font-bold">
              {step.title}
            </span>
            <span className="text-[13px] font-medium leading-[1.45] text-white/80">
              {step.text}
            </span>
          </li>
        ))}
      </ol>

      <p className="reveal mt-8 text-[15px] font-medium">
        Airport pickup and arrival support are coordinated by our team, with
        different car categories to choose from.
      </p>

      <div className="reveal mt-8 flex flex-col items-start gap-[18px]">
        <Link
          href="/december"
          className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
        >
          Plan my December stay
          <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
            <ArrowIcon className="size-4" />
          </span>
        </Link>
        <Link
          href={shortletEnquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full border border-white/10 bg-surface pl-6 pr-2 text-[15px] font-semibold transition hover:bg-[#243029]"
        >
          Explore shortlets
          <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612]">
            <ArrowIcon className="size-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
