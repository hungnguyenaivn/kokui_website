"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CloseIcon } from "@/components/ui/Icons";
import type { LookbookImage } from "@/content/lookbook";
import { href, type Locale } from "@/lib/i18n";

type Props = {
  images: LookbookImage[];
  locale: Locale;
  t: { close: string; prev: string; next: string; open: string; seeProduct: string };
};

/** Masonry-style grid with a native <dialog> lightbox (keyboard: ← → Esc). */
export function LookbookGrid({ images, locale, t }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.current?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {images.map((img, i) => (
          <li key={img.src} className="mb-3 break-inside-avoid sm:mb-4" data-reveal>
            <figure>
              <button type="button" onClick={() => open(i)} className="group relative block w-full cursor-zoom-in overflow-hidden bg-paper-2" aria-label={`${t.open}: ${img.alt[locale]}`}>
                <Image
                  src={img.src}
                  alt={img.alt[locale]}
                  width={560}
                  height={700}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  priority={i < 3}
                  className={`w-full object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.03] aspect-[4/5]`}
                />
              </button>
              <figcaption className="mt-2 text-sm text-ink-3">{img.caption[locale]}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialog.current && close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-navy/95 p-0 text-cream backdrop:bg-navy/80"
        aria-label={current?.alt[locale]}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm text-cream/70">
                {(index ?? 0) + 1} / {images.length} · {current.caption[locale]}
              </p>
              <button type="button" onClick={close} className="p-2" aria-label={t.close} autoFocus>
                <CloseIcon />
              </button>
            </div>
            <div className="relative flex-1">
              <Image src={current.src} alt={current.alt[locale]} fill sizes="100vw" className="object-contain" />
              <button type="button" onClick={() => step(-1)} aria-label={t.prev} className="absolute top-1/2 left-2 -translate-y-1/2 bg-navy/60 p-3 sm:left-6">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={t.next} className="absolute top-1/2 right-2 -translate-y-1/2 bg-navy/60 p-3 sm:right-6">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex min-h-14 items-center justify-center px-4 py-3">
              {current.product && (
                <Link href={href(locale, `collection/${current.product}`)} className="text-sm underline underline-offset-4" onClick={close}>
                  {t.seeProduct}
                </Link>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
