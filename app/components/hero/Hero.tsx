import Image from "next/image";
import Link from "next/link";
import { regions } from "@/app/data/regions";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export function Hero() {
  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 pt-2 sm:px-5 lg:px-6">
      {/* Hero card */}
      <section className="relative overflow-hidden rounded-[32px] bg-surface">
        <div className="hero-bg absolute inset-0">
          <Image
            src="/hero.webp"
            alt=""
            fill
            preload
            sizes="(min-width: 1480px) 1480px, 100vw"
            className="object-cover object-[65%_center]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16,22,18,0.85) 0%, rgba(16,22,18,0.5) 50%, rgba(16,22,18,0.15) 100%), linear-gradient(to top, rgba(16,22,18,0.5) 0%, rgba(16,22,18,0) 40%)",
          }}
        />
        <div className="relative flex min-h-[540px] flex-col justify-center gap-5 px-6 py-10 sm:px-8 lg:min-h-[720px] lg:px-12">
          <p className={`${labelClass} rise`} style={{ "--d": 2 } as React.CSSProperties}>Nigerian property, from anywhere.</p>

          <h1 style={{ "--d": 3 } as React.CSSProperties} className="rise max-w-[640px] text-5xl leading-[1.02] sm:text-6xl lg:text-[84px]">
            Your Property Connection to Nigeria.
          </h1>

          <p style={{ "--d": 4 } as React.CSSProperties} className="rise max-w-[620px] text-base font-medium leading-7 sm:text-[17px]">
            From finding property in Nigeria to helping you settle in when you
            return home, The9jaPropertyChic connects you to real estate
            opportunities and premium Airbnb experiences in Nigeria.
          </p>

          <div style={{ "--d": 5 } as React.CSSProperties} className="rise mt-2 flex flex-wrap gap-3">
            <Link
              href="#properties"
              className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
            >
              Explore properties
              <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
                <ArrowIcon className="size-4" />
              </span>
            </Link>
            <Link
              href="/consultancy"
              className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full border border-white/10 bg-[#101612]/80 pl-6 pr-2 text-[15px] font-semibold backdrop-blur transition hover:bg-[#101612]"
            >
              Book a consultation
              <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612]">
                <ArrowIcon className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Serving clients */}
      <section className="reveal mt-8 border-t border-white/10 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={labelClass}>Serving clients in</p>
          <p className="text-[15px] font-medium">
            Local expertise. Global connection.
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {regions.map((region, i) => (
            <li
              key={region.slug}
              style={{ "--i": i } as React.CSSProperties}
              className="wave-card rounded-2xl border border-white/10 bg-surface transition-colors duration-300 hover:border-white/30 hover:bg-[#243029]"
            >
              <Link
                href={`/regions/${region.slug}`}
                className="flex h-full min-h-[120px] flex-col justify-between p-5"
              >
                <span className="flex items-start justify-between">
                  <span className="font-display text-[11px] font-bold tracking-widest text-white/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowIcon className="size-4 text-white/60" />
                </span>
                <span className="font-display text-[22px] font-bold leading-tight">
                  {region.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-8">
          <p className="text-[15px] font-medium">
            Wherever you live, your next move in Nigeria starts here.
          </p>
          <Link
            href="#december"
            className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full border border-white/10 bg-surface pl-6 pr-2 text-[15px] font-semibold transition hover:bg-[#243029]"
          >
            Coming home this December?
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612]">
              <ArrowIcon className="size-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
