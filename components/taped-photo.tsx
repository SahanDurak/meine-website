import type { CSSProperties } from "react";
import Image from "next/image";

// The frame starts drawing right after the page has painted (see globals.css).
const frameDelay = { "--i": 1 } as CSSProperties;

type TapedPhotoProps = {
  className?: string;
};

/**
 * Portrait photo glued into the sketchbook: slight tilt, a strip of tape on
 * top and a thin, slightly irregular hand-drawn frame. The photo itself is
 * never filtered or cropped.
 */
export function TapedPhoto({ className = "" }: TapedPhotoProps) {
  return (
    <figure className={`relative mt-3 rotate-1 ${className}`}>
      <Image
        src="/images/sahan.webp"
        width={800}
        height={1000}
        alt="Portrait of Sahan Durak"
        preload
        sizes="(min-width: 40rem) 15rem, 11rem"
        className="block h-auto w-full"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sketch-draw pointer-events-none absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] text-ink"
      >
        <path
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={frameDelay}
          d="M1.5 2.5 C 25 0.8, 60 2.2, 98.5 1 C 99.4 30, 98.2 70, 99 98.5 C 65 99.6, 30 98.2, 1 99.2 C 0.2 65, 1.6 30, 1.5 2.5 C 2 1.8, 4 1.4, 6 1.6"
        />
      </svg>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-1/2 h-7 w-16 -translate-x-1/2 -rotate-3 border-x border-line bg-pencil/30"
      />
    </figure>
  );
}
