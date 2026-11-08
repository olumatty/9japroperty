"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

const links = [
  { label: "Properties", href: "/#properties" },
  { label: "December", href: "/#december" },
  { label: "Sell", href: "/sell" },
  { label: "About", href: "/about" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  // The menu counts as open only on the page it was opened on, so it closes
  // by itself when the route changes.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (value: boolean) => setOpenedAt(value ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  // Border/blur only once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => href === pathname;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1480px] items-center justify-between gap-3 sm:gap-6 px-4 sm:px-5 lg:px-6">
        <Link href="/" className="font-display text-base sm:text-lg font-extrabold">
          The9jaPropertyChic
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`${labelClass} link-slide ${
                isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={contact.enquiryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-nudge inline-flex h-11 items-center gap-3 rounded-full bg-white pl-5 pr-1.5 text-[14px] font-semibold text-[#101612] transition hover:bg-white/90"
          >
            WhatsApp
            <span className="grid size-8 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-3.5" />
            </span>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative grid size-11 place-items-center rounded-full border border-white/15 md:hidden"
        >
          <span
            className={`absolute h-0.5 w-5 rounded bg-white transition duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded bg-white transition duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded bg-white transition duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 md:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-[1480px] flex-col gap-1 px-4 pb-6 pt-3 sm:px-5">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-2xl px-3 py-4 font-display text-lg font-extrabold transition hover:bg-white/5 ${
                isActive(link.href) ? "text-white" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={contact.enquiryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-nudge mt-3 inline-flex h-[52px] items-center justify-between gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612]"
          >
            Chat on WhatsApp
            <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-4" />
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
