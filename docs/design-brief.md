# Design Brief – Engineer's Sketchbook

Reference for all design tasks on this site. Keep it short, keep it true. If a decision changes, change it here first.

## 1. Concept

Someone who always wanted to draw but became an engineer. The site is a technical drawing sheet that someone has been sketching on.

Two layers overlap on every page:

- **Technical layer:** precise, monospaced labels, hairlines, dimension lines, coordinate labels, status LEDs. No background grid.
- **Sketch layer:** ink and pencil lines, hand-drawn buttons, frames, underlines and arrows, and drawings that draw themselves (ships, lighthouses, landscapes, technical sketches, robotics).

The whole site may be playful. What changes per area is which layer leads.

| Area            | Dominant layer                                                        | Accent layer                                                   | Result                                                |
| --------------- | --------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| Home            | Technical (mono labels, dimension lines, hairlines)                   | Sketch (one hero drawing, underline, arrow)                    | Calm, precise, with one surprise                      |
| About           | Technical                                                             | Sketch (small margin drawings)                                 | Readable, structured, a bit of warmth                 |
| Blog            | Technical (index-like list, metadata)                                 | Sketch (hand-drawn arrows, heading and row underline on hover) | Reading comes first; sketches never compete with text |
| Creative Outlet | Sketch (big drawings, loose frames, tilted cards, ink/pencil texture) | Technical (coordinate labels, dimension lines, mono labels)    | Clearly a different room in the same house            |

Rule of thumb: in Home, About and Blog roughly 80% technical and 20% sketch. In Creative Outlet reverse it.

## 2. Colors

Implement as CSS variables in `app/globals.css`, one `light-dark(light, dark)` value per token on `:root`, and expose them through `@theme inline` so Tailwind gets `bg-paper`, `text-ink`, `text-pencil`, `border-line`, `text-moss`, `text-sea`, `text-red`, `decoration-pen` and so on. No color value is written anywhere else; the only exceptions are values that cannot read CSS variables (paper grain, video duotone), which are derived from the tokens and say so in a comment.

**Theme switching.** `color-scheme` on `:root` decides which side of `light-dark()` applies: by default the system (`prefers-color-scheme`), or the manual choice stored in `localStorage` (`theme`) and set as `data-theme="light|dark"` on `<html>` by an inline script before first paint (no flash). Values that cannot use `light-dark()` (the paper grain image) switch via `[data-theme="dark"]` and the media query with `:not([data-theme="light"])`. Tailwind's `dark:` variant follows the same rule.

Palette **"Sketch pad + nature"**: warm sketch-pad paper, brown-black ink and grey graphite, plus three coloured pencils: moss (links and hover), sea (second accent) and red (margin notes only). Dark mode stays warm: dark olive-charcoal paper with creamy chalk, the pencils turn lighter so they hold contrast.

| Token    | Light            | Dark             | Contrast on `paper` (light / dark) | Use                                                                                                |
| -------- | ---------------- | ---------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `paper`  | `#F4EBD7`        | `#23231D`        | n/a                                | Page background                                                                                    |
| `ink`    | `#2B2620`        | `#EDE5D2`        | 12.6:1 / 12.6:1                    | Headlines, body text, links, primary strokes, focus ring                                           |
| `pencil` | `#5E5A50`        | `#B3AD9C`        | 5.8:1 / 7.1:1                      | Technical layer: secondary text, mono labels, dimension lines, link underlines                     |
| `line`   | `#2B2620` at 20% | `#EDE5D2` at 20% | decorative (1.5:1 / 1.8:1)         | Hairlines, dividers, card and frame borders, corner ticks (visible but quiet)                      |
| `moss`   | `#4F6B3A`        | `#9DBB82`        | 5.1:1 / 7.4:1                      | Links and hover (default pen), About accent, Home lab LED                                          |
| `sea`    | `#2F6170`        | `#86B9C4`        | 5.8:1 / 7.3:1                      | Second accent: alternating hover pen, Creative Outlet accent, theme toggle hover                   |
| `red`    | `#A63D2F`        | `#E58A72`        | 5.3:1 / 6.2:1                      | Margin notes only (handwritten notes and their arrows). Never hover, surfaces, running text, focus |

