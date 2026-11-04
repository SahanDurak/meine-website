"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type LoopVideoProps = {
  src: string;
  /** Last frame; shown before playback and as the still under reduced motion. */
  still: string;
  width: number;
  height: number;
  label: string;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Muted looping video without native controls. It only starts when motion
 * is allowed; under reduced motion (or without JavaScript) the poster shows
 * the last frame as a still. A small text button pauses it (WCAG 2.2.2).
 */
export function LoopVideo({
  src,
  still,
  width,
  height,
  label,
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The server cannot know the preference, so it assumes reduced motion:
  // the still is shown until the browser says motion is fine.
  const reducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  );
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion || paused) {
      video.pause();
      if (reducedMotion) {
        // Back to the poster (the last frame) instead of a random frame.
        video.removeAttribute("src");
        video.load();
      }
    } else {
      if (!video.getAttribute("src")) video.src = src;
      // play() can reject (e.g. power saving); the poster then stays.
      video.play().catch(() => {});
    }
  }, [reducedMotion, paused, src]);

  return (
    <div className="flex flex-col gap-2">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={still}
        width={width}
        height={height}
        aria-label={label}
        // White paper in the video blends into the page paper; in dark mode
        // the drawing is inverted to chalk lines on dark paper.
        className="h-auto w-full mix-blend-multiply dark:mix-blend-screen dark:invert"
      />
      {/* Rendered on the server too (no layout shift); CSS hides it under
        reduced motion, where nothing plays. */}
      <button
        type="button"
        aria-label={`${paused ? "Play" : "Pause"} animation`}
        onClick={() => setPaused((value) => !value)}
        className="-ml-2 flex min-h-11 cursor-pointer items-center self-start px-2 font-mono text-xs tracking-wider text-pencil uppercase motion-reduce:hidden fine:hover:text-accent"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
