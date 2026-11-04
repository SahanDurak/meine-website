import type { ReactNode } from "react";

export type PencilTone = "moss" | "sea";

const toneClass: Record<PencilTone, string> = {
  moss: "text-moss",
  sea: "text-sea",
};

type PencilStrokeProps = {
  tone: PencilTone;
  children: ReactNode;
};

/**
 * Loose, translucent coloured-pencil stroke just below a key word of a page
 * heading (brief, section 2): one thin pass at 35% opacity, under the
 * letters, so it never covers them (only descenders reach into it). Ink stays
 * at 6:1 or more on it in both modes (checked in tests/palette.spec.ts).
 * `leading-none` makes the position follow the letters, not the line height.
 * Draws itself once; fully drawn under reduced motion.
 */
export function PencilStroke({ tone, children }: PencilStrokeProps) {
  return (
    <span className="relative isolate inline-block leading-none">
      <svg
        aria-hidden="true"
        data-pencil-stroke={tone}
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`sketch-draw pointer-events-none absolute -inset-x-[0.08em] top-[0.86em] -z-10 h-[0.14em] w-[calc(100%+0.16em)] opacity-35 ${toneClass[tone]}`}
      >
        <path pathLength={1} d="M4 6 C 50 3, 104 7, 150 4 S 190 5, 196 4" />
      </svg>
      {children}
    </span>
  );
}
