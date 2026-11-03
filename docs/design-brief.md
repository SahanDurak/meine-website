# Design Brief – Engineer's Sketchbook

Reference for all design tasks on this site. Keep it short, keep it true. If a decision changes, change it here first.

## 1. Concept

Someone who always wanted to draw but became an engineer. The site is a technical drawing sheet that someone has been sketching on.

Two layers overlap on every page:

- **Technical layer:** precise, monospaced labels, a fine grid, dimension lines, coordinates, status LEDs.
- **Sketch layer:** ink and pencil lines, hand-drawn buttons, frames, underlines and arrows, and drawings that draw themselves (ships, lighthouses, landscapes, technical sketches, robotics).

The whole site may be playful. What changes per area is which layer leads.

| Area            | Dominant layer                                                        | Accent layer                                   | Result                                                |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| Home            | Technical (grid, mono labels, rules)                                  | Sketch (one hero drawing, underline, arrow)    | Calm, precise, with one surprise                      |
| About           | Technical                                                             | Sketch (small margin drawings)                 | Readable, structured, a bit of warmth                 |
| Blog            | Technical (index-like list, metadata)                                 | Sketch (hand-drawn arrows, underline on hover) | Reading comes first; sketches never compete with text |
| Creative Outlet | Sketch (big drawings, loose frames, tilted cards, ink/pencil texture) | Technical (coordinates, dimension lines, grid) | Clearly a different room in the same house            |

Rule of thumb: in Home, About and Blog roughly 80% technical and 20% sketch. In Creative Outlet reverse it.

## 2. Colors

Implement as CSS variables in `app/globals.css` (light in `:root`, dark in the `prefers-color-scheme: dark` block, as today), and expose them through `@theme inline` so Tailwind gets `bg-paper`, `text-ink`, `text-pencil`, `border-grid`, `text-accent`, and so on.

| Token         | Light            | Dark             | Use                                                             |
| ------------- | ---------------- | ---------------- | --------------------------------------------------------------- |
| `paper`       | `#FAF8F3`        | `#0F1115`        | Page background (warm off-white, ink-black)                     |
| `ink`         | `#1A1A1A`        | `#ECEAE4`        | Headlines, body text, primary strokes                           |
| `pencil`      | `#5C5C58`        | `#A3A39C`        | Secondary text, metadata, labels, soft strokes                  |
| `grid`        | `#1A1A1A` at 8%  | `#ECEAE4` at 8%  | Background grid, hairlines, dividers (decoration only)          |
| `grid-strong` | `#1A1A1A` at 20% | `#ECEAE4` at 20% | Card and frame borders, corner ticks (visible but quiet)        |
| `accent`      | `#2347C5`        | `#8FB0FF`        | Links, focus ring, underline and arrow strokes (blueprint blue) |
| `led`         | `#1E7A46`        | `#5BD58A`        | Status LED only (online, built, ok)                             |

Contrast (WCAG AA needs 4.5:1 for normal text, 3:1 for large text and UI components). Values are calculated estimates, verify with a checker when implementing:

- `ink` on `paper`: about 16:1 light, about 15:1 dark. Passes AAA.
- `pencil` on `paper`: about 6.5:1 light, about 7.5:1 dark. Passes AA for body-sized text.
- `accent` on `paper`: about 7:1 light, about 8.5:1 dark. Passes AA for text and focus rings.
- `grid` is decorative, so it has no contrast requirement. Never put text meaning into it.
- `led` is never the only signal. Always pair with a text label ("online").
- Do not put `pencil` sans text below 14 px or at reduced opacity. Mono labels in `pencil` may go down to 12 px (they are short and uppercase), never smaller. Do not use `accent` as a background for white text without checking.

Dark mode is not an inversion. Paper is near-black with a slight blue tint, ink is warm off-white, strokes stay thin so they do not glow.

## 3. Typography

| Role                 | Font                                 | Use                                                           |
| -------------------- | ------------------------------------ | ------------------------------------------------------------- |
| Sans (text)          | Geist Sans (already via `next/font`) | Body text, headlines, all running text                        |
| Mono (technical)     | Geist Mono (already via `next/font`) | Labels, coordinates, metadata, dates, nav, dimension text     |
| Handwriting (accent) | Caveat, alternative Reenie Beanie    | Short annotations only (1 to 5 words), via `next/font/google` |

