import type { Property } from "@/app/types/property";

export const properties: Property[] = [
  {
    id: "ogba-ikeja",
    title: "4 Bedroom Semi Detached Duplex with BQ",
    location: "Ogba, Ikeja, Lagos",
    city: "Lagos",
    type: "House",
    category: "Luxury",
    price: "₦270M",
    image: "/properties/ogba-ikeja.webp",
    gallery: [
      "/properties/ogba-ikeja/1.webp",
      "/properties/ogba-ikeja/2.webp",
      "/properties/ogba-ikeja/3.webp",
      "/properties/ogba-ikeja/4.webp",
      "/properties/ogba-ikeja/5.webp",
    ],
    facts: [
      { label: "Bedrooms", value: "4" },
      { label: "Property type", value: "Semi detached duplex" },
      { label: "Boys’ quarters", value: "Yes" },
      { label: "Title", value: "Certificate of Occupancy" },
    ],
    summary:
      "Beautiful 4 bedroom semi detached duplex with a BQ in a secured location.",
    features: [
      "Fitted kitchen with accessories",
      "Modern-day POP ceiling",
      "Spacious rooms",
      "Wardrobes",
      "Water heater",
      "Heat extractor",
      "Ample parking space",
      "Secured location",
    ],
  },
  {
    id: "surulere",
    title: "3 Bedroom Fully Detached Duplex with BQ",
    location: "Surulere, Lagos",
    city: "Lagos",
    type: "House",
    category: "Luxury",
    price: "₦450M",
    image: "/properties/surulere.webp",
    gallery: [
      "/properties/surulere/1.webp",
      "/properties/surulere/2.webp",
      "/properties/surulere/3.webp",
      "/properties/surulere/4.webp",
      "/properties/surulere/5.webp",
      "/properties/surulere/6.webp",
      "/properties/surulere/7.webp",
    ],
    facts: [
      { label: "Bedrooms", value: "3" },
      { label: "Property type", value: "Fully detached duplex" },
      { label: "Boys’ quarters", value: "Yes" },
      { label: "Title", value: "Land Certificate" },
    ],
    summary:
      "Spacious, lovely 3 bedroom fully detached duplex with a BQ in a well secured estate. A good investment opportunity.",
    features: [
      "All rooms en-suite",
      "Spacious living room",
      "Guest toilet",
      "P.O.P ceiling",
      "Fitted kitchen",
      "Fortified doors",
      "2 car parking spaces",
      "Balcony",
      "Water heater",
      "Elevator",
      "Clean water",
      "Good investment opportunity",
    ],
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.id === slug);
}
