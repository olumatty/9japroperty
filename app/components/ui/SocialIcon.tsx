type Name = "TikTok" | "Instagram" | "YouTube";

export function SocialIcon({ name, className = "" }: { name: Name; className?: string }) {
  const common = { viewBox: "0 0 24 24", className, "aria-hidden": true } as const;

  if (name === "Instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    );
  }

  if (name === "YouTube") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.22 22 12 22 12s0-3.22-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d="M16.6 2h-3.2v13.1a2.7 2.7 0 1 1-2.7-2.7c.3 0 .55.04.8.12V9.2a6 6 0 1 0 5.1 5.9V8.4a7.3 7.3 0 0 0 4.3 1.4V6.6a4.3 4.3 0 0 1-4.3-4.6Z" />
    </svg>
  );
}
