import Image from "next/image";
import Link from "next/link";
import { contact, exploreLinks, socials } from "@/app/data/contact";
import { SocialIcon } from "@/app/components/ui/SocialIcon";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

export function Footer() {
  return (
    <footer id="consultation" className="w-full bg-surface">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-10 sm:px-5 lg:px-6">
        {/* CTA */}
        <p className={`${labelClass} reveal`}>Let’s find your space</p>

        <h2 className="reveal mt-5 max-w-[560px] text-5xl leading-[1.02] sm:text-6xl lg:text-[64px]">
          Make your next property move.
        </h2>

        <div className="reveal mt-5 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-[720px] text-[16px] font-medium leading-7">
            For property enquiries, share your preferred location, budget, and
            property type. For shortlets, include your dates and number of
            guests.
          </p>
          <Link
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
          >
            Talk to us on WhatsApp
            <span className="pulse-ring grid size-9 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-4" />
            </span>
          </Link>
        </div>

        {/* Links */}
        <div className="reveal mt-8 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:grid-cols-[1fr_auto_auto] md:gap-x-24">
          <div>
            <Image
              src="/brand/logo-full.png"
              alt="The9jaPropertyChic"
              width={893}
              height={564}
              sizes="200px"
              className="h-auto w-[170px] sm:w-[200px]"
            />
            <p className="mt-4 text-[16px] font-medium">
              Your Property Connection to Nigeria and the Diaspora.
            </p>
            <p className="mt-4 font-display text-[11px] font-bold tracking-wide">
              Nigeria. Connected to you, wherever you are.
            </p>

            <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`The9jaPropertyChic on ${social.name}`}
                    className="grid size-11 place-items-center rounded-full border border-white/15 transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#101612]"
                  >
                    <SocialIcon name={social.name} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Explore">
            <p className={labelClass}>Explore</p>
            <ul className="mt-5 flex flex-col gap-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link-slide text-[16px] font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={labelClass}>Get in touch</p>
            <ul className="mt-5 flex flex-col gap-4 text-[16px] font-semibold">
              <li>
                <a href={contact.phoneHref} className="link-slide">
                  Call: {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-slide text-[13px]"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide"
                >
                  WhatsApp: {contact.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="reveal mt-8 border-t border-white/10 pt-8">
          <p className="max-w-[1100px] text-[12px] font-medium leading-snug text-white/60">
            Property information, pricing and availability are subject to
            change. Clients are encouraged to conduct appropriate due diligence
            and obtain appropriate professional advice before completing
            property transactions. Airbnb and December Experience services are
            subject to availability and confirmed booking terms.
          </p>
          <p className="mt-4 font-display text-[11px] font-bold tracking-wide">
            © 2026 The9jaPropertyChic. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
