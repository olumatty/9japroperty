import { properties } from "@/app/data/properties";
import { PropertyCard } from "./PropertyCard";

const label = "font-display text-[11px] font-bold uppercase tracking-[0.14em]";

export function FeaturedProperties() {
  return (
    <section
      id="properties"
      className="mx-auto w-full max-w-[1480px] scroll-mt-6 px-4 pb-16 pt-16 sm:px-5 lg:px-6"
    >
      <p className={label}>01 / Find your place</p>

      <h2 className="mt-5 text-5xl leading-none sm:text-6xl">
        Featured properties
      </h2>

      <p className="mt-6 text-[15px] font-medium">
        A look at what The9jaPropertyChic is showing right now.
      </p>

      <p className={`${label} mt-6`}>
        Enquire for current status · Images are illustrative
      </p>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
