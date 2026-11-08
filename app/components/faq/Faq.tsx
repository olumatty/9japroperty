import Link from "next/link";
import { contact } from "@/app/data/contact";
import { faqs } from "@/app/data/faq";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-[1480px] scroll-mt-6 px-4 py-20 sm:px-5 lg:px-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={`${labelClass} reveal`}>Good to know</p>
          <h2 className="reveal mt-5 text-5xl leading-[1.02] sm:text-6xl">
            Frequently asked questions
          </h2>
          <p className="reveal mt-6 max-w-[420px] text-[16px] font-medium leading-7">
            Can’t see your question? Ask us directly on WhatsApp.
          </p>
          <Link
            href={contact.enquiryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-nudge reveal mt-8 inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
          >
            Ask a question
            <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-4" />
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <details
              key={item.q}
              style={{ "--i": i % 4 } as React.CSSProperties}
              className="reveal group rounded-2xl border border-white/10 bg-surface transition-colors duration-300 open:border-white/25 hover:border-white/25"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[17px] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-xl leading-none transition duration-300 group-open:rotate-45 group-open:bg-white group-open:text-[#101612]"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-[15px] font-medium leading-7 text-white/80 group-open:animate-[fade-up_0.45s_ease_both]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
