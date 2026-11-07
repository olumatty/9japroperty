import type { Metadata } from "next";
import { Navbar } from "@/app/components/layout/Navbar";
import { SellForm } from "@/app/components/sell/SellForm";
import { Footer } from "@/app/components/footer/Footer";
import { labelClass } from "@/app/lib/styles";

export const metadata: Metadata = {
  title: "Sell Your Property | The9jaPropertyChic",
  description:
    "Want to sell property in Nigeria? Share your property details and continue the conversation with The9jaPropertyChic on WhatsApp.",
};

const steps = [
  "Fill in the basics. It takes about a minute.",
  "WhatsApp opens with your message ready.",
  "Press send and we continue the conversation there.",
];

export default function SellPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1480px] px-4 pb-20 sm:px-5 lg:px-6">
        <Navbar active="Sell" />

        <section className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className={`${labelClass} rise`}>Sell with The9jaPropertyChic</p>

            <h1
              className="rise mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-[64px]"
              style={{ "--d": 1 } as React.CSSProperties}
            >
              Want to sell your property?
            </h1>

            <p
              className="rise mt-6 max-w-[480px] text-[16px] font-medium leading-7"
              style={{ "--d": 2 } as React.CSSProperties}
            >
              Tell us what you’re selling. We’ll take it from there on WhatsApp.
            </p>

            <ol
              className="rise mt-10 flex flex-col gap-5"
              style={{ "--d": 3 } as React.CSSProperties}
            >
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/20 font-display text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[15px] font-medium leading-6">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rise" style={{ "--d": 3 } as React.CSSProperties}>
            <SellForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
