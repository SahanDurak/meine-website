/*
 * Duotone: maps the grey drawing (black lines on white paper) to the palette,
 * black -> ink and white -> paper, per mode. SVG filters cannot read CSS
 * variables, so the values are the tokens from app/globals.css as RGB / 255
 * (ink, paper). tests/palette.spec.ts checks they still match the tokens.
 */
const duotones = {
  light: { ink: [43, 38, 32], paper: [244, 235, 215] },
  dark: { ink: [237, 229, 210], paper: [35, 35, 29] },
} as const;

function table(from: number, to: number) {
  return `${(from / 255).toFixed(4)} ${(to / 255).toFixed(4)}`;
}

/** Render once per page that shows grey drawings (ids must be unique). */
export function DuotoneFilters() {
  return (
    <svg aria-hidden="true" className="absolute size-0">
      {Object.entries(duotones).map(([mode, { ink, paper }]) => (
        <filter
          key={mode}
          id={`duotone-${mode}`}
          colorInterpolationFilters="sRGB"
        >
          {/* Grey input: average the channels first, then map. */}
          <feColorMatrix
            type="matrix"
            values="0.333 0.333 0.333 0 0 0.333 0.333 0.333 0 0 0.333 0.333 0.333 0 0 0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={table(ink[0], paper[0])} />
            <feFuncG type="table" tableValues={table(ink[1], paper[1])} />
            <feFuncB type="table" tableValues={table(ink[2], paper[2])} />
          </feComponentTransfer>
        </filter>
      ))}
    </svg>
  );
}
