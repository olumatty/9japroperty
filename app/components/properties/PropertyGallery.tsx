"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_THUMBS = 4;

export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

type Props = { title: string; items: MediaItem[] };

const thumbOf = (item: MediaItem) => (item.type === "video" ? item.poster : item.src);

function PlayBadge() {
  return (
    <span className="absolute inset-0 grid place-items-center bg-[#101612]/25">
      <span className="grid size-14 place-items-center rounded-full bg-white text-[#101612] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 translate-x-px" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
        </svg>
      </span>
    </span>
  );
}

/** Main image + compact thumbnails. Any image opens a full-screen lightbox. */
export function PropertyGallery({ title, items }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const count = items.length;
  const photos = items.filter((m) => m.type === "image").length;
  const videos = count - photos;
  const thumbs = items.slice(1, 1 + MAX_THUMBS);
  const open = index !== null;

  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  // Sync the native <dialog> with state (gives focus trap + Escape for free).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lock page scroll while open, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const trigger = opener.current;
    return () => {
      document.documentElement.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      // Let arrow keys seek inside a focused video instead of changing slide.
      if ((e.target as HTMLElement | null)?.tagName === "VIDEO") return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  function show(i: number, el: HTMLElement) {
    opener.current = el;
    setIndex(i);
  }

  const alt = (i: number) =>
    i === 0 ? title : `${title} – ${items[i].type === "video" ? "video" : `photo ${i + 1}`}`;
  const btn =
    "grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#101612] focus-visible:ring-2 focus-visible:ring-white";

  return (
    <>
      <div
        className={`mt-8 grid gap-4 ${
          thumbs.length > 0
            ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
            : "max-w-[900px]"
        }`}
      >
        {/* Main image */}
        <button
          type="button"
          onClick={(e) => show(0, e.currentTarget)}
          aria-label={`Open media 1 of ${count}`}
          className="group rise relative block h-[320px] w-full cursor-zoom-in overflow-hidden rounded-[28px] bg-surface sm:h-[440px] lg:h-[560px]"
          style={{ "--d": 3 } as React.CSSProperties}
        >
          <Image
            src={thumbOf(items[0])}
            alt={title}
            fill
            preload
            sizes="(min-width: 1480px) 880px, (min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {count > 1 && (
            <span className="absolute bottom-4 right-4 rounded-full bg-[#101612]/80 px-4 py-2 font-display text-[11px] font-bold tracking-widest backdrop-blur">
              VIEW ALL {photos} PHOTOS
              {videos > 0 && ` + ${videos} VIDEO${videos > 1 ? "S" : ""}`}
            </span>
          )}
        </button>

        {/* Thumbnails */}
        {thumbs.length > 0 && (
          <div className="grid grid-cols-2 gap-4 lg:h-[560px] lg:grid-rows-2">
            {thumbs.map((item, i) => {
              const n = thumbs.length;
              // Fill the right-hand block whatever the number of thumbnails.
              const span =
                n === 1
                  ? "col-span-2 lg:row-span-2"
                  : n === 2
                    ? "col-span-2"
                    : n === 3 && i === 0
                      ? "col-span-2"
                      : "";
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={(e) => show(i + 1, e.currentTarget)}
                  aria-label={`Open ${item.type === "video" ? "video" : "photo"} ${i + 2} of ${count}`}
                  className={`group reveal relative h-[150px] cursor-zoom-in overflow-hidden rounded-[22px] bg-surface sm:h-[200px] lg:h-full ${span}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Image
                    src={thumbOf(item)}
                    alt={alt(i + 1)}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  {item.type === "video" && <PlayBadge />}
                  {i === thumbs.length - 1 && count - 1 > MAX_THUMBS && (
                    <span className="absolute inset-0 grid place-items-center bg-[#101612]/70 font-serif text-4xl backdrop-blur-[2px]">
                      +{count - 1 - MAX_THUMBS}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        aria-label={`${title} photo gallery`}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIndex(null);
        }}
        onTouchStart={(e) =>
          (touchX.current =
            (e.target as HTMLElement).tagName === "VIDEO" ? null : e.touches[0].clientX)
        }
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-[#0a0f0c]/95 p-0 text-white backdrop:bg-black/80"
      >
        {open && (
          <div className="relative flex size-full flex-col">
            <div className="flex items-center justify-between px-4 py-4 sm:px-6">
              <p className="font-display text-[11px] font-bold tracking-widest">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
              <button type="button" onClick={() => setIndex(null)} aria-label="Close gallery" className={btn}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="size-5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              {items[index].type === "video" ? (
                <video
                  key={items[index].src}
                  src={items[index].src}
                  poster={items[index].type === "video" ? items[index].poster : undefined}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="size-full object-contain"
                >
                  Your browser can’t play this video.
                </video>
              ) : (
                <Image
                  key={items[index].src}
                  src={items[index].src}
                  alt={alt(index)}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              )}
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous"
                  className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                    <path d="m15 5-7 7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next"
                  className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <p className="px-4 py-4 text-center text-[13px] font-medium text-white/70">
              {title}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
