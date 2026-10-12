"use client";

import { useState } from "react";
import { InstagramIcon } from "@/components/ui/Icons";
import { fill } from "@/lib/i18n";

type Props = {
  productName: string;
  sizes: string[];
  dmUrl: string;
  disabled?: boolean;
  t: { size: string; selectSize: string; order: string; copyMessage: string; copied: string; message: string; messageNoSize: string; orderHelp: string };
};

/** Size picker plus "order on Instagram". ig.me links can't prefill text, so we offer to copy it. */
export function OrderPanel({ productName, sizes, dmUrl, disabled, t }: Props) {
  const [size, setSize] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const message = size ? fill(t.message, { product: productName, size }) : fill(t.messageNoSize, { product: productName });

  const copyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.open(dmUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <fieldset>
        <legend className="eyebrow mb-3">{t.selectSize}</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="size" value={s} className="peer sr-only" checked={size === s} onChange={() => setSize(s)} />
              <span className="flex h-11 min-w-12 items-center justify-center border border-line px-3 text-sm transition-colors peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal hover:border-ink/50">
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={dmUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={disabled || undefined}
          className="inline-flex items-center justify-center gap-3 rounded-[2px] bg-indigo px-6 py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-navy"
        >
          <InstagramIcon /> {t.order}
        </a>
        <button
          type="button"
          onClick={copyAndOpen}
          className="inline-flex items-center justify-center rounded-[2px] border border-ink/80 px-6 py-3.5 text-sm font-medium tracking-wide transition-colors hover:bg-ink hover:text-paper"
        >
          {t.copyMessage}
        </button>
        <p className="min-h-5 text-sm text-ink-3" aria-live="polite">
          {copied ? t.copied : t.orderHelp}
        </p>
      </div>
      <p className="mt-2 border-l-2 border-ochre/60 bg-paper-2/70 px-4 py-3 text-sm text-ink-2">“{message}”</p>
    </div>
  );
}
