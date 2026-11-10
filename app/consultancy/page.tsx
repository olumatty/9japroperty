import type { Metadata } from "next";
import { ConsultancyForm } from "@/app/components/consultancy/ConsultancyForm";
import { Footer } from "@/app/components/footer/Footer";
import { consultancy, steps, weekSchedule } from "@/app/data/consultancy";
import { labelClass } from "@/app/lib/styles";

export const metadata: Metadata = {
  title: "Book a Consultation | The9jaPropertyChic",
  description: `Book a property consultation with The9jaPropertyChic. Choose a day and time, pay the ${consultancy.feeLabel} consultation fee and confirm on WhatsApp.`,
};

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

export default function ConsultancyPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1480px] px-4 pb-20 sm:px-5 lg:px-6">
        <section className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className={`${labelClass} rise`}>Property consultancy</p>

            <h1 className="rise mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-[64px]" style={d(1)}>
              Book a consultation.
            </h1>

            <p className="rise mt-6 max-w-[480px] text-[16px] font-medium leading-7" style={d(2)}>
              Talk through buying, selling or investing in Nigerian property
              one on one. Pick a day, pay the fee and confirm on WhatsApp.
            </p>

            <div className="rise mt-8 flex items-baseline gap-4 rounded-2xl border border-white/10 bg-surface p-5" style={d(3)}>
              <span className="font-serif text-[44px] leading-none">{consultancy.feeLabel}</span>
              <span className="text-[14px] font-medium leading-5 text-white/70">
                consultation fee,
                <br />
                paid by bank transfer
              </span>
            </div>

            <ol className="rise mt-8 flex flex-col gap-4" style={d(4)}>
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/20 font-display text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[15px] font-medium leading-6">{step}</span>
                </li>
              ))}
            </ol>

            <div className="rise mt-10" style={d(5)}>
              <p className={`${labelClass} text-white/60`}>Weekly availability · Nigeria time</p>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {weekSchedule.map(({ day, slots }) => (
                  <li key={day} className="flex items-start justify-between gap-6 py-3 text-[14px]">
                    <span className="font-semibold">{day}</span>
                    {slots.length ? (
                      <span className="text-right font-medium text-white/80">
                        {slots.map((s) => (
                          <span key={s} className="block">{s}</span>
                        ))}
                      </span>
                    ) : (
                      <span className="font-medium text-white/45">No consultations</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rise" style={d(3)}>
            <ConsultancyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
