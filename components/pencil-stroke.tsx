import type { CSSProperties, ReactNode } from "react";

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
 * Loose, translucent coloured-pencil stroke behind a key word of a page
 * heading (brief, section 2). Two overlapping passes like a quick scribble.
 * Opacity sits on the whole SVG, so the overlap does not get darker: ink on
 * the stroke stays at 6:1 or more in both modes (checked in
 * tests/palette.spec.ts). Draws itself once; fully drawn under reduced motion.
 */
export function PencilStroke({ tone, children }: PencilStrokeProps) {
  return (
    <span className="relative isolate inline-block">
      <svg
        aria-hidden="true"
        data-pencil-stroke={tone}
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`sketch-draw pointer-events-none absolute -inset-x-[0.12em] bottom-[0.02em] -z-10 h-[0.5em] w-[calc(100%+0.24em)] opacity-35 ${toneClass[tone]}`}
      >
        <path
          pathLength={1}
          strokeWidth={11}
          d="M6 15 C 46 9, 92 17, 136 11 S 182 10, 194 12"
        />
        <path
          pathLength={1}
          strokeWidth={7}
          d="M14 19 C 60 15, 110 20, 150 16 S 186 15, 192 17"
          style={{ "--i": 1 } as CSSProperties}
        />
      </svg>
      {children}
    </span>
  );
}
