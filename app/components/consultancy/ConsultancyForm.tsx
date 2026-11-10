"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { consultancy, slotsByWeekday, topics } from "@/app/data/consultancy";
import { whatsappLink } from "@/app/data/contact";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";
import { CopyButton } from "@/app/components/consultancy/CopyButton";
import { DraftNotice, Field, FieldError, Group, field } from "@/app/components/ui/FormParts";
import {
  fullName,
  optionalEmail,
  phone,
  required,
  useFormDraft,
  useFormValidation,
  type Rules,
} from "@/app/lib/forms";
import { labelClass } from "@/app/lib/styles";

const chip =
  "inline-flex min-h-11 select-none items-center justify-center rounded-full border border-white/15 bg-background px-5 py-2 text-center text-[14px] font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-white/50 peer-checked:-translate-y-0.5 peer-checked:border-white peer-checked:bg-white peer-checked:text-[#101612] peer-checked:shadow-[0_10px_28px_-8px_rgba(255,255,255,0.45)] peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 peer-aria-[invalid=true]:border-red-400/60";

const rules: Rules = {
  name: fullName,
  phone,
  email: optionalEmail,
  date: required("Please choose a day for your consultation."),
  time: required("Please choose a time."),
  topic: required("Please choose what you’d like to discuss."),
  paid: required("Please confirm you’ve paid the consultation fee."),
};

/* ---------- Dates (Nigeria time) ---------- */

function lagosToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: consultancy.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Only read the clock in the browser; the server renders no dates.
const noopSubscribe = () => () => {};

function parts(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return { y, m, d };
}

function addDays(value: string, days: number) {
  const { y, m, d } = parts(value);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return t.toISOString().slice(0, 10);
}

const weekdayOf = (value: string) => {
  const { y, m, d } = parts(value);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
};

const fmt = (value: string, opts: Intl.DateTimeFormatOptions) => {
  const { y, m, d } = parts(value);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { ...opts, timeZone: "UTC" });
};

