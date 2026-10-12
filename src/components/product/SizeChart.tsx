import type { Dictionary } from "@/content/i18n";
import { sizeChart, type SizeRow } from "@/content/sizes";

const COLS: (keyof SizeRow)[] = ["size", "waist", "hip", "thigh", "rise", "legOpening", "inseam"];

export function SizeChart({ dict }: { dict: Dictionary }) {
  const c = dict.sizeGuide.columns;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="sr-only">{dict.sizeGuide.chartTitle}</caption>
          <thead>
            <tr className="border-b border-ink/30 text-left">
              {COLS.map((col) => (
                <th key={col} scope="col" className="py-3 pr-4 font-medium">
                  {c[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((row) => (
              <tr key={row.size} className="border-b border-line">
                {COLS.map((col, i) =>
                  i === 0 ? (
                    <th key={col} scope="row" className="py-3 pr-4 text-left font-medium">{row[col]}</th>
                  ) : (
                    <td key={col} className="py-3 pr-4 text-ink-2 tabular-nums">{row[col] ?? "—"}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-ink-3">{dict.sizeGuide.chartNote}</p>
    </div>
  );
}
