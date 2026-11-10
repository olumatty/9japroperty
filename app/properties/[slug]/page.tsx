import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty, properties } from "@/app/data/properties";
import { propertyEnquiryHref } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { MobileEnquireBar } from "@/app/components/properties/MobileEnquireBar";
import { PropertyGallery } from "@/app/components/properties/PropertyGallery";
import { PropertyCard } from "@/app/components/properties/PropertyCard";
import { PropertyFeatures } from "@/app/components/properties/PropertyFeatures";
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

  const { title, location, type, price, priceNote, image, gallery, summary, features, facts } =
    property;
  const enquiryHref = propertyEnquiryHref(title);

  // Other listings, same city first, up to three.
  const others = properties
    .filter((p) => p.id !== property.id)
    .sort((a, b) => Number(b.city === property.city) - Number(a.city === property.city))
    .slice(0, 3);

  const hasContent = Boolean(summary || (features && features.length > 0));

  // "3 Bed Apartment ₦700M · 4 Bed ..." -> [{ name, price }] rows
  const options = priceNote
    ? priceNote.split(" · ").flatMap((part) => {
        const m = part.match(/^(.*?)\s*(₦[\d.,]+\s?[KMB]?)$/i);
        return m ? [{ name: m[1], price: m[2] }] : [];
      })
    : price
      ? [{ name: "", price }]
      : [];

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
          {property.category} · {location} · {type}
        </p>

        <PropertyGallery title={title} images={[image, ...(gallery ?? [])]} />

        <div
          className={`mt-8 grid items-start gap-8 ${
            hasContent ? "lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12" : "max-w-[520px]"
          }`}
        >
          {/* One card: price, facts and enquiry */}
          <aside className={`reveal order-first rounded-[28px] border border-white/10 bg-surface p-6 sm:p-8 ${hasContent ? "lg:sticky lg:top-28 lg:order-last" : ""}`}>
            <p className={`${labelClass} text-white/50`}>
              {options.length > 1 ? "Pricing" : "Price"}
            </p>

            {options.length > 0 ? (
              <ul className="mt-4 flex flex-col">
                {options.map((o) => (
                  <li
                    key={o.name + o.price}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 first:pt-0 last:border-b-0"
                  >
                    {o.name && (
                      <span className="text-[14px] font-medium text-white/70">{o.name}</span>
                    )}
                    <span className={`${o.name ? "ml-auto" : ""} font-serif text-[34px] leading-none`}>{o.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 font-serif text-[28px] leading-tight">{priceNote}</p>
            )}

            <dl className="mt-6 border-t border-white/10 pt-2">
              {[{ label: "Location", value: location }, ...(facts ?? [])].map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 py-2.5"
                >
                  <dt className="text-[14px] font-medium text-white/60">{fact.label}</dt>
                  <dd className="text-right text-[14px] font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={enquiryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-nudge mt-6 inline-flex h-[56px] w-full items-center justify-between gap-4 rounded-full bg-white pl-7 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
            >
              Enquire on WhatsApp
              <span className="grid size-10 place-items-center rounded-full bg-[#101612] text-white">
                <ArrowIcon className="size-4" />
              </span>
            </Link>
            <p className="mt-3 text-center text-[12px] font-medium text-white/50">
              Confirm status, pricing and viewing times.
            </p>
          </aside>

          {/* Description + features */}
          <section>
            {summary && (
              <p className="max-w-[760px] text-[17px] font-medium leading-8">{summary}</p>
            )}

            {features && features.length > 0 && (
              <div className={summary ? "mt-8" : ""}>
                <PropertyFeatures features={features} />
              </div>
            )}

            <p className="mt-10 max-w-[760px] text-[13px] font-medium leading-6 text-white/60">
              Property information, pricing and availability are subject to
              change. Conduct appropriate due diligence and obtain professional
              advice before completing a transaction.
            </p>
          </section>
        </div>

        {others.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-12" aria-labelledby="more-title">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-title" className="text-4xl leading-none sm:text-5xl">
                More properties
              </h2>
              <Link href="/#properties" className="link-slide text-[15px] font-semibold">
                View all properties
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <div aria-hidden="true" className="h-[76px] md:hidden" />
      <MobileEnquireBar title={title} price={price} href={enquiryHref} />
    </>
  );
}
