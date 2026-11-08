import type { Property } from "@/app/types/property";

export const properties: Property[] = [
  {
    id: "shonibare-estate",
    title: "3 & 4 Bedroom Apartments and Penthouses with BQ",
    location: "Shonibare Estate, Maryland, Lagos",
    city: "Lagos",
    type: "House",
    priceNote:
      "3 Bed Apartment ₦700M · 4 Bed Apartment ₦1B · 3 Bed Penthouse ₦1.3B · 4 Bed Penthouse ₦1.5B",
    image: "/properties/shonibare-estate.webp",
    gallery: [
      "/properties/shonibare-estate/sunroom.webp",
      "/properties/shonibare-estate/living-room.webp",
      "/properties/shonibare-estate/lounge.webp",
    ],
    summary:
      "Exquisitely built apartments and penthouses with BQ in a prime location. Title: Certificate of Occupancy.",
    features: [
      "Smart home",
      "24-hour power",
      "Swimming pool",
      "Fully equipped gym",
      "Elevator",
      "Underground parking",
      "Standby generator",
      "Inverter",
      "Fully fitted kitchen",
      "Fitted wardrobes",
      "Split unit AC in all rooms",
    ],
  },
  {
    id: "ogudu-gra",
    title: "4 Bedroom Terrace Duplex with BQ",
    location: "Ogudu GRA, Lagos",
    city: "Lagos",
    type: "House",
    price: "₦550M",
    image: "/properties/ogudu-gra.webp",
  },
  {
    id: "ojodu-berger",
    title: "5 Bedroom Fully Detached Duplex with BQ",
    location: "Ojodu Berger, Lagos",
    city: "Lagos",
    type: "House",
    price: "₦315M",
    image: "/properties/ojodu-berger.webp",
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.id === slug);
}
