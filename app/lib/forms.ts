"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

/* ---------- Validation rules ---------- */

export type Rule = (value: string, data: FormData) => string | undefined;
export type Rules = Record<string, Rule>;

export const required =
  (message: string): Rule =>
  (v) =>
    v ? undefined : message;

export const fullName: Rule = (v) =>
  v.length < 2 ? "Please enter your full name." : undefined;

export const phone: Rule = (v) => {
  if (!v) return "Please enter your phone or WhatsApp number.";
  const digits = v.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(v) || digits.length < 7 || digits.length > 15)
    return "That number doesn’t look right. Try +234 815 035 8972.";
};

export const optionalEmail: Rule = (v) =>
  v && !/^\S+@\S+\.\S+$/.test(v) ? "Please enter a valid email address." : undefined;

/* ---------- Validation hook ---------- */

type Errors = Record<string, string>;

function controls(form: HTMLFormElement, name: string) {
  return Array.from(form.elements).filter(
    (el): el is HTMLInputElement =>
      el instanceof HTMLInputElement &&
      el.name === name,
  );
}

export function useFormValidation(
  formRef: React.RefObject<HTMLFormElement | null>,
  rules: Rules,
) {
  const [errors, setErrors] = useState<Errors>({});

  const check = (name: string): string | undefined => {
    const form = formRef.current;
    const rule = rules[name];
    if (!form || !rule) return;
    const data = new FormData(form);
    return rule(String(data.get(name) ?? "").trim(), data);
  };

  // Reflect errors on the controls for assistive tech + red borders.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    for (const name of Object.keys(rules)) {
      for (const el of controls(form, name)) {
        if (errors[name]) {
          el.setAttribute("aria-invalid", "true");
          el.setAttribute("aria-describedby", `${name}-error`);
        } else {
          el.removeAttribute("aria-invalid");
          el.removeAttribute("aria-describedby");
        }
      }
    }
  });

  function setOne(name: string, message: string | undefined) {
    setErrors((prev) => {
      if (!message && !prev[name]) return prev;
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  /** Validate everything. Focuses the first invalid control. */
  function validateAll(): boolean {
    const form = formRef.current;
    if (!form) return true;
    const next: Errors = {};
    for (const name of Object.keys(rules)) {
      const message = check(name);
      if (message) next[name] = message;
    }
    setErrors(next);

    const first = Object.keys(next)[0];
    if (first) {
      const el = controls(form, first)[0];
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      el?.focus({ preventScroll: true });
      return false;
    }
    return true;
  }

  const target = (e: React.SyntheticEvent) => {
    const el = e.target as HTMLInputElement;
    return el && el.name && rules[el.name] ? el : null;
  };

  return {
    errors,
    validateAll,
    clearErrors: () => setErrors({}),
    /** Attach to <form onBlur>: validate a field when the user leaves it. */
    onBlur: (e: React.FocusEvent) => {
      const el = target(e);
      if (el && el.type !== "radio" && el.type !== "checkbox")
        setOne(el.name, check(el.name));
    },
    /** Attach to <form onChange>: clear/refresh an error as the user fixes it. */
    onChange: (e: React.ChangeEvent) => {
      const el = target(e);
      if (el && errors[el.name]) setOne(el.name, check(el.name));
    },
  };
}

/* ---------- Draft saving ---------- */

type Draft = Record<string, string[]>;
const MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days

/**
 * Saves the form to localStorage as the user types and restores it on
 * the next visit. Storage is per-browser: nothing is sent anywhere.
 */
export function useFormDraft(
  formRef: React.RefObject<HTMLFormElement | null>,
  key: string,
  onRestore?: (draft: Draft) => void,
) {
  const [restored, setRestored] = useState(false);
  const restoredCb = useEffectEvent((draft: Draft) => onRestore?.(draft));
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // Restore
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw) as { at: number; values: Draft };
        if (Date.now() - saved.at < MAX_AGE && Object.keys(saved.values).length) {
          for (const el of Array.from(form.elements)) {
            if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) continue;
            const values = saved.values[el.name];
            if (!values) continue;
            if (el instanceof HTMLInputElement && (el.type === "radio" || el.type === "checkbox")) {
              el.checked = values.includes(el.value);
            } else {
              el.value = values[0] ?? "";
            }
          }
          restoredCb(saved.values);
          // Defer so we don't set state synchronously inside the effect.
          queueMicrotask(() => setRestored(true));
        }
      }
    } catch {
      /* storage unavailable: carry on without drafts */
    }

    // Save (debounced)
    const save = () => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        try {
          const data = new FormData(form);
          const values: Draft = {};
          for (const name of new Set(Array.from(data.keys()))) {
            const all = data.getAll(name).filter((v): v is string => typeof v === "string");
            if (all.some((v) => v.trim())) values[name] = all;
          }
          if (Object.keys(values).length)
            window.localStorage.setItem(key, JSON.stringify({ at: Date.now(), values }));
          else window.localStorage.removeItem(key);
        } catch {
          /* ignore */
        }
      }, 400);
    };

    form.addEventListener("input", save);
    form.addEventListener("change", save);
    return () => {
      form.removeEventListener("input", save);
      form.removeEventListener("change", save);
      window.clearTimeout(timer.current);
    };
  }, [formRef, key]);

  function clearDraft() {
    window.clearTimeout(timer.current);
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    setRestored(false);
  }

  return { restored, clearDraft };
}