- **Caveat** is the default: legible at small sizes, reads as a quick pen note. **Reenie Beanie** is rougher and more pencil-like, only for large decorative notes in Creative Outlet. Both are Google Fonts loaded with `next/font/google` (self-hosted at build time, no new npm package). Load only one weight and the `latin` subset.
- Expose as `--font-hand` and Tailwind `font-hand`, same pattern as `--font-mono`.
- Handwriting is **never** body text, never in navigation items, never below 18 px, and never the only carrier of information. Mark purely decorative notes `aria-hidden` when they repeat nearby text.
- Headlines: tight tracking (`-0.02em`) and leading (about 1.1). Body: normal tracking, leading 1.6 to 1.75, line length 60 to 70 characters (`max-w-prose`-like). Mono labels: small caps look via `uppercase tracking-wider text-xs`, never below 12 px.

## 4. UI elements

Common accessibility rules for everything below: visible focus ring (`outline-2 outline-offset-2 outline-accent` on `:focus-visible`), touch target at least 44 x 44 px (use padding or a pseudo-element, not just a bigger font), hover effects only inside `@media (hover: hover)`, state never conveyed by color alone.

| Element               | Look                                                                                                                                                                                                            | Use                                                                         | Accessibility                                                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Buttons**           | Real `<button>` or `<a>` with text in Geist Mono or Sans. Border is a slightly irregular hand-drawn rounded rectangle (inline SVG stroke, `currentColor`). On hover the stroke redraws, on press `scale(0.97)`. | Few primary actions (read article, send mail).                              | Min 44 x 44 px. Text is real text, the sketch is `aria-hidden` and `pointer-events-none`. Focus ring stays a clean rectangle, not the wobbly one. |
| **Links**             | Inline: `accent` text with a hand-drawn wavy underline (SVG stroke). Hover: underline redraws.                                                                                                                  | Inside text and lists.                                                      | Underline always present, not only on hover. In lists the whole row is the target (min 44 px high).                                               |
| **Frames and cards**  | Thin 1 px `grid-strong` border with small corner tick marks (like a drawing sheet). In Creative Outlet: loose hand-drawn frame, slight rotation (max 1.5 deg).                                                  | Group content, Creative Outlet entries.                                     | Rotation is decoration, text stays readable. Whole card is one link target, one focus ring.                                                       |
| **Underlines**        | Single or double hand-drawn stroke under a keyword. Max one per screen section.                                                                                                                                 | Emphasis, hover on headings.                                                | Decorative. Do not use it to replace real emphasis (`<em>`, `<strong>`).                                                                          |
| **Arrows**            | Curved hand-drawn arrow pointing from a note to a thing.                                                                                                                                                        | Connect annotation and element, hint to next step.                          | `aria-hidden`. Never the only cue.                                                                                                                |
| **Grid**              | Fine 24 px grid in `grid` color as background, fading out toward edges (mask). Optional heavier line every 5th.                                                                                                 | Page background in Home, About, Blog (subtle), stronger in Creative Outlet. | Decoration only. Must not lower text contrast, so keep it at 8% or below behind text.                                                             |
| **Dimension lines**   | Thin line with end ticks and a mono label (`1440 px`, `W 640`).                                                                                                                                                 | Measure a hero drawing, headline, or card.                                  | `aria-hidden` unless the value carries meaning.                                                                                                   |
| **Coordinate labels** | Small mono text such as `X 024 / Y 112` or `N 53.55 E 9.99` in corners and next to sketches.                                                                                                                    | Technical accent.                                                           | Mono, `pencil` color, at least 12 px. `aria-hidden` when decorative.                                                                              |
| **Navigation**        | Mono, uppercase labels in a plain row or list, current page marked with an accent underline and `aria-current="page"`. Mobile: all links visible or a simple disclosure, no hidden gestures.                    | Header on every page.                                                       | 44 px targets, keyboard order = visual order, skip link to `main`.                                                                                |

## 5. Motion

No animation library. CSS only (and tiny inline `pathLength="1"` on SVG shapes).

**Self-drawing sketches**

