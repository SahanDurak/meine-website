"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import { THEME_STORAGE_KEY } from "@/components/theme-script";

type Theme = "light" | "dark";

const darkQuery = "(prefers-color-scheme: dark)";

function systemTheme(): Theme {
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function currentTheme(): Theme {
  const manual = document.documentElement.dataset.theme;
  return manual === "light" || manual === "dark" ? manual : systemTheme();
}

// Re-render when the system preference or the data-theme attribute changes.
function subscribe(onChange: () => void) {
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function applyTheme(next: Theme) {
  const root = document.documentElement;
  // Picking the theme the system already uses means "follow the system"
  // again: the override is removed, so later system changes apply.
  const followsSystem = next === systemTheme();
  try {
    if (followsSystem) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only.
  }
  if (followsSystem) delete root.dataset.theme;
  else root.dataset.theme = next;
}

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Hand-drawn sun: a slightly wobbly circle and uneven rays. */
function SunSketch({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-icon="sun"
      className={className}
    >
      <path
        {...strokeProps}
        pathLength={1}
        style={{ "--i": 0 } as CSSProperties}
        d="M12 7.6c2.5-.1 4.5 1.9 4.4 4.5-.1 2.4-2.1 4.3-4.5 4.3-2.5 0-4.4-2-4.3-4.5.1-2.3 2-4.2 4.6-4.3Z"
      />
      <path
        {...strokeProps}
        pathLength={1}
        style={{ "--i": 1 } as CSSProperties}
        d="M12 2.4v2.4M12.1 19.3v2.3M2.5 12.1h2.3M19.2 11.9h2.4M5.2 5.3l1.6 1.7M17.2 17.1l1.7 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.7-1.7"
      />
    </svg>
  );
}

/** Hand-drawn crescent moon with a small star tick. */
function MoonSketch({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-icon="moon"
      className={className}
    >
      <path
        {...strokeProps}
        pathLength={1}
        style={{ "--i": 0 } as CSSProperties}
        d="M15.4 4.2c-3.9.5-6.6 4.1-5.9 8 .6 3.5 4 5.9 7.6 5.2 1-.2 1.8-.5 2.6-1.1-1 2.9-3.9 4.9-7.1 4.6-4-.4-7-3.9-6.6-8 .3-4.6 4.6-8 9.4-8.7Z"
      />
      <path
        {...strokeProps}
        pathLength={1}
        style={{ "--i": 1 } as CSSProperties}
        d="M18.6 6.2v3.1M17.1 7.8h3"
      />
    </svg>
  );
}

export function ThemeToggle() {
  // null on the server and during hydration: the theme is unknown there.
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    currentTheme,
    () => null,
  );
  // Redraw only after a click, not on every page load.
  const [hasToggled, setHasToggled] = useState(false);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = theme ? `Switch to ${next} mode` : "Switch color theme";
  const draw = hasToggled ? "sketch-draw" : "";

  return (
    <button
      type="button"
      onClick={() => {
        if (!theme) return;
        applyTheme(next);
        setHasToggled(true);
      }}
      aria-label={label}
      title={label}
      className="-mr-2 flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink motion-safe:transition-colors motion-safe:duration-150 fine:hover:text-accent"
    >
      {/* The icon shows the target mode, like the label. Visibility is pure
          CSS (dark: variant), so the server render is already correct. */}
      <MoonSketch className={`size-6 dark:hidden ${draw}`} />
      <SunSketch className={`hidden size-6 dark:block ${draw}`} />
    </button>
  );
}
