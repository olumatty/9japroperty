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
const heater = (<svg {...s}><path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 0-5 1-8Z" /></svg>);
const fan = (<svg {...s}><circle cx="12" cy="12" r="1.6" /><path d="M12 10.4C12 6 14 4 16 4s2.5 3-1.5 5.5M13.6 12c4.400 0 6.400 2 6.400 4s-3 2.500-5.500-1.500M12 13.600C12 18 10 20 8 20s-2.500-3 1.500-5.500M10.400 12C6 12 4 10 4 8s3-2.500 5.500 1.500" /></svg>);
const ceiling = (<svg {...s}><path d="M3 5h18v3H3zM6 8v3h12V8M9 11v3h6v-3" /></svg>);
const shield = (<svg {...s}><path d="M12 3 5 6v5c0 4.500 3 8 7 10 4-2 7-5.500 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>);
const space = (<svg {...s}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>);
const bath = (<svg {...s}><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2" /></svg>);
const balcony = (<svg {...s}><path d="M3 10h18M5 10v9M9 10v9M15 10v9M19 10v9M3 19h18M7 10V6h10v4" /></svg>);
const trend = (<svg {...s}><path d="m4 16 5-5 4 4 7-8M14 7h6v6" /></svg>);
const drop = (<svg {...s}><path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11Z" /></svg>);
const bulb = (<svg {...s}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.900c.700.600 1 1.300 1 2.100h5c0-.800.300-1.500 1-2.100A6 6 0 0 0 12 3Z" /></svg>);
const bed = (<svg {...s}><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.500" /></svg>);
const sofa = (<svg {...s}><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3v-5ZM6 18v2M18 18v2" /></svg>);
const floor = (<svg {...s}><path d="M3 8l9-4 9 4-9 4-9-4ZM3 8v4l9 4 9-4V8M3 12v4l9 4 9-4v-4" /></svg>);
const home = (<svg {...s}><path d="M3 11.500 12 4l9 7.500M6 10v10h12V10M10 20v-5h4v5" /></svg>);
const speaker = (<svg {...s}><path d="M5 9v6h3l5 4V5L8 9H5ZM16.500 9a4 4 0 0 1 0 6M18.500 7a7 7 0 0 1 0 10" /></svg>);
const film = (<svg {...s}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5v14M17 5v14M3 9h4M17 9h4M3 15h4M17 15h4" /></svg>);
const road = (<svg {...s}><path d="M9 3 5 21M15 3l4 18M12 4v3M12 10v4M12 17v3" /></svg>);
const tick = (<svg {...s}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);

const rules: [RegExp, React.ReactNode][] = [
  [/water closet|\bwc\b/i, bath],
  [/power|generator|inverter|solar|electric|meter|prepaid/i, bolt],
  [/pool/i, pool],
  [/gym/i, gym],
  [/elevator|lift/i, lift],
  [/parking|garage/i, car],
  [/smart|wifi|internet/i, smart],
  [/kitchen|dining|pantry/i, kitchen],
  [/wardrobe|closet/i, wardrobe],
  [/water heater|heater|gas|burner/i, heater],
  [/en-?suite|toilet|bath|shower/i, bath],
  [/spotlight|lighting|chandelier/i, bulb],
  [/sound|speaker|audio/i, speaker],
  [/cinema|theatre|theater/i, film],
  [/road|access/i, road],
  [/guest room|bedroom/i, bed],
  [/lounge|sofa|living/i, sofa],
  [/floor|tile/i, floor],
  [/^bq$|boys/i, home],
  [/balcon/i, balcony],
  [/invest/i, trend],
  [/water/i, drop],
  [/heat extractor|extractor|fan/i, fan],
  [/ceiling|pop\b/i, ceiling],
  [/secur|gate|cctv|fortif/i, shield],
  [/spacious|rooms|\bspace\b/i, space],
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
