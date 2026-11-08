const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  className: "size-5",
  "aria-hidden": true,
} as const;

const bolt = (<svg {...s}><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" /></svg>);
const pool = (<svg {...s}><path d="M3 17c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M3 13c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M8 11V5a2 2 0 0 1 4 0M13 11V5a2 2 0 0 1 4 0M8 8h5" /></svg>);
const gym = (<svg {...s}><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" /></svg>);
const lift = (<svg {...s}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="m9 9 3-3 3 3M9 15l3 3 3-3" /></svg>);
const car = (<svg {...s}><path d="M5 16V11l2-5h10l2 5v5M3 16h18M7 16v2M17 16v2" /><circle cx="8" cy="13" r=".6" fill="currentColor" /><circle cx="16" cy="13" r=".6" fill="currentColor" /></svg>);
const smart = (<svg {...s}><path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></svg>);
const kitchen = (<svg {...s}><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 1.5-3 4-3 7h3v11V3Z" /></svg>);
const wardrobe = (<svg {...s}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 3v18M9 12v2M15 12v2" /></svg>);
const snow = (<svg {...s}><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9 4.5l3 2.5 3-2.5M9 19.5l3-2.5 3 2.5" /></svg>);
const tick = (<svg {...s}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);

const rules: [RegExp, React.ReactNode][] = [
  [/power|generator|inverter|solar/i, bolt],
  [/pool/i, pool],
  [/gym/i, gym],
  [/elevator|lift/i, lift],
  [/parking|garage/i, car],
  [/smart|wifi|internet/i, smart],
  [/kitchen/i, kitchen],
  [/wardrobe|closet/i, wardrobe],
  [/\bac\b|air.?con|split unit/i, snow],
];

const iconFor = (name: string) => rules.find(([re]) => re.test(name))?.[1] ?? tick;

export function PropertyFeatures({ features }: { features: string[] }) {
  return (
    <section
      aria-labelledby="features-title"
      className="reveal rounded-[28px] border border-white/10 bg-gradient-to-br from-[#26322a] via-surface to-[#18211b] p-6 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="features-title" className="text-3xl leading-none sm:text-4xl">
          Property features
        </h2>
        <span className="rounded-full border border-white/20 px-3 py-1 font-display text-[11px] font-bold tracking-widest">
          {String(features.length).padStart(2, "0")}
        </span>
      </div>

      <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-background/40 p-3.5 transition-colors duration-300 hover:border-white/30 hover:bg-background/70"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.07] transition duration-300 group-hover:bg-white group-hover:text-[#101612]">
              {iconFor(feature)}
            </span>
            <span className="text-[15px] font-semibold leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
