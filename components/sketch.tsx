import fs from "node:fs";
import path from "node:path";

export type SketchName =
  "ship" | "lighthouse" | "landscape" | "robot-arm" | "technical";

type SketchProps = {
  name: SketchName;
  className?: string;
  /** Draw the lines on page load (skipped under reduced motion). */
  draw?: boolean;
};

const SHAPE_TAG =
  /<(path|circle|line|rect|ellipse|polyline|polygon)\b([^>]*?)(\/?)>/g;
const STYLE_ATTR = /\sstyle\s*=\s*(["'])([\s\S]*?)\1/;

function loadSketch(name: SketchName, className: string): string {
  const file = path.join(process.cwd(), "public", "sketches", `${name}.svg`);
  let index = 0;
  return (
    fs
      .readFileSync(file, "utf8")
      // Exported files may carry an XML prolog, a doctype or editor comments.
      .replace(/<\?xml[\s\S]*?\?>/g, "")
      .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim()
      // \b also matches a newline after <svg, which some editors emit.
      .replace(/<svg\b/, `<svg aria-hidden="true" class="${className}"`)
      .replace(SHAPE_TAG, (_match, tag: string, attrs: string, selfClose) => {
        // --i drives the stagger between shapes (see globals.css). Merge it
        // into an existing style attribute instead of adding a second one.
        const i = `--i:${index++}`;
        const merged = STYLE_ATTR.test(attrs)
          ? attrs.replace(
              STYLE_ATTR,
              (_s, quote: string, css: string) =>
                ` style=${quote}${i};${css}${quote}`,
            )
          : `${attrs} style="${i}"`;
        return `<${tag}${merged}${selfClose}>`;
      })
  );
}

export function Sketch({ name, className = "", draw = false }: SketchProps) {
  const classes = `${className}${draw ? " sketch-draw" : ""}`.trim();
  // dangerouslySetInnerHTML is acceptable here: the markup comes from our own
  // repo files, and the sketch rules (brief, section 8) forbid scripts,
  // foreignObject and event attributes. Inline SVG lets currentColor and CSS apply.
  return (
    <div
      className="contents"
      dangerouslySetInnerHTML={{ __html: loadSketch(name, classes) }}
    />
  );
}
