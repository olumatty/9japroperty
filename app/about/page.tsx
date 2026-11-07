import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about } from "@/app/data/about";
import { contact } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { Footer } from "@/app/components/footer/Footer";
import { labelClass } from "@/app/lib/styles";

export const metadata: Metadata = {
  title: "About | The9jaPropertyChic",
  description:
    "Meet Kofoworola Oke, real estate consultant, property investor and property connector behind The9jaPropertyChic.",
};

const delay = (n: number) => ({ "--d": n }) as React.CSSProperties;

export default function AboutPage() {
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

        <section className="mt-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className={`${labelClass} rise`} style={delay(1)}>
              {about.roles}
            </p>

            <h1
              className="rise mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-[72px]"
              style={delay(2)}
            >
              {about.heading}
            </h1>

            <p
              className="rise mt-6 font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
              style={delay(3)}
            >
              {about.name}
            </p>

            <div className="mt-8 flex max-w-[640px] flex-col gap-5">
              {about.paragraphs.map((text, i) => (
                <p
                  key={i}
                  className="rise text-[16px] font-medium leading-7"
                  style={delay(4 + i)}
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="rise mt-10 flex flex-wrap gap-4" style={delay(6)}>
              <Link
                href={contact.enquiryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
              >
                Chat on WhatsApp
                <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
              <Link
                href="/#properties"
                className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full border border-white/10 bg-surface pl-6 pr-2 text-[15px] font-semibold transition hover:bg-[#243029]"
              >
                View Properties
                <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612]">
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          <div
            className="rise relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-[32px] bg-surface lg:max-w-none"
            style={{ "--d": 3 } as React.CSSProperties}
          >
            <Image
              src={about.image}
              alt={about.imageAlt}
              fill
              preload
              sizes="(min-width: 1024px) 40vw, 520px"
              className="object-cover object-top"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
