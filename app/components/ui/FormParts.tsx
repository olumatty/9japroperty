import { labelClass } from "@/app/lib/styles";

/** Shared form styles and building blocks (sell + December forms). */
export const field =
  "w-full rounded-2xl border border-white/10 bg-background px-4 py-3.5 text-[15px] font-medium text-foreground placeholder:text-white/35 outline-none transition duration-300 hover:border-white/25 focus:border-white/60 focus:bg-[#0d130f] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.07)] aria-[invalid=true]:border-red-400/70 aria-[invalid=true]:bg-red-950/10";

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

export function FieldError({
  name,
  error,
  className = "",
}: {
  name: string;
  error?: string;
  className?: string;
}) {
  if (!error) return null;
  return (
    <p
      id={`${name}-error`}
      role="alert"
      className={`${className} flex items-start gap-2 text-[13px] font-medium leading-5 text-red-300`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="mt-0.5 size-4 shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16.5v.01" />
      </svg>
      {error}
    </p>
  );
}

export function DraftNotice({ onClear }: { onClear: () => void }) {
  return (
    <div
      role="status"
      className="relative flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-[14px] font-medium"
    >
      <span>Welcome back. We restored what you were filling in.</span>
      <button
        type="button"
        onClick={onClear}
        className="font-semibold underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
      >
        Clear and start fresh
      </button>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      <FieldError name={htmlFor} error={error} />
    </div>
  );
}
