"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Property } from "@/app/types/property";
import { whatsappLink } from "@/app/data/contact";
import { field } from "@/app/components/ui/FormParts";
import { labelClass } from "@/app/lib/styles";
import {
  applyFilters,
  bedroomOptions,
  emptyFilters,
  isFiltered,
  priceBands,
  sortOptions,
  type Filters,
} from "@/app/lib/propertyFilters";
import { PropertyCard } from "./PropertyCard";

const select = `${field} appearance-none [color-scheme:dark] pr-11`;
const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff99' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
  backgroundSize: "16px",
} as React.CSSProperties;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-10 items-center rounded-full border px-4 text-[14px] font-semibold transition ${
        active
          ? "border-white bg-white text-[#101612]"
          : "border-white/15 bg-surface hover:border-white/50 hover:bg-[#243029]"
      }`}
    >
      {children}
    </button>
  );
}

function Labelled({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={`${labelClass} text-white/60`}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function PropertyBrowser({
  properties,
  categories,
  cities,
}: {
  properties: Property[];
  categories: string[];
  cities: string[];
}) {
  const [f, setF] = useState<Filters>(emptyFilters);
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setF((prev) => ({ ...prev, [key]: value }));

  const types = useMemo(() => [...new Set(properties.map((p) => p.type))].sort(), [properties]);
  const results = useMemo(() => applyFilters(properties, f), [properties, f]);
  const filtered = isFiltered(f);

  return (
    <>
      <div className="mt-10 rounded-[28px] border border-white/10 bg-surface p-5 sm:p-6">
        <div role="search">
          <label htmlFor="q" className="sr-only">
            Search properties
          </label>
          <input
            id="q"
            type="search"
            value={f.query}
            onChange={(e) => set("query", e.target.value)}
            placeholder="Search by area, e.g. Yaba, Ogudu, duplex, BQ…"
            autoComplete="off"
            className={field}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5" role="group" aria-label="Category">
          {["All", ...categories].map((c) => (
            <Chip key={c} active={f.category === c} onClick={() => set("category", c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Labelled label="City" htmlFor="city">
            <select id="city" value={f.city} onChange={(e) => set("city", e.target.value)} className={select} style={chevron}>
              <option value="All">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Labelled>
          <Labelled label="Property type" htmlFor="type">
            <select id="type" value={f.type} onChange={(e) => set("type", e.target.value)} className={select} style={chevron}>
              <option value="All">All types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Labelled>
          <Labelled label="Price" htmlFor="band">
            <select
              id="band"
              value={f.band}
              onChange={(e) => set("band", e.target.value as Filters["band"])}
              className={select}
              style={chevron}
            >
              {priceBands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </Labelled>
          <Labelled label="Sort by" htmlFor="sort">
            <select
              id="sort"
              value={f.sort}
              onChange={(e) => set("sort", e.target.value as Filters["sort"])}
              className={select}
              style={chevron}
            >
              {sortOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </Labelled>
        </div>

        <div className="mt-5">
          <p className={`${labelClass} mb-3 text-white/60`}>Bedrooms</p>
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Bedrooms">
            {bedroomOptions.map((b) => (
              <Chip key={b} active={f.beds === b} onClick={() => set("beds", b)}>
                {b}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-[15px] font-medium">
          {results.length} {results.length === 1 ? "property" : "properties"}
          {filtered && " match your search"}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => setF((prev) => ({ ...emptyFilters, sort: prev.sort }))}
            className="link-slide text-[15px] font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i % 3} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-dashed border-white/20 bg-surface/50 p-8 sm:flex-row sm:items-center">
          <p className="max-w-[520px] text-[16px] font-medium leading-7">
            Nothing matches those filters right now. Tell us what you’re looking
            for and we’ll let you know when something fits.
          </p>
          <Link
            href={whatsappLink(
              `Hello The9jaPropertyChic, I'm looking for a property${f.query ? ` (${f.query})` : ""}${f.city !== "All" ? ` in ${f.city}` : ""}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide shrink-0 text-[15px] font-semibold"
          >
            Ask us on WhatsApp
          </Link>
        </div>
      )}
    </>
  );
}
