export const contact = {
  phone: "+234 903 338 7017",
  phoneHref: "tel:+2349033387017",
  email: "hellothe9japropertychic@gmail.com",
  whatsapp: "+234 815 035 8972",
  whatsappHref: "https://wa.me/2348150358972",
  enquiryHref:
    "https://api.whatsapp.com/send/?phone=2348150358972&text=Hello+The9jaPropertyChic%2C+I%27d+like+to+make+an+enquiry.&type=phone_number&app_absent=0",
  ebookHref: "https://selar.com/6h7qtr",
} as const;

export const exploreLinks = [
  { label: "Sell your property", href: "/sell" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/#properties" },
  { label: "Shortlets", href: "/#shortlets" },
  { label: "December experience", href: "/#december" },
  { label: "Consultancy", href: "/#consultation" },
] as const;

/** WhatsApp chat link with any pre-filled message. */
export function whatsappLink(text: string) {
  return `https://api.whatsapp.com/send/?phone=2348150358972&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
}

/** WhatsApp enquiry link with the property name pre-filled. */
export function propertyEnquiryHref(propertyTitle: string) {
  return whatsappLink(
    `Hello The9jaPropertyChic, I'd like to enquire about: ${propertyTitle}.`,
  );
}
