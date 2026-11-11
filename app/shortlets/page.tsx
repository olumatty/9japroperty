import type { Metadata } from "next";
import Link from "next/link";
import { shortletEnquiryHref } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { Footer } from "@/app/components/footer/Footer";
import { labelClass } from "@/app/lib/styles";

export const metadata: Metadata = {
  title: "Shortlets | Coming soon | The9jaPropertyChic",
  description: "Our shortlets page is coming soon.",
};

const delay = (n: number) => ({ "--d": n }) as React.CSSProperties;

export default function ShortletsPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1480px] px-4 pb-20 pt-8 sm:px-5 lg:px-6">
        <Link
          href="/"
          className="group rise inline-flex h-[52px] items-center gap-3 rounded-full border border-white/10 bg-surface pl-2 pr-6 text-[15px] font-semibold transition hover:border-white/25 hover:bg-[#243029]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612] transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowIcon className="size-4 rotate-[-135deg]" />
          </span>
          Back to home
        </Link>

        <section className="relative mt-10 overflow-hidden rounded-[32px] bg-surface px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[120px] leading-none text-white/[0.04] sm:text-[220px] lg:text-[300px]"
          >
            Soon
          </span>
          <div className="relative">
            <p className={`${labelClass} rise`} style={delay(1)}>
              Shortlets
            </p>
            <h1
              className="rise mt-6 max-w-[760px] text-[40px] leading-[1.04] sm:text-6xl lg:text-[72px]"
              style={delay(2)}
            >
              Shortlets are coming soon.
            </h1>
            <p
              className="rise mt-6 max-w-[560px] text-[16px] font-medium leading-7"
              style={delay(3)}
            >
              We’re preparing our shortlet listings. In the meantime, tell us
              your dates and number of guests on WhatsApp and we’ll help you
              find a place.
            </p>
            <div className="rise mt-10 flex flex-wrap gap-4" style={delay(4)}>
              <Link
                href={shortletEnquiryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
              >
                Ask about shortlets on WhatsApp
                <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
              <Link
                href="/#properties"
                className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full border border-white/10 bg-[#101612]/60 pl-6 pr-2 text-[15px] font-semibold transition hover:bg-[#243029]"
              >
                Browse properties
                <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612]">
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
