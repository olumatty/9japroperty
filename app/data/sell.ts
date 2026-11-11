export const propertyTypes = [
  "House",
  "Apartment",
  "Land",
  "Commercial",
  "Off-plan",
  "Other",
] as const;

export const sellerRoles = [
  { value: "Owner", hint: "I own the property" },
  { value: "Realtor", hint: "I'm an agent selling for others" },
  { value: "Developer", hint: "I built or am building it" },
  { value: "Mandate", hint: "I hold the owner's mandate to sell" },
] as const;
