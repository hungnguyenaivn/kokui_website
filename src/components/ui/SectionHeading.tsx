import type { ReactNode } from "react";

type Props = { eyebrow?: string; title: string; intro?: string; action?: ReactNode; as?: "h1" | "h2"; size?: "lg" | "xl"; className?: string };

export function SectionHeading({ eyebrow, title, intro, action, as: Tag = "h2", size = "lg", className = "" }: Props) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`} data-reveal={Tag === "h1" ? undefined : true}>
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Tag className={size === "xl" ? "text-display-xl" : "text-display-lg"}>{title}</Tag>
        {intro && <p className="mt-5 max-w-xl text-lg text-ink-2">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
