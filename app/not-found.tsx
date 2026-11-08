import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/app/components/footer/Footer";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export const metadata: Metadata = {
  title: "Page not found | The9jaPropertyChic",
};

const delay = (n: number) => ({ "--d": n }) as React.CSSProperties;

const suggestions = [
  { label: "Browse properties", href: "/#properties" },
  { label: "Sell your property", href: "/sell" },
  { label: "About", href: "/about" },
] as const;

export default function NotFound() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center px-4 pb-20 pt-12 sm:px-5 lg:px-6">
        <section className="relative overflow-hidden rounded-[32px] bg-surface px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[200px] leading-none text-white/[0.04] sm:text-[320px] lg:text-[420px]"
          >
            404
          </span>

          <div className="relative">
            <p className={`${labelClass} rise`} style={delay(1)}>
              Error 404
            </p>
            <h1
              className="rise mt-6 max-w-[760px] text-[40px] leading-[1.04] sm:text-6xl lg:text-[72px]"
              style={delay(2)}
            >
              This address doesn’t lead anywhere.
            </h1>
            <p
              className="rise mt-6 max-w-[560px] text-[16px] font-medium leading-7"
              style={delay(3)}
            >
              The page you’re looking for may have moved or no longer exists.
              Let’s get you back to finding your next property.
            </p>

            <div className="rise mt-10 flex flex-wrap gap-4" style={delay(4)}>
              <Link
                href="/"
                className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
              >
                Back to home
                <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </div>

            <ul
              className="rise mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6"
              style={delay(5)}
            >
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="link-slide text-[15px] font-semibold">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