Contrast ratios are calculated with the WCAG 2.x relative luminance formula (sRGB linearized, `(L1 + 0.05) / (L2 + 0.05)`) against `paper` of the same mode. AA needs 4.5:1 for normal text and 3:1 for large text and UI components. `tests/palette.spec.ts` reads the tokens in the browser and fails below 4.5:1, so a changed hex value is checked automatically.

- `ink`, `pencil`, `moss`, `sea` and `red` all reach 4.5:1 or more in both modes, so they are safe for text of any size. `ink` passes AAA.
- UI lines that carry meaning (button strokes, focus ring, link underlines) use `ink` or `pencil` (at least 5.8:1, requirement 3:1). The focus ring uses `ink` (12.6:1 in both modes).
- `line` is decoration. Cards and frames are identified by their content and their link target, never by the border alone. Hex with alpha: `#2B262033` light, `#EDE5D233` dark.
- The Home lab LED is `moss`, never the only signal, always paired with a text label. While it is decorative (detail 2), the label must not claim a status (no "online").
- Do not put `pencil` sans text below 14 px or at reduced opacity. Mono labels in `pencil` may go down to 12 px (they are short and uppercase), never smaller.

**Coloured pencils (`--pen`).** Hover underlines and link hovers use `--pen` (Tailwind `bg-pen`, `text-pen`, `decoration-pen`), like picking up a different pencil:

- Default and Home/Blog: `moss`, and list items alternate moss and sea (`even:[--pen:var(--sea)]`), for example the nav links and the Home section links.
- About sets `--pen` to `moss`, Creative Outlet to `sea` (on the page wrapper). The navigation keeps alternating on every page.
- The theme toggle hovers in `sea`.
- Colour is never the only hover signal: the underline itself appears or redraws.

**Role of the red pencil (`red`).** Rare on purpose, like a correction pen. Allowed: margin notes only (a short handwritten note with a small arrow, including the notes shown in Annotate mode; Annotate dimension lines stay `pencil`). Not allowed: hover states, backgrounds, filled shapes, running text, the focus ring, current-page markers, status. Budget: Home, About and Blog at most one margin note per screen, Annotate notes included. In Creative Outlet a few more are fine.

**Images in the palette.** Grey drawings (the Creative Outlet video and its still) go through an SVG duotone filter (`components/duotone-filters.tsx`): black becomes `ink`, white becomes `paper`, per mode. The filter values are the tokens as RGB / 255 and are checked against them in `tests/palette.spec.ts`.

**Focus ring.** `outline-2 outline-offset-2 outline-ink` on `:focus-visible`. Focus never depends on a pencil colour, and a keyboard user sees focus with exactly the same clarity in both modes. A 2 px ink outline with a 2 px paper gap has 12.6:1 in both modes, far above 3:1. Hover and focus are separate signals and can appear together without clashing.

**Dark mode is not an inversion.** Paper is a warm dark olive-charcoal. Ink is creamy chalk, graphite is a warm khaki-grey, moss, sea and red are lighter chalk versions that hold contrast on dark. Strokes stay thin so they do not glow.

## 3. Typography

| Role                 | Font                                 | Use                                                        |
| -------------------- | ------------------------------------ | ---------------------------------------------------------- |
| Sans (text)          | Geist Sans (already via `next/font`) | Body text, headlines, all running text                     |
| Mono (technical)     | Geist Mono (already via `next/font`) | Labels, coordinates, metadata, dates, nav, dimension text  |
| Handwriting (accent) | Sahan Hand (own handwriting)         | Button labels, margin notes, small accents (1 to 5 words)  |
| Handwriting (large)  | Sahan Hand (same font)               | Large decorative headings in Creative Outlet only (32 px+) |

