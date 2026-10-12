import type { ReactNode } from "react";
import { ChevronDown } from "./Icons";

/** Native <details> accordion: works without JavaScript. */
export function Accordion({ title, children, open }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details className="group border-b border-line" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="pb-6 text-ink-2">{children}</div>
    </details>
  );
}
