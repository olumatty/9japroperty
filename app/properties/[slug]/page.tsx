import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty, properties } from "@/app/data/properties";
import { propertyEnquiryHref } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { Footer } from "@/app/components/footer/Footer";
import { labelClass } from "@/app/lib/styles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  return {
    title: `${property.title} | The9jaPropertyChic`,
    description: `${property.title} in ${property.location}.`,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const { title, location, type, price, priceNote, image, gallery, summary, features } =
    property;
  const enquiryHref = propertyEnquiryHref(title);

  return (
    <>
      <main className="mx-auto w-full max-w-[1480px] px-4 pb-20 pt-8 sm:px-5 lg:px-6">
        <Link
          href="/#properties"
          className="group rise inline-flex h-[52px] items-center gap-3 rounded-full border border-white/10 bg-surface pl-2 pr-6 text-[15px] font-semibold transition hover:border-white/25 hover:bg-[#243029]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612] transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowIcon className="size-4 rotate-[-135deg]" />
          </span>
          Back to properties
        </Link>

        <h1 className="rise mt-8 max-w-[1100px] text-5xl leading-[1.05] sm:text-6xl lg:text-[72px]">
          {title}
        </h1>

        <p className="rise mt-6 text-[16px] font-medium" style={{ "--d": 1 } as React.CSSProperties}>
          {location} · {type}
        </p>

        <p className={`${labelClass} rise mt-8`} style={{ "--d": 2 } as React.CSSProperties}>
          Illustrative photos only ·{" "}
          <span className="normal-case tracking-normal">
            Real property photos will replace these placeholders.
          </span>
        </p>

        {/* Main image */}
        <div
          className="rise relative mt-8 h-[320px] overflow-hidden rounded-[32px] bg-surface sm:h-[480px] lg:h-[640px]"
          style={{ "--d": 3 } as React.CSSProperties}
        >
          <Image
            src={image}
            alt={title}
            fill
            preload
            sizes="(min-width: 1480px) 1432px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Extra images: any number, compact thumbnails */}
        {gallery && gallery.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((src, i) => (
              <div
                key={src}
                className="reveal relative h-[160px] overflow-hidden rounded-[20px] bg-surface sm:h-[220px] lg:h-[260px]"
                style={{ "--i": i } as React.CSSProperties}
              >
                <Image
                  src={src}
                  alt={`${title} – photo ${i + 2}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Details card */}
        <section className="reveal mt-6 rounded-[32px] bg-surface p-6 sm:p-10 lg:p-12">
          {priceNote && (
            <p className="max-w-[1100px] font-display text-xl font-extrabold leading-snug sm:text-2xl">
              {priceNote}
            </p>
          )}
          {price && (
            <p className="font-display text-2xl font-extrabold sm:text-3xl">{price}</p>
          )}

          {summary && (
            <p className="mt-8 max-w-[1100px] text-[16px] font-medium leading-7">
              {summary}
            </p>
          )}

          {features && features.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-4">
                <h2 className="text-4xl leading-none sm:text-5xl">Property features</h2>
                <span className="rounded-full border border-white/20 px-3 py-1 font-display text-[11px] font-bold tracking-widest">
                  {String(features.length).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent sm:block" />
              </div>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {features.map((feature, i) => (
                  <li
                    key={feature}
                    style={{ "--i": i % 4 } as React.CSSProperties}
                    className="reveal group flex items-center gap-3 rounded-2xl border border-white/10 bg-background/50 px-4 py-4 text-[15px] font-semibold transition-colors duration-300 hover:border-white/30 hover:bg-background/80"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#101612] transition-transform duration-300 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-10 max-w-[1100px] text-[16px] font-medium leading-7">
            Enquire to confirm status, current pricing and viewing arrangements.
            Please include the property name in your message.
          </p>

          <Link
            href={enquiryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-nudge mt-8 inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
          >
            Enquire on WhatsApp
            <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-4" />
            </span>
          </Link>

          <p className="mt-8 max-w-[1100px] text-[14px] font-medium leading-6 text-white/80">
            Property information, pricing and availability are subject to
            change. Conduct appropriate due diligence and obtain professional
            advice before completing a transaction.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
