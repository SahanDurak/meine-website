export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 200 200"
      className={`pointer-events-none motion-safe:animate-breathe ${className}`}
    >
      <defs>
        <linearGradient id="blob-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="[stop-color:var(--surface)]" />
          <stop
            offset="100%"
            className="[stop-color:color-mix(in_srgb,var(--surface)_85%,var(--accent))]"
          />
        </linearGradient>
      </defs>
      <path
        fill="url(#blob-gradient)"
        d="M150.5 33.5C175 52 190 84 181 115C172 146 139 176 104 183C69 190 32 174 18 143C4 112 14 68 40 42C66 16 126 15 150.5 33.5Z"
      />
    </svg>
  );
}
