import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/app/data/categories";
import { whatsappLink } from "@/app/data/contact";
import { properties } from "@/app/data/properties";
import { PropertyCard } from "@/app/components/properties/PropertyCard";
import { Footer } from "@/app/components/footer/Footer";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.title} | The9jaPropertyChic`,
    description: category.blurb,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const list = properties.filter((p) => p.category === category.name);

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

        <header className="mt-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className={`${labelClass} rise`}>All {category.name.toLowerCase()} properties</p>
            <h1
              className="rise mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-[72px]"
              style={{ "--d": 1 } as React.CSSProperties}
            >
              {category.title}
            </h1>
            <p
              className="rise mt-5 max-w-[560px] text-[16px] font-medium leading-7"
              style={{ "--d": 2 } as React.CSSProperties}
            >
              {category.blurb} Enquire to confirm current status.
            </p>
          </div>
          <span className="rounded-full border border-white/20 px-3 py-1 font-display text-[11px] font-bold tracking-widest">
            {list.length === 0
              ? "COMING SOON"
              : `${list.length} ${list.length === 1 ? "PROPERTY" : "PROPERTIES"}`}
          </span>
        </header>

        {list.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i % 3} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-dashed border-white/20 bg-surface/50 p-8 sm:flex-row sm:items-center">
            <p className="max-w-[520px] text-[16px] font-medium leading-7">
              We’re preparing our {category.name.toLowerCase()} listings. Tell
              us what you’re looking for and we’ll let you know as soon as
              something fits.
            </p>
            <Link
              href={whatsappLink(
                `Hello The9jaPropertyChic, I'm interested in ${category.name.toLowerCase()} properties.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="link-slide shrink-0 text-[15px] font-semibold"
            >
              Ask about {category.name.toLowerCase()} properties
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
