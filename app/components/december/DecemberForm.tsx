"use client";

import { useEffect, useRef, useState } from "react";
import { budgets, cities, guestOptions, wants } from "@/app/data/december";
import { whatsappLink } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { Field, Group, field } from "@/app/components/ui/FormParts";
import { labelClass } from "@/app/lib/styles";

const chip =
  "inline-flex h-11 select-none items-center rounded-full border border-white/15 bg-background px-5 text-[14px] font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-white/50 peer-checked:-translate-y-0.5 peer-checked:border-white peer-checked:bg-white peer-checked:text-[#101612] peer-checked:shadow-[0_10px_28px_-8px_rgba(255,255,255,0.45)] peer-focus-visible:ring-2 peer-focus-visible:ring-white/60";

function formatDate(value: string) {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function buildMessage(data: FormData) {
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const dates = [formatDate(get("arrival")), formatDate(get("departure"))]
    .filter(Boolean)
    .join(" to ");
  const budget = get("budgetCustom")
    ? `${get("budget")} (${get("budgetCustom")})`
    : get("budget");

  const rows: [string, string][] = [
    ["Name", get("name")],
    ["Phone / WhatsApp", get("phone")],
    ["Flying from", get("from")],
    ["Dates", dates],
    ["Guests", get("guests")],
    ["Preferred city", get("city")],
    ["Budget per night", budget],
    ["I'd like help with", data.getAll("wants").join(", ")],
    ["Anything else", get("notes")],
  ];

  return [
    "Hello The9jaPropertyChic, I'm coming home this December and I'd like help planning my stay.",
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
}

type Sent = {
  href: string;
  name: string;
  dates: string;
  guests: string;
  budget: string;
};

export function DecemberForm() {
  const [sent, setSent] = useState<Sent | null>(null);
  const [arrival, setArrival] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const href = whatsappLink(buildMessage(data));

    setSent({
      href,
      name: get("name"),
      dates:
        [formatDate(get("arrival")), formatDate(get("departure"))]
          .filter(Boolean)
          .join(" to ") || "Not set",
      guests: get("guests"),
      budget: get("budget"),
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  function startOver() {
    formRef.current?.reset();
    setArrival("");
    setSent(null);
  }

  return (
    <>
      {sent && (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="rise flex flex-col gap-6 rounded-[32px] bg-surface p-6 outline-none sm:p-10"
        >
          <span className="grid size-14 place-items-center rounded-full bg-white text-[#101612]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>

          <div>
            <h2 className="text-4xl leading-tight sm:text-5xl">Your plan is ready.</h2>
            <p className="mt-4 max-w-[520px] text-[16px] font-medium leading-7">
              WhatsApp should have opened with your plan. Press <strong>send</strong> there
              to share it with us. Nothing is sent until you do.
            </p>
          </div>

          <dl className="grid max-w-[520px] gap-3 rounded-2xl border border-white/10 bg-background/40 p-5 text-[14px] font-medium">
            {[
              ["Name", sent.name],
              ["Dates", sent.dates],
              ["Guests", sent.guests],
              ["Budget per night", sent.budget],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6">
                <dt className="text-white/60">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-4">
            <a
              href={sent.href}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-nudge inline-flex h-[52px] items-center gap-4 rounded-full bg-white pl-6 pr-2 text-[15px] font-semibold text-[#101612] transition hover:bg-white/90"
            >
              Open WhatsApp again
              <span className="grid size-9 place-items-center rounded-full bg-[#101612] text-white">
                <ArrowIcon className="size-4" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="inline-flex h-[52px] items-center rounded-full border border-white/15 px-6 text-[15px] font-semibold transition hover:bg-white/10"
            >
              Edit plan
            </button>
            <button
              type="button"
              onClick={startOver}
              className="inline-flex h-[52px] items-center px-2 text-[15px] font-semibold text-white/70 transition hover:text-white"
            >
              Start over
            </button>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        hidden={sent !== null}
        className="relative flex flex-col gap-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#26322a] via-surface to-[#18211b] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/[0.07] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-emerald-300/[0.06] blur-3xl" />

        <Group number="01" title="About you">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="name">
              <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your full name" />
            </Field>
            <Field label="Phone / WhatsApp" htmlFor="phone">
              <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="+44 …" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Where are you flying from?" htmlFor="from">
                <input id="from" name="from" className={field} placeholder="City, country" />
              </Field>
            </div>
          </div>
        </Group>

        <Group number="02" title="Your trip">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Arriving" htmlFor="arrival">
              <input
                id="arrival"
                name="arrival"
                type="date"
                required
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className={`${field} [color-scheme:dark]`}
              />
            </Field>
            <Field label="Leaving" htmlFor="departure">
              <input
                id="departure"
                name="departure"
                type="date"
                min={arrival || undefined}
                className={`${field} [color-scheme:dark]`}
              />
            </Field>
          </div>

          <fieldset className="mt-6">
            <legend className={`${labelClass} mb-3`}>How many guests?</legend>
            <div className="flex flex-wrap gap-2.5">
              {guestOptions.map((g, i) => (
                <label key={g} className="cursor-pointer">
                  <input type="radio" name="guests" value={g} required={i === 0} className="peer sr-only" />
                  <span className={chip}>{g}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className={`${labelClass} mb-3`}>Where would you like to stay?</legend>
            <div className="flex flex-wrap gap-2.5">
              {cities.map((c) => (
                <label key={c} className="cursor-pointer">
                  <input type="radio" name="city" value={c} className="peer sr-only" />
                  <span className={chip}>{c}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </Group>

        <Group number="03" title="Your budget">
          <fieldset>
            <legend className={`${labelClass} mb-3`}>Budget per night</legend>
            <div className="flex flex-wrap gap-2.5">
              {budgets.map((b, i) => (
                <label key={b} className="cursor-pointer">
                  <input type="radio" name="budget" value={b} required={i === 0} className="peer sr-only" />
                  <span className={chip}>{b}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-5 max-w-[420px]">
            <Field label="Or tell us your own budget (optional)" htmlFor="budgetCustom">
              <input id="budgetCustom" name="budgetCustom" className={field} placeholder="e.g. £150 a night, or ₦5M in total" />
            </Field>
          </div>
        </Group>

        <Group number="04" title="Your plan">
          <fieldset>
            <legend className={`${labelClass} mb-3`}>What would you like help with? Pick any</legend>
            <div className="flex flex-wrap gap-2.5">
              {wants.map((w) => (
                <label key={w} className="cursor-pointer">
                  <input type="checkbox" name="wants" value={w} className="peer sr-only" />
                  <span className={chip}>{w}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-5">
            <Field label="Anything else we should know? (optional)" htmlFor="notes">
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className={`${field} resize-y`}
                placeholder="Events you’re attending, family needs, preferred area, car type…"
              />
            </Field>
          </div>
        </Group>

        <div>
          <button
            type="submit"
            className="arrow-nudge shine relative inline-flex h-[56px] w-full items-center justify-between gap-4 overflow-hidden rounded-full bg-white pl-7 pr-2 text-[16px] font-semibold text-[#101612] shadow-[0_12px_32px_-10px_rgba(255,255,255,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(255,255,255,0.55)] sm:w-auto sm:justify-start"
          >
            Send my December plan
            <span className="grid size-10 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-4" />
            </span>
          </button>
          <p className="mt-4 max-w-[460px] text-[13px] font-medium leading-5 text-white/60">
            WhatsApp opens with your plan filled in. Press send there to share
            it. Nothing is stored on this website.
          </p>
        </div>
      </form>
    </>
  );
}
