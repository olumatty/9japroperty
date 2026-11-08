import { labelClass } from "@/app/lib/styles";

/** Shared form styles and building blocks (sell + December forms). */
export const field =
  "w-full rounded-2xl border border-white/10 bg-background px-4 py-3.5 text-[15px] font-medium text-foreground placeholder:text-white/35 outline-none transition duration-300 hover:border-white/25 focus:border-white/60 focus:bg-[#0d130f] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.07)]";

export function Group({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="reveal">
      <div className="mb-6 flex items-center gap-4">
        <span className="grid size-9 place-items-center rounded-full border border-white/20 bg-gradient-to-b from-white/20 to-white/5 font-display text-[11px] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
          {number}
        </span>
        <h2 className="font-display text-xl font-extrabold tracking-tight">{title}</h2>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}
