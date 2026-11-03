"use client";

import { useEffect, useRef, useState } from "react";

// Measures its own width, which equals the content container (brief, detail 1).
export function DimensionLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(Math.round(entries[0].contentRect.width));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="flex items-center gap-3 font-mono text-xs tracking-wider text-pencil"
    >
      <span className="h-3 w-px bg-pencil" />
      <span className="h-px flex-1 bg-pencil" />
      <span className="tabular-nums">W {width ?? "···"} px</span>
      <span className="h-px flex-1 bg-pencil" />
      <span className="h-3 w-px bg-pencil" />
    </div>
  );
}
