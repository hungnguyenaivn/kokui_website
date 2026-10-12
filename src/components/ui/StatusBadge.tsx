import type { Product } from "@/content/products";
import type { Dictionary } from "@/content/i18n";

export function StatusBadge({ status, dict }: { status: Product["status"]; dict: Dictionary }) {
  if (status === "available") return null;
  const label = status === "coming-soon" ? dict.common.comingSoon : dict.common.soldOut;
  const tone = status === "coming-soon" ? "bg-ochre text-paper" : "bg-ink-3 text-paper";
  return <span className={`inline-block px-2 py-1 text-[0.6875rem] font-medium tracking-[0.12em] uppercase ${tone}`}>{label}</span>;
}
