"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Props = {
  successHref: string;
  t: { name: string; reply: string; message: string; send: string; sending: string; error: string; required: string };
};

// Netlify Forms: the form is detected from public/__forms.html at deploy time;
// submissions are POSTed there as urlencoded data.
export function ContactForm({ successHref, t }: Props) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push(successHref);
    } catch {
      setState("error");
    }
  }

  const field = "mt-2 w-full rounded-[2px] border border-ink/25 bg-paper px-4 py-3 text-base outline-none transition-colors focus:border-indigo";

  return (
    <form name="contact" onSubmit={onSubmit} className="space-y-6">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="block">
        <span className="text-sm font-medium">{t.name}</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">{t.reply}</span>
        <input name="reply" required autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">{t.message}</span>
        <textarea name="message" required rows={6} className={field} />
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center justify-center rounded-[2px] bg-indigo px-8 py-4 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-navy disabled:opacity-60"
      >
        {state === "sending" ? t.sending : t.send}
      </button>
      <p role="status" className="text-sm text-[#9b2c2c]">
        {state === "error" ? t.error : ""}
      </p>
    </form>
  );
}
