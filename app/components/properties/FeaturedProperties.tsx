import Link from "next/link";
import { categories } from "@/app/data/categories";
import { whatsappLink } from "@/app/data/contact";
import { properties } from "@/app/data/properties";
import { PropertyCard } from "./PropertyCard";
import { labelClass } from "@/app/lib/styles";

export function FeaturedProperties() {
  return (
    <section
      id="properties"
      className="mx-auto w-full max-w-[1480px] scroll-mt-6 px-4 pb-16 pt-16 sm:px-5 lg:px-6"
    >
      <p className={`${labelClass} reveal`}>01 / Find your place</p>

      <h2 className="reveal mt-5 text-5xl leading-none sm:text-6xl">
        Featured properties
      </h2>

      <p className="reveal mt-6 text-[15px] font-medium">
        A look at what The9jaPropertyChic is showing right now.
      </p>

      <p className={`${labelClass} reveal mt-6`}>
        Enquire for current status
      </p>

      <nav aria-label="Property categories" className="reveal mt-8 flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            className="inline-flex h-11 items-center rounded-full border border-white/15 bg-surface px-5 text-[14px] font-semibold transition hover:border-white/50 hover:bg-[#243029]"
          >
            {c.name}
          </a>
        ))}
      </nav>

      <div className="mt-14 flex flex-col gap-20">
        {categories.map((category, ci) => {
          const list = properties.filter((p) => p.category === category.name);
          return (
            <div key={category.slug} id={category.slug} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <p className={`${labelClass} reveal text-white/60`}>
                    {String(ci + 1).padStart(2, "0")} · {category.name}
                  </p>
                  <h3 className="reveal mt-4 text-4xl leading-none sm:text-5xl">
                    {category.title}
                  </h3>
                  <p className="reveal mt-4 max-w-[560px] text-[15px] font-medium leading-6 text-white/80">
                    {category.blurb}
                  </p>
                </div>
                <span className="rounded-full border border-white/20 px-3 py-1 font-display text-[11px] font-bold tracking-widest">
                  {list.length === 0
                    ? "COMING SOON"
                    : `${list.length} ${list.length === 1 ? "PROPERTY" : "PROPERTIES"}`}
                </span>
              </div>

              {list.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((property, i) => (
                    <PropertyCard key={property.id} property={property} index={i} />
                  ))}
                </div>
              ) : (
                <div className="reveal mt-8 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-dashed border-white/20 bg-surface/50 p-8 sm:flex-row sm:items-center">
                  <p className="max-w-[520px] text-[16px] font-medium leading-7">
                    We’re preparing our {category.name.toLowerCase()} listings.
                    Tell us what you’re looking for and we’ll let you know as
                    soon as something fits.
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
