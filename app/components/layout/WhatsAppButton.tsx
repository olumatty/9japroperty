"use client";

import { usePathname } from "next/navigation";
import { contact } from "@/app/data/contact";

export function WhatsAppButton() {
  const onProperty = usePathname().startsWith("/properties/");
  return (
    <a
      href={contact.enquiryHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`wa-pulse group fixed bottom-5 right-5 z-40 flex h-14 items-center overflow-hidden rounded-full bg-[#25D366] text-[#07130c] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-1 sm:bottom-6 sm:right-6 ${
        onProperty ? "max-md:hidden" : ""
      }`}
    >
      <span className="grid size-14 shrink-0 place-items-center">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.9-.4-4.15-1.15l-.3-.18-3.08.9.92-3-.2-.31A8.1 8.1 0 1 1 12.04 20.1Zm4.45-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:pr-5 group-hover:opacity-100 group-focus-visible:max-w-[140px] group-focus-visible:pr-5 group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
