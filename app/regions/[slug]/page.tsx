import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITY_LIMIT, citySlug, getRegion, nigeriaCities, regions } from "@/app/data/regions";
import { properties } from "@/app/data/properties";
import { whatsappLink } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { Footer } from "@/app/components/footer/Footer";
import { labelClass } from "@/app/lib/styles";

type Props = { params: Promise<{ slug: string }> };

const delay = (n: number) => ({ "--d": n }) as React.CSSProperties;

const pillLight =
  "arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90";
const pillDark =
  "arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full border border-white/10 bg-surface pl-6 pr-2 text-[15px] font-semibold transition hover:bg-[#243029]";

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};
  return {
    title: region.live
      ? `Property in ${region.name} | The9jaPropertyChic`
      : `${region.name} | Coming soon | The9jaPropertyChic`,
    description: region.live
      ? "Browse property in Abuja, Lagos and Abeokuta with The9jaPropertyChic."
      : `Our ${region.name} page is coming soon.`,
  };
}

function BackLink() {
  return (
    <Link
      href="/"
      className="group rise inline-flex h-[52px] items-center gap-3 rounded-full border border-white/10 bg-surface pl-2 pr-6 text-[15px] font-semibold transition hover:border-white/25 hover:bg-[#243029]"
    >
      <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612] transition-transform duration-300 group-hover:-translate-x-1">
        <ArrowIcon className="size-4 rotate-[-135deg]" />
      </span>
      Back to home
    </Link>
  );
}

function Icon() {
  return (
    <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
      <ArrowIcon className="size-4" />
    </span>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <section className="relative mt-10 overflow-hidden rounded-[32px] bg-surface px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[120px] leading-none text-white/[0.04] sm:text-[220px] lg:text-[300px]"
      >
        Soon
      </span>
      <div className="relative">
        <p className={`${labelClass} rise`} style={delay(1)}>
          Serving clients in {name}
        </p>
        <h1
          className="rise mt-6 max-w-[760px] text-[40px] leading-[1.04] sm:text-6xl lg:text-[72px]"
          style={delay(2)}
        >
          {name} is coming soon.
        </h1>
        <p
          className="rise mt-6 max-w-[560px] text-[16px] font-medium leading-7"
          style={delay(3)}
        >
          We’re preparing a dedicated page for clients in {name}. In the
          meantime, you can still reach us on WhatsApp, or browse property in
          Nigeria.
        </p>
        <div className="rise mt-10 flex flex-wrap gap-4" style={delay(4)}>
          <Link
            href={whatsappLink(
              `Hello The9jaPropertyChic, I'm based in ${name} and I'd like to be notified when your ${name} page is ready.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={pillLight}
          >
            Notify me on WhatsApp
            <Icon />
          </Link>
          <Link href="/regions/nigeria" className={pillDark}>
            Explore Nigeria
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612]">
              <ArrowIcon className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function NigeriaCities() {
  return (
    <>
      <header className="mt-10">
        <p className={`${labelClass} rise`} style={delay(1)}>
          Serving clients in Nigeria
        </p>
        <h1
          className="rise mt-6 max-w-[900px] text-5xl leading-[1.02] sm:text-6xl lg:text-[72px]"
          style={delay(2)}
        >
          Property in Abuja, Lagos and Abeokuta.
        </h1>
        <p
          className="rise mt-6 max-w-[620px] text-[16px] font-medium leading-7"
          style={delay(3)}
        >
          Choose a city to see what we’re showing right now. Enquire to confirm
          current status.
        </p>
      </header>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {nigeriaCities.map((city, i) => {
          const list = properties.filter((p) => p.city === city);
          return (
            <li
              key={city}
              style={{ "--i": i } as React.CSSProperties}
              className="reveal flex flex-col rounded-[28px] border border-white/5 bg-surface p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-[11px] font-bold tracking-widest text-white/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-white/20 px-3 py-1 font-display text-[11px] font-bold tracking-widest">
                  {list.length === 0
                    ? "COMING SOON"
                    : `${list.length} ${list.length === 1 ? "PROPERTY" : "PROPERTIES"}`}
                </span>
              </div>

              <h2 className="mt-8 text-4xl leading-none sm:text-5xl">{city}</h2>

              {list.length > 0 ? (
                <div className="mt-8 flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col divide-y divide-white/10 border-t border-white/10">
                  {list.slice(0, CITY_LIMIT).map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/properties/${p.id}`}
                        className="group flex items-center justify-between gap-4 py-4"
                      >
                        <span className="min-w-0">
                          <span className="block text-[15px] font-semibold leading-snug">
                            {p.title}
                          </span>
                          <span className="mt-1 block text-[13px] font-medium text-white/60">
                            {p.location}
                          </span>
                        </span>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-[#101612] transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowIcon className="size-4" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {list.length > CITY_LIMIT && (
                  <Link
                    href={`/cities/${citySlug(city)}`}
                    className="arrow-nudge mt-6 inline-flex h-[52px] items-center justify-between gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
                  >
                    See all {list.length} properties in {city}
                    <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
                      <ArrowIcon className="size-4" />
                    </span>
                  </Link>
                )}
                </div>
              ) : (
                <div className="mt-8 flex flex-1 flex-col items-start justify-between gap-6 border-t border-white/10 pt-6">
                  <p className="text-[15px] font-medium leading-7 text-white/80">
                    We don’t have listings in {city} just yet. Tell us what
                    you’re looking for and we’ll look out for it.
                  </p>
                  <Link
                    href={whatsappLink(
                      `Hello The9jaPropertyChic, I'm looking for property in ${city}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-slide text-[15px] font-semibold"
                  >
                    Ask about {city} on WhatsApp
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  return (
    <>
      <main className="mx-auto w-full max-w-[1480px] px-4 pb-20 pt-8 sm:px-5 lg:px-6">
        <BackLink />
        {region.live ? <NigeriaCities /> : <ComingSoon name={region.name} />}
      </main>
      <Footer />
    </>
  );
}
