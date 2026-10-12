// Size chart in centimetres. Waist is the label size in inches converted to cm.
// TODO(owner): replace null values with real garment measurements per fit.
export type SizeRow = {
  size: string;
  waist: number | null;
  hip: number | null;
  thigh: number | null;
  rise: number | null;
  legOpening: number | null;
  inseam: number | null;
};

const inchToCm = (n: number) => Math.round(n * 2.54);

export const sizeChart: SizeRow[] = ["28", "29", "30", "31", "32", "33", "34"].map((size) => ({
  size,
  waist: inchToCm(Number(size)),
  hip: null,
  thigh: null,
  rise: null,
  legOpening: null,
  inseam: null,
}));
