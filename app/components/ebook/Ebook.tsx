import Link from "next/link";
import { contact } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export function Ebook() {
  return (
    <section
      id="ebook"
      className="mx-auto w-full max-w-[1480px] scroll-mt-6 px-4 py-20 sm:px-5 lg:px-6"
    >
      <p className={`${labelClass} reveal`}>Free e-book · Beginner’s guide</p>

      <h2 className="reveal mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-[64px]">
        The Mystery of Co-investing in Real Estate
      </h2>

      <p className={`${labelClass} reveal mt-8 normal-case tracking-normal text-[13px]`}>
        By Kofoworola Durotimi Oke
      </p>

      <p className="reveal mt-6 max-w-[1100px] text-[16px] font-medium leading-7">
        Curious about owning property but overwhelmed by the cost? Explore what
        co-investing is, how to invest with others legally and safely, real-life
        examples, and red flags to avoid.
      </p>

      <Link
        href={contact.ebookHref}
        target="_blank"
        rel="noopener noreferrer"
        className="arrow-nudge reveal mt-8 inline-flex h-[52px] items-center gap-4 rounded-full border border-white/10 bg-surface pl-6 pr-2 text-[15px] font-semibold transition hover:bg-[#243029]"
      >
        Request the free e-book
        <span className="grid size-9 place-items-center rounded-full bg-white text-[#101612]">
          <ArrowIcon className="size-4" />
        </span>
      </Link>

      <p className="reveal mt-6 text-[13px] font-medium">
        Free on Selar. For information only, not financial or legal advice.
      </p>
    </section>
  );
}
