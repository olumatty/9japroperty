import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/app/data/categories";
import { nigeriaCities } from "@/app/data/regions";
import { properties } from "@/app/data/properties";
import { PropertyBrowser } from "@/app/components/properties/PropertyBrowser";
import { Footer } from "@/app/components/footer/Footer";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export const metadata: Metadata = {
  title: "Search all properties | The9jaPropertyChic",
  description:
    "Search and filter every The9jaPropertyChic listing by area, price, bedrooms, city and property type.",
};

export default function PropertiesPage() {
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
          Back to home
        </Link>

        <header className="mt-10">
          <p className={`${labelClass} rise`}>All properties</p>
          <h1
            className="rise mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-[72px]"
            style={{ "--d": 1 } as React.CSSProperties}
          >
            Find your property.
          </h1>
          <p
            className="rise mt-5 max-w-[560px] text-[16px] font-medium leading-7"
            style={{ "--d": 2 } as React.CSSProperties}
          >
            Search by area, then narrow by price, bedrooms and type. Enquire to
            confirm current status.
          </p>
        </header>

        <PropertyBrowser
          properties={properties}
          categories={categories.map((c) => c.name)}
          cities={[...nigeriaCities]}
        />
      </main>
      <Footer />
    </>
  );
}