- SVG paths carry `pathLength="1"`. CSS: `stroke-dasharray: 1; stroke-dashoffset: 1;` then animate to `0`.
- Duration 1.2 to 2 s per sketch, `cubic-bezier(0.77, 0, 0.175, 1)` (ease-in-out, it is on-screen movement). Several paths in one drawing: stagger 80 to 150 ms.
- Triggers: hero sketches draw once on page load (after first paint). Others draw once when they enter the viewport (`IntersectionObserver`, `once`, threshold 0.3). This needs one small client component (`"use client"`) that only toggles a class; the sketches themselves stay server-rendered. Never loop. Only exception: the Home Lab LED pulse (detail 2), which is tiny, slow and paused under reduced motion.
- Animate only `stroke-dashoffset`, `transform` and `opacity`.

**Hover details**

- Underlines and button frames redraw in 250 to 350 ms, `cubic-bezier(0.23, 1, 0.32, 1)`.
- Buttons and cards: `scale(0.97)` on `:active`, 100 to 160 ms.
- Everything hover-related sits in `@media (hover: hover) and (pointer: fine)`.
- Navigation and keyboard actions are never animated.

**Reduced motion**

- With `prefers-reduced-motion: reduce`, sketches are shown **fully drawn immediately**: `stroke-dashoffset: 0`, no transition, no delay.
- Also remove parallax, rotation on hover and any looping. Color and opacity changes that aid comprehension may stay (under 200 ms).
- Default state without JavaScript is also fully drawn. The hidden start state is applied only when JS and motion are available, so nothing is ever stuck invisible.

## 6. Five playful details

1. **Page-width dimension line:** a thin line under the header with end ticks that measures the current content width, label updates on resize (`W 640 px`). Mono, `aria-hidden`.
2. **Home Lab status LED:** a small LED next to the nav or footer with a label like `home lab: online`. Static green dot plus slow 4 s opacity pulse (paused under reduced motion). Text label makes the status readable without color.
3. **Cursor coordinates:** on desktop with a fine pointer, a tiny mono readout in the corner shows the pointer position on the grid (`X 482 / Y 210`). Hidden on touch and for reduced motion users. Pure decoration, no layout shift.
4. **Robot arm that points:** the robot-arm sketch in the hero has a gripper that tilts a few degrees toward the hovered section link (CSS transform on one path, transform-origin at the joint). Without hover or with reduced motion it rests in a neutral pose.
5. **Sketch becomes blueprint:** each sketch has a small toggle or hover that adds its dimension lines and part labels (`M1`, `Ø 24`, `1:2`), like an engineer annotating a doodle. The ship gets a waterline and mast heights, the lighthouse a height line. The annotation lines are extra SVG paths, the labels are HTML mono text. The toggle is a real `<button>` with `aria-pressed`, a visible label (e.g. `show dimensions`) and a 44 × 44 px target; hover is only an extra on fine pointers, never the only way.

## 7. What we deliberately do NOT do

- No handwriting in running text, navigation or forms.
- No skeuomorphic kitsch: no paper textures with shadows, coffee stains, torn edges, spiral binders.
- No scroll hijacking, no scroll-linked storytelling, no parallax.
- No heavy animation libraries (GSAP, Lottie and similar). CSS is enough.
- No copying of inspirations. We take principles, not layouts, drawings or code.
- No pixel sketches: no PNG or JPG drawings, only vector line art.
- No autoplay sound, no looping attention-grabbing animation (the LED pulse is the single, deliberately quiet exception), no cursor replacement.
- No more than one hero drawing per screen and no decoration that lowers text contrast.

## 8. Sketch files: rules and export

Location: `public/sketches/`. Used as inline SVG or `<img>`. For self-drawing and theme colors they should be inlined (so `currentColor` and CSS apply).

**Rules**

- Lines only: every shape has `stroke`, and `fill` is `none` (never another value).
- `stroke="currentColor"` so light and dark mode work through the text color.
- `viewBox` only, no `width` and no `height` (size is set by CSS).
- No raster content: no `<image>`, no base64 data.
- No `<script>`, no `<foreignObject>`, no event attributes (`onclick` and similar).
- Round caps and joins (`stroke-linecap="round"`, `stroke-linejoin="round"`), one consistent stroke width per file (placeholders use `2` in a 200-unit viewBox, which scales to about 1.5 to 2.5 px on screen).
- Put `pathLength="1"` on each `<path>` or shape that should draw itself.
- Text is converted to paths. No `<text>` elements.
- Start every file with a comment: `Placeholder – replace with own drawing. See docs/design-brief.md`.

