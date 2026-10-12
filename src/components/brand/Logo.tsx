// The kokui mark: a two-peak mountain line redrawn from the Instagram avatar,
// above a soft lowercase serif wordmark.
export const MOUNTAIN_PATH =
  "M3 29 C 13 23, 28 8, 39 5 C 45 3.5, 50 11, 56.5 17.5 C 59.5 14, 63 10.5, 67 10.5 C 74 11, 86 21.5, 97 27";

export function LogoMark({ className = "", strokeWidth = 4.2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 34" className={className} aria-hidden="true" focusable="false">
      <path d={MOUNTAIN_PATH} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = {
    sm: { mark: "w-10", text: "text-xl" },
    md: { mark: "w-12", text: "text-2xl" },
    lg: { mark: "w-24", text: "text-5xl" },
    xl: { mark: "w-40 sm:w-56", text: "text-7xl sm:text-8xl" },
  }[size];
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <LogoMark className={`${sizes.mark} -mb-[0.08em]`} />
      <span
        className={`font-display ${sizes.text} font-semibold tracking-[-0.02em]`}
        style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0, "opsz" 72' }}
      >
        kokui
      </span>
    </span>
  );
}
