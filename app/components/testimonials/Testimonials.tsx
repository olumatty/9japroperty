import { testimonials } from "@/app/data/testimonials";
import { labelClass } from "@/app/lib/styles";

/** Renders nothing until real testimonials are added in app/data/testimonials.ts */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1480px] px-4 py-20 sm:px-5 lg:px-6">
      <p className={`${labelClass} reveal`}>Kind words</p>
      <h2 className="reveal mt-5 text-5xl leading-[1.02] sm:text-6xl">
        What clients say
      </h2>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li
            key={t.name + i}
            style={{ "--i": i % 3 } as React.CSSProperties}
            className="reveal flex flex-col justify-between gap-8 rounded-[28px] border border-white/10 bg-surface p-7"
          >
            <blockquote className="font-serif text-[22px] leading-snug">
              “{t.quote}”
            </blockquote>
            <figcaption>
              <p className="text-[15px] font-semibold">{t.name}</p>
              {t.detail && (
                <p className="mt-1 text-[13px] font-medium text-white/60">{t.detail}</p>
              )}
            </figcaption>
          </li>
        ))}
      </ul>
    </section>
  );
}