function buildMessage(data: FormData) {
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const date = get("date");
  const rows: [string, string][] = [
    ["Name", get("name")],
    ["Phone / WhatsApp", get("phone")],
    ["Email", get("email")],
    ["Date", date ? fmt(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : ""],
    ["Time (Nigeria time)", get("time")],
    ["Topic", get("topic")],
    ["Anything to add", get("notes")],
  ];
  const { account, feeLabel } = consultancy;
  return [
    "Hello The9jaPropertyChic, I'd like to book a consultation.",
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    `Payment: I have paid the ${feeLabel} consultation fee to ${account.bank} ${account.number} (${account.name}), narration "${account.narration}". I'll send my payment receipt in this chat.`,
  ].join("\n");
}

type Sent = { href: string; name: string; when: string; topic: string };

export function ConsultancyForm() {
  const today = useSyncExternalStore(noopSubscribe, lagosToday, () => "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sent, setSent] = useState<Sent | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const { errors, validateAll, clearErrors, onBlur, onChange } = useFormValidation(formRef, rules);
  const { restored, clearDraft } = useFormDraft(formRef, "consultancy-form-draft", (draft) => {
    setDate(draft.date?.[0] ?? "");
    setTime(draft.time?.[0] ?? "");
  });

  const days = useMemo(() => {
    if (!today) return [];
    const out: string[] = [];
    for (let i = consultancy.minDaysAhead; i <= consultancy.windowDays; i++) {
      const day = addDays(today, i);
      if (slotsByWeekday[weekdayOf(day)]) out.push(day);
    }
    return out;
  }, [today]);

  const daySlots = date ? (slotsByWeekday[weekdayOf(date)] ?? []) : [];

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateAll()) return;
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const href = whatsappLink(buildMessage(data));
    setSent({
      href,
      name: get("name"),
      when: `${fmt(get("date"), { weekday: "long", day: "numeric", month: "long" })}, ${get("time")}`,
      topic: get("topic"),
    });
    window.open(href, "_blank", "noopener,noreferrer");
    clearDraft();
  }

  function reset() {
    formRef.current?.reset();
    setDate("");
    setTime("");
    clearDraft();
    clearErrors();
  }

  const { account, feeLabel } = consultancy;

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
            <h2 className="text-4xl leading-tight sm:text-5xl">Your booking is ready to send.</h2>
            <p className="mt-4 max-w-[520px] text-[16px] font-medium leading-7">
              WhatsApp should have opened with your booking. Press <strong>send</strong> there,
              then send your payment receipt in the same chat.
            </p>
          </div>

          <div className="max-w-[520px] rounded-2xl border border-white/25 bg-white/5 p-5 text-[14px] font-medium leading-6">
            <p className="font-semibold">Don’t forget your payment receipt</p>
            <p className="mt-1 text-white/80">
              In the WhatsApp chat, tap the paperclip (＋ on iPhone), choose the
              receipt of your {feeLabel} transfer and send it.
            </p>
            <p className="mt-3 font-semibold">Your slot isn’t confirmed yet</p>
            <p className="mt-1 text-white/80">
              We confirm your consultation once we’ve checked your payment.
            </p>
          </div>

          <dl className="grid max-w-[520px] gap-3 rounded-2xl border border-white/10 bg-background/40 p-5 text-[14px] font-medium">
            {[
              ["Name", sent.name],
              ["When", sent.when],
              ["Topic", sent.topic],
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
            <button type="button" onClick={() => setSent(null)} className="inline-flex h-[52px] items-center rounded-full border border-white/15 px-6 text-[15px] font-semibold transition hover:bg-white/10">
              Edit booking
            </button>
            <button type="button" onClick={() => { reset(); setSent(null); }} className="inline-flex h-[52px] items-center px-2 text-[15px] font-semibold text-white/70 transition hover:text-white">
              Start over
            </button>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        onBlur={onBlur}
        onChange={onChange}
        noValidate
        hidden={sent !== null}
        className="relative flex flex-col gap-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#26322a] via-surface to-[#18211b] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/[0.07] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-emerald-300/[0.06] blur-3xl" />

        {restored && <DraftNotice onClear={reset} />}

        <Group number="01" title="Your details">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" htmlFor="name" error={errors.name}>
              <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your full name" />
            </Field>
            <Field label="Phone / WhatsApp" htmlFor="phone" error={errors.phone}>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="+234 …" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email (optional)" htmlFor="email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
              </Field>
            </div>
          </div>
        </Group>

        <Group number="02" title="Pick your day">
          <fieldset>
            <legend className={`${labelClass} mb-3`}>Available days (Nigeria time)</legend>
            {days.length === 0 ? (
              <p className="text-[14px] font-medium text-white/60">Loading available days…</p>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                {days.map((day) => (
                  <label key={day} className="cursor-pointer">
                    <input
                      type="radio"
                      name="date"
                      value={day}
                      checked={date === day}
                      onChange={() => {
                        setDate(day);
                        setTime("");
                      }}
                      className="peer sr-only"
                    />
                    <span className={chip}>
                      {fmt(day, { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                  </label>
                ))}
              </div>
            )}
            <FieldError name="date" error={errors.date} className="mt-3" />
          </fieldset>

          <fieldset className="mt-8">
            <legend className={`${labelClass} mb-3`}>Time</legend>
            {date ? (
              <div className="flex flex-wrap gap-2.5">
                {daySlots.map((slot) => (
                  <label key={slot} className="cursor-pointer">
                    <input
                      type="radio"
                      name="time"
                      value={slot}
                      checked={time === slot}
                      onChange={() => setTime(slot)}
                      className="peer sr-only"
                    />
                    <span className={chip}>{slot}</span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-[14px] font-medium text-white/60">Choose a day first to see the times.</p>
            )}
            <FieldError name="time" error={errors.time} className="mt-3" />
          </fieldset>
        </Group>

        <Group number="03" title="What would you like to discuss?">
          <fieldset>
            <legend className="sr-only">Topic</legend>
            <div className="flex flex-wrap gap-2.5">
              {topics.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="topic" value={t} className="peer sr-only" />
                  <span className={chip}>{t}</span>
                </label>
              ))}
            </div>
            <FieldError name="topic" error={errors.topic} className="mt-3" />
          </fieldset>
          <div className="mt-5">
            <Field label="Anything we should know? (optional)" htmlFor="notes">
              <textarea id="notes" name="notes" rows={3} className={`${field} resize-y`} placeholder="Budget, location, timeline, questions…" />
            </Field>
          </div>
        </Group>

        <Group number="04" title={`Pay the ${feeLabel} fee`}>
          <div className="rounded-2xl border border-white/15 bg-background/50 p-5 sm:p-6">
            <p className="text-[14px] font-medium leading-6 text-white/80">
              Transfer <strong className="text-white">{feeLabel}</strong> to the account below, then book. Use
              the narration so we can match your payment.
            </p>
            <dl className="mt-5 grid gap-4 text-[15px]">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Bank</dt>
                <dd className="font-semibold">{account.bank}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Account number</dt>
                <dd className="flex items-center gap-3 font-semibold">
                  <span className="font-display text-lg tracking-wide">{account.number}</span>
                  <CopyButton value={account.number} label="account number" />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Account name</dt>
                <dd className="font-semibold">{account.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/60">Narration</dt>
                <dd className="font-semibold">{account.narration}</dd>
              </div>
            </dl>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-background/40 p-4">
            <input type="checkbox" name="paid" value="yes" className="peer sr-only" />
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-white/30 text-transparent transition peer-checked:border-white peer-checked:bg-white peer-checked:text-[#101612] peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 peer-aria-[invalid=true]:border-red-400/70"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span>
              <span className="block text-[15px] font-semibold">I’ve paid the {feeLabel} consultation fee</span>
              <span className="mt-1 block text-[13px] font-medium leading-5 text-white/60">
                You’ll send your payment receipt in WhatsApp. Your slot is confirmed once we’ve checked the payment.
              </span>
            </span>
          </label>
          <FieldError name="paid" error={errors.paid} className="mt-3" />
        </Group>

        <div>
          <button
            type="submit"
            className="arrow-nudge shine relative inline-flex h-[56px] w-full items-center justify-between gap-4 overflow-hidden rounded-full bg-white pl-7 pr-2 text-[16px] font-semibold text-[#101612] shadow-[0_12px_32px_-10px_rgba(255,255,255,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(255,255,255,0.55)] sm:w-auto sm:justify-start"
          >
            Book on WhatsApp
            <span className="grid size-10 place-items-center rounded-full bg-[#101612] text-white">
              <ArrowIcon className="size-4" />
            </span>
          </button>
          <p className="mt-4 max-w-[480px] text-[13px] font-medium leading-5 text-white/60">
            WhatsApp opens with your booking filled in. Press send, then send your payment receipt in the chat. Nothing is stored on this website.
          </p>
        </div>
      </form>
    </>
  );
}
