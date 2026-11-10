export const consultancy = {
  fee: 10000,
  feeLabel: "₦10,000",
  /** Bank transfer details shown to clients. */
  account: {
    bank: "Opay",
    number: "8150358972",
    name: "Oke Kofoworola",
    narration: "consultation",
  },
  /** How many days ahead clients can book, and the earliest lead time. */
  windowDays: 28,
  minDaysAhead: 1,
  /** All times are Nigeria time (WAT). */
  timeZone: "Africa/Lagos",
} as const;

export const slots = [
  "10:00 am – 12:00 pm",
  "3:00 pm – 5:00 pm",
  "8:00 pm – 9:00 pm",
  "12:00 am – 2:00 am",
] as const;

/** Day of week (0 = Sunday) -> available slots. Days not listed have no consultations. */
export const slotsByWeekday: Record<number, readonly string[]> = {
  2: slots, // Tuesday
  4: slots, // Thursday
  5: slots, // Friday
  6: slots, // Saturday
};

export const weekSchedule = [
  { day: "Monday", slots: [] as readonly string[] },
  { day: "Tuesday", slots },
  { day: "Wednesday", slots: [] as readonly string[] },
  { day: "Thursday", slots },
  { day: "Friday", slots },
  { day: "Saturday", slots },
  { day: "Sunday", slots: [] as readonly string[] },
];

export const topics = [
  "Buying property",
  "Selling property",
  "Investing",
  "December stay",
  "Something else",
] as const;

export const steps = [
  "Choose a day and time that suits you.",
  "Pay the consultation fee by bank transfer.",
  "Send the booking on WhatsApp, then your payment receipt.",
  "We confirm your slot once we’ve seen your payment.",
];
