"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

export function CopyEmailButton({ address }: { address: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy e-mail address"
        className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-mono text-xs tracking-wider text-pencil uppercase underline decoration-pencil underline-offset-4 motion-safe:transition-transform motion-safe:duration-150 motion-safe:active:scale-[0.97] fine:hover:decoration-pen"
      >
        Copy
      </button>
      <span
        aria-live="polite"
        className="min-w-16 font-mono text-xs tracking-wider text-pencil uppercase"
      >
        {status === "copied" && "Copied"}
        {status === "failed" && "Copy failed"}
      </span>
    </>
  );
}
