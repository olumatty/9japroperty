"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "@/app/components/ui/ArrowIcon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[88px] right-[22px] z-40 grid size-12 place-items-center rounded-full bg-white text-[#101612] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-1 sm:bottom-[96px] sm:right-[26px] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowIcon className="size-5 -rotate-45" />
    </button>
  );
}