- **Decision:** Sahan's own handwriting, **Sahan Hand** (`public/fonts/sahan-hand.ttf`, made with Calligraphr), replaces Caveat and Reenie Beanie for both roles. Loaded with `next/font/local` straight from the TTF (about 11.5 KB, no woff2 conversion, no extra tooling). One font, one file, one `--font-hand` variable; Tailwind `font-hand`.
- **Uppercase only, for now.** The lowercase glyphs are drawn very small (x-height about 16% of the em, Geist about 53%), so mixed case is unreadable at margin-note sizes. Every `font-hand` element also gets `uppercase`. Drop it once the lowercase letters are redrawn larger.
- **Airy letter spacing is intended.** Keep the font's own spacing: no `tracking-*` on handwriting, no faux bold (`font-normal`).
- **Fallback is the text font** (`Geist`, then `system-ui`, `sans-serif`), never `cursive` (often Comic Sans on Windows). `adjustFontFallback: false`, so missing glyphs fall back to Geist and not to a metric-adjusted Arial.
- **Glyph coverage:** A–Z, a–z, 0–9, `! " & ' ( ) , - . / : ; ?` and typographic quotes (‘ ’ ‚ “ ” „). Missing: umlauts and ß, `@`, `#`, `+`, en dash `–`. Write handwritten text only with covered characters. Accepted exception: the About note `code + pencil` uses `+` (rendered in Geist) instead of the weak `&`. Known weak glyphs: `&` reads like a small 8, `?` sits high and large; avoid them in short notes or redraw them.
- Handwriting is **never** body text, never in navigation items, never in forms, never below 18 px (margin notes, button labels; 20 px is the default) or 32 px (large Creative Outlet headings), and never the only carrier of information. Button labels and headings in handwriting are real text, short (1 to 3 words), with enough contrast. Mark purely decorative notes `aria-hidden` when they repeat nearby text.
- Headlines: tight tracking (`-0.02em`) and leading (about 1.1). Body: normal tracking, leading 1.6 to 1.75, line length 60 to 70 characters (`max-w-prose`-like). Mono labels: small caps look via `uppercase tracking-wider text-xs`, never below 12 px.

## 4. UI elements

Common accessibility rules for everything below: visible focus ring (`outline-2 outline-offset-2 outline-ink` on `:focus-visible`, never red, see section 2), touch target at least 44 x 44 px (use padding or a pseudo-element, not just a bigger font), hover effects only inside `@media (hover: hover) and (pointer: fine)`, state never conveyed by color alone. Only exception to 44 px: inline links inside running text (WCAG 2.2, 2.5.8 inline exception). Nav items, list rows, buttons and toggles always meet 44 px.

| Element               | Look                                                                                                                                                                                                                                                                                                                                                           | Use                                                | Accessibility                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Buttons**           | Real `<button>` or `<a>` with a short label (1 to 3 words) in Sahan Hand (at least 20 px, uppercase). Border is a slightly irregular hand-drawn rounded rectangle (inline SVG stroke, `currentColor` = `ink`). On hover the stroke redraws in the pen colour (`--pen`), on press `scale(0.97)`.                                                                | Few primary actions (read article, send mail).     | Min 44 x 44 px. Text is real text, the sketch is `aria-hidden` and `pointer-events-none`. Focus ring stays a clean ink rectangle, not the wobbly one.                              |
| **Links**             | Inline: `ink` text with a hand-drawn wavy underline in `pencil` (SVG stroke). Hover: underline redraws in the area's pen (`--pen`, moss or sea). Visited and current links need no extra color.                                                                                                                                                                | Inside text and lists.                             | Underline always present, not only on hover, so links are recognizable without color. In lists the whole row is the target (min 44 px high).                                       |
| **Frames and cards**  | Thin 1 px `line` border with small corner tick marks (like a drawing sheet). In Creative Outlet: loose hand-drawn frame, slight rotation (max 1.5 deg).                                                                                                                                                                                                        | Group content, Creative Outlet entries.            | Rotation is decoration, text stays readable. Whole card is one link target, one focus ring.                                                                                        |
| **Underlines**        | Single or double hand-drawn stroke under a keyword. Max one per screen section.                                                                                                                                                                                                                                                                                | Emphasis, hover on headings.                       | Decorative. Do not use it to replace real emphasis (`<em>`, `<strong>`).                                                                                                           |
| **Arrows**            | Curved hand-drawn arrow pointing from a note to a thing. `pencil` by default, `red` when it belongs to a red margin note.                                                                                                                                                                                                                                      | Connect annotation and element, hint to next step. | `aria-hidden`. Never the only cue.                                                                                                                                                 |
| **Dimension lines**   | Thin line with end ticks and a mono label (`1440 px`, `W 640`).                                                                                                                                                                                                                                                                                                | Measure a hero drawing, headline, or card.         | `aria-hidden` unless the value carries meaning.                                                                                                                                    |
| **Coordinate labels** | Small mono text such as `N 53.55 E 9.99` or `FIG. 01 · 1:2` in corners and next to sketches. Optional and sparse; the Home hero box deliberately shows only the figure label.                                                                                                                                                                                  | Technical accent.                                  | Mono, `pencil` color, at least 12 px. `aria-hidden` when decorative.                                                                                                               |
| **Navigation**        | Mono, uppercase labels in a plain row or list, current page marked with a solid `ink` underline and `aria-current="page"` (the coloured pens are for hover only). Mobile: all links visible or a simple disclosure, no hidden gestures.                                                                                                                        | Header on every page.                              | 44 px targets, keyboard order = visual order, skip link to `main`.                                                                                                                 |
| **Theme toggle**      | Icon-only `<button>` at the right end of the header: a hand-drawn moon (switch to dark) or sun (switch to light), stroke-only, `ink`, `sea` on hover. After a click the new icon redraws itself (section 5); on page load it is shown fully drawn. Choosing the theme that matches the system removes the stored choice, so the site follows the system again. | Header on every page.                              | `aria-label` states the action (`Switch to dark mode`), 44 x 44 px, ink focus ring, no handwriting. Icon visibility is CSS-only, so the server render is correct before hydration. |
| **Timeline**          | Vertical 1 px `line` hairline on the left, a short `pencil` tick per entry. Period in mono uppercase `pencil`, then title, note in `pencil`, highlights as list. Newest first. No icons, no motion.                                                                                                                                                            | Career and education on About.                     | Semantic `<ol>`, ticks are `aria-hidden`, text carries all information.                                                                                                            |
| **Copy button**       | Small `<button>` with a mono uppercase label (`Copy`) and `pencil` underline, pen underline (`--pen`) on fine-pointer hover, `scale(0.97)` on press. Result shows as mono text (`Copied` / `Copy failed`) for 2 s. No handwriting.                                                                                                                             | Copy an e-mail address next to its `mailto:` link. | `aria-label` states the action, min 44 x 44 px, result in an `aria-live="polite"` region, failure handled.                                                                         |