**Export: Inkscape**

1. Convert shapes and text to paths: Object to Path (`Shift+Ctrl+C`). Do **not** use Stroke to Path, the lines must stay real strokes.
2. Set stroke width, round caps and joins in Fill and Stroke (`Shift+Ctrl+F`), fill none.
3. Resize the page to the drawing (`Shift+Ctrl+R`).
4. Save As: **Optimized SVG** (or **Plain SVG**). In the optimized dialog: remove comments, remove metadata, keep viewBox, do not set width and height (remove them afterwards if present).

**Export: Illustrator**

1. Select all, Type > Create Outlines for text. Object > Path > Outline Stroke should **not** be used (we want real strokes).
2. Set stroke weight, round cap and round join, fill none.
3. Fit the artboard to the artwork (Object > Artboards > Fit to Artwork Bounds).
4. File > Export > Export As > SVG. Styling: **Presentation Attributes**, Responsive: checked (removes width and height), Object IDs: Minimal, Decimals: 2. Do not embed images.

**Export: Figma**

1. Draw with the Pen tool, set Stroke only, no Fill. Convert text with Flatten (`Ctrl+E`). Do **not** use Outline stroke, the lines must stay real strokes.
2. Stroke cap and join: Round. Stroke alignment: Center.
3. Put the drawing in a frame sized to the artwork. Export the frame as SVG, uncheck "Include id attribute" and check "Outline text".
4. Remove `width` and `height` from the root `<svg>` afterwards, keep `viewBox`.

**Clean-up with SVGO** (or the SVGOMG web tool) for all tools:

- Enabled: remove comments (but add the placeholder comment back for placeholders only), remove metadata, remove editor data, remove hidden elements, collapse groups, convert shapes to paths is fine.
- **Off or configured:** `removeViewBox` off (must keep the viewBox), `removeDimensions` on (drops width and height), `cleanupIds` can stay on.
- Afterwards: replace hard-coded colors with `currentColor`, set `fill="none"` on the root `<svg>`, add `pathLength="1"` to each stroked element, check there is no `<image>`, `<script>`, `<foreignObject>` or `on*` attribute.
- One path per stroke you want to animate separately. Close-together lines may share one path for a single continuous drawing.

File names: lowercase, one word or kebab-case, same as the motif (`ship.svg`, `robot-arm.svg`).

## 9. Placeholder files

Simple schematic line drawings so the pages can be built before the real drawings exist. Sahan replaces them later with his own drawings, keeping the file names and the rules from section 8.

| File                             | Motif                         | Likely use                   |
| -------------------------------- | ----------------------------- | ---------------------------- |
| `public/sketches/ship.svg`       | Sailing ship                  | Creative Outlet, Home accent |
| `public/sketches/lighthouse.svg` | Lighthouse                    | Creative Outlet, Blog accent |
| `public/sketches/landscape.svg`  | Landscape (hills, sun, water) | Creative Outlet, dividers    |
| `public/sketches/robot-arm.svg`  | Robot arm                     | Home hero, About             |
| `public/sketches/technical.svg`  | Gear with dimension line      | About, technical accents     |

## Inspiration – principles, not copies

Looked at jhey.dev and tania.dev (desktop and 375 px). Only principles are noted.

- **Restraint carries the playfulness.** Both sites use a calm base (lots of space, one text column) and put the personality in small, deliberate spots. We do the same: one hero drawing, many tiny details.
- **Mono for the technical voice.** Small uppercase mono labels and an index-like list read as precise and honest without decoration. Matches our technical layer.
- **A signature piece of character.** One memorable illustrated element near the top gives the site a face. For us it is the hero sketch.
- **Playful links without noise.** Hand-marked underlines and small icons make links feel touched by a person, while text stays plain and readable.
- **Information as quiet decoration.** Live bits (time, status, viewport size) add life without being content. Our LED and coordinate readout follow this.
- **A background grid as texture.** A very faint grid adds depth and fits an engineering theme. It stays behind the content and never fights it.
- **Mobile is the same site, not a reduced one.** Single column, same details, same type scale steps. Decorations simply get smaller or fewer.
- **Warm paper color and consistent illustration style** make the content feel authored. A single palette plus a single accent keeps it coherent.
