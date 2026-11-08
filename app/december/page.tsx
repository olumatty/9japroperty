import type { Metadata } from "next";
import { DecemberForm } from "@/app/components/december/DecemberForm";
import { Footer } from "@/app/components/footer/Footer";
import { included } from "@/app/data/december";
import { labelClass } from "@/app/lib/styles";

export const metadata: Metadata = {
  title: "Plan Your December | The9jaPropertyChic",
  description:
    "Coming home this December? Tell us your dates, budget and plans and we’ll help with your shortlet, airport pickup and settling in.",
};

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

export default function DecemberPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1480px] px-4 pb-20 sm:px-5 lg:px-6">
        <section className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={`${labelClass} rise`}>The December experience</p>

            <h1 className="rise mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-[64px]" style={d(1)}>
              Plan your December in Nigeria.
            </h1>

            <p className="rise mt-6 max-w-[480px] text-[16px] font-medium leading-7" style={d(2)}>
              Tell us when you land, who’s coming and what you’d like to spend.
              We’ll shape a plan around you on WhatsApp.
            </p>

            <ul className="rise mt-10 flex flex-col gap-4" style={d(3)}>
              {included.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#101612]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <span className="pt-1 text-[15px] font-medium leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rise" style={d(3)}>
            <DecemberForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