## 5. Motion

No animation library. CSS only (and tiny inline `pathLength="1"` on SVG shapes).

**Self-drawing sketches**

- SVG paths carry `pathLength="1"`. CSS: `stroke-dasharray: 1; stroke-dashoffset: 1;` then animate to `0`.
- Duration 1.2 to 2 s per sketch, `cubic-bezier(0.77, 0, 0.175, 1)` (ease-in-out, it is on-screen movement). Several paths in one drawing: stagger 80 to 150 ms.
- Triggers: hero sketches draw once on page load (after first paint). Others draw once when they enter the viewport (`IntersectionObserver`, `once`, threshold 0.3). Client components (`"use client"`) only where state is really needed: the viewport trigger (toggles a class), the Annotate toggle and the page-width dimension line (resize). Keep each one small; sketches and everything else stay server-rendered, and hover effects stay in CSS (`:hover`, `group-hover`, `:has()`). Never loop. Only exception: the Home Lab LED pulse (detail 2), which is tiny, slow and paused under reduced motion. All other motion is a single transition per interaction (hover, press, toggle).
- Animate only `stroke-dashoffset`, `transform` and `opacity`.

**Hover details**

- Underlines and button frames redraw in 250 to 350 ms, `cubic-bezier(0.23, 1, 0.32, 1)`.
- Buttons and cards: `scale(0.97)` on `:active`, 100 to 160 ms.
- Everything hover-related sits in `@media (hover: hover) and (pointer: fine)`.
- Page transitions and keyboard focus changes are never animated. Hover effects on nav links (underline redraw) are fine.

**Reduced motion**

- The theme toggle icon appears instantly without redrawing.
- With `prefers-reduced-motion: reduce`, sketches are shown **fully drawn immediately**: `stroke-dashoffset: 0`, no transition, no delay.
- Also remove parallax, rotation on hover and any looping. Color and opacity changes that aid comprehension may stay (under 200 ms).
- Hover redraws of underlines and button frames become an instant color change, and `scale` on `:active` is removed.
- Self-drawing is pure CSS: the hidden start state exists only inside the running animation (`animation-fill-mode: backwards`, under `prefers-reduced-motion: no-preference`). Before, after and without the animation the sketch is fully drawn, so nothing is ever stuck invisible, and no JavaScript is needed.

## 6. Five playful details

