import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "light" | "text";

const styles: Record<Variant, string> = {
  primary: "bg-indigo text-cream hover:bg-navy px-6 py-3.5 rounded-[2px]",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-paper px-6 py-3.5 rounded-[2px]",
  light: "bg-cream text-navy hover:bg-paper px-6 py-3.5 rounded-[2px]",
  text: "text-ink underline decoration-1 underline-offset-[6px] hover:text-teal",
};

type Props = { href: string; children: ReactNode; variant?: Variant; external?: boolean; arrow?: boolean; className?: string };

export function ButtonLink({ href, children, variant = "primary", external, arrow, className = "" }: Props) {
  const cls = `inline-flex items-center justify-center gap-2.5 text-sm font-medium tracking-wide transition-colors duration-300 ${styles[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
