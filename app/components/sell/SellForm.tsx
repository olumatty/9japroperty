"use client";

import { useEffect, useRef, useState } from "react";
import { propertyTypes } from "@/app/data/sell";
import { whatsappLink } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { labelClass } from "@/app/lib/styles";

const field =
  "w-full rounded-2xl border border-white/10 bg-background px-4 py-3.5 text-[15px] font-medium text-foreground placeholder:text-white/35 outline-none transition duration-300 hover:border-white/25 focus:border-white/60 focus:bg-[#0d130f] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.07)]";

function buildMessage(data: FormData) {
  const get = (key: string) => String(data.get(key) ?? "").trim();

  const rows: [string, string][] = [
    ["Name", get("name")],
    ["Phone / WhatsApp", get("phone")],
    ["Email", get("email")],
    ["Currently living in", get("residence")],
    ["Property type", get("type")],
    ["Property location", get("location")],
    ["Bedrooms", get("bedrooms")],
    ["Asking price", get("price")],
    ["Title / documents", get("documents")],
    ["More details", get("details")],
    ["Photos / documents", data.get("files") ? "I will attach them in this chat" : ""],
  ];

  const lines = rows.filter(([, value]) => value).map(([k, v]) => `${k}: ${v}`);

  return ["Hello The9jaPropertyChic, I'd like to sell a property.", "", ...lines].join("\n");
}

type Sent = { href: string; name: string; type: string; location: string; files: boolean };

export function SellForm() {
  const [sent, setSent] = useState<Sent | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const href = whatsappLink(buildMessage(data));
    const get = (key: string) => String(data.get(key) ?? "").trim();

    setSent({
      href,
      name: get("name"),
      type: get("type"),
      location: get("location"),
      files: data.get("files") !== null,
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  function startOver() {
    formRef.current?.reset();
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
          <h2 className="text-4xl leading-tight sm:text-5xl">Your message is ready.</h2>
          <p className="mt-4 max-w-[520px] text-[16px] font-medium leading-7">
            WhatsApp should have opened with your details. Press <strong>send</strong> there
            to share them with us. Nothing is sent until you do.
          </p>
        </div>

        {sent.files && (
          <div className="max-w-[520px] rounded-2xl border border-white/25 bg-white/5 p-5 text-[14px] font-medium leading-6">
            <p className="font-semibold">Don’t forget your photos and documents</p>
            <p className="mt-1 text-white/80">
              In the WhatsApp chat, tap the paperclip (＋ on iPhone), choose
              your photos or files, then send them with your message.
            </p>
          </div>
        )}

        <dl className="grid max-w-[520px] gap-3 rounded-2xl border border-white/10 bg-background/40 p-5 text-[14px] font-medium">
          {[
            ["Name", sent.name],
            ["Property", sent.type],
            ["Location", sent.location],
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
            Edit details
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
      {/* soft decorative glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/[0.07] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-emerald-300/[0.06] blur-3xl" />

      {/* Step 1 */}
      <Group number="01" title="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name">
            <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your full name" />
          </Field>
          <Field label="Phone / WhatsApp" htmlFor="phone">
            <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="+234 …" />
          </Field>
        </div>
      </Group>

      {/* Step 2 */}
      <Group number="02" title="The property">
        <fieldset className="flex flex-col gap-3">
          <legend className={`${labelClass} mb-3`}>What are you selling?</legend>
          <div className="flex flex-wrap gap-2.5">
            {propertyTypes.map((type, i) => (
              <label key={type} className="cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  required={i === 0}
                  className="peer sr-only"
                />
                <span className="inline-flex h-11 select-none items-center rounded-full border border-white/15 bg-background px-5 text-[14px] font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-white/50 peer-checked:-translate-y-0.5 peer-checked:border-white peer-checked:bg-white peer-checked:text-[#101612] peer-checked:shadow-[0_10px_28px_-8px_rgba(255,255,255,0.45)] peer-focus-visible:ring-2 peer-focus-visible:ring-white/60">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Where is it?" htmlFor="location">
            <input id="location" name="location" required className={field} placeholder="Area, city, state" />
          </Field>
          <Field label="Asking price (optional)" htmlFor="price">
            <input id="price" name="price" className={field} placeholder="e.g. ₦350M" />
          </Field>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-background/40 p-4">
          <input type="checkbox" name="files" className="peer sr-only" />
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-white/30 text-transparent transition peer-checked:border-white peer-checked:bg-white peer-checked:text-[#101612] peer-focus-visible:ring-2 peer-focus-visible:ring-white/60"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span>
            <span className="block text-[15px] font-semibold">I have photos or documents to share</span>
            <span className="mt-1 block text-[13px] font-medium leading-5 text-white/60">
              After WhatsApp opens, tap the paperclip (＋ on iPhone) to attach
              them to the chat.
            </span>
          </span>
        </label>
      </Group>

      {/* Optional */}
      <details className="group rounded-2xl border border-white/10 bg-background/40 transition-colors duration-300 open:border-white/25 open:bg-background/60 hover:border-white/25">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
          Add more details
          <span className="flex items-center gap-3 text-[13px] font-medium text-white/60">
            Optional
            <span className="grid size-7 place-items-center rounded-full bg-white/10 text-lg leading-none transition group-open:rotate-45">
              +
            </span>
          </span>
        </summary>

        <div className="grid gap-5 px-5 pb-6 pt-2 group-open:animate-[fade-up_0.45s_ease_both] sm:grid-cols-2">
          <Field label="Email" htmlFor="email">
            <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
          </Field>
          <Field label="Where do you live?" htmlFor="residence">
            <input id="residence" name="residence" className={field} placeholder="City, country" />
          </Field>
          <Field label="Bedrooms" htmlFor="bedrooms">
            <input id="bedrooms" name="bedrooms" inputMode="numeric" className={field} placeholder="e.g. 4" />
          </Field>
          <Field label="Title / documents" htmlFor="documents">
            <input id="documents" name="documents" className={field} placeholder="e.g. Certificate of Occupancy" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Anything else?" htmlFor="details">
              <textarea id="details" name="details" rows={4} className={`${field} resize-y`} placeholder="Condition, features, reason for selling…" />
            </Field>
          </div>
        </div>
      </details>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="arrow-nudge shine relative inline-flex h-[56px] w-full items-center justify-between gap-4 overflow-hidden rounded-full bg-white pl-7 pr-2 text-[16px] font-semibold text-[#101612] shadow-[0_12px_32px_-10px_rgba(255,255,255,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(255,255,255,0.55)] sm:w-auto sm:justify-start"
        >
          Continue on WhatsApp
          <span className="grid size-10 place-items-center rounded-full bg-[#101612] text-white">
            <ArrowIcon className="size-4" />
          </span>
        </button>

        <p className="mt-4 max-w-[460px] text-[13px] font-medium leading-5 text-white/60">
          WhatsApp opens with your details filled in. Press send there to share
          them. Nothing is stored on this website.
        </p>

      </div>
    </form>
    </>
  );
}

function Group({
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

function Field({
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
