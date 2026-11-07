import Link from "next/link";
import { contact } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

const links = [
  { label: "Properties", href: "/#properties" },
  { label: "Sell", href: "/sell" },
] as const;

export function Navbar({ active }: { active?: "Sell" }) {
  return (
    <header className="rise flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
      <Link href="/" className="font-display text-md font-extrabold">
        The9jaPropertyChic
      </Link>

      <nav aria-label="Main" className="flex items-center gap-6 sm:gap-8">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={active === link.label ? "page" : undefined}
            className={`${labelClass} link-slide ${
              active === link.label ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href={contact.enquiryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-nudge hidden h-11 items-center gap-3 rounded-full bg-white pl-5 pr-1.5 text-[14px] font-semibold text-[#101612] transition hover:bg-white/90 sm:inline-flex"
        >
          WhatsApp
          <span className="grid size-8 place-items-center rounded-full bg-[#101612] text-white">
            <ArrowIcon className="size-3.5" />
          </span>
        </Link>
      </nav>
    </header>
  );
}