1. **Page-width dimension line:** a thin line under the header with end ticks that measures the current content width, label updates on resize (`W 640 px`). Mono, `aria-hidden`.
2. **Home Lab status LED:** a small LED next to the nav or footer with a fixed, neutral label `home lab` (no status word, because nothing is measured). Moss-green dot plus slow 4 s opacity pulse (paused under reduced motion, then a static dot). It is pure decoration for now and shows no real status. A real status (for example from a home lab health check) would be its own project later, with its own data, error state and label. Until then, keep the label fixed and the element `aria-hidden` or clearly marked as decorative. It is the only status element on the site; its moss also marks links, so the label carries the meaning.
3. **Gear that ticks:** a small gear sketch (technical layer, `pencil`) next to a section link or list row turns by exactly one tooth (about 30 degrees, 300 ms, `cubic-bezier(0.23, 1, 0.32, 1)`) when you hover the row, and turns back when the pointer leaves. One transition per hover, no loop, `aria-hidden`, fine pointers only. Under reduced motion the gear does not move. Pure CSS transform (`group-hover`), no JavaScript, no dependency.
4. **Robot arm that points:** the robot-arm sketch in the hero has a gripper that tilts a few degrees toward the hovered section link (CSS transform on one path, transform-origin at the joint, triggered via `:has()` on the hero container, no JavaScript). Without hover or with reduced motion it rests in a neutral pose.
5. **Annotate:** each sketch has a small toggle that lays an engineer's markup over the doodle, like someone correcting a drawing. Dimension lines (waterline and mast heights for the ship, a height line for the lighthouse) and part labels (`M1`, `Ø 24`, `1:2`) appear in graphite (`pencil`), and one short margin note in red pencil (up to two in Creative Outlet, see the budget in section 2) (`red`, Sahan Hand, for example `too tall`, `check!`) point at the drawing. The annotation lines are extra SVG paths drawn in with the usual self-drawing rule, the labels are HTML mono text, the margin notes are `aria-hidden` decoration. The toggle is a real `<button>` with `aria-pressed`, a visible label `Annotate` and a 44 × 44 px target; hover is only an extra on fine pointers, never the only way. (The old name "blueprint" no longer fits without blue, "Annotate" describes what happens and keeps the engineer-meets-artist idea.)

## 7. What we deliberately do NOT do

- No handwriting in running text, navigation or forms.
- No skeuomorphic kitsch: no paper textures with shadows, coffee stains, torn edges, spiral binders. Only allowed: one very faint noise grain on the page background (about 2 to 3%, `feTurbulence` in `globals.css`) that does not change readability.
- No background grid.
- No cold blue-grey surfaces: paper, ink and dark mode stay warm. `sea` is a coloured pencil, not a surface colour.
- No scroll hijacking, no scroll-linked storytelling, no parallax.
- No heavy animation libraries (GSAP, Lottie and similar). CSS is enough.
- No copying of inspirations. We take principles, not layouts, drawings or code.
- No pixel sketches: no PNG or JPG drawings, only vector line art.
- No autoplay sound, no looping attention-grabbing animation (the LED pulse is the single, deliberately quiet exception), no cursor replacement, no readout that follows the mouse pointer.
- No red outside margin notes. No coloured surfaces (moss, sea, red), no coloured running text.
- No more than one hero drawing per screen and no decoration that lowers text contrast.

## 8. Sketch files: rules and export

Location: `public/sketches/`. Used as inline SVG or `<img>`. For self-drawing and theme colors they should be inlined (so `currentColor` and CSS apply).

**Rules**

- Lines only: every shape has `stroke`, and `fill` is `none` (never another value).
- `stroke="currentColor"` so light and dark mode work through the text color.
- `viewBox` only, no `width` and no `height` (size is set by CSS).
- No raster content: no `<image>`, no base64 data. (This rule is for sketch files; the page grain in `globals.css` is a URL-encoded SVG filter, not a raster image.)
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
- **Information as quiet decoration.** Small ambient bits (time, status, viewport size) add life without being content. Our decorative LED, the page-width dimension line and static coordinate labels follow this.
- **Texture stays almost invisible.** At most a faint paper grain behind the content. No background grid; the engineering feel comes from mono labels, hairlines and dimension lines.
- **Mobile is the same site, not a reduced one.** Single column, same details, same type scale steps. Decorations simply get smaller or fewer.
- **Warm paper color and consistent illustration style** make the content feel authored. A single palette with a few sparing coloured pencils (moss, sea, red) keeps it coherent.
